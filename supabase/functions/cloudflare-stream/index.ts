// Cloudflare Stream API Edge Function
// Handles video uploads with validation and returns video URLs

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CloudflareStreamResponse {
  uid: string;
  streamId: string;
  readyToStream: boolean;
  status: {
    state: string;
  };
  playback: {
    hls: string;
    dash: string;
  };
  preview: string;
  thumbnail: string;
}

const CLOUDFLARE_ACCOUNT_ID = Deno.env.get('CLOUDFLARE_ACCOUNT_ID')
const CLOUDFLARE_API_TOKEN = Deno.env.get('CLOUDFLARE_API_TOKEN')
const MAX_VIDEO_DURATION_SECONDS = 120 // 2-minute max duration
const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024 // 500MB

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  try {
    // Validate request method
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Get authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Get the token from the header
    const token = authHeader.replace('Bearer ', '')
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    )
    
    // Verify the JWT and get user info
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', details: userError }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Check if the user is a therapist
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
      
    if (profileError || !profile || profile.role !== 'therapist') {
      return new Response(
        JSON.stringify({ error: 'Unauthorized. Only therapists can upload videos.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Get the form data from the request
    const formData = await req.formData()
    const videoFile = formData.get('video')
    
    // Validate the video file
    if (!videoFile || !(videoFile instanceof File)) {
      return new Response(
        JSON.stringify({ error: 'Video file is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Validate file size
    if (videoFile.size > MAX_FILE_SIZE_BYTES) {
      return new Response(
        JSON.stringify({ error: 'Video file is too large. Maximum size is 500MB.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Check if Cloudflare credentials are available
    if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
      return new Response(
        JSON.stringify({ error: 'Cloudflare credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Set up the metadata for the Cloudflare Stream API
    const metadata = {
      userId: user.id,
      maxDurationSeconds: MAX_VIDEO_DURATION_SECONDS,
      requireSignedURLs: false,
      allowedOrigins: ["*"], // In production, restrict to your domain
    }
    
    // Create a unique filename based on user ID and timestamp
    const timestamp = new Date().getTime()
    const filename = `therapist_intro_${user.id}_${timestamp}.mp4`
    
    // Upload the video to Cloudflare Stream
    const cfFormData = new FormData()
    cfFormData.append('file', videoFile, filename)
    cfFormData.append('metadata', JSON.stringify(metadata))
    cfFormData.append('maxDurationSeconds', MAX_VIDEO_DURATION_SECONDS.toString())
    
    const uploadResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
        },
        body: cfFormData,
      }
    )
    
    const uploadResult = await uploadResponse.json()
    
    if (!uploadResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to upload to Cloudflare Stream', details: uploadResult }),
        { status: uploadResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Extract the video URL and thumbnail from the Cloudflare response
    const videoData: CloudflareStreamResponse = uploadResult.result
    
    // Update the therapist profile with the video URL
    const { error: updateError } = await supabaseClient
      .from('therapist_profiles')
      .update({ video_url: videoData.playback.hls })
      .eq('user_id', user.id)
      
    if (updateError) {
      return new Response(
        JSON.stringify({ error: 'Failed to update profile with video URL', details: updateError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Return the video URL and other details
    return new Response(
      JSON.stringify({
        success: true,
        video: {
          url: videoData.playback.hls, // HLS URL for optimal streaming
          streamId: videoData.streamId,
          thumbnail: videoData.thumbnail,
          preview: videoData.preview,
          readyToStream: videoData.readyToStream,
          status: videoData.status.state,
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    // Handle any unexpected errors
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
