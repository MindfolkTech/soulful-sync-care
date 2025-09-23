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

    // Collect all user data
    const userData: Record<string, any> = {
      export_date: new Date().toISOString(),
      user_id: user.id,
      user_email: user.email,
      data: {},
    }

    // Fetch profile data
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
    if (profile) {
      userData.data.profile = profile
    }

    // Fetch therapist profile if exists
    const { data: therapistProfile } = await supabaseClient
      .from('therapist_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
    
    if (therapistProfile) {
      userData.data.therapist_profile = therapistProfile
    }

    // Fetch therapist application if exists
    const { data: therapistApplication } = await supabaseClient
      .from('therapist_applications')
      .select('*')
      .eq('user_id', user.id)
      .single()
    
    if (therapistApplication) {
      userData.data.therapist_application = therapistApplication
    }

    // Fetch client assessment if exists
    const { data: clientAssessment } = await supabaseClient
      .from('client_assessments')
      .select('*')
      .eq('user_id', user.id)
      .single()
    
    if (clientAssessment) {
      userData.data.client_assessment = clientAssessment
    }

    // Fetch appointments (as client)
    const { data: clientAppointments } = await supabaseClient
      .from('appointments')
      .select('*')
      .eq('client_id', user.id)
    
    if (clientAppointments && clientAppointments.length > 0) {
      userData.data.appointments_as_client = clientAppointments
    }

    // Fetch appointments (as therapist)
    const { data: therapistAppointments } = await supabaseClient
      .from('appointments')
      .select('*')
      .eq('therapist_id', therapistProfile?.user_id)
    
    if (therapistAppointments && therapistAppointments.length > 0) {
      userData.data.appointments_as_therapist = therapistAppointments
    }

    // Fetch session earnings (as therapist)
    const { data: sessionEarnings } = await supabaseClient
      .from('session_earnings')
      .select('*')
      .eq('therapist_id', therapistProfile?.user_id)
    
    if (sessionEarnings && sessionEarnings.length > 0) {
      userData.data.session_earnings = sessionEarnings
    }

    // Fetch session notes (as client)
    const { data: sessionNotesAsClient } = await supabaseClient
      .from('client_session_notes')
      .select('*')
      .eq('client_id', user.id)
    
    if (sessionNotesAsClient && sessionNotesAsClient.length > 0) {
      userData.data.session_notes_as_client = sessionNotesAsClient
    }

    // Fetch session notes (as therapist)
    const { data: sessionNotesAsTherapist } = await supabaseClient
      .from('client_session_notes')
      .select('*')
      .eq('therapist_id', therapistProfile?.user_id)
    
    if (sessionNotesAsTherapist && sessionNotesAsTherapist.length > 0) {
      userData.data.session_notes_as_therapist = sessionNotesAsTherapist
    }

    // Fetch favorites
    const { data: favorites } = await supabaseClient
      .from('favorites')
      .select('*')
      .eq('user_id', user.id)
    
    if (favorites && favorites.length > 0) {
      userData.data.favorites = favorites
    }

    // Fetch support tickets
    const { data: supportTickets } = await supabaseClient
      .from('support_tickets')
      .select('*')
      .eq('user_id', user.id)
    
    if (supportTickets && supportTickets.length > 0) {
      userData.data.support_tickets = supportTickets
    }

    // Fetch notifications
    const { data: notifications } = await supabaseClient
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
    
    if (notifications && notifications.length > 0) {
      userData.data.notifications = notifications
    }

    // Fetch testimonials (given)
    const { data: testimonialsGiven } = await supabaseClient
      .from('client_testimonials')
      .select('*')
      .eq('client_id', user.id)
    
    if (testimonialsGiven && testimonialsGiven.length > 0) {
      userData.data.testimonials_given = testimonialsGiven
    }

    // Fetch testimonials (received as therapist)
    const { data: testimonialsReceived } = await supabaseClient
      .from('client_testimonials')
      .select('*')
      .eq('therapist_id', therapistProfile?.user_id)
    
    if (testimonialsReceived && testimonialsReceived.length > 0) {
      userData.data.testimonials_received = testimonialsReceived
    }

    // Log the export in audit trail
    await supabaseClient.from('audit_trail').insert({
      user_id: user.id,
      action: 'GDPR_EXPORT',
      table_name: 'multiple',
      record_id: user.id,
      new_data: { exported_at: new Date().toISOString() },
    })

    return new Response(
      JSON.stringify(userData),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="mindfolk-data-export-${user.id}-${Date.now()}.json"`,
        },
      }
    )
  } catch (error) {
    console.error('GDPR Export Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
