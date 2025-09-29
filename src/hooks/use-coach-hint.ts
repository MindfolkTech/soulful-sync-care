import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type UseCoachHintArgs = {
  stepId: string;
};

/**
 * useCoachHint
 * Small helper hook that decides whether to show a one-time tooltip for a setup step.
 */
export function useCoachHint({ stepId }: UseCoachHintArgs) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!user) return setLoading(false);
      const { data } = await supabase
        .from("therapist_profiles")
        .select("setup_steps")
        .eq("user_id", user.id)
        .maybeSingle();
      const steps = ((data as any)?.setup_steps as Record<string, boolean>) || {};
      // Show hint only if step incomplete and not previously dismissed
      const dismissedKey = `hint_dismissed_${stepId}`;
      const dismissed = localStorage.getItem(dismissedKey) === "1";
      if (mounted) setOpen(!steps[stepId] && !dismissed);
      setLoading(false);
    };
    load();
    return () => {
      mounted = false;
    };
  }, [user, stepId]);

  const dismiss = React.useCallback(() => {
    localStorage.setItem(`hint_dismissed_${stepId}`, "1");
    setOpen(false);
  }, [stepId]);

  return { open, setOpen, dismiss, loading };
}


