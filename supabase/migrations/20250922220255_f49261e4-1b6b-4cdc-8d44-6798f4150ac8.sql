-- Create sample appointments for current therapist with mock client IDs
-- These will represent sessions without needing real client accounts
INSERT INTO public.appointments (
  therapist_id, client_id, session_date, session_time, 
  status, session_type, session_rate, duration_minutes, notes
) VALUES 
  -- Past completed sessions (last 3 months)
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '85 days', '10:00', 'completed', 'initial_consultation', 115, 50, 'Initial session with new client Sarah - anxiety and relationships'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '78 days', '11:00', 'completed', 'therapy_session', 105, 50, 'Follow-up session - good progress on anxiety management'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '71 days', '14:00', 'completed', 'therapy_session', 105, 50, 'Continued work on cognitive restructuring techniques'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '65 days', '09:00', 'completed', 'initial_consultation', 115, 50, 'Initial session with Michael - work stress and depression'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '64 days', '15:00', 'completed', 'therapy_session', 105, 50, 'Sarah session - practicing mindfulness techniques'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '58 days', '10:00', 'completed', 'therapy_session', 105, 50, 'Michael - exploring psychodynamic approaches'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '57 days', '16:00', 'completed', 'therapy_session', 105, 50, 'Sarah - breakthrough with relationship patterns'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '51 days', '11:00', 'completed', 'initial_consultation', 115, 50, 'Initial session with Emma - trauma and self-esteem work'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '50 days', '13:00', 'completed', 'therapy_session', 105, 50, 'Michael - significant progress with work boundaries'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '44 days', '14:00', 'completed', 'therapy_session', 105, 50, 'Emma - beginning EMDR work for trauma processing'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '43 days', '09:00', 'completed', 'therapy_session', 105, 50, 'Sarah - maintaining progress, working on communication'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '38 days', '15:00', 'completed', 'initial_consultation', 115, 50, 'Initial session with James - addiction recovery support'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '37 days', '10:00', 'completed', 'therapy_session', 105, 50, 'Emma - positive response to somatic techniques'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '36 days', '16:00', 'completed', 'therapy_session', 105, 50, 'Michael - developing healthy coping strategies'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '31 days', '11:00', 'completed', 'therapy_session', 105, 50, 'James - building recovery support network'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '30 days', '14:00', 'completed', 'therapy_session', 105, 50, 'Sarah - practicing new relationship skills'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '25 days', '09:00', 'completed', 'initial_consultation', 115, 50, 'Initial session with Olivia - life transitions and anxiety'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '24 days', '13:00', 'completed', 'therapy_session', 105, 50, 'Emma - integration session after EMDR work'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '23 days', '15:00', 'completed', 'therapy_session', 105, 50, 'James - relapse prevention planning'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '18 days', '10:00', 'completed', 'therapy_session', 105, 50, 'Olivia - mindfulness for transition anxiety'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '17 days', '16:00', 'completed', 'therapy_session', 105, 50, 'Michael - work-life balance improvements'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '12 days', '11:00', 'completed', 'therapy_session', 105, 50, 'Sarah - relationship milestone achieved'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '11 days', '14:00', 'completed', 'therapy_session', 105, 50, 'Emma - building self-esteem practices'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '10 days', '09:00', 'cancelled', 'therapy_session', 105, 50, 'James cancelled - rescheduled for next week'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '5 days', '13:00', 'completed', 'therapy_session', 105, 50, 'Olivia - successful navigation of major life change'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '4 days', '15:00', 'completed', 'therapy_session', 105, 50, 'Michael - maintaining healthy boundaries'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE - INTERVAL '3 days', '10:00', 'no_show', 'therapy_session', 105, 50, 'Sarah no-show - followed up via message'),
  
  -- Upcoming sessions (next 2 weeks)
  (auth.uid(), gen_random_uuid(), CURRENT_DATE + INTERVAL '1 day', '10:00', 'scheduled', 'therapy_session', 105, 50, 'Emma - continuing trauma integration work'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE + INTERVAL '2 days', '14:00', 'scheduled', 'therapy_session', 105, 50, 'James - recovery support session'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE + INTERVAL '3 days', '11:00', 'scheduled', 'therapy_session', 105, 50, 'Sarah - relationship maintenance session'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE + INTERVAL '4 days', '15:00', 'scheduled', 'therapy_session', 105, 50, 'Olivia - ongoing transition support'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE + INTERVAL '5 days', '09:00', 'scheduled', 'therapy_session', 105, 50, 'Michael - workplace stress management'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE + INTERVAL '8 days', '13:00', 'scheduled', 'initial_consultation', 115, 50, 'Initial session with new client David - grief counseling'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE + INTERVAL '9 days', '16:00', 'scheduled', 'therapy_session', 105, 50, 'Emma - building resilience strategies'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE + INTERVAL '10 days', '10:00', 'scheduled', 'therapy_session', 105, 50, 'James - maintaining sobriety focus'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE + INTERVAL '11 days', '14:00', 'scheduled', 'therapy_session', 105, 50, 'Sarah - advanced relationship skills'),
  (auth.uid(), gen_random_uuid(), CURRENT_DATE + INTERVAL '12 days', '11:00', 'scheduled', 'therapy_session', 105, 50, 'Olivia - celebrating progress milestone');

-- Insert session notes for completed appointments with client testimonials
INSERT INTO public.client_session_notes (
  appointment_id, therapist_id, client_id, session_notes, 
  client_progress, mood_rating, session_rating, private_notes
)
SELECT 
  a.id,
  a.therapist_id,
  a.client_id,
  CONCAT('Session with client - ', a.notes),
  CASE 
    WHEN random() > 0.7 THEN 'Significant improvement'
    WHEN random() > 0.4 THEN 'Moderate progress'
    ELSE 'Steady progress'
  END,
  6 + (random() * 4)::INTEGER, -- Mood rating 6-10
  7 + (random() * 3)::INTEGER, -- Session rating 7-10
  'Engaged well during session. Continue current therapeutic approach.'
FROM public.appointments a
WHERE a.status = 'completed' AND a.therapist_id = auth.uid();