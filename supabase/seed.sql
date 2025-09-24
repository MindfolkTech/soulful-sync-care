-- Test Data Seeding for Sprint 1.1

-- Clear existing test data to ensure a clean slate
DELETE FROM public.notifications;
DELETE FROM public.support_tickets;
DELETE FROM public.moderation_queue;
DELETE FROM public.audit_trail;
DELETE FROM public.appointments;
DELETE FROM public.favorites;
DELETE FROM public.profiles WHERE email LIKE 'test-%@mindfolk.com';

-- 1. Create Users
-- Note: We are inserting directly into auth.users. This is for seeding purposes only.
-- In a real application, users would sign up through the UI.

-- Create a test client
INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id) 
VALUES ('a0000000-0000-0000-0000-000000000001', 'test-client@mindfolk.com', crypt('password123', gen_salt('bf')), 'authenticated', 'authenticated', '00000000-0000-0000-0000-000000000000')
ON CONFLICT (id) DO NOTHING;

-- Create a test therapist
INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id) 
VALUES ('a0000000-0000-0000-0000-000000000002', 'test-therapist@mindfolk.com', crypt('password123', gen_salt('bf')), 'authenticated', 'authenticated', '00000000-0000-0000-0000-000000000000')
ON CONFLICT (id) DO NOTHING;

-- Create a test admin
INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id) 
VALUES ('a0000000-0000-0000-0000-000000000003', 'test-admin@mindfolk.com', crypt('password123', gen_salt('bf')), 'authenticated', 'authenticated', '00000000-0000-0000-0000-000000000000')
ON CONFLICT (id) DO NOTHING;

-- 2. Create Profiles (triggers will handle this if set up, but we insert manually for clarity)

-- Client profile
INSERT INTO public.profiles (id, first_name, last_name, email, role)
VALUES ('a0000000-0000-0000-0000-000000000001', 'Test', 'Client', 'test-client@mindfolk.com', 'client')
ON CONFLICT (id) DO UPDATE SET first_name = 'Test', last_name = 'Client', email = 'test-client@mindfolk.com', role = 'client';

-- Therapist profile
INSERT INTO public.profiles (id, first_name, last_name, email, role)
VALUES ('a0000000-0000-0000-0000-000000000002', 'Test', 'Therapist', 'test-therapist@mindfolk.com', 'therapist')
ON CONFLICT (id) DO UPDATE SET first_name = 'Test', last_name = 'Therapist', email = 'test-therapist@mindfolk.com', role = 'therapist';

-- Admin profile
INSERT INTO public.profiles (id, first_name, last_name, email, role)
VALUES ('a0000000-0000-0000-0000-000000000003', 'Test', 'Admin', 'test-admin@mindfolk.com', 'admin')
ON CONFLICT (id) DO UPDATE SET first_name = 'Test', last_name = 'Admin', email = 'test-admin@mindfolk.com', role = 'admin';

-- 3. Create Supporting Data for Testing

-- Make the client favorite the therapist
INSERT INTO public.favorites (user_id, therapist_id)
VALUES ('a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002')
ON CONFLICT (user_id, therapist_id) DO NOTHING;

-- Create an upcoming appointment for them
INSERT INTO public.appointments (client_id, therapist_id, session_date, session_time, status)
VALUES ('a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', (now() + interval '3 day')::date, '14:00:00', 'confirmed');

-- Create a piece of content that needs moderation
INSERT INTO public.moderation_queue (content_type, content_id, reported_by, reason, status)
VALUES ('profile_bio', 'a0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Auto-flagged: violence', 'pending');

-- Create a notification for the client
INSERT INTO public.notifications (user_id, type, title, message)
VALUES ('a0000000-0000-0000-0000-000000000001', 'appointment_confirmation', 'Your session is confirmed!', 'Your appointment with Test Therapist is confirmed for tomorrow.');


SELECT 'Test data seeded successfully!' as result;
