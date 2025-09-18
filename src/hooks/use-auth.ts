import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface UserProfile {
  id: string;
  user_id?: string; // Optional since we use clerk_user_id as primary identifier
  clerk_user_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'client' | 'therapist' | 'admin';
  avatar_url?: string;
  is_verified: boolean;
  // Additional fields from Supabase
  created_at?: string;
  updated_at?: string;
  phone?: string;
  location_country?: string;
  location_city?: string;
  timezone?: string;
  gender?: string;
  language_preference?: string;
  date_of_birth?: string;
}

export function useAuth() {
  const { isSignedIn, isLoaded, signOut, getToken } = useClerkAuth();
  const { user } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      syncUserProfile();
    } else if (isLoaded && !isSignedIn) {
      setProfile(null);
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, user]);

  const syncUserProfile = async () => {
    if (!user) return;

    try {
      // Get Clerk session token
      const session = await getToken();
      if (!session) {
        console.error('No Clerk session token available');
        return;
      }

      // Call our secure Edge Function to sync profile
      const response = await fetch(`https://jegunzgsuyylcvberwcz.supabase.co/functions/v1/clerk-auth/sync-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZ3VuemdzdXl5bGN2YmVyd2N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMTQ1MjcsImV4cCI6MjA3Mzc5MDUyN30.RX2gljBrmCEi9ycC281Z6TaSPtVXaUJ7UBFgrThG8f0`,
          'clerk-session-token': session,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error syncing profile:', errorData);
        toast({
          title: "Error",
          description: "Failed to sync user profile",
          variant: "destructive",
        });
        return;
      }

      const { profile } = await response.json();
      setProfile(profile as UserProfile);
    } catch (error) {
      console.error('Profile sync error:', error);
      toast({
        title: "Error",
        description: "Failed to sync user profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile || !user) return;

    try {
      // Get Clerk session token
      const session = await getToken();
      if (!session) {
        console.error('No Clerk session token available');
        return;
      }

      // Call our secure Edge Function to update profile
      const response = await fetch(`https://jegunzgsuyylcvberwcz.supabase.co/functions/v1/clerk-auth/update-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZ3VuemdzdXl5bGN2YmVyd2N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMTQ1MjcsImV4cCI6MjA3Mzc5MDUyN30.RX2gljBrmCEi9ycC281Z6TaSPtVXaUJ7UBFgrThG8f0`,
          'clerk-session-token': session,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating profile:', errorData);
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive",
        });
        return;
      }

      const { profile: updatedProfile } = await response.json();
      setProfile(updatedProfile as UserProfile);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setProfile(null);
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return {
    user,
    profile,
    isSignedIn,
    isLoaded,
    loading,
    signOut: handleSignOut,
    updateProfile,
    syncUserProfile,
  };
}