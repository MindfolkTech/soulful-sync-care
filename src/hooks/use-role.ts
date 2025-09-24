import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

type UserRole = 'client' | 'therapist' | 'admin' | null;

/**
 * useRole - Hook to get the current user's role
 * 
 * Provides the user's role and utility functions for role checking.
 * Automatically fetches and caches the user's role from the database.
 * 
 * @returns {Object} Role information and utility functions
 * @returns {UserRole} role - The user's current role
 * @returns {boolean} loading - Whether the role is being fetched
 * @returns {boolean} isAdmin - Whether the user is an admin
 * @returns {boolean} isTherapist - Whether the user is a therapist
 * @returns {boolean} isClient - Whether the user is a client
 * @returns {Function} hasRole - Function to check if user has a specific role
 * @returns {Function} canAccess - Function to check if user can access a role-restricted feature
 */
export function useRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('useRole: Error fetching user role:', error);
          setRole('client'); // Default to client on error
        } else {
          setRole(profile?.role || 'client');
        }
      } catch (error) {
        console.error('useRole: Exception while fetching user role:', error);
        setRole('client');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  // Utility functions
  const isAdmin = role === 'admin';
  const isTherapist = role === 'therapist';
  const isClient = role === 'client';

  /**
   * Check if user has a specific role
   * @param targetRole - The role to check for
   * @returns boolean - Whether the user has the specified role
   */
  const hasRole = (targetRole: UserRole): boolean => {
    return role === targetRole;
  };

  /**
   * Check if user can access a feature that requires a specific role
   * Admins can access everything, others need exact role match
   * @param requiredRole - The role required to access the feature
   * @returns boolean - Whether the user can access the feature
   */
  const canAccess = (requiredRole: UserRole): boolean => {
    if (!role || !requiredRole) return false;
    
    // Admins can access everything
    if (role === 'admin') return true;
    
    // Others need exact role match
    return role === requiredRole;
  };

  return {
    role,
    loading,
    isAdmin,
    isTherapist,
    isClient,
    hasRole,
    canAccess,
  };
}
