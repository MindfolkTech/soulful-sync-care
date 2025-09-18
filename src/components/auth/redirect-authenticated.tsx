import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

interface RedirectAuthenticatedProps {
  children: ReactNode;
}

export function RedirectAuthenticated({ children }: RedirectAuthenticatedProps) {
  const { isSignedIn, isLoaded, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn && profile) {
      // Redirect authenticated users based on their role
      const roleRedirects = {
        admin: '/admin/overview',
        therapist: '/t/dashboard',
        client: '/discover',
      };
      
      navigate(roleRedirects[profile.role], { replace: true });
    }
  }, [isSignedIn, isLoaded, profile, navigate]);

  // Show content only if not signed in
  if (isLoaded && !isSignedIn) {
    return <>{children}</>;
  }

  // Show loading or nothing while redirecting
  return null;
}