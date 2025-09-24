import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

type ViewRole = 'admin' | 'therapist' | 'client';

interface RoleSwitchingContextType {
  currentViewRole: ViewRole;
  actualUserRole: string | null;
  isAdmin: boolean;
  switchToRole: (role: ViewRole) => void;
  isRoleSwitching: boolean;
}

const RoleSwitchingContext = createContext<RoleSwitchingContextType>({
  currentViewRole: 'admin',
  actualUserRole: null,
  isAdmin: false,
  switchToRole: () => {},
  isRoleSwitching: false,
});

interface RoleSwitchingProviderProps {
  children: ReactNode;
}

/**
 * RoleSwitchingProvider - Manages admin role switching functionality
 * 
 * Allows admins to view the application from different role perspectives
 * without affecting audit trails or user data. Perfect for testing UI
 * changes and experiencing user flows.
 * 
 * Features:
 * - Admin can switch to view as therapist or client
 * - Maintains actual admin privileges for security
 * - No audit trail for UI testing purposes
 * - Persistent view mode across navigation
 */
export function RoleSwitchingProvider({ children }: RoleSwitchingProviderProps) {
  const { user } = useAuth();
  const [currentViewRole, setCurrentViewRole] = useState<ViewRole>('admin');
  const [actualUserRole, setActualUserRole] = useState<string | null>(null);
  const [isRoleSwitching, setIsRoleSwitching] = useState(false);

  // Fetch the user's actual role
  useEffect(() => {
    const fetchActualRole = async () => {
      if (!user) {
        setActualUserRole(null);
        setCurrentViewRole('admin');
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('RoleSwitching: Error fetching user role:', error);
          setActualUserRole('client');
        } else {
          const role = profile?.role || 'client';
          setActualUserRole(role);
          
          // If user is not admin, they can only view as their actual role
          if (role !== 'admin') {
            setCurrentViewRole(role as ViewRole);
          }
        }
      } catch (error) {
        console.error('RoleSwitching: Exception while fetching user role:', error);
        setActualUserRole('client');
      }
    };

    fetchActualRole();
  }, [user]);

  // Load saved view role from localStorage for admins
  useEffect(() => {
    if (actualUserRole === 'admin') {
      const savedViewRole = localStorage.getItem('admin_view_role') as ViewRole;
      if (savedViewRole && ['admin', 'therapist', 'client'].includes(savedViewRole)) {
        setCurrentViewRole(savedViewRole);
      }
    }
  }, [actualUserRole]);

  const switchToRole = (role: ViewRole) => {
    // Only admins can switch roles
    if (actualUserRole !== 'admin') {
      console.warn('RoleSwitching: Only admins can switch roles');
      return;
    }

    setIsRoleSwitching(true);
    setCurrentViewRole(role);
    
    // Save preference to localStorage
    localStorage.setItem('admin_view_role', role);
    
    // Brief delay to show switching state
    setTimeout(() => {
      setIsRoleSwitching(false);
    }, 300);
  };

  const isAdmin = actualUserRole === 'admin';

  return (
    <RoleSwitchingContext.Provider
      value={{
        currentViewRole,
        actualUserRole,
        isAdmin,
        switchToRole,
        isRoleSwitching,
      }}
    >
      {children}
    </RoleSwitchingContext.Provider>
  );
}

export const useRoleSwitching = () => {
  const context = useContext(RoleSwitchingContext);
  if (!context) {
    throw new Error('useRoleSwitching must be used within a RoleSwitchingProvider');
  }
  return context;
};
