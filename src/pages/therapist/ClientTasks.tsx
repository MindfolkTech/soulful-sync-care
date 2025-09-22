import * as React from "react";
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { TaskHubShell } from "@/components/organisms/task-hub-shell";
import { mockTherapistTasks } from "@/data/mock-tasks";
import { TaskStats } from "@/types/tasks";

export default function TherapistClientTasks() {
  const [loading] = React.useState(false);
  const [error] = React.useState<string | null>(null);

  // Calculate stats from mock data
  const stats: TaskStats = React.useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const total = mockTherapistTasks.length;
    const completed = mockTherapistTasks.filter(task => task.status === 'done').length;
    const dueToday = mockTherapistTasks.filter(task => {
      if (!task.due) return false;
      const dueDate = new Date(task.due);
      const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
      return dueDateOnly.getTime() === today.getTime();
    }).length;
    const overdue = mockTherapistTasks.filter(task => {
      if (!task.due) return false;
      const dueDate = new Date(task.due);
      return dueDate < now && task.status !== 'done';
    }).length;

    return {
      total,
      completed,
      dueToday,
      overdue
    };
  }, []);

  const handleRetry = () => {
    // Handle retry logic here
    console.log("Retrying...");
  };

  return (
    <TherapistLayout>
      <TaskHubShell
        role="therapist"
        tasks={mockTherapistTasks}
        stats={stats}
        title="Client Tasks"
        subtitle="Manage tasks for your clients"
        loading={loading}
        error={error}
        onRetry={handleRetry}
      />
    </TherapistLayout>
  );
}