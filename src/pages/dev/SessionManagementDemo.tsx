import { useState } from "react";
import { SessionCountdown } from "@/components/ui/session-countdown";
import { SessionReminderBanner } from "@/components/ui/session-reminder-banner";
import { useSessionReminders } from "@/hooks/use-session-reminders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

// Create demo sessions with different timing scenarios
const createDemoSessions = () => {
  const now = new Date();
  
  return [
    {
      id: "demo-1",
      therapistName: "Dr. Sarah Chen",
      sessionTime: new Date(now.getTime() + 3 * 60 * 1000), // 3 minutes from now
      sessionType: "chemistry" as const,
      status: "confirmed" as const,
    },
    {
      id: "demo-2", 
      therapistName: "Michael Thompson",
      sessionTime: new Date(now.getTime() + 8 * 60 * 1000), // 8 minutes from now
      sessionType: "therapy" as const,
      status: "confirmed" as const,
    },
    {
      id: "demo-3",
      therapistName: "Dr. Priya Patel", 
      sessionTime: new Date(now.getTime() + 30 * 60 * 1000), // 30 minutes from now
      sessionType: "therapy" as const,
      status: "confirmed" as const,
    },
    {
      id: "demo-4",
      therapistName: "Dr. James Wilson",
      sessionTime: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
      sessionType: "chemistry" as const,
      status: "confirmed" as const,
    },
  ];
};

export default function SessionManagementDemo() {
  const [sessions] = useState(createDemoSessions());
  const {
    activeReminders,
    mostUrgentReminder,
    hasUrgentReminders,
    hasImmediateReminders,
    dismissReminder,
    totalReminders,
  } = useSessionReminders(sessions);

  const handleJoinSession = (sessionId: string) => {
    alert(`Joining session: ${sessionId}`);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-white))] py-8">
      <Container>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="font-primary text-3xl font-bold text-[hsl(var(--text-primary))] mb-4">
              Session Management Demo
            </h1>
            <p className="font-secondary text-[hsl(var(--text-secondary))]">
              Live demonstration of countdown timers, reminder banners, and JOIN NOW functionality
            </p>
          </div>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">
                Reminder System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">
                    {totalReminders}
                  </div>
                  <div className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                    Active Reminders
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-primary text-2xl font-bold text-[hsl(var(--garden-green))]">
                    {hasUrgentReminders ? "YES" : "NO"}
                  </div>
                  <div className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                    Urgent (≤10 min)
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-primary text-2xl font-bold text-[hsl(var(--ink-slate))]">
                    {hasImmediateReminders ? "YES" : "NO"}
                  </div>
                  <div className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                    Immediate (≤5 min)
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">
                    {mostUrgentReminder ? "YES" : "NO"}
                  </div>
                  <div className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                    Most Urgent
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Reminder Banners */}
          {activeReminders.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))]">
                Active Session Reminders
              </h2>
              {activeReminders.map((reminder) => (
                <SessionReminderBanner
                  key={reminder.sessionId}
                  sessionTime={reminder.sessionTime}
                  sessionId={reminder.sessionId}
                  therapistName={reminder.therapistName}
                  sessionType={reminder.sessionType}
                  onJoinSession={handleJoinSession}
                  onDismiss={() => dismissReminder(reminder.sessionId)}
                />
              ))}
            </div>
          )}

          {/* All Sessions with Countdowns */}
          <div className="space-y-4">
            <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))]">
              All Sessions (Live Countdowns)
            </h2>
            {sessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Session Info */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-primary text-lg font-semibold text-[hsl(var(--text-primary))]">
                          {session.therapistName}
                        </h3>
                        <p className="font-secondary text-[hsl(var(--text-secondary))]">
                          {session.sessionType === "chemistry" ? "Chemistry Call" : "Therapy Session"}
                        </p>
                        <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mt-1">
                          Scheduled: {session.sessionTime.toLocaleString()}
                        </p>
                      </div>
                      <Badge variant={session.status === "confirmed" ? "default" : "outline"}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Live Countdown */}
                    <div className="pt-3 border-t border-[hsl(var(--border))]">
                      <SessionCountdown
                        sessionTime={session.sessionTime}
                        sessionId={session.id}
                        therapistName={session.therapistName}
                        onJoinSession={handleJoinSession}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))] mb-2">
                    Countdown Logic
                  </h4>
                  <ul className="font-secondary text-sm text-[hsl(var(--text-secondary))] space-y-1">
                    <li>• Shows "in X days/hours/minutes" for future sessions</li>
                    <li>• JOIN NOW button appears 10 minutes before session</li>
                    <li>• Button pulses and changes to urgent styling at 5 minutes</li>
                    <li>• Updates in real-time every second</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))] mb-2">
                    Reminder Banners
                  </h4>
                  <ul className="font-secondary text-sm text-[hsl(var(--text-secondary))] space-y-1">
                    <li>• Show for sessions within 1 hour</li>
                    <li>• Escalating urgency at 10min and 5min marks</li>
                    <li>• Include preparation tips for immediate sessions</li>
                    <li>• Dismissible with localStorage persistence</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
