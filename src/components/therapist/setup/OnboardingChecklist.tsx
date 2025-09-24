import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useRoleSwitching } from "@/contexts/role-switching-context";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

type StepId =
  | "verification"
  | "documents"
  | "payouts"
  | "rates"
  | "availability"
  | "profile"
  | "policies"
  | "details"
  | "review";

type ChecklistStep = {
  id: StepId;
  title: string;
  tip: string;
  estimate: string; // e.g., "2 min"
  completed: boolean;
  locked?: boolean; // used to lock publish or verification
};

function computeProgress(steps: ChecklistStep[]): number {
  const total = steps.length;
  const done = steps.filter((s) => s.completed).length;
  return Math.round((done / total) * 100);
}

export function OnboardingChecklist() {
  const { user } = useAuth();
  const { currentViewRole, isAdmin } = useRoleSwitching();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [verified, setVerified] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [accepts, setAccepts] = React.useState(false);
  const [setupSteps, setSetupSteps] = React.useState<Record<string, boolean>>({});
  const [setupCompleted, setSetupCompleted] = React.useState(false);
  const [baseOffset, setBaseOffset] = React.useState(0);
  
  // Admin test mode - simulate fresh therapist state
  const isAdminTestMode = isAdmin && currentViewRole === 'therapist';
  const [adminTestSteps, setAdminTestSteps] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("therapist_profiles")
          .select("verified,is_active,accepts_new_clients,setup_steps,setup_completed")
          .eq("user_id", user.id)
          .maybeSingle();
        if (error) {
          console.error("OnboardingChecklist: failed to fetch profile", error);
          return;
        }
        if (!mounted) return;
        
        // In admin test mode, simulate fresh therapist state
        if (isAdminTestMode) {
          setVerified(false);
          setIsActive(false);
          setAccepts(false);
          setSetupSteps({});
          setSetupCompleted(false);
          setBaseOffset(5);
        } else {
          setVerified(!!data?.verified);
          setIsActive(!!data?.is_active);
          setAccepts(!!data?.accepts_new_clients);
          setSetupSteps(((data as any)?.setup_steps as Record<string, boolean>) || {});
          setSetupCompleted(!!data?.setup_completed);
          // Baseline progress from public sign-up (notifications/2FA)
          const meta: any = user?.user_metadata || {};
          const baseline = meta.notify_email || meta.notify_sms || meta.mfa_enroll_on_first_login ? 10 : 5;
          setBaseOffset(baseline);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    // Optionally poll for verification changes
    const id = window.setInterval(load, 10000);
    return () => {
      mounted = false;
      window.clearInterval(id);
    };
  }, [user, isAdminTestMode]);

  const published = verified && isActive && accepts;

  const steps: ChecklistStep[] = React.useMemo(() => {
    // Use admin test steps in test mode, otherwise use real setup steps
    const currentSteps = isAdminTestMode ? adminTestSteps : setupSteps;
    
    const base: ChecklistStep[] = [
      {
        id: "verification",
        title: "Admin Verification",
        tip: verified ? "Your identity and credentials have been approved" : "Pending review (typically 3–5 business days)",
        estimate: "-",
        completed: verified,
      },
      {
        id: "documents",
        title: "Upload Documents",
        tip: "Submit your credentials for verification via Practice > Credentials",
        estimate: "5 min",
        completed: !!currentSteps["documents"],
        locked: published, // Lock this step once verification is complete
      },
      {
        id: "payouts",
        title: "Connect payouts",
        tip: "Enable getting paid via Stripe",
        estimate: "3 min",
        completed: !!currentSteps["payouts"],
      },
      {
        id: "rates",
        title: "Set rates & services",
        tip: "Configure pricing and session options",
        estimate: "2 min",
        completed: !!currentSteps["rates"],
      },
      {
        id: "availability",
        title: "Add availability",
        tip: "Add your weekly hours",
        estimate: "3 min",
        completed: !!currentSteps["availability"],
      },
      {
        id: "profile",
        title: "Complete profile",
        tip: "Photo, bio, headline, and therapeutic approach",
        estimate: "5 min",
        completed: !!currentSteps["profile"],
      },
      {
        id: "policies",
        title: "Practice policies",
        tip: "Cancellation, rescheduling, and communication policies",
        estimate: "2 min",
        completed: !!currentSteps["policies"],
      },
      {
        id: "details",
        title: "Therapeutic approach",
        tip: "Modalities, communication style, and professional qualities",
        estimate: "3 min",
        completed: !!currentSteps["details"],
      },
      {
        id: "review",
        title: "Final review",
        tip: "Preview and publish",
        estimate: "1 min",
        completed: !!currentSteps["review"],
        locked: published,
      },
    ];


    // Reorder to always surface actionable items if verification is pending
    if (!verified) {
      const [ver, ...rest] = base;
      // keep verification first but also bubble key do-now tasks near top
      const priorityOrder: StepId[] = ["verification", "documents", "payouts", "rates", "availability"];
      const prioritized = base
        .slice(1)
        .sort((a, b) => priorityOrder.indexOf(a.id) - priorityOrder.indexOf(b.id));
      return [ver, ...prioritized];
    }
    return base;
  }, [verified, setupSteps, published, isAdminTestMode, adminTestSteps]);

  const percent = computeProgress(steps);
  const displayPercent = Math.min(99, baseOffset + percent);
  const canPublish = verified && steps.every((s) => s.completed);

  if (loading) return null;
  // In admin test mode, always show the checklist
  if (!isAdminTestMode && (published || setupCompleted)) return null; // Hide once fully live

  return (
    <div className="fixed right-6 bottom-6 z-50 w-[320px] max-w-[90vw]">
      <Card className="shadow-xl border-0">
        <CardHeader className="pb-3">
          <HStack className="justify-between items-start">
            <div>
              <CardTitle className="font-primary text-[hsl(var(--text-primary))]">
                Get set up
                {isAdminTestMode && (
                  <Badge variant="secondary" className="ml-2 bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))] text-xs">
                    Admin Test Mode
                  </Badge>
                )}
              </CardTitle>
              <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">{displayPercent}% complete</p>
            </div>
            <Button variant="ghost" size="icon" aria-label={collapsed ? "Expand" : "Collapse"} onClick={() => setCollapsed((c) => !c)}>
              {collapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </HStack>
          <div className="mt-3">
            <Progress value={displayPercent} className="w-full" />
          </div>
        </CardHeader>
        {!collapsed && (
          <CardContent>
            <Stack className="space-y-3">
              {steps.map((step) => (
                <HStack key={step.id} className="justify-between items-start">
                  <div className="min-w-0">
                    <div className="font-secondary font-medium text-[hsl(var(--text-primary))] truncate">{step.title}</div>
                    <div className="text-xs font-secondary text-[hsl(var(--text-secondary))] truncate">{step.tip}</div>
                  </div>
                  {step.id === "verification" && (
                    <Badge className={`ml-2 ${verified ? "bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]" : "bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]"}`}>
                      {verified ? "Approved" : "Pending"}
                    </Badge>
                  )}

                  {step.id !== "verification" && step.completed && (
                    <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success-text))]" />
                  )}

                  {step.id !== "verification" && !step.completed && (
                    <Button
                      size="sm"
                      className="ml-2 min-h-[--touch-target-min]"
                      onClick={() => {
                        if (isAdminTestMode) {
                          setAdminTestSteps(prev => ({ ...prev, [step.id]: true }));
                          return;
                        }
                        const routeMap: Record<StepId, string> = {
                          verification: "/t/settings/verification",
                          documents: "/t/practice/credentials",
                          payouts: "/t/settings/payouts?setup=1",
                          rates: "/t/practice/services",
                          availability: "/t/schedule/availability",
                          profile: "/t/practice/profile",
                          policies: "/t/practice/policies",
                          details: "/t/practice/profile#therapeutic-approach",
                          review: "/t/profile?preview=true",
                        };
                        navigate(routeMap[step.id]);
                      }}
                    >
                      {isAdminTestMode ? 'Mark Done' : 'Go'}
                    </Button>
                  )}
                </HStack>
              ))}

              <HStack className="justify-between pt-1">
                {isAdminTestMode && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setAdminTestSteps({});
                      setVerified(false);
                    }}
                    className="text-xs"
                  >
                    Reset Test
                  </Button>
                )}
                <Button
                  disabled={!canPublish}
                  onClick={() => navigate("/t/setup?focus=review")}
                  className="min-h-touch-comfort ml-auto"
                >
                  {canPublish ? "Publish profile" : "Complete remaining"}
                </Button>
              </HStack>
            </Stack>
          </CardContent>
        )}
      </Card>
    </div>
  );
}


