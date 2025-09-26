-- Migration: Add therapist communication style and session format options
-- Date: 2025-09-26
-- Purpose: Implement 4+4 communication and session format options for therapists

-- Create ENUM types for therapist communication options
-- Drop existing types if they exist (for re-running migration)
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'communication_style_enum') THEN
    DROP TYPE communication_style_enum CASCADE;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'session_format_enum') THEN
    DROP TYPE session_format_enum CASCADE;
  END IF;
END $$;

CREATE TYPE communication_style_enum AS ENUM (
  'Supportive & Relational',
  'Motivational & Encouraging', 
  'Pragmatic & Problem-solving',
  'Flexible & Adaptive'
);

CREATE TYPE session_format_enum AS ENUM (
  'Structured & Goal-oriented',
  'Exploratory & Insight-based',
  'Interactive & Dynamic',
  'Calm & Process-Focused'
);

-- Create a function to auto-generate personality_tags from communication_style and session_format
CREATE OR REPLACE FUNCTION generate_personality_tags()
RETURNS TRIGGER AS $$
BEGIN
  -- Clear existing personality_tags
  NEW.personality_tags := ARRAY[]::text[];
  
  -- Add tags based on communication_style (handle both short and long formats)
  IF NEW.communication_style IS NOT NULL THEN
    CASE 
      WHEN NEW.communication_style LIKE 'Supportive & Relational%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'supportive');
        NEW.personality_tags := array_append(NEW.personality_tags, 'empathetic');
        NEW.personality_tags := array_append(NEW.personality_tags, 'warm');
      WHEN NEW.communication_style LIKE 'Motivational & Encouraging%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'motivational');
        NEW.personality_tags := array_append(NEW.personality_tags, 'encouraging');
        NEW.personality_tags := array_append(NEW.personality_tags, 'positive');
      WHEN NEW.communication_style LIKE 'Pragmatic & Problem-solving%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'pragmatic');
        NEW.personality_tags := array_append(NEW.personality_tags, 'solution-oriented');
        NEW.personality_tags := array_append(NEW.personality_tags, 'practical');
      WHEN NEW.communication_style LIKE 'Flexible & Adaptive%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'flexible');
        NEW.personality_tags := array_append(NEW.personality_tags, 'adaptive');
        NEW.personality_tags := array_append(NEW.personality_tags, 'empathetic');
    END CASE;
  END IF;
  
  -- Add tags based on session_format (handle both short and long formats)
  IF NEW.session_format IS NOT NULL THEN
    CASE 
      WHEN NEW.session_format LIKE 'Structured & Goal-oriented%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'structured');
        NEW.personality_tags := array_append(NEW.personality_tags, 'goal-oriented');
        NEW.personality_tags := array_append(NEW.personality_tags, 'focused');
      WHEN NEW.session_format LIKE 'Exploratory & Insight-based%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'exploratory');
        NEW.personality_tags := array_append(NEW.personality_tags, 'insight-based');
        NEW.personality_tags := array_append(NEW.personality_tags, 'reflective');
      WHEN NEW.session_format LIKE 'Interactive & Dynamic%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'interactive');
        NEW.personality_tags := array_append(NEW.personality_tags, 'dynamic');
        NEW.personality_tags := array_append(NEW.personality_tags, 'engaging');
      WHEN NEW.session_format LIKE 'Calm & Process-Focused%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'calm');
        NEW.personality_tags := array_append(NEW.personality_tags, 'gentle');
    END CASE;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate personality_tags
DROP TRIGGER IF EXISTS update_personality_tags ON therapist_profiles;
CREATE TRIGGER update_personality_tags
  BEFORE INSERT OR UPDATE OF communication_style, session_format
  ON therapist_profiles
  FOR EACH ROW
  EXECUTE FUNCTION generate_personality_tags();

-- Update existing therapist profiles to generate personality_tags based on current values
UPDATE therapist_profiles 
SET updated_at = NOW()
WHERE communication_style IS NOT NULL OR session_format IS NOT NULL;
