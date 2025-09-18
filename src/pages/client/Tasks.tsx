import * as React from "react";
import { TaskHubShell } from "@/components/organisms/task-hub-shell";
import { mockClientTasks } from "@/data/mock-tasks";
import { TaskStats } from "@/types/tasks";

export default function ClientTasks() {
  const [loading] = React.useState(false);
  const [error] = React.useState<string | null>(null);

  // Calculate stats from mock data
  const stats: TaskStats = React.useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      total: mockClientTasks.filter(t => t.status !== 'done').length,
      dueToday: mockClientTasks.filter(t => 
        t.due && 
        new Date(t.due) >= today && 
        new Date(t.due) < tomorrow &&
        t.status !== 'done'
      ).length,
      overdue: mockClientTasks.filter(t => 
        t.due && 
        new Date(t.due) < today &&
        t.status !== 'done'
      ).length,
      completed: mockClientTasks.filter(t => t.status === 'done').length
    };
  }, []);

  return (
    <TaskHubShell
      role="client"
      tasks={mockClientTasks}
      stats={stats}
      title="My Tasks"
      subtitle="Track your progress and next steps on your mental health journey"
      loading={loading}
      error={error}
      onRetry={() => {
        // TODO: Implement retry logic
        console.log("Retrying...");
      }}
    />
  );
}
