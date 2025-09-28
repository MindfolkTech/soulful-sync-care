-- Migration: Add Contextual Onboarding System to therapist_profiles
-- Date: 2025-09-28
-- Purpose: Phase 4 - Add onboarding_state tracking for contextual onboarding flow
-- Risk: Low - Only adding new column with safe default and utility function

-- Add onboarding_state JSONB column to therapist_profiles
-- This column will track the user's progress through contextual onboarding
ALTER TABLE therapist_profiles
  ADD COLUMN IF NOT EXISTS onboarding_state JSONB DEFAULT '{
    "completed_steps": [],
    "current_step": null,
    "skipped_steps": [],
    "last_step_completed_at": null,
    "contextual_onboarding_started": false,
    "contextual_onboarding_completed": false,
    "profile_completion_milestones": {
      "40_percent": null,
      "60_percent": null,
      "80_percent": null,
      "100_percent": null
    }
  }'::jsonb;

-- Add comment for the new column
COMMENT ON COLUMN therapist_profiles.onboarding_state IS 'JSONB tracking contextual onboarding progress including completed steps, milestones, and completion status';

-- Create GIN index for efficient JSONB querying
-- This allows fast queries on onboarding state properties
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_onboarding_state_gin
  ON therapist_profiles USING gin (onboarding_state);

-- Create function to update onboarding progress
-- This function safely updates the onboarding_state JSONB with proper error handling
CREATE OR REPLACE FUNCTION update_onboarding_progress(
  p_user_id UUID,
  p_step_id TEXT,
  p_action TEXT  -- 'complete', 'skip', 'start'
)
RETURNS JSONB AS $$
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

  IF p_action NOT IN ('complete', 'skip', 'start') THEN
    RAISE EXCEPTION 'Action must be one of: complete, skip, start';
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION update_onboarding_progress(UUID, TEXT, TEXT) TO authenticated;

-- Add comment for the function
COMMENT ON FUNCTION update_onboarding_progress(UUID, TEXT, TEXT) IS 'Updates therapist onboarding progress state with proper error handling and validation';

-- Initialize onboarding_state for existing therapist profiles that might have NULL
UPDATE therapist_profiles
SET onboarding_state = '{
  "completed_steps": [],
  "current_step": null,
  "skipped_steps": [],
  "last_step_completed_at": null,
  "contextual_onboarding_started": false,
  "contextual_onboarding_completed": false,
  "profile_completion_milestones": {
    "40_percent": null,
    "60_percent": null,
    "80_percent": null,
    "100_percent": null
  }
}'::jsonb
WHERE onboarding_state IS NULL;

-- Verify the migration worked by checking a sample of records
SELECT
  user_id,
  name,
  onboarding_state->'contextual_onboarding_started' as onboarding_started,
  jsonb_array_length(onboarding_state->'completed_steps') as completed_steps_count,
  onboarding_state->'profile_completion_milestones' as milestones
FROM therapist_profiles
LIMIT 5;