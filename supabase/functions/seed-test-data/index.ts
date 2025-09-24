import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Use the service role key to bypass RLS for seeding
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // The SQL commands from our seed.sql file
    const seedSql = `
      -- Clear existing test data
      DELETE FROM public.notifications; DELETE FROM public.support_tickets; DELETE FROM public.moderation_queue; DELETE FROM public.audit_trail; DELETE FROM public.appointments; DELETE FROM public.favorites; DELETE FROM public.profiles WHERE email LIKE 'test-%@mindfolk.com';

      -- Create Users
      INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id) VALUES ('a0000000-0000-0000-0000-000000000001', 'test-client@mindfolk.com', crypt('password123', gen_salt('bf')), 'authenticated', 'authenticated', '00000000-0000-0000-0000-000000000000') ON CONFLICT (id) DO NOTHING;
      INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id) VALUES ('a0000000-0000-0000-0000-000000000002', 'test-therapist@mindfolk.com', crypt('password123', gen_salt('bf')), 'authenticated', 'authenticated', '00000000-0000-0000-0000-000000000000') ON CONFLICT (id) DO NOTHING;
      INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id) VALUES ('a0000000-0000-0000-0000-000000000003', 'test-admin@mindfolk.com', crypt('password123', gen_salt('bf')), 'authenticated', 'authenticated', '00000000-0000-0000-0000-000000000000') ON CONFLICT (id) DO NOTHING;

      -- Create Profiles
      INSERT INTO public.profiles (id, first_name, last_name, email, role) VALUES ('a0000000-0000-0000-0000-000000000001', 'Test', 'Client', 'test-client@mindfolk.com', 'client') ON CONFLICT (id) DO UPDATE SET first_name = 'Test', last_name = 'Client', email = 'test-client@mindfolk.com', role = 'client';
      INSERT INTO public.profiles (id, first_name, last_name, email, role) VALUES ('a0000000-0000-0000-0000-000000000002', 'Test', 'Therapist', 'test-therapist@mindfolk.com', 'therapist') ON CONFLICT (id) DO UPDATE SET first_name = 'Test', last_name = 'Therapist', email = 'test-therapist@mindfolk.com', role = 'therapist';
      INSERT INTO public.profiles (id, first_name, last_name, email, role) VALUES ('a0000000-0000-0000-0000-000000000003', 'Test', 'Admin', 'test-admin@mindfolk.com', 'admin') ON CONFLICT (id) DO UPDATE SET first_name = 'Test', last_name = 'Admin', email = 'test-admin@mindfolk.com', role = 'admin';

      -- Create Supporting Data
      INSERT INTO public.favorites (user_id, therapist_id) VALUES ('a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002') ON CONFLICT (user_id, therapist_id) DO NOTHING;
      INSERT INTO public.appointments (client_id, therapist_id, appointment_time, status) VALUES ('a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', now() + interval '3 day', 'confirmed');
      INSERT INTO public.moderation_queue (content_type, content_id, reported_by, reason, status) VALUES ('profile_bio', 'a0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Auto-flagged: violence', 'pending');
      INSERT INTO public.notifications (user_id, type, title, message) VALUES ('a0000000-0000-0000-0000-000000000001', 'appointment_confirmation', 'Your session is confirmed!', 'Your appointment with Test Therapist is confirmed for tomorrow.');
    `;

    const { error } = await supabaseAdmin.rpc('execute_sql', { sql: seedSql });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ message: 'Test data seeded successfully!' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
