import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type TherapistProfileData = {
  // Basic info
  name: string;
  tagline: string;
  bio: string;
  avatar_url?: string;

  // Professional details
  specialties: string[];
  modalities: string[];
  languages: string[];
  experience_years?: number;

  // Preferences and tags
  personality_tags: string[];
  session_focus: string[];

  // Rates and availability
  session_rates: Record<string, any>;
  availability: Record<string, any>;

  // Location
  location_city?: string;
  location_state?: string;
  location_country?: string;
  timezone?: string;

  // Session formats
  online_sessions: boolean;
  in_person_sessions: boolean;

  // Policies
  cancellation_policy?: string;
  rescheduling_policy?: string;
  lateness_policy?: string;
  communication_policy?: string;

  // Video
  video_url?: string;

  // Setup status
  setup_completed: boolean;
  setup_steps: Record<string, boolean>;
};

export const saveTherapistProfile = async (userId: string, profileData: TherapistProfileData) => {
  try {
    // First, check if therapist application exists
    const { data: existingApplication, error: appError } = await supabase
      .from('therapist_applications')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (appError) {
      throw new Error(`Failed to check therapist application: ${appError.message}`);
    }

    if (!existingApplication) {
      throw new Error('Therapist application not found. Please complete the application process first.');
    }

    // Check if profile already exists
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from('therapist_profiles')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (profileCheckError) {
      throw new Error(`Failed to check existing profile: ${profileCheckError.message}`);
    }

    const profilePayload = {
      user_id: userId,
      application_id: existingApplication.id,
      name: profileData.name,
      tagline: profileData.tagline,
      bio: profileData.bio,
      avatar_url: profileData.avatar_url,
      specialties: profileData.specialties,
      modalities: profileData.modalities,
      languages: profileData.languages,
      experience_years: profileData.experience_years,
      personality_tags: profileData.personality_tags,
      session_focus: profileData.session_focus,
      session_rates: profileData.session_rates,
      availability: profileData.availability,
      location_city: profileData.location_city,
      location_state: profileData.location_state,
      location_country: profileData.location_country,
      timezone: profileData.timezone,
      online_sessions: profileData.online_sessions,
      in_person_sessions: profileData.in_person_sessions,
      setup_completed: profileData.setup_completed,
      setup_steps: profileData.setup_steps,
      // Add the new video_url field
      video_url: profileData.video_url,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (existingProfile) {
      // Update existing profile
      const { data, error } = await supabase
        .from('therapist_profiles')
        .update(profilePayload)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Create new profile
      const { data, error } = await supabase
        .from('therapist_profiles')
        .insert({
          ...profilePayload,
          license_number: 'PENDING_SETUP', // Required field
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    // Clear localStorage after successful save
    localStorage.removeItem('therapistOnboarding');

    return result;
  } catch (error) {
    console.error('Error saving therapist profile:', error);
    throw error;
  }
};

export const getTherapistProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('therapist_profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch therapist profile: ${error.message}`);
  }

  return data;
};
