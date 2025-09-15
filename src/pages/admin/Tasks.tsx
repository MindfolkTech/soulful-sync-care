import * as React from "react";
import { TaskHubShell } from "@/components/organisms/task-hub-shell";
import { mockAdminTasks } from "@/data/mock-tasks";
import { TaskStats } from "@/types/tasks";

export default function AdminTasks() {
  const [loading] = React.useState(false);
  const [error] = React.useState<string | null>(null);

  // Calculate stats from mock data
  const stats: TaskStats = React.useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      total: mockAdminTasks.filter(t => t.status !== 'done').length,
      dueToday: mockAdminTasks.filter(t => 
        t.due && 
        new Date(t.due) >= today && 
        new Date(t.due) < tomorrow &&
        t.status !== 'done'
      ).length,
      overdue: mockAdminTasks.filter(t => 
        t.due && 
        new Date(t.due) < today &&
        t.status !== 'done'
      ).length,
      completed: mockAdminTasks.filter(t => t.status === 'done').length
    };
  }, []);

  return (
    <TaskHubShell
      role="admin"
      tasks={mockAdminTasks}
      stats={stats}
      title="Admin Tasks"
      subtitle="Platform oversight, moderation, and operational tasks"
      loading={loading}
      error={error}
      onRetry={() => {
        // TODO: Implement retry logic
        console.log("Retrying...");
      }}
    />
  );
}