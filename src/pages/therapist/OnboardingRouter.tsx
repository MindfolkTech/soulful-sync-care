import React, { useEffect, useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { shouldUseV2Onboarding } from '@/utils/featureFlags';
import TherapistQuickStart from './QuickStart';

// Import the existing onboarding component
import OnboardingWelcome from '../therapist/onboarding/Welcome';

interface TherapistProfile {
  feature_flags?: Record<string, boolean>;
  setup_completed?: boolean;
}

/**
 * Router component that decides between V1 (legacy) and V2 (QuickStart) onboarding
 * based on feature flags and therapist profile status
 */
export default function OnboardingRouter() {
  const user = useUser();
  const navigate = useNavigate();
  const [therapistProfile, setTherapistProfile] = useState<TherapistProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTherapistProfile() {
      if (!user) return;

      try {
        const { data: profile } = await supabase
          .from('therapist_profiles')
          .select('feature_flags, setup_completed, profile_strength')
          .eq('user_id', user.id)
          .single();

        setTherapistProfile(profile);

        // If setup is already completed, redirect to workspace
        if (profile?.setup_completed) {
          navigate('/t/workspace');
          return;
        }
      } catch (error) {
        console.error('Error loading therapist profile:', error);
      } finally {
        setLoading(false);
      }
    }

    loadTherapistProfile();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--primary))] mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Check if V2 onboarding should be used
  const useV2 = shouldUseV2Onboarding(therapistProfile);

  if (useV2) {
    // Use new V2 QuickStart onboarding
    return <TherapistQuickStart />;
  } else {
    // Use legacy V1 onboarding
    return <OnboardingWelcome />;
  }
}