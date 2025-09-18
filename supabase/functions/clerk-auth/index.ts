import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, clerk-session-token',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
}

interface ClerkUser {
  id: string
  email_addresses: Array<{ email_address: string }>
  first_name?: string
  last_name?: string
  image_url?: string
  unsafe_metadata?: { intendedRole?: 'client' | 'therapist' | 'admin' }
}

async function verifyClerkToken(token: string): Promise<ClerkUser | null> {
  try {
    const response = await fetch(`https://api.clerk.dev/v1/sessions/${token}`, {
      headers: {
        'Authorization': `Bearer ${Deno.env.get('CLERK_SECRET_KEY')}`,
      },
    })
    
    if (!response.ok) {
      console.error('Clerk token verification failed:', response.status)
      return null
    }
    
    const session = await response.json()
    return session.user as ClerkUser
  } catch (error) {
    console.error('Error verifying Clerk token:', error)
    return null
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get Clerk session token from header
    const clerkToken = req.headers.get('clerk-session-token')
    if (!clerkToken) {
      return new Response(
        JSON.stringify({ error: 'Missing Clerk session token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify Clerk token
    const clerkUser = await verifyClerkToken(clerkToken)
    if (!clerkUser) {
      return new Response(
        JSON.stringify({ error: 'Invalid Clerk session token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client with service role key for secure operations
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const path = url.pathname.split('/').pop()

    switch (path) {
      case 'sync-profile': {
        // Sync or create user profile
        const { data: existingProfile, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('clerk_user_id', clerkUser.id)
          .maybeSingle()

        if (fetchError) {
          console.error('Error fetching profile:', fetchError)
          return new Response(
            JSON.stringify({ error: 'Failed to fetch profile' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        if (existingProfile) {
          // Update existing profile with latest Clerk data
          const { data: updatedProfile, error: updateError } = await supabase
            .from('profiles')
            .update({
              email: clerkUser.email_addresses[0]?.email_address || '',
              first_name: clerkUser.first_name || '',
              last_name: clerkUser.last_name || '',
              avatar_url: clerkUser.image_url || null,
              updated_at: new Date().toISOString(),
            })
            .eq('clerk_user_id', clerkUser.id)
            .select()
            .single()

          if (updateError) {
            console.error('Error updating profile:', updateError)
            return new Response(
              JSON.stringify({ error: 'Failed to update profile' }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          return new Response(
            JSON.stringify({ profile: updatedProfile }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        } else {
          // Create new profile
          const intendedRole = clerkUser.unsafe_metadata?.intendedRole || 'client'
          const newProfile = {
            clerk_user_id: clerkUser.id,
            email: clerkUser.email_addresses[0]?.email_address || '',
            first_name: clerkUser.first_name || '',
            last_name: clerkUser.last_name || '',
            role: intendedRole,
            avatar_url: clerkUser.image_url || null,
            is_verified: false,
          }

          const { data: createdProfile, error: createError } = await supabase
            .from('profiles')
            .insert(newProfile)
            .select()
            .single()

          if (createError) {
            console.error('Error creating profile:', createError)
            return new Response(
              JSON.stringify({ error: 'Failed to create profile' }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          return new Response(
            JSON.stringify({ profile: createdProfile }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
      }

      case 'update-profile': {
        if (req.method !== 'POST') {
          return new Response('Method not allowed', { status: 405, headers: corsHeaders })
        }

        const updates = await req.json()
        
        // Remove sensitive fields that shouldn't be updated directly
        const { id, clerk_user_id, created_at, ...allowedUpdates } = updates

        const { data: updatedProfile, error } = await supabase
          .from('profiles')
          .update({
            ...allowedUpdates,
            updated_at: new Date().toISOString(),
          })
          .eq('clerk_user_id', clerkUser.id)
          .select()
          .single()

        if (error) {
          console.error('Error updating profile:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to update profile' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        return new Response(
          JSON.stringify({ profile: updatedProfile }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Endpoint not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('Unhandled error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})