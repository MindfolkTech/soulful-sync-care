-- Add mock therapist data for UI testing
-- Generate a consistent UUID for the therapist
DO $$
DECLARE
    therapist_id UUID := 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    application_id UUID := 'a47ac10b-58cc-4372-a567-0e02b2c3d480';
BEGIN
    -- Insert into profiles table
    INSERT INTO public.profiles (id, email, first_name, last_name, role, phone, created_at, updated_at)
    VALUES (
        therapist_id,
        'sarah.chen@example.com',
        'Sarah',
        'Chen',
        'therapist',
        '+44 20 1234 5678',
        now() - interval '6 months',
        now() - interval '6 months'
    );

    -- Insert into therapist_applications table
    INSERT INTO public.therapist_applications (
        id,
        user_id,
        name,
        email,
        license_number,
        specialties,
        experience,
        status,
        documents,
        background_check,
        submitted_at,
        created_at,
        updated_at
    )
    VALUES (
        application_id,
        therapist_id,
        'Dr. Sarah Chen',
        'sarah.chen@example.com',
        'UK-BACP-123456',
        ARRAY['anxiety', 'depression', 'stress management', 'mindfulness'],
        'Licensed therapist with 8 years of experience specializing in anxiety and depression treatment for young adults and working professionals. Trained in CBT, mindfulness-based therapy, and culturally sensitive approaches.',
        'approved',
        '{"license": "verified", "insurance": "verified", "degree": "verified"}',
        true,
        now() - interval '5 months',
        now() - interval '6 months',
        now() - interval '5 months'
    );

    -- Insert into therapist_profiles table
    INSERT INTO public.therapist_profiles (
        id,
        user_id,
        application_id,
        name,
        tagline,
        bio,
        avatar_url,
        license_number,
        specialties,
        modalities,
        languages,
        personality_tags,
        session_focus,
        experience_years,
        session_rates,
        location_city,
        location_state,
        location_country,
        timezone,
        availability,
        accepts_new_clients,
        online_sessions,
        in_person_sessions,
        verified,
        verification_date,
        created_at,
        updated_at
    )
    VALUES (
        gen_random_uuid(),
        therapist_id,
        application_id,
        'Dr. Sarah Chen',
        'Empowering young adults through mindful, culturally-aware therapy',
        'I am a licensed therapist with 8 years of experience helping young adults and working professionals navigate anxiety, depression, and life transitions. My approach combines evidence-based therapies like CBT with mindfulness practices, creating a warm and culturally sensitive space where you can explore your thoughts and feelings without judgment. I believe in empowering my clients with practical tools while honoring their unique cultural backgrounds and experiences.',
        '/images/therapist-asian-male-40s.png',
        'UK-BACP-123456',
        ARRAY['anxiety', 'depression', 'stress management', 'mindfulness', 'cultural identity', 'work-life balance'],
        ARRAY['CBT', 'mindfulness-based therapy', 'solution-focused therapy', 'culturally adapted therapy'],
        ARRAY['English', 'Mandarin'],
        ARRAY['empathetic', 'structured', 'culturally sensitive', 'warm', 'practical'],
        ARRAY['young adults', 'working professionals', 'cultural identity', 'life transitions'],
        8,
        '{"45min": 80, "60min": 100, "90min": 140}',
        'London',
        'England',
        'UK',
        'Europe/London',
        '{
            "monday": {"available": true, "slots": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]},
            "tuesday": {"available": true, "slots": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]},
            "wednesday": {"available": true, "slots": ["09:00", "10:00", "11:00", "14:00", "15:00"]},
            "thursday": {"available": true, "slots": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]},
            "friday": {"available": true, "slots": ["09:00", "10:00", "11:00"]},
            "saturday": {"available": false, "slots": []},
            "sunday": {"available": false, "slots": []}
        }',
        true,
        true,
        false,
        true,
        now() - interval '5 months',
        now() - interval '5 months',
        now() - interval '1 week'
    );
END $$;