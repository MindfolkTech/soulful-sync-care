import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  try {
    // Use the service role key to bypass RLS for seeding
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '', 
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Clear existing test data (enhanced cleanup)
    await supabaseAdmin.from('notifications').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseAdmin.from('support_tickets').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseAdmin.from('moderation_queue').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseAdmin.from('audit_trail').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseAdmin.from('appointments').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseAdmin.from('favorites').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseAdmin.from('profiles').delete().like('email', '%@mindfolk.com');

    // Create Enhanced Test Profiles (matching mock-bookings.tsx names)
    await supabaseAdmin.from('profiles').insert([
      {
        id: 'c0000000-0000-0000-0000-000000000001',
        first_name: 'Jessica',
        last_name: 'Davis',
        email: 'jessica.davis@mindfolk.com',
        role: 'client'
      },
      {
        id: 'c0000000-0000-0000-0000-000000000002',
        first_name: 'Michael',
        last_name: 'Smith',
        email: 'michael.smith@mindfolk.com',
        role: 'client'
      },
      {
        id: 'c0000000-0000-0000-0000-000000000003',
        first_name: 'Robert',
        last_name: 'Parker',
        email: 'robert.parker@mindfolk.com',
        role: 'client'
      },
      {
        id: 'c0000000-0000-0000-0000-000000000004',
        first_name: 'Lisa',
        last_name: 'Martinez',
        email: 'lisa.martinez@mindfolk.com',
        role: 'client'
      },
      {
        id: 't0000000-0000-0000-0000-000000000001',
        first_name: 'Dr. Sarah',
        last_name: 'Chen',
        email: 'sarah.chen@mindfolk.com',
        role: 'therapist'
      },
      {
        id: 't0000000-0000-0000-0000-000000000002',
        first_name: 'Dr. Emma',
        last_name: 'Wilson',
        email: 'emma.wilson@mindfolk.com',
        role: 'therapist'
      },
      {
        id: 'a0000000-0000-0000-0000-000000000001',
        first_name: 'Test',
        last_name: 'Admin',
        email: 'test-admin@mindfolk.com',
        role: 'admin'
      }
    ]);

    // Create Enhanced Appointments (matching mock-bookings.tsx timing)
    const now = new Date();
    await supabaseAdmin.from('appointments').insert([
      {
        id: 'ap000000-0000-0000-0000-000000000001',
        client_id: 'c0000000-0000-0000-0000-000000000001',
        therapist_id: 't0000000-0000-0000-0000-000000000001',
        appointment_time: new Date(now.getTime() + 8 * 60 * 1000).toISOString(), // 8 minutes from now
        session_type: 'Chemistry Call',
        status: 'confirmed',
        duration_minutes: 15,
        notes: 'First time client - anxiety and stress management'
      },
      {
        id: 'ap000000-0000-0000-0000-000000000002',
        client_id: 'c0000000-0000-0000-0000-000000000002',
        therapist_id: 't0000000-0000-0000-0000-000000000001',
        appointment_time: new Date(now.getTime() + 45 * 60 * 1000).toISOString(), // 45 minutes from now
        session_type: 'Therapy Session',
        status: 'confirmed',
        duration_minutes: 60,
        notes: 'Regular session - working on communication skills'
      },
      {
        id: 'ap000000-0000-0000-0000-000000000003',
        client_id: 'c0000000-0000-0000-0000-000000000003',
        therapist_id: 't0000000-0000-0000-0000-000000000001',
        appointment_time: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
        session_type: 'Therapy Session',
        status: 'pending',
        duration_minutes: 60,
        notes: 'Follow-up session - stress management techniques'
      },
      {
        id: 'ap000000-0000-0000-0000-000000000004',
        client_id: 'c0000000-0000-0000-0000-000000000004',
        therapist_id: 't0000000-0000-0000-0000-000000000002',
        appointment_time: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
        session_type: 'Therapy Session',
        status: 'confirmed',
        duration_minutes: 60,
        notes: 'Long-term client - depression management progress review'
      }
    ]);

    // Create Favorites
    await supabaseAdmin.from('favorites').insert([
      {
        user_id: 'c0000000-0000-0000-0000-000000000001',
        therapist_id: 't0000000-0000-0000-0000-000000000001'
      },
      {
        user_id: 'c0000000-0000-0000-0000-000000000002',
        therapist_id: 't0000000-0000-0000-0000-000000000001'
      },
      {
        user_id: 'c0000000-0000-0000-0000-000000000004',
        therapist_id: 't0000000-0000-0000-0000-000000000002'
      }
    ]);

    // Create Test Notifications
    await supabaseAdmin.from('notifications').insert([
      {
        user_id: 'c0000000-0000-0000-0000-000000000001',
        type: 'appointment_reminder',
        title: 'Session Starting Soon',
        message: 'Your chemistry call with Dr. Sarah Chen starts in 10 minutes.',
        is_read: false
      },
      {
        user_id: 'c0000000-0000-0000-0000-000000000002',
        type: 'appointment_confirmation',
        title: 'Session Confirmed',
        message: 'Your therapy session with Dr. Sarah Chen is confirmed for today.',
        is_read: false
      },
      {
        user_id: 't0000000-0000-0000-0000-000000000001',
        type: 'new_booking',
        title: 'New Client Booking',
        message: 'Jessica Davis has booked a chemistry call with you.',
        is_read: true
      }
    ]);

    // Create Test Support Tickets
    await supabaseAdmin.from('support_tickets').insert([
      {
        user_id: 'c0000000-0000-0000-0000-000000000001',
        subject: 'Cannot join video session',
        message: 'I am having trouble joining my video session. The join button is not working.',
        priority: 'high',
        status: 'open'
      },
      {
        user_id: 'c0000000-0000-0000-0000-000000000002',
        subject: 'Billing question',
        message: 'I have a question about my last invoice. Can someone help?',
        priority: 'medium',
        status: 'in_progress'
      }
    ]);

    // Create Test Moderation Queue Items
    await supabaseAdmin.from('moderation_queue').insert([
      {
        content_type: 'therapist_profile',
        content_id: 't0000000-0000-0000-0000-000000000002',
        reported_by: 'c0000000-0000-0000-0000-000000000001',
        reason: 'Inappropriate profile content detected',
        status: 'pending',
        priority: 'medium'
      },
      {
        content_type: 'session_notes',
        content_id: 'ap000000-0000-0000-0000-000000000001',
        reported_by: null,
        reason: 'Auto-flagged: violence keywords',
        status: 'pending',
        priority: 'high'
      }
    ]);

    return new Response(JSON.stringify({
      message: 'Enhanced test data seeded successfully!',
      data: {
        profiles: 7,
        appointments: 4,
        notifications: 3,
        support_tickets: 2,
        moderation_queue: 2,
        favorites: 3
      }
    }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
});
