-- COMPREHENSIVE CLIENT SEED DATA - PART 2 (Clients 21-35)
-- South Asian (continued) + Black African + Black Caribbean clients
-- Realistic completion patterns: Complete, Moderate, Minimal, Skipper

-- ========================================
-- PHASE 1: CREATE CLIENTS 21-35 PROFILES
-- ========================================

-- Insert profiles for clients 21-35
INSERT INTO profiles (id, email, first_name, last_name, phone, role, created_at, updated_at) VALUES

-- SOUTH ASIAN CLIENTS (21-25)
('c1000000-0000-0000-0000-000000000021', 'vikram.reddy@seedclient.com', 'Vikram', 'Reddy', '+44 7700 900121', 'client', NOW() - INTERVAL '10 days', NOW()),
('c1000000-0000-0000-0000-000000000022', 'kavya.iyer@seedclient.com', 'Kavya', 'Iyer', '+44 7700 900122', 'client', NOW() - INTERVAL '9 days', NOW()),
('c1000000-0000-0000-0000-000000000023', 'rohit.joshi@seedclient.com', 'Rohit', 'Joshi', '+44 7700 900123', 'client', NOW() - INTERVAL '8 days', NOW()),
('c1000000-0000-0000-0000-000000000024', 'ananya.das@seedclient.com', 'Ananya', 'Das', '+44 7700 900124', 'client', NOW() - INTERVAL '7 days', NOW()),
('c1000000-0000-0000-0000-000000000025', 'kiran.nair@seedclient.com', 'Kiran', 'Nair', '+44 7700 900125', 'client', NOW() - INTERVAL '6 days', NOW()),

-- BLACK AFRICAN CLIENTS (26-33)
('c1000000-0000-0000-0000-000000000026', 'amara.okafor@seedclient.com', 'Amara', 'Okafor', '+44 7700 900126', 'client', NOW() - INTERVAL '45 days', NOW()),
('c1000000-0000-0000-0000-000000000027', 'kwame.asante@seedclient.com', 'Kwame', 'Asante', '+44 7700 900127', 'client', NOW() - INTERVAL '43 days', NOW()),
('c1000000-0000-0000-0000-000000000028', 'fatima.alhassan@seedclient.com', 'Fatima', 'Al-Hassan', '+44 7700 900128', 'client', NOW() - INTERVAL '41 days', NOW()),
('c1000000-0000-0000-0000-000000000029', 'sekou.traore@seedclient.com', 'Sekou', 'Traore', '+44 7700 900129', 'client', NOW() - INTERVAL '39 days', NOW()),
('c1000000-0000-0000-0000-000000000030', 'asha.mohamed@seedclient.com', 'Asha', 'Mohamed', '+44 7700 900130', 'client', NOW() - INTERVAL '37 days', NOW()),
('c1000000-0000-0000-0000-000000000031', 'chidi.okwu@seedclient.com', 'Chidi', 'Okwu', '+44 7700 900131', 'client', NOW() - INTERVAL '35 days', NOW()),
('c1000000-0000-0000-0000-000000000032', 'zainab.kone@seedclient.com', 'Zainab', 'Kone', '+44 7700 900132', 'client', NOW() - INTERVAL '33 days', NOW()),
('c1000000-0000-0000-0000-000000000033', 'kofi.mensah@seedclient.com', 'Kofi', 'Mensah', '+44 7700 900133', 'client', NOW() - INTERVAL '31 days', NOW()),

-- BLACK CARIBBEAN CLIENTS (34-35)
('c1000000-0000-0000-0000-000000000034', 'keisha.campbell@seedclient.com', 'Keisha', 'Campbell', '+44 7700 900134', 'client', NOW() - INTERVAL '29 days', NOW()),
('c1000000-0000-0000-0000-000000000035', 'marcus.johnson@seedclient.com', 'Marcus', 'Johnson', '+44 7700 900135', 'client', NOW() - INTERVAL '27 days', NOW());

-- ========================================
-- PHASE 2: CLIENT ASSESSMENTS (21-35)
-- ========================================

INSERT INTO client_assessments (
  user_id, age_group, communication_preferences, language_preferences, identity_preferences,
  therapy_goals, therapy_modalities, budget_range, preferred_times, session_frequency,
  previous_therapy, crisis_support, cultural_considerations, religious_preferences,
  gender_preferences, therapist_age_preference, session_length_preference,
  created_at, updated_at
) VALUES

-- CLIENT 21: Vikram Reddy - Skipper (South Asian, Empty arrays)
('c1000000-0000-0000-0000-000000000021', '35–44',
 ARRAY[]::text[],
 ARRAY['Telugu'], ARRAY[]::text[],
 ARRAY[]::text[],
 ARRAY[]::text[], ARRAY[60, 100], ARRAY[]::text[], 'monthly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '10 days', NOW()),

-- CLIENT 22: Kavya Iyer - Complete Assessment (South Asian, Culturally sensitive)
('c1000000-0000-0000-0000-000000000022', '18–24',
 ARRAY['Empathetic and understanding', 'Motivational and encouraging', 'Calm and process-focused'],
 ARRAY['Tamil'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Anxiety and everyday worries', 'Family and parenting'],
 ARRAY[]::text[], ARRAY[40, 70], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 50,
 NOW() - INTERVAL '9 days', NOW()),

-- CLIENT 23: Rohit Joshi - Minimal Assessment (South Asian, Culturally sensitive + Trauma)
('c1000000-0000-0000-0000-000000000023', '55+',
 ARRAY['Empathetic and understanding'],
 ARRAY['Marathi'], ARRAY['Culturally sensitive and aware', 'Trauma-informed and gentle'],
 ARRAY['Past experiences and trauma'],
 ARRAY[]::text[], ARRAY[50, 80], ARRAY[]::text[], 'bi_weekly',
 true, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '8 days', NOW()),

-- CLIENT 24: Ananya Das - Moderate Assessment (South Asian, Culturally sensitive)
('c1000000-0000-0000-0000-000000000024', '25–34',
 ARRAY['Structured and goal-oriented', 'Flexible and adaptable'],
 ARRAY['Bengali'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Work and life stress', 'Anxiety and everyday worries'],
 ARRAY[]::text[], ARRAY[55, 85], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 50,
 NOW() - INTERVAL '7 days', NOW()),

-- CLIENT 25: Kiran Nair - Moderate Assessment (South Asian, Non-binary, Culturally sensitive)
('c1000000-0000-0000-0000-000000000025', '35–44',
 ARRAY['Exploratory and insight-based', 'Empathetic and understanding'],
 ARRAY['Malayalam'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Identity and self-discovery'],
 ARRAY[]::text[], ARRAY[70, 100], ARRAY[]::text[], 'bi_weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '6 days', NOW()),

-- CLIENT 26: Amara Okafor - Complete Assessment (Black African, Culturally sensitive)
('c1000000-0000-0000-0000-000000000026', '25–34',
 ARRAY['Empathetic and understanding', 'Calm and process-focused', 'Flexible and adaptable'],
 ARRAY['Igbo'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Feeling low or depressed', 'Family and parenting', 'Work and life stress'],
 ARRAY[]::text[], ARRAY[60, 90], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '45 days', NOW()),

-- CLIENT 27: Kwame Asante - Minimal Assessment (Black African, Culturally sensitive)
('c1000000-0000-0000-0000-000000000027', '35–44',
 ARRAY['Structured and goal-oriented'],
 ARRAY['Twi'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Work and life stress'],
 ARRAY[]::text[], ARRAY[70, 110], ARRAY[]::text[], 'bi_weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '43 days', NOW()),

-- CLIENT 28: Fatima Al-Hassan - Moderate Assessment (Black African, Culturally sensitive)
('c1000000-0000-0000-0000-000000000028', '18–24',
 ARRAY['Empathetic and understanding', 'Motivational and encouraging'],
 ARRAY['Arabic'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Anxiety and everyday worries', 'Identity and self-discovery'],
 ARRAY[]::text[], ARRAY[45, 75], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 50,
 NOW() - INTERVAL '41 days', NOW()),

-- CLIENT 29: Sekou Traore - Complete Assessment (Black African, Gay, LGBTQ+ + Culturally sensitive)
('c1000000-0000-0000-0000-000000000029', '45–54',
 ARRAY['Exploratory and insight-based', 'Empathetic and understanding', 'Calm and process-focused'],
 ARRAY['French'], ARRAY['LGBTQ+ friendly and affirming', 'Culturally sensitive and aware'],
 ARRAY['Identity and self-discovery', 'Past experiences and trauma'],
 ARRAY[]::text[], ARRAY[85, 125], ARRAY[]::text[], 'weekly',
 true, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '39 days', NOW()),

-- CLIENT 30: Asha Mohamed - Skipper (Black African, Empty arrays)
('c1000000-0000-0000-0000-000000000030', '25–34',
 ARRAY['I''m still figuring this out'],
 ARRAY['Somali'], ARRAY[]::text[],
 ARRAY[]::text[],
 ARRAY[]::text[], ARRAY[50, 80], ARRAY[]::text[], 'monthly',
 false, false, NULL, NULL, NULL, NULL, 50,
 NOW() - INTERVAL '37 days', NOW()),

-- CLIENT 31: Chidi Okwu - Moderate Assessment (Black African, Culturally sensitive)
('c1000000-0000-0000-0000-000000000031', '35–44',
 ARRAY['Pragmatic and problem solving', 'Structured and goal-oriented'],
 ARRAY['Igbo'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Family and parenting', 'Relationship challenges'],
 ARRAY[]::text[], ARRAY[75, 110], ARRAY[]::text[], 'bi_weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '35 days', NOW()),

-- CLIENT 32: Zainab Kone - Moderate Assessment (Black African, Culturally sensitive + Trauma)
('c1000000-0000-0000-0000-000000000032', '55+',
 ARRAY['Empathetic and understanding', 'Calm and process-focused'],
 ARRAY['French'], ARRAY['Culturally sensitive and aware', 'Trauma-informed and gentle'],
 ARRAY['Past experiences and trauma', 'Feeling low or depressed'],
 ARRAY[]::text[], ARRAY[60, 90], ARRAY[]::text[], 'weekly',
 true, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '33 days', NOW()),

-- CLIENT 33: Kofi Mensah - Complete Assessment (Black African, Bisexual, LGBTQ+ + Culturally sensitive)
('c1000000-0000-0000-0000-000000000033', '25–34',
 ARRAY['Exploratory and insight-based', 'Flexible and adaptable', 'Empathetic and understanding'],
 ARRAY['English'], ARRAY['LGBTQ+ friendly and affirming', 'Culturally sensitive and aware'],
 ARRAY['Identity and self-discovery', 'Anxiety and everyday worries', 'Work and life stress'],
 ARRAY[]::text[], ARRAY[65, 95], ARRAY[]::text[], 'weekly',
 true, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '31 days', NOW()),

-- CLIENT 34: Keisha Campbell - Complete Assessment (Black Caribbean, Culturally sensitive)
('c1000000-0000-0000-0000-000000000034', '25–34',
 ARRAY['Empathetic and understanding', 'Calm and process-focused', 'Motivational and encouraging'],
 ARRAY['English'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Feeling low or depressed', 'Family and parenting'],
 ARRAY[]::text[], ARRAY[55, 85], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '29 days', NOW()),

-- CLIENT 35: Marcus Johnson - Moderate Assessment (Black Caribbean, Culturally sensitive)
('c1000000-0000-0000-0000-000000000035', '35–44',
 ARRAY['Gently challenging and direct', 'Structured and goal-oriented'],
 ARRAY['English'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Work and life stress', 'Relationship challenges'],
 ARRAY[]::text[], ARRAY[70, 110], ARRAY[]::text[], 'bi_weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '27 days', NOW());

-- ========================================
-- VERIFICATION SUMMARY
-- ========================================

SELECT 'PART 2 COMPLETE: Clients 21-35 Created' as status,
       'South Asian (5) + Black African (8) + Black Caribbean (2) clients' as description;

SELECT 
  'Cumulative Assessment Patterns (Clients 1-35):' as summary,
  COUNT(CASE WHEN array_length(communication_preferences, 1) >= 3 THEN 1 END) as complete_assessments,
  COUNT(CASE WHEN array_length(communication_preferences, 1) = 2 THEN 1 END) as moderate_assessments,
  COUNT(CASE WHEN array_length(communication_preferences, 1) = 1 THEN 1 END) as minimal_assessments,
  COUNT(CASE WHEN array_length(communication_preferences, 1) = 0 OR communication_preferences IS NULL THEN 1 END) as skipped_assessments
FROM client_assessments ca
JOIN profiles p ON ca.user_id = p.id
WHERE p.email LIKE '%@seedclient.com' AND p.role = 'client';
