import { useAuth } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserRole, UserRole, getRoleBasedRedirect } from "@/hooks/use-user-role";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Clock, XCircle } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const AuthGuard = ({ children, requiredRole }: AuthGuardProps) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { role, status, isLoaded: roleLoaded, isPending, isRejected } = useUserRole();
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

  // If no role is set, default to client (should not happen with new signup flow)
  if (!role) {
    return <Navigate to="/sign-up/client" replace />;
  }

  // Handle pending therapist applications
  if (role === "therapist" && isPending) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-[--space-2xl]">
        <Container size="sm">
          <Card className="w-full max-w-md mx-auto text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <CardTitle className="font-primary text-[hsl(var(--text-2xl))]">Application Under Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-secondary text-[hsl(var(--text-secondary))]">
                Your therapist application is being reviewed by our team. We'll notify you via email once it's approved.
              </p>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 font-secondary">
                  <strong>Review typically takes 2-3 business days.</strong> We verify licensing and credentials to ensure quality care.
                </p>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }

  // Handle rejected therapist applications
  if (role === "therapist" && isRejected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-[--space-2xl]">
        <Container size="sm">
          <Card className="w-full max-w-md mx-auto text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="font-primary text-[hsl(var(--text-2xl))]">Application Not Approved</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-secondary text-[hsl(var(--text-secondary))]">
                Unfortunately, we were unable to approve your therapist application at this time.
              </p>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 font-secondary">
                  Please check your email for specific feedback. You may reapply after addressing the noted issues.
                </p>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
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
