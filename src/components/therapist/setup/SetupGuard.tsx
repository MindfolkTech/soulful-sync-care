import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

type SetupGuardProps = {
  children: React.ReactNode;
};

/**
 * SetupGuard
 * - Blocks access to restricted therapist routes until the setup wizard is completed and the profile is published
 * - Published is defined as: verified && is_active && accepts_new_clients
 */
export function SetupGuard({ children }: SetupGuardProps) {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [published, setPublished] = React.useState<boolean>(false);

  React.useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        if (!user) {
          setPublished(false);
          return;
        }
        const { data, error } = await supabase
          .from("therapist_profiles")
          .select("verified, is_active, accepts_new_clients, setup_completed")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("SetupGuard: failed to fetch therapist profile", error);
        }

        const isPublished = !!(data?.verified && data?.is_active && data?.accepts_new_clients);
        if (isMounted) setPublished(isPublished);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-secondary text-sm">Checking your setup...</p>
        </div>
      </div>
    );
  }

  if (!published) {
    return <Navigate to="/t/setup" replace />;
  }

  return <>{children}</>;
}


