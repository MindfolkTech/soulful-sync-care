import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useUserRole, getRoleBasedRedirect } from "@/hooks/use-user-role";
import { Skeleton } from "@/components/ui/skeleton";

export default function SSOCallback() {
  const { isLoaded, isSignedIn } = useAuth();
  const { role, isLoaded: roleLoaded } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn && roleLoaded) {
      if (role) {
        // User has a role, redirect to their dashboard
        navigate(getRoleBasedRedirect(role), { replace: true });
      } else {
        // New user, redirect to role selection
        navigate("/select-role", { replace: true });
      }
    } else if (isLoaded && !isSignedIn) {
      // Authentication failed, redirect to sign in
      navigate("/sign-in", { replace: true });
    }
  }, [isLoaded, isSignedIn, role, roleLoaded, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md">
        <div className="text-center">
          <h2 className="font-primary text-[hsl(var(--text-xl))]">Setting up your account...</h2>
          <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm mt-2">
            Please wait while we complete the sign-in process
          </p>
        </div>
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </div>
    </div>
  );
}