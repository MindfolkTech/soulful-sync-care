-- Add new columns for preference matching in client_assessments
ALTER TABLE client_assessments 
ADD COLUMN IF NOT EXISTS prefers_similar_age boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS prefers_same_gender boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS prefers_cultural_background_match boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS experience_preference text,
ADD COLUMN IF NOT EXISTS cultural_identity text,
ADD COLUMN IF NOT EXISTS gender_identity text;

-- Add comments for clarity
COMMENT ON COLUMN client_assessments.prefers_similar_age IS 'Client prefers therapist of similar age';
COMMENT ON COLUMN client_assessments.prefers_same_gender IS 'Client prefers therapist of same gender';
COMMENT ON COLUMN client_assessments.prefers_cultural_background_match IS 'Client prefers therapist with matching cultural background';
COMMENT ON COLUMN client_assessments.experience_preference IS 'Preferred years of experience: No preference, Under 5 years, 5-10 years, 10+ years';
COMMENT ON COLUMN client_assessments.cultural_identity IS 'Client''s own cultural identity for matching';
COMMENT ON COLUMN client_assessments.gender_identity IS 'Client''s own gender identity for matching';

-- Update RLS policies if needed
ALTER TABLE client_assessments ENABLE ROW LEVEL SECURITY;

-- Ensure users can only access their own assessment data
DROP POLICY IF EXISTS "Users can view own client assessment" ON client_assessments;
CREATE POLICY "Users can view own client assessment" ON client_assessments
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own client assessment" ON client_assessments;
CREATE POLICY "Users can update own client assessment" ON client_assessments
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own client assessment" ON client_assessments;
CREATE POLICY "Users can insert own client assessment" ON client_assessments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
