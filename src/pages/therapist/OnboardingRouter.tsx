import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import TherapistQuickStart from './QuickStart';

interface TherapistProfile {
  setup_completed?: boolean;
}

/**
 * Router component for therapist onboarding - always uses V2 QuickStart
 * V1 legacy onboarding has been archived
 */
export default function OnboardingRouter() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [therapistProfile, setTherapistProfile] = useState<TherapistProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTherapistProfile() {
      if (!user) return;

      try {
        const { data: profile } = await supabase
          .from('therapist_profiles')
          .select('setup_completed, profile_strength')
          .eq('user_id', user.id)
          .single();

        setTherapistProfile(profile);

        // If setup is already completed, redirect to dashboard
        if (profile?.setup_completed) {
          navigate('/t/dashboard');
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

  // Always use V2 QuickStart onboarding (legacy V1 archived)
  return <TherapistQuickStart />;
}