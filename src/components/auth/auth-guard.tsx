import { useAuth } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserRole, UserRole, getRoleBasedRedirect } from "@/hooks/use-user-role";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const AuthGuard = ({ children, requiredRole }: AuthGuardProps) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { role, isLoaded: roleLoaded } = useUserRole();
  const location = useLocation();

  // Show loading state while auth is being determined
  if (!isLoaded || !roleLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-8 w-3/4" />
        </div>
      </div>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to={`/sign-in?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // If no role is set, redirect to role selection
  if (!role) {
    return <Navigate to="/select-role" replace />;
  }

  // Check if user has required role
  if (requiredRole && role !== requiredRole) {
    // If admin is trying to access non-admin routes, allow it (admin can impersonate)
    if (role === "admin" && requiredRole !== "admin") {
      return <>{children}</>;
    }
    
    // Otherwise redirect to appropriate dashboard
    return <Navigate to={getRoleBasedRedirect(role)} replace />;
  }

  return <>{children}</>;
};
