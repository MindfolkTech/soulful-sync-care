-- Migration: Add 'defer' action to onboarding progress tracking
-- Author: Claude Code Assistant
-- Date: 2025-09-29
-- Purpose: Fix "I'll do this later" functionality to save deferred state properly
--
-- ISSUE IDENTIFIED: Currently, clicking "I'll do this later" only sets local state
-- This causes the welcome modal to appear again on next visit, which is annoying
--
-- Changes:
--   1. Extend update_onboarding_progress RPC to support 'defer' action
--   2. Add contextual_onboarding_deferred field to track deferred state
--   3. Add deferred_at timestamp to track when onboarding was deferred
--
-- New 'defer' action behavior:
--   - Sets contextual_onboarding_deferred = true
--   - Sets deferred_at = current timestamp
--   - Does NOT affect completed_steps or skipped_steps arrays
--   - Allows frontend to avoid showing welcome modal for deferred users
--
-- Dependencies: existing update_onboarding_progress RPC function
-- Performance Impact: Minimal - just updating JSONB field
-- Testing: After migration, "I'll do this later" should save state and not show modal again

BEGIN;

-- Update the RPC function to support 'defer' action
CREATE OR REPLACE FUNCTION update_onboarding_progress(
    p_user_id UUID,
    p_step_id TEXT,
    p_action TEXT
) RETURNS JSONB AS $$
DECLARE
  current_state JSONB;
  updated_state JSONB;
  completed_steps JSONB;
  skipped_steps JSONB;
BEGIN
  -- Validate input parameters
  IF p_user_id IS NULL OR p_step_id IS NULL OR p_action IS NULL THEN
    RAISE EXCEPTION 'All parameters (user_id, step_id, action) are required';
  END IF;

  IF p_action NOT IN ('complete', 'skip', 'start', 'defer') THEN
    RAISE EXCEPTION 'Action must be one of: complete, skip, start, defer';
  END IF;

  -- Get current onboarding state
  SELECT onboarding_state INTO current_state
  FROM therapist_profiles
  WHERE user_id = p_user_id;

  IF current_state IS NULL THEN
    RAISE EXCEPTION 'Therapist profile not found for user_id: %', p_user_id;
  END IF;

  -- Initialize arrays if they don't exist
  completed_steps := COALESCE(current_state->'completed_steps', '[]'::jsonb);
  skipped_steps := COALESCE(current_state->'skipped_steps', '[]'::jsonb);

  -- Update state based on action
  CASE p_action
    WHEN 'complete' THEN
      -- Add to completed_steps if not already there
      IF NOT (completed_steps ? p_step_id) THEN
        completed_steps := completed_steps || to_jsonb(p_step_id);
      END IF;
      -- Remove from skipped_steps if it exists there
      skipped_steps := (
        SELECT jsonb_agg(elem)
        FROM jsonb_array_elements_text(skipped_steps) AS elem
        WHERE elem != p_step_id
      );
      -- Set last completion time and current step
      updated_state := jsonb_set(
        jsonb_set(
          jsonb_set(current_state, '{completed_steps}', completed_steps),
          '{skipped_steps}', COALESCE(skipped_steps, '[]'::jsonb)
        ),
        '{last_step_completed_at}',
        to_jsonb(now()::text)
      );

    WHEN 'skip' THEN
      -- Add to skipped_steps if not already there
      IF NOT (skipped_steps ? p_step_id) THEN
        skipped_steps := skipped_steps || to_jsonb(p_step_id);
      END IF;
      -- Remove from completed_steps if it exists there
      completed_steps := (
        SELECT jsonb_agg(elem)
        FROM jsonb_array_elements_text(completed_steps) AS elem
        WHERE elem != p_step_id
      );
      -- Update state
      updated_state := jsonb_set(
        jsonb_set(current_state, '{completed_steps}', COALESCE(completed_steps, '[]'::jsonb)),
        '{skipped_steps}', skipped_steps
      );

    WHEN 'start' THEN
      -- Set current step and mark onboarding as started
      updated_state := jsonb_set(
        jsonb_set(current_state, '{current_step}', to_jsonb(p_step_id)),
        '{contextual_onboarding_started}',
        'true'::jsonb
      );

    WHEN 'defer' THEN
      -- NEW: Handle deferred onboarding
      -- Set deferred flag and timestamp, but don't affect step arrays
      updated_state := jsonb_set(
        jsonb_set(current_state, '{contextual_onboarding_deferred}', 'true'::jsonb),
        '{deferred_at}',
        to_jsonb(now()::text)
      );
      -- Clear current step since user chose to defer
      updated_state := jsonb_set(updated_state, '{current_step}', 'null'::jsonb);
  END CASE;

  -- Update the database
  UPDATE therapist_profiles
  SET
    onboarding_state = updated_state,
    updated_at = now()
  WHERE user_id = p_user_id;

  -- Return the updated state
  RETURN updated_state;

EXCEPTION
  WHEN OTHERS THEN
    -- Log error and re-raise with context
    RAISE EXCEPTION 'Error updating onboarding progress for user %, step %, action %: %',
      p_user_id, p_step_id, p_action, SQLERRM;
END;
$$ LANGUAGE plpgsql;

-- Add comment explaining the new functionality
COMMENT ON FUNCTION update_onboarding_progress IS
'Updates therapist onboarding progress with support for:
- complete: Mark step as completed
- skip: Mark step as skipped
- start: Begin contextual onboarding
- defer: User chose "I''ll do this later" - saves deferred state to avoid showing welcome modal again';

COMMIT;