-- Migration: Standardize identity tags across the system
-- Date: 2025-09-26
-- Purpose: Fix duplicate identity tag versions and remove unused tags

-- Standardize identity tags in therapist_profiles
UPDATE therapist_profiles
SET identity_tags = 
  array(
    SELECT DISTINCT 
      CASE 
        WHEN tag IN ('LGBTQ+ affirming', 'LGBTQ+ friendly and affirming') 
          THEN 'LGBTQ+ friendly and affirming'
        WHEN tag IN ('culturally sensitive', 'Culturally sensitive and aware')
          THEN 'Culturally sensitive and aware'
        WHEN tag = 'Asian-friendly'
          THEN NULL  -- Remove Asian-friendly
        ELSE tag
      END
    FROM unnest(identity_tags) AS tag
    WHERE tag IS NOT NULL
  )
WHERE identity_tags IS NOT NULL 
  AND array_length(identity_tags, 1) > 0;

-- Standardize identity preferences in client_assessments
UPDATE client_assessments
SET identity_preferences = 
  array(
    SELECT DISTINCT 
      CASE 
        WHEN pref IN ('LGBTQ+ affirming', 'LGBTQ+ friendly and affirming') 
          THEN 'LGBTQ+ friendly and affirming'
        WHEN pref IN ('culturally sensitive', 'Culturally sensitive and aware')
          THEN 'Culturally sensitive and aware'
        ELSE pref
      END
    FROM unnest(identity_preferences) AS pref
    WHERE pref IS NOT NULL
  )
WHERE identity_preferences IS NOT NULL 
  AND array_length(identity_preferences, 1) > 0;

-- Create a taxonomy table for identity tags (for consistency)
CREATE TABLE IF NOT EXISTS identity_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert standardized identity tags
INSERT INTO identity_tags (name, description) VALUES
  ('LGBTQ+ friendly and affirming', 'Affirming and knowledgeable about LGBTQ+ identities and experiences'),
  ('Neurodiversity affirming', 'Understanding and accommodating of neurodivergent experiences including autism, ADHD, dyslexia, etc.'),
  ('Trauma-informed and gentle', 'Uses trauma-informed approaches with emphasis on safety and pacing'),
  ('Culturally sensitive and aware', 'Knowledgeable about and respectful of diverse cultural backgrounds')
ON CONFLICT (name) DO NOTHING;

-- Verify the standardization
SELECT 'Therapist Identity Tags' as source, unnest(identity_tags) as tag, COUNT(*) as count
FROM therapist_profiles
WHERE identity_tags IS NOT NULL
GROUP BY tag

UNION ALL

SELECT 'Client Identity Preferences' as source, unnest(identity_preferences) as pref, COUNT(*) as count  
FROM client_assessments
WHERE identity_preferences IS NOT NULL
GROUP BY pref
ORDER BY source, tag;
