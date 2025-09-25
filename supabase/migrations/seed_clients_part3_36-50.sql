-- COMPREHENSIVE CLIENT SEED DATA - PART 3 (Clients 36-50)
-- Black Caribbean (continued) + Mixed + Other + Prefer not to say clients
-- Realistic completion patterns: Complete, Moderate, Minimal, Skipper

-- ========================================
-- PHASE 1: CREATE CLIENTS 36-50 PROFILES
-- ========================================

-- Insert profiles for clients 36-50
INSERT INTO profiles (id, email, first_name, last_name, phone, role, created_at, updated_at) VALUES

-- BLACK CARIBBEAN CLIENTS (36-40)
('c1000000-0000-0000-0000-000000000036', 'aaliyah.brown@seedclient.com', 'Aaliyah', 'Brown', '+44 7700 900136', 'client', NOW() - INTERVAL '25 days', NOW()),
('c1000000-0000-0000-0000-000000000037', 'jamal.williams@seedclient.com', 'Jamal', 'Williams', '+44 7700 900137', 'client', NOW() - INTERVAL '23 days', NOW()),
('c1000000-0000-0000-0000-000000000038', 'simone.davis@seedclient.com', 'Simone', 'Davis', '+44 7700 900138', 'client', NOW() - INTERVAL '21 days', NOW()),
('c1000000-0000-0000-0000-000000000039', 'tyrone.clarke@seedclient.com', 'Tyrone', 'Clarke', '+44 7700 900139', 'client', NOW() - INTERVAL '19 days', NOW()),
('c1000000-0000-0000-0000-000000000040', 'natasha.reid@seedclient.com', 'Natasha', 'Reid', '+44 7700 900140', 'client', NOW() - INTERVAL '17 days', NOW()),

-- MIXED HERITAGE CLIENTS (41-45)
('c1000000-0000-0000-0000-000000000041', 'maya.singh-jones@seedclient.com', 'Maya', 'Singh-Jones', '+44 7700 900141', 'client', NOW() - INTERVAL '15 days', NOW()),
('c1000000-0000-0000-0000-000000000042', 'daniel.chen-williams@seedclient.com', 'Daniel', 'Chen-Williams', '+44 7700 900142', 'client', NOW() - INTERVAL '13 days', NOW()),
('c1000000-0000-0000-0000-000000000043', 'leila.hassan-smith@seedclient.com', 'Leila', 'Hassan-Smith', '+44 7700 900143', 'client', NOW() - INTERVAL '11 days', NOW()),
('c1000000-0000-0000-0000-000000000044', 'ryan.okafor-taylor@seedclient.com', 'Ryan', 'Okafor-Taylor', '+44 7700 900144', 'client', NOW() - INTERVAL '9 days', NOW()),
('c1000000-0000-0000-0000-000000000045', 'chloe.patel-brown@seedclient.com', 'Chloe', 'Patel-Brown', '+44 7700 900145', 'client', NOW() - INTERVAL '7 days', NOW()),

-- OTHER CULTURAL BACKGROUNDS (46-48)
('c1000000-0000-0000-0000-000000000046', 'elena.rodriguez@seedclient.com', 'Elena', 'Rodriguez', '+44 7700 900146', 'client', NOW() - INTERVAL '5 days', NOW()),
('c1000000-0000-0000-0000-000000000047', 'ahmed.alrashid@seedclient.com', 'Ahmed', 'Al-Rashid', '+44 7700 900147', 'client', NOW() - INTERVAL '4 days', NOW()),
('c1000000-0000-0000-0000-000000000048', 'yuki.tanaka@seedclient.com', 'Yuki', 'Tanaka', '+44 7700 900148', 'client', NOW() - INTERVAL '3 days', NOW()),

-- PREFER NOT TO SAY (49-50)
('c1000000-0000-0000-0000-000000000049', 'anonymous.user1@seedclient.com', 'Anonymous', 'User1', '+44 7700 900149', 'client', NOW() - INTERVAL '2 days', NOW()),
('c1000000-0000-0000-0000-000000000050', 'anonymous.user2@seedclient.com', 'Anonymous', 'User2', '+44 7700 900150', 'client', NOW() - INTERVAL '1 day', NOW());

-- ========================================
-- PHASE 2: CLIENT ASSESSMENTS (36-50)
-- ========================================

INSERT INTO client_assessments (
  user_id, age_group, communication_preferences, language_preferences, identity_preferences,
  therapy_goals, therapy_modalities, budget_range, preferred_times, session_frequency,
  previous_therapy, crisis_support, cultural_considerations, religious_preferences,
  gender_preferences, therapist_age_preference, session_length_preference,
  created_at, updated_at
) VALUES

-- CLIENT 36: Aaliyah Brown - Minimal Assessment (Black Caribbean, Lesbian, LGBTQ+ + Culturally sensitive)
('c1000000-0000-0000-0000-000000000036', '18–24',
 ARRAY['Exploratory and insight-based'],
 ARRAY['English'], ARRAY['LGBTQ+ friendly and affirming', 'Culturally sensitive and aware'],
 ARRAY['Identity and self-discovery'],
 ARRAY[]::text[], ARRAY[40, 70], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 50,
 NOW() - INTERVAL '25 days', NOW()),

-- CLIENT 37: Jamal Williams - Complete Assessment (Black Caribbean, Culturally sensitive + Trauma)
('c1000000-0000-0000-0000-000000000037', '45–54',
 ARRAY['Empathetic and understanding', 'Calm and process-focused', 'Structured and goal-oriented'],
 ARRAY['English'], ARRAY['Culturally sensitive and aware', 'Trauma-informed and gentle'],
 ARRAY['Past experiences and trauma', 'Work and life stress', 'Family and parenting'],
 ARRAY[]::text[], ARRAY[80, 120], ARRAY[]::text[], 'weekly',
 true, true, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '23 days', NOW()),

-- CLIENT 38: Simone Davis - Moderate Assessment (Black Caribbean, Bisexual, LGBTQ+ + Culturally sensitive)
('c1000000-0000-0000-0000-000000000038', '25–34',
 ARRAY['Flexible and adaptable', 'Empathetic and understanding'],
 ARRAY['English'], ARRAY['LGBTQ+ friendly and affirming', 'Culturally sensitive and aware'],
 ARRAY['Anxiety and everyday worries', 'Identity and self-discovery'],
 ARRAY[]::text[], ARRAY[60, 90], ARRAY[]::text[], 'bi_weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '21 days', NOW()),

-- CLIENT 39: Tyrone Clarke - Skipper (Black Caribbean, Empty arrays)
('c1000000-0000-0000-0000-000000000039', '55+',
 ARRAY[]::text[],
 ARRAY['English'], ARRAY[]::text[],
 ARRAY[]::text[],
 ARRAY[]::text[], ARRAY[50, 80], ARRAY[]::text[], 'monthly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '19 days', NOW()),

-- CLIENT 40: Natasha Reid - Moderate Assessment (Black Caribbean, Culturally sensitive)
('c1000000-0000-0000-0000-000000000040', '35–44',
 ARRAY['Empathetic and understanding', 'Flexible and adaptable'],
 ARRAY['English'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Relationship challenges', 'Family and parenting'],
 ARRAY[]::text[], ARRAY[65, 95], ARRAY[]::text[], 'bi_weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '17 days', NOW()),

-- CLIENT 41: Maya Singh-Jones - Complete Assessment (Mixed, Culturally sensitive)
('c1000000-0000-0000-0000-000000000041', '25–34',
 ARRAY['Exploratory and insight-based', 'Empathetic and understanding', 'Flexible and adaptable'],
 ARRAY['English'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Identity and self-discovery', 'Anxiety and everyday worries', 'Work and life stress'],
 ARRAY[]::text[], ARRAY[70, 100], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '15 days', NOW()),

-- CLIENT 42: Daniel Chen-Williams - Moderate Assessment (Mixed, Gay, LGBTQ+ + Culturally sensitive)
('c1000000-0000-0000-0000-000000000042', '18–24',
 ARRAY['Exploratory and insight-based', 'Empathetic and understanding'],
 ARRAY['English'], ARRAY['LGBTQ+ friendly and affirming', 'Culturally sensitive and aware'],
 ARRAY['Identity and self-discovery', 'Anxiety and everyday worries'],
 ARRAY[]::text[], ARRAY[45, 75], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 50,
 NOW() - INTERVAL '13 days', NOW()),

-- CLIENT 43: Leila Hassan-Smith - Minimal Assessment (Mixed, Culturally sensitive)
('c1000000-0000-0000-0000-000000000043', '35–44',
 ARRAY['Empathetic and understanding'],
 ARRAY['English'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Family and parenting'],
 ARRAY[]::text[], ARRAY[60, 90], ARRAY[]::text[], 'bi_weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '11 days', NOW()),

-- CLIENT 44: Ryan Okafor-Taylor - Moderate Assessment (Mixed, Bisexual, LGBTQ+ + Culturally sensitive)
('c1000000-0000-0000-0000-000000000044', '25–34',
 ARRAY['Exploratory and insight-based', 'Flexible and adaptable'],
 ARRAY['English'], ARRAY['LGBTQ+ friendly and affirming', 'Culturally sensitive and aware'],
 ARRAY['Identity and self-discovery', 'Relationship challenges'],
 ARRAY[]::text[], ARRAY[65, 95], ARRAY[]::text[], 'bi_weekly',
 true, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '9 days', NOW()),

-- CLIENT 45: Chloe Patel-Brown - Complete Assessment (Mixed, Culturally sensitive)
('c1000000-0000-0000-0000-000000000045', '45–54',
 ARRAY['Empathetic and understanding', 'Calm and process-focused', 'Structured and goal-oriented'],
 ARRAY['English'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Work and life stress', 'Family and parenting', 'Feeling low or depressed'],
 ARRAY[]::text[], ARRAY[80, 120], ARRAY[]::text[], 'weekly',
 true, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '7 days', NOW()),

-- CLIENT 46: Elena Rodriguez - Complete Assessment (Other, Culturally sensitive)
('c1000000-0000-0000-0000-000000000046', '25–34',
 ARRAY['Empathetic and understanding', 'Exploratory and insight-based', 'Flexible and adaptable'],
 ARRAY['Spanish'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Anxiety and everyday worries', 'Identity and self-discovery'],
 ARRAY[]::text[], ARRAY[65, 95], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '5 days', NOW()),

-- CLIENT 47: Ahmed Al-Rashid - Moderate Assessment (Other, Culturally sensitive)
('c1000000-0000-0000-0000-000000000047', '35–44',
 ARRAY['Structured and goal-oriented', 'Pragmatic and problem solving'],
 ARRAY['Arabic'], ARRAY['Culturally sensitive and aware'],
 ARRAY['Work and life stress', 'Family and parenting'],
 ARRAY[]::text[], ARRAY[75, 110], ARRAY[]::text[], 'bi_weekly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '4 days', NOW()),

-- CLIENT 48: Yuki Tanaka - Minimal Assessment (Other, Non-binary, Bisexual, LGBTQ+ + Culturally sensitive)
('c1000000-0000-0000-0000-000000000048', '18–24',
 ARRAY['Exploratory and insight-based'],
 ARRAY['Japanese'], ARRAY['LGBTQ+ friendly and affirming', 'Culturally sensitive and aware'],
 ARRAY['Identity and self-discovery'],
 ARRAY[]::text[], ARRAY[50, 80], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 50,
 NOW() - INTERVAL '3 days', NOW()),

-- CLIENT 49: Anonymous User 1 - Minimal Assessment (Prefer not to say)
('c1000000-0000-0000-0000-000000000049', '25–34',
 ARRAY['Empathetic and understanding'],
 ARRAY['English'], ARRAY[]::text[],
 ARRAY['Anxiety and everyday worries'],
 ARRAY[]::text[], ARRAY[60, 90], ARRAY[]::text[], 'weekly',
 false, false, NULL, NULL, NULL, NULL, 50,
 NOW() - INTERVAL '2 days', NOW()),

-- CLIENT 50: Anonymous User 2 - Skipper (Prefer not to say, Empty arrays)
('c1000000-0000-0000-0000-000000000050', '45–54',
 ARRAY[]::text[],
 ARRAY['English'], ARRAY[]::text[],
 ARRAY[]::text[],
 ARRAY[]::text[], ARRAY[70, 110], ARRAY[]::text[], 'monthly',
 false, false, NULL, NULL, NULL, NULL, 60,
 NOW() - INTERVAL '1 day', NOW());

-- ========================================
-- FINAL VERIFICATION & SUMMARY
-- ========================================

SELECT 'PART 3 COMPLETE: Clients 36-50 Created' as status,
       'Black Caribbean (5) + Mixed (5) + Other (3) + Prefer not to say (2) clients' as description;

-- Final comprehensive summary of all 50 clients
SELECT 
  'FINAL SUMMARY: All 50 Clients Created' as summary,
  COUNT(*) as total_clients,
  COUNT(CASE WHEN array_length(communication_preferences, 1) >= 3 THEN 1 END) as complete_assessments,
  COUNT(CASE WHEN array_length(communication_preferences, 1) = 2 THEN 1 END) as moderate_assessments,
  COUNT(CASE WHEN array_length(communication_preferences, 1) = 1 THEN 1 END) as minimal_assessments,
  COUNT(CASE WHEN array_length(communication_preferences, 1) = 0 OR communication_preferences IS NULL THEN 1 END) as skipped_assessments
FROM client_assessments ca
JOIN profiles p ON ca.user_id = p.id
WHERE p.email LIKE '%@seedclient.com' AND p.role = 'client';

-- Cultural diversity breakdown
SELECT 
  'Cultural Identity Distribution:' as breakdown,
  COUNT(CASE WHEN p.first_name IN ('Emma', 'James', 'Margaret', 'Jordan', 'Oliver', 'Sophie', 'William', 'Charlotte', 'Harry', 'Grace', 'George', 'Lucy', 'Thomas', 'Isabella', 'Jack') THEN 1 END) as british_clients,
  COUNT(CASE WHEN p.first_name IN ('Priya', 'Raj', 'Zara', 'Arjun', 'Meera', 'Vikram', 'Kavya', 'Rohit', 'Ananya', 'Kiran') THEN 1 END) as south_asian_clients,
  COUNT(CASE WHEN p.first_name IN ('Amara', 'Kwame', 'Fatima', 'Sekou', 'Asha', 'Chidi', 'Zainab', 'Kofi') THEN 1 END) as black_african_clients,
  COUNT(CASE WHEN p.first_name IN ('Keisha', 'Marcus', 'Aaliyah', 'Jamal', 'Simone', 'Tyrone', 'Natasha') THEN 1 END) as black_caribbean_clients,
  COUNT(CASE WHEN p.first_name IN ('Maya', 'Daniel', 'Leila', 'Ryan', 'Chloe') THEN 1 END) as mixed_clients,
  COUNT(CASE WHEN p.first_name IN ('Elena', 'Ahmed', 'Yuki') THEN 1 END) as other_clients,
  COUNT(CASE WHEN p.first_name LIKE 'Anonymous%' THEN 1 END) as prefer_not_to_say_clients
FROM profiles p
JOIN client_assessments ca ON p.id = ca.user_id
WHERE p.email LIKE '%@seedclient.com' AND p.role = 'client';

-- LGBTQ+ representation
SELECT 
  'LGBTQ+ Representation:' as lgbtq_summary,
  COUNT(CASE WHEN 'LGBTQ+ friendly and affirming' = ANY(identity_preferences) THEN 1 END) as lgbtq_affirming_clients,
  COUNT(CASE WHEN 'Culturally sensitive and aware' = ANY(identity_preferences) THEN 1 END) as culturally_sensitive_clients,
  COUNT(CASE WHEN 'Trauma-informed and gentle' = ANY(identity_preferences) THEN 1 END) as trauma_informed_clients,
  COUNT(CASE WHEN 'Neurodiversity affirming' = ANY(identity_preferences) THEN 1 END) as neurodiversity_affirming_clients
FROM client_assessments ca
JOIN profiles p ON ca.user_id = p.id
WHERE p.email LIKE '%@seedclient.com' AND p.role = 'client';

SELECT '✅ COMPREHENSIVE 50-CLIENT SEED DATA COMPLETE!' as final_status,
       'Ready for matching algorithm testing with realistic diversity and completion patterns' as description;
