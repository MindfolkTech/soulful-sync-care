import * as React from "react";
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

type Step = {
  id: string;
  label: string;
  required: boolean;
};

const steps: Step[] = [
  { id: "verification", label: "Verification", required: true },
  { id: "payouts", label: "Payouts", required: true },
  { id: "rates", label: "Rates & Session Types", required: true },
  { id: "availability", label: "Availability & Calendar", required: true },
  { id: "profile", label: "Profile Basics", required: true },
  { id: "policies", label: "Practice Policies", required: true },
  { id: "details", label: "Therapeutic Details", required: true },
  { id: "review", label: "Final Review", required: true },
];

export default function TherapistSetup() {
  const { user } = useAuth();
  const [status, setStatus] = React.useState<Record<string, boolean>>({});
  const [verificationState, setVerificationState] = React.useState<"pending" | "approved" | "rejected">("pending");
  const [publishing, setPublishing] = React.useState(false);
  const [origin, setOrigin] = React.useState<string | null>(null);
  const [focus, setFocus] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Parse origin and focus from query to drive contextual banners and autofocus
    const params = new URLSearchParams(window.location.search);
    const o = params.get("origin");
    const f = params.get("focus");
    setOrigin(o);
    setFocus(f);

    let isMounted = true;
    const load = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("therapist_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) {
        console.error("TherapistSetup: failed to load profile", error);
        return;
      }
      if (!isMounted) return;
      setVerificationState(data?.verified ? "approved" : "pending");
      // setup_steps is a JSON object of stepId -> boolean
      const stepsJson = (data as any)?.setup_steps as Record<string, boolean> | undefined;
      setStatus(stepsJson || {});
    };
    load();
    return () => { isMounted = false; };
  }, [user]);

  const percent = React.useMemo(() => {
    const total = steps.length;
    const completed = steps.filter(s => status[s.id]).length;
    return Math.round((completed / total) * 100);
  }, [status]);

  const canPublish = steps.every(s => status[s.id]) && verificationState === "approved";

  const handleMarkStep = async (id: string, value: boolean = true) => {
    if (!user) return;
    const next = { ...status, [id]: value };
    setStatus(next);
    const updates: any = { setup_steps: next };
    await supabase
      .from("therapist_profiles")
      .update(updates)
      .eq("user_id", user.id);
  };

  const handlePublish = async () => {
    if (!user || !canPublish) return;
    try {
      setPublishing(true);
      await supabase
        .from("therapist_profiles")
        .update({ is_active: true, accepts_new_clients: true, setup_completed: true })
        .eq("user_id", user.id);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <Stack className="space-y-6">
            {origin && (
              <div className="p-3 border rounded-md bg-[hsl(var(--surface-accent))] font-secondary text-sm text-[hsl(var(--text-secondary))]" role="status">
                You tried to open <span className="font-medium text-[hsl(var(--text-primary))]">{origin}</span>. Complete setup to unlock it.
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-primary text-2xl md:text-3xl text-[hsl(var(--text-primary))]">Finish setting up your practice</h1>
                <p className="font-secondary text-[hsl(var(--text-secondary))]">Complete all steps to publish your profile.</p>
              </div>
              <div>
                <Badge className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))] font-secondary">{percent}%</Badge>
              </div>
            </div>

            <Card className="min-w-0 overflow-hidden">
              <CardHeader>
                <CardTitle className="font-primary">Step 1: Verification</CardTitle>
              </CardHeader>
              <CardContent>
                {verificationState === "pending" ? (
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))] font-secondary text-sm">
                    Pending (3–5 business days)
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))] font-secondary text-sm">
                    Approved
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.filter(s => s.id !== "verification").map(step => (
                <Card key={step.id} className="min-w-0 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="font-primary text-base">{step.label}</CardTitle>
                  </CardHeader>
                  <CardContent id={`focus-${step.id}`}>
                    <HStack className="justify-between">
                      <div className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                        {status[step.id] ? "Completed" : "Incomplete"}
                      </div>
                      <Button size="sm" onClick={() => handleMarkStep(step.id, true)} disabled={status[step.id]}>Mark done</Button>
                    </HStack>
                  </CardContent>
                </Card>
              ))}
            </div>

            <HStack className="justify-end">
              <Button onClick={handlePublish} disabled={!canPublish || publishing} className="min-h-touch-comfort">
                {publishing ? "Publishing..." : "Publish profile"}
              </Button>
            </HStack>
          </Stack>
        </Container>
      </div>
    </TherapistLayout>
  );
}


