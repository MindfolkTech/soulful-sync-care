import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ProfileStrengthIndicator } from './ProfileStrengthIndicator';
import { ContextualOnboarding } from './ContextualOnboarding';

interface OnboardingContextType {
  profileStrength: number;
  onboardingActive: boolean;
  setOnboardingActive: (active: boolean) => void;
  shouldShowOnboarding: boolean;
  refreshProfileStrength: () => void;
}

const OnboardingContext = createContext<OnboardingContextType>({
  profileStrength: 40,
  onboardingActive: false,
  setOnboardingActive: () => {},
  shouldShowOnboarding: false,
  refreshProfileStrength: () => {}
});

export const useOnboardingContext = () => useContext(OnboardingContext);

interface TherapistWorkspaceProviderProps {
  children: React.ReactNode;
}

/**
 * TherapistWorkspaceProvider - Wraps all therapist workspace pages
 *
 * Provides:
 * - ProfileStrengthIndicator (floating in all workspace pages)
 * - ContextualOnboarding system
 * - Auto-start logic for incomplete profiles
 * - Shared state management across workspace
 *
 * Integration points:
 * - All /t/* routes should be wrapped with this provider
 * - Manages onboarding state globally
 * - Triggers onboarding based on profile strength and user behavior
 */
export function TherapistWorkspaceProvider({ children }: TherapistWorkspaceProviderProps) {
  const { user } = useAuth();
  const location = useLocation();

  const [profileStrength, setProfileStrength] = useState(40);
  const [onboardingActive, setOnboardingActive] = useState(false);
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Calculate profile strength
  const calculateProfileStrength = async () => {
    if (!user?.id) return 40;

    try {
      const { data: profile, error } = await supabase
        .from('therapist_profiles')
        .select(`
          name,
          bio,
          specialties,
          modalities,
          communication_style,
          session_format,
          years_experience,
          session_rates,
          profile_photo_url,
          intro_video_url,
          onboarding_state
        `)
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile for strength calculation:', error);
        return 40;
      }

      if (!profile) return 40;

      let strength = 0;

      // Quick Start completion (40%)
      if (profile.communication_style && profile.session_format &&
          profile.specialties?.length >= 3 && profile.modalities?.length >= 1) {
        strength += 40;
      }

      // Basic info (15%)
      if (profile.name && profile.bio && profile.years_experience) {
        strength += 15;
      }

      // Session rates (15%)
      if (profile.session_rates) {
        strength += 15;
      }

      // Media (20%)
      let mediaScore = 0;
      if (profile.profile_photo_url) mediaScore += 10;
      if (profile.intro_video_url) mediaScore += 10;
      strength += mediaScore;

      // Extra credit (10%) - can exceed 100%
      if (profile.specialties?.length > 5) strength += 5;
      if (profile.modalities?.length > 3) strength += 5;

      return Math.min(strength, 100);
    } catch (err) {
      console.error('Error calculating profile strength:', err);
      return 40;
    }
  };

  const refreshProfileStrength = async () => {
    const newStrength = await calculateProfileStrength();
    setProfileStrength(newStrength);
  };

  // Check if user has seen onboarding before
  const checkOnboardingHistory = async () => {
    if (!user?.id) return;

    try {
      const { data: profile } = await supabase
        .from('therapist_profiles')
        .select('onboarding_state')
        .eq('user_id', user.id)
        .single();

      const onboardingState = profile?.onboarding_state as any;
      const hasStarted = onboardingState?.contextual_onboarding_started || false;
      setHasSeenOnboarding(hasStarted);
    } catch (err) {
      console.error('Error checking onboarding history:', err);
    }
  };

  // Auto-start logic
  useEffect(() => {
    const determineOnboardingState = async () => {
      if (!user?.id) return;

      setIsLoading(true);

      await Promise.all([
        refreshProfileStrength(),
        checkOnboardingHistory()
      ]);

      setIsLoading(false);
    };

    determineOnboardingState();
  }, [user?.id]);

  // Smart triggering logic
  useEffect(() => {
    if (isLoading) return;

    const shouldTrigger =
      profileStrength < 70 && // Profile not complete
      !hasSeenOnboarding && // First-time experience
      !onboardingActive && // Not already running
      location.pathname.startsWith('/t/') && // On workspace page
      !['/t/onboarding', '/t/setup'].some(path => location.pathname.startsWith(path)); // Not on legacy onboarding

    setShouldShowOnboarding(shouldTrigger);

    // Auto-start after a brief delay for better UX
    if (shouldTrigger) {
      const timer = setTimeout(() => {
        setOnboardingActive(true);
      }, 2000); // 2 second delay to let page load

      return () => clearTimeout(timer);
    }
  }, [profileStrength, hasSeenOnboarding, onboardingActive, location.pathname, isLoading]);

  const contextValue = {
    profileStrength,
    onboardingActive,
    setOnboardingActive,
    shouldShowOnboarding,
    refreshProfileStrength
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}

      {/* Profile Strength Indicator - floating on all workspace pages */}
      {user?.id && location.pathname.startsWith('/t/') && (
        <ProfileStrengthIndicator
          userId={user.id}
          className="fixed top-4 right-4 z-40"
          showLabel={true}
          onImprove={() => {
            if (!onboardingActive) {
              setOnboardingActive(true);
            }
          }}
        />
      )}

      {/* Contextual Onboarding System */}
      {user?.id && (onboardingActive || shouldShowOnboarding) && (
        <ContextualOnboarding
          autoStart={shouldShowOnboarding}
          minimumProfileStrength={70}
          onComplete={() => {
            setOnboardingActive(false);
            refreshProfileStrength();
            console.log('Contextual onboarding completed!');
          }}
        />
      )}
    </OnboardingContext.Provider>
  );
}