import * as React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Floating progress pill that overlays on the dashboard and links to /t/setup
 */
export function SetupProgressPill() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [percent, setPercent] = React.useState<number>(0);
  const [visible, setVisible] = React.useState<boolean>(true);

  React.useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("therapist_profiles")
        .select("verified, is_active, accepts_new_clients, setup_completed, setup_steps")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) {
        console.error("SetupProgressPill: failed to fetch profile", error);
        return;
      }

      const published = !!(data?.verified && data?.is_active && data?.accepts_new_clients);
      if (published || data?.setup_completed) {
        if (isMounted) setVisible(false);
        return;
      }

      const steps = (data?.setup_steps as Record<string, boolean>) || {};
      const total = 9; // Verification + 8 other steps (update if steps change)
      const completed = Object.values(steps).filter(Boolean).length;
      const pct = Math.max(0, Math.min(100, Math.round((completed / total) * 100)));
      if (isMounted) setPercent(pct);
    };
    load();
    // Consider polling or channel subscription for live updates
    return () => { isMounted = false; };
  }, [user]);

  if (!visible) return null;

  return (
    <button
      onClick={() => navigate("/t/setup")}
      className="fixed bottom-6 right-6 z-50 rounded-full px-4 py-3 shadow-lg border bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))] font-secondary"
      aria-label="Complete your setup"
    >
      Complete setup {percent ? `(${percent}%)` : ""}
    </button>
  );
}


