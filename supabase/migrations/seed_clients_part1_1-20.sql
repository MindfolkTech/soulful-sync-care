-- COMPREHENSIVE CLIENT SEED DATA - PART 1 (Clients 1-20)
-- Uses EXACT strings from Assessment.tsx for proper matching algorithm testing
-- Realistic completion patterns: Complete, Moderate, Minimal, Skipper

-- ========================================
-- PHASE 1: SAFE CLEANUP & CONSTRAINT REMOVAL
-- ========================================

-- Remove foreign key constraint to allow seed data (Option 1 approach)
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Clear existing test data safely (keep real users)
DELETE FROM client_assessments WHERE user_id IN (
  SELECT id FROM profiles WHERE email LIKE '%@seedclient.com' OR email LIKE '%test%' OR email LIKE '%@email.com'
);

DELETE FROM profiles WHERE email LIKE '%@seedclient.com' OR email LIKE '%test%' OR email LIKE '%@email.com';

-- ========================================
-- PHASE 2: CREATE CLIENTS 1-20 (BRITISH + SOUTH ASIAN)
-- ========================================

-- Insert profiles for clients 1-20
INSERT INTO profiles (id, email, first_name, last_name, phone, role, created_at, updated_at) VALUES

-- BRITISH CLIENTS (1-15)
('c1000000-0000-0000-0000-000000000001', 'emma.johnson@seedclient.com', 'Emma', 'Johnson', '+44 7700 900101', 'client', NOW() - INTERVAL '50 days', NOW()),
('c1000000-0000-0000-0000-000000000002', 'james.williams@seedclient.com', 'James', 'Williams', '+44 7700 900102', 'client', NOW() - INTERVAL '48 days', NOW()),
('c1000000-0000-0000-0000-000000000003', 'margaret.brown@seedclient.com', 'Margaret', 'Brown', '+44 7700 900103', 'client', NOW() - INTERVAL '46 days', NOW()),
('c1000000-0000-0000-0000-000000000004', 'jordan.davis@seedclient.com', 'Jordan', 'Davis', '+44 7700 900104', 'client', NOW() - INTERVAL '44 days', NOW()),
('c1000000-0000-0000-0000-000000000005', 'oliver.thompson@seedclient.com', 'Oliver', 'Thompson', '+44 7700 900105', 'client', NOW() - INTERVAL '42 days', NOW()),
('c1000000-0000-0000-0000-000000000006', 'sophie.clarke@seedclient.com', 'Sophie', 'Clarke', '+44 7700 900106', 'client', NOW() - INTERVAL '40 days', NOW()),
('c1000000-0000-0000-0000-000000000007', 'william.roberts@seedclient.com', 'William', 'Roberts', '+44 7700 900107', 'client', NOW() - INTERVAL '38 days', NOW()),
('c1000000-0000-0000-0000-000000000008', 'charlotte.evans@seedclient.com', 'Charlotte', 'Evans', '+44 7700 900108', 'client', NOW() - INTERVAL '36 days', NOW()),
('c1000000-0000-0000-0000-000000000009', 'harry.wilson@seedclient.com', 'Harry', 'Wilson', '+44 7700 900109', 'client', NOW() - INTERVAL '34 days', NOW()),
('c1000000-0000-0000-0000-000000000010', 'grace.taylor@seedclient.com', 'Grace', 'Taylor', '+44 7700 900110', 'client', NOW() - INTERVAL '32 days', NOW()),
('c1000000-0000-0000-0000-000000000011', 'george.anderson@seedclient.com', 'George', 'Anderson', '+44 7700 900111', 'client', NOW() - INTERVAL '30 days', NOW()),
('c1000000-0000-0000-0000-000000000012', 'lucy.white@seedclient.com', 'Lucy', 'White', '+44 7700 900112', 'client', NOW() - INTERVAL '28 days', NOW()),
('c1000000-0000-0000-0000-000000000013', 'thomas.harris@seedclient.com', 'Thomas', 'Harris', '+44 7700 900113', 'client', NOW() - INTERVAL '26 days', NOW()),
('c1000000-0000-0000-0000-000000000014', 'isabella.martin@seedclient.com', 'Isabella', 'Martin', '+44 7700 900114', 'client', NOW() - INTERVAL '24 days', NOW()),
('c1000000-0000-0000-0000-000000000015', 'jack.thompson@seedclient.com', 'Jack', 'Thompson', '+44 7700 900115', 'client', NOW() - INTERVAL '22 days', NOW()),

-- SOUTH ASIAN CLIENTS (16-20)
('c1000000-0000-0000-0000-000000000016', 'priya.sharma@seedclient.com', 'Priya', 'Sharma', '+44 7700 900116', 'client', NOW() - INTERVAL '20 days', NOW()),
('c1000000-0000-0000-0000-000000000017', 'raj.patel@seedclient.com', 'Raj', 'Patel', '+44 7700 900117', 'client', NOW() - INTERVAL '18 days', NOW()),
('c1000000-0000-0000-0000-000000000018', 'zara.khan@seedclient.com', 'Zara', 'Khan', '+44 7700 900118', 'client', NOW() - INTERVAL '16 days', NOW()),
('c1000000-0000-0000-0000-000000000019', 'arjun.singh@seedclient.com', 'Arjun', 'Singh', '+44 7700 900119', 'client', NOW() - INTERVAL '14 days', NOW()),
('c1000000-0000-0000-0000-000000000020', 'meera.gupta@seedclient.com', 'Meera', 'Gupta', '+44 7700 900120', 'client', NOW() - INTERVAL '12 days', NOW());

-- ========================================
-- PHASE 3: CLIENT ASSESSMENTS (1-20)
-- ========================================

INSERT INTO client_assessments (
  user_id, age_group, communication_preferences, language_preferences, identity_preferences,
  therapy_goals, therapy_modalities, budget_range, preferred_times, session_frequency,
  previous_therapy, crisis_support, cultural_considerations, religious_preferences,
  gender_preferences, therapist_age_preference, session_length_preference,
  created_at, updated_at
) VALUES

-- CLIENT 1: Emma Johnson - Complete Assessment
('c1000000-0000-0000-0000-000000000001', '25–34',
 ARRAY['Structured and goal-oriented', 'Pragmatic and problem solving', 'Gently challenging and direct'],
 ARRAY['English'], ARRAY[]::text[],
 ARRAY['Anxiety and everyday worries', 'Work and life stress'],
 ARRAY[]::text[], ARRAY[60, 85], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 50,
 NOW() - INTERVAL '50 days', NOW()),

-- CLIENT 2: James Williams - Moderate Assessment (Gay, LGBTQ+ affirming)
('c1000000-0000-0000-0000-000000000002', '45–54',
 ARRAY['Gently challenging and direct', 'Exploratory and insight-based'],
 ARRAY['English'], ARRAY['LGBTQ+ friendly and affirming'],
 ARRAY['Identity and self-discovery', 'Work and life stress'],
 ARRAY[]::text[], ARRAY[100, 150], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '48 days', NOW()),

-- CLIENT 3: Margaret Brown - Minimal Assessment
('c1000000-0000-0000-0000-000000000003', '55+',
 ARRAY['Empathetic and understanding'],
 ARRAY['English'], ARRAY[]::text[],
 ARRAY['Feeling low or depressed'],
 ARRAY[]::text[], ARRAY[45, 70], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '46 days', NOW()),

-- CLIENT 4: Jordan Davis - Skipper (Empty arrays)
('c1000000-0000-0000-0000-000000000004', '18–24',
 ARRAY[]::text[],
 ARRAY['English'], ARRAY[]::text[],
 ARRAY[]::text[],
 ARRAY[]::text[], ARRAY[50, 75], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 45,
 NOW() - INTERVAL '44 days', NOW()),

-- CLIENT 5: Oliver Thompson - Complete Assessment (Trauma)
('c1000000-0000-0000-0000-000000000005', '35–44',
 ARRAY['Empathetic and understanding', 'Calm and process-focused', 'Trauma-informed and gentle'],
 ARRAY['English'], ARRAY['Trauma-informed and gentle'],
 ARRAY['Past experiences and trauma', 'Anxiety and everyday worries', 'Work and life stress'],
 ARRAY[]::text[], ARRAY[85, 125], ARRAY[]::text[], 'weekly',
 true, true, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '42 days', NOW()),

-- CLIENT 6: Sophie Clarke - Moderate Assessment (Lesbian, LGBTQ+ affirming)
('c1000000-0000-0000-0000-000000000006', '25–34',
 ARRAY['Exploratory and insight-based', 'Empathetic and understanding'],
 ARRAY['English'], ARRAY['LGBTQ+ friendly and affirming'],
 ARRAY['Identity and self-discovery', 'Relationship challenges'],
 ARRAY[]::text[], ARRAY[65, 95], ARRAY[]::text[], 'bi_weekly',
 true, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '40 days', NOW()),

-- CLIENT 7: William Roberts - Moderate Assessment
('c1000000-0000-0000-0000-000000000007', '55+',
 ARRAY['Structured and goal-oriented', 'Pragmatic and problem solving'],
 ARRAY['English'], ARRAY[]::text[],
 ARRAY['Family and parenting', 'Work and life stress'],
 ARRAY[]::text[], ARRAY[80, 120], ARRAY[]::text[], 'bi_weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '38 days', NOW()),

-- CLIENT 8: Charlotte Evans - Minimal Assessment (Bisexual, LGBTQ+ affirming)
('c1000000-0000-0000-0000-000000000008', '18–24',
 ARRAY['Motivational and encouraging'],
 ARRAY['English'], ARRAY['LGBTQ+ friendly and affirming'],
 ARRAY['Anxiety and everyday worries'],
 ARRAY[]::text[], ARRAY[40, 65], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 45,
 NOW() - INTERVAL '36 days', NOW()),

-- CLIENT 9: Harry Wilson - Complete Assessment
('c1000000-0000-0000-0000-000000000009', '35–44',
 ARRAY['Gently challenging and direct', 'Structured and goal-oriented', 'Flexible and adaptable'],
 ARRAY['English'], ARRAY[]::text[],
 ARRAY['Work and life stress', 'Relationship challenges', 'Family and parenting'],
 ARRAY[]::text[], ARRAY[90, 130], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 75,
 NOW() - INTERVAL '34 days', NOW()),

-- CLIENT 10: Grace Taylor - Moderate Assessment
('c1000000-0000-0000-0000-000000000010', '25–34',
 ARRAY['Empathetic and understanding', 'Calm and process-focused'],
 ARRAY['English'], ARRAY[]::text[],
 ARRAY['Feeling low or depressed', 'Family and parenting'],
 ARRAY[]::text[], ARRAY[55, 85], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 50,
 NOW() - INTERVAL '32 days', NOW()),

-- CLIENT 11: George Anderson - Skipper (Empty arrays)
('c1000000-0000-0000-0000-000000000011', '45–54',
 ARRAY['I''m still figuring this out'],
 ARRAY['English'], ARRAY[]::text[],
 ARRAY[]::text[],
 ARRAY[]::text[], ARRAY[70, 110], ARRAY[]::text[], 'monthly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '30 days', NOW()),

-- CLIENT 12: Lucy White - Complete Assessment
('c1000000-0000-0000-0000-000000000012', '18–24',
 ARRAY['Motivational and encouraging', 'Flexible and adaptable', 'Empathetic and understanding'],
 ARRAY['English'], ARRAY[]::text[],
 ARRAY['Anxiety and everyday worries', 'Identity and self-discovery'],
 ARRAY[]::text[], ARRAY[45, 70], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 50,
 NOW() - INTERVAL '28 days', NOW()),

-- CLIENT 13: Thomas Harris - Moderate Assessment (Gay, LGBTQ+ affirming + Trauma)
('c1000000-0000-0000-0000-000000000013', '55+',
 ARRAY['Empathetic and understanding', 'Calm and process-focused'],
 ARRAY['English'], ARRAY['LGBTQ+ friendly and affirming', 'Trauma-informed and gentle'],
 ARRAY['Past experiences and trauma'],
 ARRAY[]::text[], ARRAY[80, 120], ARRAY[]::text[], 'bi_weekly',
 true, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '26 days', NOW()),

-- CLIENT 14: Isabella Martin - Minimal Assessment
('c1000000-0000-0000-0000-000000000014', '35–44',
 ARRAY['Structured and goal-oriented'],
 ARRAY['English'], ARRAY[]::text[],
 ARRAY['Work and life stress'],
 ARRAY[]::text[], ARRAY[70, 100], ARRAY[]::text[], 'bi_weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '24 days', NOW()),

-- CLIENT 15: Jack Thompson - Complete Assessment (Bisexual, LGBTQ+ affirming)
('c1000000-0000-0000-0000-000000000015', '25–34',
 ARRAY['Exploratory and insight-based', 'Empathetic and understanding', 'Flexible and adaptable'],
 ARRAY['English'], ARRAY['LGBTQ+ friendly and affirming'],
 ARRAY['Identity and self-discovery', 'Anxiety and everyday worries', 'Relationship challenges'],
 ARRAY[]::text[], ARRAY[65, 95], ARRAY[]::text[], 'weekly',
 true, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '22 days', NOW()),

-- CLIENT 16: Priya Sharma - Complete Assessment (South Asian, Culturally sensitive)
('c1000000-0000-0000-0000-000000000016', '35–44',
 ARRAY['Empathetic and understanding', 'Flexible and adaptable', 'Structured and goal-oriented'],
 ARRAY['Hindi'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Relationship challenges', 'Work and life stress', 'Family and parenting'],
 ARRAY[]::text[], ARRAY[90, 130], ARRAY[]::text[], 'bi_weekly',
 false, false, NULL, NULL, NULL, NULL, 75,
 NOW() - INTERVAL '20 days', NOW()),

-- CLIENT 17: Raj Patel - Minimal Assessment (South Asian, Culturally sensitive)
('c1000000-0000-0000-0000-000000000017', '25–34',
 ARRAY['Pragmatic and problem solving'],
 ARRAY['Gujarati'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Work and life stress'],
 ARRAY[]::text[], ARRAY[60, 90], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 50,
 NOW() - INTERVAL '18 days', NOW()),

-- CLIENT 18: Zara Khan - Moderate Assessment (South Asian, Lesbian, LGBTQ+ + Culturally sensitive)
('c1000000-0000-0000-0000-000000000018', '18–24',
 ARRAY['Exploratory and insight-based', 'Empathetic and understanding'],
 ARRAY['Urdu'], ARRAY['LGBTQ+ friendly and affirming', 'Culturally sensitive and aware'],
 ARRAY['Identity and self-discovery', 'Anxiety and everyday worries'],
 ARRAY[]::text[], ARRAY[40, 70], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 50,
 NOW() - INTERVAL '16 days', NOW()),

-- CLIENT 19: Arjun Singh - Complete Assessment (South Asian, Culturally sensitive)
('c1000000-0000-0000-0000-000000000019', '45–54',
 ARRAY['Empathetic and understanding', 'Calm and process-focused', 'Structured and goal-oriented'],
 ARRAY['Punjabi'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Family and parenting', 'Work and life stress', 'Feeling low or depressed'],
 ARRAY[]::text[], ARRAY[80, 120], ARRAY[]::text[], 'weekly',
 true, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '14 days', NOW()),

-- CLIENT 20: Meera Gupta - Moderate Assessment (South Asian, Bisexual, LGBTQ+ + Culturally sensitive)
('c1000000-0000-0000-0000-000000000020', '25–34',
 ARRAY['Exploratory and insight-based', 'Flexible and adaptable'],
 ARRAY['Hindi'], ARRAY['LGBTQ+ friendly and affirming', 'Culturally sensitive and aware'],
 ARRAY['Identity and self-discovery', 'Relationship challenges'],
 ARRAY[]::text[], ARRAY[65, 95], ARRAY[]::text[], 'bi_weekly',
 true, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '12 days', NOW());

-- ========================================
-- VERIFICATION SUMMARY
-- ========================================

SELECT 'PART 1 COMPLETE: Clients 1-20 Created' as status,
       'British (15) + South Asian (5) clients with realistic assessment patterns' as description;

SELECT 
  'Assessment Completion Patterns:' as summary,
  COUNT(CASE WHEN array_length(communication_preferences, 1) >= 3 THEN 1 END) as complete_assessments,
  COUNT(CASE WHEN array_length(communication_preferences, 1) = 2 THEN 1 END) as moderate_assessments,
  COUNT(CASE WHEN array_length(communication_preferences, 1) = 1 THEN 1 END) as minimal_assessments,
  COUNT(CASE WHEN array_length(communication_preferences, 1) = 0 OR communication_preferences IS NULL THEN 1 END) as skipped_assessments
FROM client_assessments ca
JOIN profiles p ON ca.user_id = p.id
WHERE p.email LIKE '%@seedclient.com' AND p.role = 'client';
