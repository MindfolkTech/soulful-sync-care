-- Insert realistic client profiles
INSERT INTO public.profiles (id, email, first_name, last_name, role, phone) VALUES
  ('11111111-1111-4111-1111-111111111111', 'sarah.johnson@email.com', 'Sarah', 'Johnson', 'client', '+1-555-0101'),
  ('22222222-2222-4222-2222-222222222222', 'michael.chen@email.com', 'Michael', 'Chen', 'client', '+1-555-0102'),
  ('33333333-3333-4333-3333-333333333333', 'emma.rodriguez@email.com', 'Emma', 'Rodriguez', 'client', '+1-555-0103'),
  ('44444444-4444-4444-4444-444444444444', 'james.wilson@email.com', 'James', 'Wilson', 'client', '+1-555-0104'),
  ('55555555-5555-4555-5555-555555555555', 'olivia.taylor@email.com', 'Olivia', 'Taylor', 'client', '+1-555-0105'),
  ('66666666-6666-4666-6666-666666666666', 'david.brown@email.com', 'David', 'Brown', 'client', '+1-555-0106'),
  ('77777777-7777-4777-7777-777777777777', 'sophia.martinez@email.com', 'Sophia', 'Martinez', 'client', '+1-555-0107'),
  ('88888888-8888-4888-8888-888888888888', 'lucas.anderson@email.com', 'Lucas', 'Anderson', 'client', '+1-555-0108');

-- Insert client assessments for realistic profiles
INSERT INTO public.client_assessments (user_id, therapy_goals, therapy_modalities, budget_range, session_frequency, preferred_times, previous_therapy, crisis_support) VALUES
  ('11111111-1111-4111-1111-111111111111', '{"anxiety", "relationships"}', '{"CBT", "mindfulness"}', '{80, 120}', 'weekly', '{"evenings", "weekends"}', true, false),
  ('22222222-2222-4222-2222-222222222222', '{"depression", "work_stress"}', '{"psychodynamic", "CBT"}', '{100, 150}', 'bi-weekly', '{"mornings", "afternoons"}', false, false),
  ('33333333-3333-4333-3333-333333333333', '{"trauma", "self_esteem"}', '{"EMDR", "somatic"}', '{120, 180}', 'weekly', '{"afternoons", "evenings"}', true, true),
  ('44444444-4444-4444-4444-444444444444', '{"addiction", "relationships"}', '{"12_step", "CBT"}', '{90, 130}', 'weekly', '{"mornings", "evenings"}', true, false),
  ('55555555-5555-4555-5555-555555555555', '{"anxiety", "life_transitions"}', '{"mindfulness", "acceptance"}', '{70, 110}', 'bi-weekly', '{"afternoons", "weekends"}', false, false),
  ('66666666-6666-4666-6666-666666666666', '{"grief", "depression"}', '{"psychodynamic", "humanistic"}', '{100, 140}', 'weekly', '{"mornings", "afternoons"}', true, false),
  ('77777777-7777-4777-7777-777777777777', '{"eating_disorders", "body_image"}', '{"DBT", "mindfulness"}', '{120, 160}', 'weekly', '{"evenings", "weekends"}', false, true),
  ('88888888-8888-4888-8888-888888888888', '{"ADHD", "organization"}', '{"behavioral", "mindfulness"}', '{80, 120}', 'bi-weekly', '{"mornings", "afternoons"}', false, false);

-- Generate realistic appointments over the last 3 months and upcoming
-- Using a sample therapist ID - this would be the current user's ID in practice
DO $$
DECLARE
  therapist_uuid UUID := auth.uid(); -- Current therapist
  client_ids UUID[] := ARRAY[
    '11111111-1111-4111-1111-111111111111',
    '22222222-2222-4222-2222-222222222222', 
    '33333333-3333-4333-3333-333333333333',
    '44444444-4444-4444-4444-444444444444',
    '55555555-5555-4555-5555-555555555555',
    '66666666-6666-4666-6666-666666666666',
    '77777777-7777-4777-7777-777777777777',
    '88888888-8888-4888-8888-888888888888'
  ];
  client_id UUID;
  session_date DATE;
  session_time TIME;
  appointment_status TEXT;
  rates NUMERIC[] := ARRAY[85, 95, 105, 115, 125];
BEGIN
  -- Generate past appointments (last 3 months)
  FOR i IN 1..45 LOOP
    client_id := client_ids[1 + (i % 8)];
    session_date := CURRENT_DATE - INTERVAL '90 days' + (i * INTERVAL '2 days');
    session_time := '10:00'::TIME + (i % 8) * INTERVAL '1 hour';
    
    -- Realistic status distribution: mostly completed, some cancelled/no-show
    IF i % 10 = 0 THEN
      appointment_status := 'cancelled';
    ELSIF i % 15 = 0 THEN
      appointment_status := 'no_show';
    ELSE
      appointment_status := 'completed';
    END IF;
    
    INSERT INTO public.appointments (
      therapist_id, client_id, session_date, session_time, 
      status, session_type, session_rate, duration_minutes
    ) VALUES (
      therapist_uuid, client_id, session_date, session_time,
      appointment_status, 
      CASE WHEN i % 8 = 1 THEN 'initial_consultation' ELSE 'therapy_session' END,
      rates[1 + (i % 5)], 50
    );
  END LOOP;
  
  -- Generate upcoming appointments (next 2 weeks)
  FOR i IN 1..12 LOOP
    client_id := client_ids[1 + (i % 8)];
    session_date := CURRENT_DATE + (i * INTERVAL '1 day');
    session_time := '09:00'::TIME + (i % 6) * INTERVAL '1 hour';
    
    INSERT INTO public.appointments (
      therapist_id, client_id, session_date, session_time,
      status, session_type, session_rate, duration_minutes
    ) VALUES (
      therapist_uuid, client_id, session_date, session_time,
      'scheduled', 'therapy_session', rates[1 + (i % 5)], 50
    );
  END LOOP;
END $$;

-- Insert session notes for completed appointments with realistic testimonials
INSERT INTO public.client_session_notes (appointment_id, therapist_id, client_id, session_notes, client_progress, mood_rating, session_rating, private_notes)
SELECT 
  a.id,
  a.therapist_id,
  a.client_id,
  CASE 
    WHEN a.client_id = '11111111-1111-4111-1111-111111111111' THEN 'Sarah showed great progress with anxiety management techniques. She''s been practicing the breathing exercises we discussed.'
    WHEN a.client_id = '22222222-2222-4222-2222-222222222222' THEN 'Michael is opening up more about work stress. We explored cognitive restructuring for negative thought patterns.'
    WHEN a.client_id = '33333333-3333-4333-3333-333333333333' THEN 'Emma had a breakthrough session today discussing childhood experiences. EMDR technique showed positive response.'
    WHEN a.client_id = '44444444-4444-4444-4444-444444444444' THEN 'James is maintaining sobriety well. We worked on relationship repair strategies and communication skills.'
    WHEN a.client_id = '55555555-5555-4555-5555-555555555555' THEN 'Olivia is adapting well to life changes. Mindfulness practices are helping with transition anxiety.'
    WHEN a.client_id = '66666666-6666-4666-6666-666666666666' THEN 'David processed grief emotions effectively today. He''s showing resilience and healthy coping mechanisms.'
    WHEN a.client_id = '77777777-7777-4777-7777-777777777777' THEN 'Sophia made significant progress with body image work. DBT skills are proving very effective for her.'
    ELSE 'Lucas is developing better organization strategies. ADHD management techniques are showing improvement.'
  END,
  CASE 
    WHEN random() > 0.3 THEN 'Significant improvement'
    WHEN random() > 0.6 THEN 'Moderate progress'
    ELSE 'Steady progress'
  END,
  7 + (random() * 3)::INTEGER, -- Mood rating 7-10
  8 + (random() * 2)::INTEGER, -- Session rating 8-10
  'Client engaged well. Continue current approach.'
FROM public.appointments a
WHERE a.status = 'completed'
LIMIT 35;