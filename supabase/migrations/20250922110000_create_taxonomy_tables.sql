-- Create tables for admin-configurable taxonomies

-- Table for professional bodies
CREATE TABLE IF NOT EXISTS public.professional_bodies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    abbreviation TEXT,
    region TEXT NOT NULL DEFAULT 'UK',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table for specialities
CREATE TABLE IF NOT EXISTS public.specialities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table for languages
CREATE TABLE IF NOT EXISTS public.languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    iso_code TEXT, -- e.g., 'en', 'es'
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table for modalities
CREATE TABLE IF NOT EXISTS public.modalities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert initial data into the new taxonomy tables

-- Professional Bodies
INSERT INTO public.professional_bodies (abbreviation, name) VALUES
('BACP', 'British Association for Counselling and Psychotherapy'),
('UKCP', 'UK Council for Psychotherapy'),
('HCPC', 'Health and Care Professions Council'),
('BABCP', 'British Association for Behavioural & Cognitive Psychotherapies'),
('BPS', 'British Psychological Society'),
('NCS', 'National Counselling and Psychotherapy Society'),
('COSCA', 'Counselling & Psychotherapy in Scotland'),
('ACC', 'Association of Christian Counsellors'),
('AHPP', 'Association of Humanistic Psychology Practitioners'),
('BAAT', 'British Association of Art Therapists'),
('BAMT', 'British Association for Music Therapy'),
('BADth', 'British Association of Dramatherapists'),
('HCPC_ARTS', 'HCPC Arts Therapies Register (Art, Music, Drama, Dance/Movement)'),
('BAPT', 'British Association of Play Therapists'),
('IPTUK', 'Association for Psychoanalytic Psychotherapy in the NHS (UK)'),
('FPC', 'Foundation for Psychotherapy and Counselling'),
('UKAHPP', 'UK Association of Humanistic Psychology Practitioners');

-- Modalities
INSERT INTO public.modalities (name) VALUES
('Cognitive Behavioural Therapy (CBT)'),
('Compassion Focused Therapy (CFT)'),
('EMDR Therapy'),
('Family systems therapy'),
('Integrative/eclectic approach'),
('Interpersonal Therapy'),
('Mindfulness-based Therapy (MBCT)'),
('Person-centered Therapy'),
('Psychodynamic therapy'),
('Trauma-focused therapy');

-- Specialities
INSERT INTO public.specialities (name) VALUES
('Anger management'), ('Anxiety'), ('Autism'), ('Bipolar disorder'), ('Bullying'),
('Career difficulties'), ('Chronic illness'), ('Concentration, memory and focus (ADHD)'),
('Coping with addictions'), ('Depression'), ('Eating disorders'), ('Executive and Professional coaching'),
('Family conflict'), ('Grief and loss'), ('LGBT-related issues'), ('Motivation and self-esteem'),
('OCD'), ('Parenting issues'), ('Phobias'), ('PTSD'), ('Race and racial identity'),
('Relationship and intimacy issues'), ('Trauma and abuse'), ('Tourettes syndrome');

-- Languages
INSERT INTO public.languages (name) VALUES
('Amharic'), ('Arabic'), ('Bengali / Sylheti'), ('British Sign Language (BSL)'), ('Bulgarian'), ('Burmese'),
('Cantonese'), ('Croatian'), ('Czech'), ('Danish'), ('Dutch'), ('English'), ('Farsi / Dari (Persian)'),
('Finnish'), ('French'), ('German'), ('Greek'), ('Gujarati'), ('Haitian Creole'), ('Hebrew'), ('Hindi'),
('Hungarian'), ('Igbo'), ('Italian'), ('Jamaican Patois (Creole)'), ('Kurdish'), ('Latvian'),
('Lithuanian'), ('Malay (Bahasa Melayu)'), ('Mandarin'), ('Mongolian'), ('Pashto'), ('Polish'),
('Portuguese'), ('Punjabi'), ('Romanian'), ('Russian'), ('Serbian'), ('Slovak'), ('Somali'),
('Spanish'), ('Swahili'), ('Swedish'), ('Tagalog / Filipino'), ('Tamil'), ('Thai'), ('Turkish'),
('Urdu'), ('Vietnamese'), ('Yoruba');
