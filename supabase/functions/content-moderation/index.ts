import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Prohibited keywords and phrases for content moderation
const PROHIBITED_PATTERNS = {
  violence: [
    'kill', 'murder', 'assault', 'attack', 'hurt', 'harm', 'violent',
    'weapon', 'gun', 'knife', 'bomb', 'threat'
  ],
  self_harm: [
    'suicide', 'self harm', 'self-harm', 'cut myself', 'kill myself',
    'end my life', 'hurt myself', 'self injury', 'self-injury'
  ],
  inappropriate: [
    'drug', 'drugs', 'cocaine', 'heroin', 'meth', 'illegal',
    'porn', 'pornography', 'sex work', 'escort',
    'hate speech', 'racist', 'racism', 'discriminate'
  ],
  spam: [
    'buy now', 'click here', 'limited offer', 'act now',
    'make money', 'work from home', 'bitcoin', 'crypto investment'
  ]
}

// Helper function to check content against prohibited patterns
function checkContent(content: string): { flagged: boolean; reasons: string[] } {
  const lowerContent = content.toLowerCase()
  const reasons: string[] = []
  let flagged = false

  for (const [category, patterns] of Object.entries(PROHIBITED_PATTERNS)) {
    for (const pattern of patterns) {
      if (lowerContent.includes(pattern.toLowerCase())) {
        flagged = true
        if (!reasons.includes(category)) {
          reasons.push(category)
        }
      }
    }
  }

  return { flagged, reasons }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get authenticated user if available
    const authHeader = req.headers.get('Authorization')
    let userId = null
    
    if (authHeader) {
      const supabaseAuthClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        {
          global: {
            headers: { Authorization: authHeader },
          },
        }
      )
      
      const { data: { user } } = await supabaseAuthClient.auth.getUser()
      userId = user?.id
    }

    // Parse request body
    const { content, content_type, content_id } = await req.json()

    if (!content || !content_type || !content_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: content, content_type, content_id' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Check content for prohibited patterns
    const { flagged, reasons } = checkContent(content)

    if (flagged) {
      // Add to moderation queue
      const { data: moderationItem, error: insertError } = await supabaseClient
        .from('moderation_queue')
        .insert({
          content_type,
          content_id,
          reported_by: userId || null,
          reason: `Auto-flagged: ${reasons.join(', ')}`,
          status: 'pending',
        })
        .select()
        .single()

      if (insertError) {
        console.error('Error adding to moderation queue:', insertError)
        throw insertError
      }

      // Log in audit trail if user is authenticated
      if (userId) {
        await supabaseClient.from('audit_trail').insert({
          user_id: userId,
          action: 'CONTENT_FLAGGED',
          table_name: 'moderation_queue',
          record_id: moderationItem.id,
          new_data: { 
            content_type,
            content_id,
            reasons,
            flagged_at: new Date().toISOString()
          },
        })
      }

      return new Response(
        JSON.stringify({ 
          flagged: true,
          reasons,
          moderation_id: moderationItem.id,
          message: 'Content has been flagged for review'
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Content is clean
    return new Response(
      JSON.stringify({ 
        flagged: false,
        message: 'Content passed moderation'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Content Moderation Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
