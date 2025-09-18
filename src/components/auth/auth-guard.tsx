import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: 'client' | 'therapist' | 'admin';
  redirectTo?: string;
}

export function AuthGuard({ children, requiredRole, redirectTo = "/sign-in" }: AuthGuardProps) {
  const { isSignedIn, isLoaded, loading, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoaded || loading) return;

    if (!isSignedIn) {
      // Save the intended destination and redirect to sign in
      navigate(redirectTo, { 
        state: { from: location.pathname }, 
        replace: true 
      });
      return;
    }

    if (requiredRole && profile?.role !== requiredRole) {
      // Role-based redirect
      const roleRedirects = {
        admin: '/admin/overview',
        therapist: '/t/dashboard',
        client: '/discover',
      };
      
      navigate(roleRedirects[profile?.role || 'client'], { replace: true });
      return;
    }
  }, [isSignedIn, isLoaded, loading, profile, navigate, location.pathname, redirectTo, requiredRole]);

  // Show loading state
  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  // Don't render if not authenticated or wrong role
  if (!isSignedIn || (requiredRole && profile?.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}