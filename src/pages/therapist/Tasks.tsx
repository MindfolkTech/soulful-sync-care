import * as React from "react";
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { TaskHubShell } from "@/components/organisms/task-hub-shell";
import { mockTherapistTasks } from "@/data/mock-tasks";
import { TaskStats } from "@/types/tasks";

export default function TherapistTasks() {
  const [loading] = React.useState(false);
  const [error] = React.useState<string | null>(null);

  // Calculate stats from mock data
  const stats: TaskStats = React.useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      total: mockTherapistTasks.filter(t => t.status !== 'done').length,
      dueToday: mockTherapistTasks.filter(t => 
        t.due && 
        new Date(t.due) >= today && 
        new Date(t.due) < tomorrow &&
        t.status !== 'done'
      ).length,
      overdue: mockTherapistTasks.filter(t => 
        t.due && 
        new Date(t.due) < today &&
        t.status !== 'done'
      ).length,
      completed: mockTherapistTasks.filter(t => t.status === 'done').length
    };
  }, []);

  return (
    <TherapistLayout>
      <div className="p-8">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">Practice Tasks</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Manage your practice, clients, and professional requirements</p>
            </div>
            <TaskHubShell
              role="therapist"
              tasks={mockTherapistTasks}
              stats={stats}
              title=""
              subtitle=""
              loading={loading}
              error={error}
              onRetry={() => {
                // TODO: Implement retry logic
                console.log("Retrying...");
              }}
            />
          </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}
