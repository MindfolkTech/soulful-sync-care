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

    // Enhanced seed data with comprehensive appointments matching mock-bookings.tsx
    const seedSql = `
      -- Clear existing test data
      DELETE FROM public.notifications; 
      DELETE FROM public.support_tickets; 
      DELETE FROM public.moderation_queue; 
      DELETE FROM public.audit_trail; 
      DELETE FROM public.appointments; 
      DELETE FROM public.favorites; 
      DELETE FROM public.profiles WHERE email LIKE 'test-%@mindfolk.com';

      -- Create Test Profiles (matching mock-bookings.tsx names)
      INSERT INTO public.profiles (id, first_name, last_name, email, role) VALUES 
        ('c0000000-0000-0000-0000-000000000001', 'Jessica', 'Davis', 'jessica.davis@mindfolk.com', 'client'),
        ('c0000000-0000-0000-0000-000000000002', 'Michael', 'Smith', 'michael.smith@mindfolk.com', 'client'),
        ('c0000000-0000-0000-0000-000000000003', 'Robert', 'Parker', 'robert.parker@mindfolk.com', 'client'),
        ('c0000000-0000-0000-0000-000000000004', 'Lisa', 'Martinez', 'lisa.martinez@mindfolk.com', 'client'),
        ('t0000000-0000-0000-0000-000000000001', 'Dr. Sarah', 'Chen', 'sarah.chen@mindfolk.com', 'therapist'),
        ('t0000000-0000-0000-0000-000000000002', 'Dr. Emma', 'Wilson', 'emma.wilson@mindfolk.com', 'therapist'),
        ('a0000000-0000-0000-0000-000000000001', 'Test', 'Admin', 'test-admin@mindfolk.com', 'admin')
      ON CONFLICT (id) DO UPDATE SET 
        first_name = EXCLUDED.first_name, 
        last_name = EXCLUDED.last_name, 
        email = EXCLUDED.email, 
        role = EXCLUDED.role;

      -- Create Comprehensive Appointments (matching mock-bookings.tsx timing)
      INSERT INTO public.appointments (id, client_id, therapist_id, appointment_time, session_type, status, duration_minutes, notes) VALUES 
        ('ap000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 't0000000-0000-0000-0000-000000000001', 
         now() + interval '8 minutes', 'Chemistry Call', 'confirmed', 15, 'First time client - anxiety and stress management'),
        ('ap000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 't0000000-0000-0000-0000-000000000001', 
         now() + interval '45 minutes', 'Therapy Session', 'confirmed', 60, 'Regular session - working on communication skills'),
        ('ap000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000003', 't0000000-0000-0000-0000-000000000001', 
         now() + interval '2 hours', 'Therapy Session', 'pending', 60, 'Follow-up session - stress management techniques'),
        ('ap000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000004', 't0000000-0000-0000-0000-000000000002', 
         now() + interval '24 hours', 'Therapy Session', 'confirmed', 60, 'Long-term client - depression management progress review'),
        ('ap000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000001', 't0000000-0000-0000-0000-000000000001', 
         now() + interval '3 days', 'Therapy Session', 'scheduled', 60, 'Follow-up chemistry call'),
        ('ap000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000002', 't0000000-0000-0000-0000-000000000002', 
         now() + interval '1 week', 'Chemistry Call', 'scheduled', 15, 'Initial consultation');

      -- Create Favorites
      INSERT INTO public.favorites (user_id, therapist_id) VALUES 
        ('c0000000-0000-0000-0000-000000000001', 't0000000-0000-0000-0000-000000000001'),
        ('c0000000-0000-0000-0000-000000000002', 't0000000-0000-0000-0000-000000000001'),
        ('c0000000-0000-0000-0000-000000000004', 't0000000-0000-0000-0000-000000000002')
      ON CONFLICT (user_id, therapist_id) DO NOTHING;

      -- Create Test Notifications
      INSERT INTO public.notifications (user_id, type, title, message, is_read) VALUES 
        ('c0000000-0000-0000-0000-000000000001', 'appointment_reminder', 'Session Starting Soon', 'Your chemistry call with Dr. Sarah Chen starts in 10 minutes.', false),
        ('c0000000-0000-0000-0000-000000000002', 'appointment_confirmation', 'Session Confirmed', 'Your therapy session with Dr. Sarah Chen is confirmed for today.', false),
        ('t0000000-0000-0000-0000-000000000001', 'new_booking', 'New Client Booking', 'Jessica Davis has booked a chemistry call with you.', true),
        ('c0000000-0000-0000-0000-000000000003', 'appointment_pending', 'Session Pending Approval', 'Your session request is pending therapist approval.', false);

      -- Create Test Support Tickets
      INSERT INTO public.support_tickets (user_id, subject, message, priority, status) VALUES 
        ('c0000000-0000-0000-0000-000000000001', 'Cannot join video session', 'I am having trouble joining my video session. The join button is not working.', 'high', 'open'),
        ('c0000000-0000-0000-0000-000000000002', 'Billing question', 'I have a question about my last invoice. Can someone help?', 'medium', 'in_progress'),
        ('t0000000-0000-0000-0000-000000000001', 'Profile update request', 'I need to update my availability schedule but cannot find the option.', 'low', 'resolved');

      -- Create Test Moderation Queue Items
      INSERT INTO public.moderation_queue (content_type, content_id, reported_by, reason, status, priority) VALUES 
        ('therapist_profile', 't0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'Inappropriate profile content detected', 'pending', 'medium'),
        ('session_notes', 'ap000000-0000-0000-0000-000000000001', null, 'Auto-flagged: violence keywords', 'pending', 'high'),
        ('profile_bio', 't0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', 'Spam content reported', 'resolved', 'low');
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
