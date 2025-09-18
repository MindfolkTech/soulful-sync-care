import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface UserProfile {
  id: string;
  user_id: string;
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
  const { isSignedIn, isLoaded, signOut } = useClerkAuth();
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
      // Check if profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('clerk_user_id', user.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching profile:', fetchError);
        toast({
          title: "Error",
          description: "Failed to load user profile",
          variant: "destructive",
        });
        return;
      }

      if (existingProfile) {
        setProfile(existingProfile as UserProfile);
      } else {
        // Create new profile
        const intendedRole = user.unsafeMetadata?.intendedRole as 'client' | 'therapist' | undefined;
        const newProfile = {
          clerk_user_id: user.id,
          email: user.primaryEmailAddress?.emailAddress || '',
          first_name: user.firstName || '',
          last_name: user.lastName || '',
          role: intendedRole || 'client' as const,
          avatar_url: user.imageUrl || null,
          is_verified: false,
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          toast({
            title: "Error",
            description: "Failed to create user profile",
            variant: "destructive",
          });
          return;
        }

        setProfile(createdProfile as UserProfile);
      }
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
    if (!profile) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('clerk_user_id', profile.clerk_user_id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data as UserProfile);
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