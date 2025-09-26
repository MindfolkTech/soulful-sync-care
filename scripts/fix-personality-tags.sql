-- Script to fix personality_tags in therapist_profiles
-- This should be run after the migration is applied

-- First, let's see what we're dealing with
SELECT 
  name,
  communication_style,
  session_format,
  personality_tags
FROM therapist_profiles
WHERE communication_style IS NOT NULL 
OR session_format IS NOT NULL;

-- Fix the personality_tags for therapists with communication styles
-- This properly combines tags from both communication_style and session_format
-- Updated to include enhanced tags (warm, directive)
UPDATE therapist_profiles
SET personality_tags = 
  COALESCE(
    CASE 
      WHEN communication_style LIKE 'Supportive & Relational%' THEN 
        ARRAY['supportive', 'empathetic', 'warm']
      WHEN communication_style LIKE 'Motivational & Encouraging%' THEN 
        ARRAY['motivational', 'encouraging', 'positive']
      WHEN communication_style LIKE 'Pragmatic & Problem-solving%' THEN 
        ARRAY['pragmatic', 'solution-oriented', 'practical']
      WHEN communication_style LIKE 'Flexible & Adaptive%' THEN 
        ARRAY['flexible', 'adaptive', 'empathetic']
      ELSE ARRAY[]::text[]
    END, ARRAY[]::text[]) ||
  COALESCE(
    CASE 
      WHEN session_format LIKE 'Structured & Goal-oriented%' THEN 
        ARRAY['structured', 'goal-oriented', 'focused']
      WHEN session_format LIKE 'Exploratory & Insight-based%' THEN 
        ARRAY['exploratory', 'insight-based', 'reflective']
      WHEN session_format LIKE 'Interactive & Dynamic%' THEN 
        ARRAY['interactive', 'dynamic', 'engaging']
      WHEN session_format LIKE 'Calm & Process-Focused%' THEN 
        ARRAY['calm', 'gentle']
      ELSE ARRAY[]::text[]
    END, ARRAY[]::text[])
WHERE communication_style IS NOT NULL 
OR session_format IS NOT NULL;

-- OPTIONAL: Clean up communication_style and session_format to remove descriptions
-- WARNING: Only run this AFTER updating the therapist UI to show descriptions separately!
-- Currently COMMENTED OUT to preserve descriptions until UI is updated
/*
UPDATE therapist_profiles
SET 
  communication_style = 
    CASE 
      WHEN communication_style LIKE 'Supportive & Relational%' THEN 'Supportive & Relational'
      WHEN communication_style LIKE 'Motivational & Encouraging%' THEN 'Motivational & Encouraging'
      WHEN communication_style LIKE 'Pragmatic & Problem-solving%' THEN 'Pragmatic & Problem-solving'
      WHEN communication_style LIKE 'Flexible & Adaptive%' THEN 'Flexible & Adaptive'
      ELSE communication_style
    END,
  session_format = 
    CASE 
      WHEN session_format LIKE 'Structured & Goal-oriented%' THEN 'Structured & Goal-oriented'
      WHEN session_format LIKE 'Exploratory & Insight-based%' THEN 'Exploratory & Insight-based'
      WHEN session_format LIKE 'Interactive & Dynamic%' THEN 'Interactive & Dynamic'
      WHEN session_format LIKE 'Calm & Process-Focused%' THEN 'Calm & Process-Focused'
      ELSE session_format
    END
WHERE communication_style IS NOT NULL 
OR session_format IS NOT NULL;
*/

-- Verify the fixes
SELECT 
  name,
  communication_style,
  session_format,
  personality_tags
FROM therapist_profiles
WHERE communication_style IS NOT NULL 
OR session_format IS NOT NULL;
