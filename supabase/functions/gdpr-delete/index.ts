import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with user context
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser()

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Parse request body for confirmation
    const { confirm } = await req.json()
    
    if (confirm !== true) {
      return new Response(
        JSON.stringify({ error: 'Deletion must be confirmed' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Log the deletion request in audit trail first
    await supabaseClient.from('audit_trail').insert({
      user_id: user.id,
      action: 'GDPR_DELETE_REQUEST',
      table_name: 'multiple',
      record_id: user.id,
      old_data: { user_email: user.email },
      new_data: { deletion_requested_at: new Date().toISOString() },
    })

    // Anonymize profile data
    const anonymizedData = {
      email: `deleted_${user.id.substring(0, 8)}@anonymized.local`,
      first_name: 'Deleted',
      last_name: 'User',
      phone: null,
      updated_at: new Date().toISOString(),
    }

    await supabaseClient
      .from('profiles')
      .update(anonymizedData)
      .eq('id', user.id)

    // Anonymize therapist profile if exists
    const { data: therapistProfile } = await supabaseClient
      .from('therapist_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (therapistProfile) {
      await supabaseClient
        .from('therapist_profiles')
        .update({
          name: 'Deleted Therapist',
          tagline: null,
          bio: null,
          avatar_url: null,
          license_number: 'DELETED',
          is_active: false,
          accepts_new_clients: false,
          verified: false,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    }

    // Anonymize therapist application if exists
    const { data: therapistApp } = await supabaseClient
      .from('therapist_applications')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (therapistApp) {
      await supabaseClient
        .from('therapist_applications')
        .update({
          name: 'Deleted Applicant',
          email: `deleted_${user.id.substring(0, 8)}@anonymized.local`,
          license_number: 'DELETED',
          experience: null,
          documents: {},
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    }

    // Anonymize client assessment if exists
    const { data: clientAssessment } = await supabaseClient
      .from('client_assessments')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (clientAssessment) {
      await supabaseClient
        .from('client_assessments')
        .update({
          name: 'Deleted Client',
          age_group: null,
          location: null,
          demographic_info: {},
          additional_notes: null,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
    }

    // Delete sensitive session notes content but keep records for statistics
    await supabaseClient
      .from('client_session_notes')
      .update({
        session_notes: '[Content deleted per user request]',
        client_progress: '[Content deleted per user request]',
        next_session_goals: '[Content deleted per user request]',
        private_notes: '[Content deleted per user request]',
        updated_at: new Date().toISOString(),
      })
      .or(`client_id.eq.${user.id},therapist_id.eq.${user.id}`)

    // Delete favorites
    await supabaseClient
      .from('favorites')
      .delete()
      .eq('user_id', user.id)

    // Anonymize support tickets
    await supabaseClient
      .from('support_tickets')
      .update({
        subject: '[Deleted]',
        description: '[Content deleted per user request]',
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)

    // Delete notifications
    await supabaseClient
      .from('notifications')
      .delete()
      .eq('user_id', user.id)

    // Anonymize testimonials
    await supabaseClient
      .from('client_testimonials')
      .update({
        testimonial_text: '[Content deleted per user request]',
        is_public: false,
        updated_at: new Date().toISOString(),
      })
      .eq('client_id', user.id)

    // Log the successful deletion in audit trail
    await supabaseClient.from('audit_trail').insert({
      user_id: user.id,
      action: 'GDPR_DELETE_COMPLETED',
      table_name: 'multiple',
      record_id: user.id,
      new_data: { 
        deletion_completed_at: new Date().toISOString(),
        tables_affected: [
          'profiles',
          'therapist_profiles',
          'therapist_applications',
          'client_assessments',
          'client_session_notes',
          'favorites',
          'support_tickets',
          'notifications',
          'client_testimonials'
        ]
      },
    })

    // Note: We do NOT delete the auth.users record or appointments 
    // to maintain system integrity and financial records

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Your personal data has been anonymized. Your account will be deactivated.',
        deletion_id: `GDPR_DELETE_${user.id}_${Date.now()}`
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('GDPR Delete Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
