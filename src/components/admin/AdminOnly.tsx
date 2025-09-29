import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface AdminOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * AdminOnly - Component that only renders children if user is admin
 * 
 * Uses the database is_admin() function to check admin status.
 * Provides a clean way to conditionally show admin-only content.
 * 
 * @param children - Content to show if user is admin
 * @param fallback - Optional content to show if user is not admin
 */
export function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('is_admin');
        
        if (error) {
          console.error('AdminOnly: Error checking admin status:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data || false);
        }
      } catch (error) {
        console.error('AdminOnly: Exception checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  if (loading) {
    return null; // Or a loading spinner if preferred
  }

  return isAdmin ? <>{children}</> : <>{fallback}</>;
}
