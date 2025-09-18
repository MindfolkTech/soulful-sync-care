import * as React from "react";
import { TaskItem } from "@/components/molecules/task-item";
import { BulkActionsBar } from "@/components/molecules/bulk-actions-bar";
import { TaskItem as TaskItemType, TaskFilters } from "@/types/tasks";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ListTodo } from "lucide-react";

interface TaskListProps {
  tasks: TaskItemType[];
  filters: TaskFilters;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  role: 'client' | 'therapist' | 'admin';
}

export function TaskList({ tasks, filters, loading, error, onRetry, role }: TaskListProps) {
  const [selectedTasks, setSelectedTasks] = React.useState<Set<string>>(new Set());
  const [showBulkSelect, setShowBulkSelect] = React.useState(false);

  // Filter tasks based on filters
  const filteredTasks = React.useMemo(() => {
    return tasks.filter(task => {
      if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.status.length > 0 && !filters.status.includes(task.status)) {
        return false;
      }
      if (filters.priority.length > 0 && !filters.priority.includes(task.priority)) {
        return false;
      }
      if (filters.flow.length > 0 && !filters.flow.includes(task.flow)) {
        return false;
      }
      return true;
    });
  }, [tasks, filters]);

  const handleSelectTask = (taskId: string, selected: boolean) => {
    const newSelected = new Set(selectedTasks);
    if (selected) {
      newSelected.add(taskId);
    } else {
      newSelected.delete(taskId);
    }
    setSelectedTasks(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTasks(new Set(filteredTasks.map(t => t.id)));
    } else {
      setSelectedTasks(new Set());
    }
  };

  const handleBulkAction = (action: string) => {
    // TODO: Implement bulk actions
    console.log(`Bulk action: ${action} on tasks:`, Array.from(selectedTasks));
    setSelectedTasks(new Set());
    setShowBulkSelect(false);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border border-[hsl(var(--border))] rounded-lg">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-3" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-[hsl(var(--garden-green))] mb-4" />
        <h3 className="text-lg font-medium text-[hsl(var(--text-primary))] mb-2">Error loading tasks</h3>
        <p className="text-[hsl(var(--text-secondary))] mb-4">{error}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="tertiary" className="min-h-[--touch-target-min]" aria-label="Retry loading tasks">
            Try again
          </Button>
        )}
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    const hasFilters = filters.search || filters.status.length > 0 || filters.priority.length > 0 || filters.flow.length > 0;
    
    return (
      <div className="text-center py-12">
        <ListTodo className="mx-auto h-12 w-12 text-[hsl(var(--garden-green))] mb-4" />
        <h3 className="text-lg font-medium text-[hsl(var(--text-primary))] mb-2">
          {hasFilters ? "No matching tasks" : "No tasks yet"}
        </h3>
        <p className="text-[hsl(var(--text-secondary))]">
          {hasFilters 
            ? "Try adjusting your filters to see more tasks."
            : "Tasks will appear here as you progress through the platform."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.length > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={selectedTasks.size === filteredTasks.length}
              onCheckedChange={handleSelectAll}
              aria-label="Select all tasks"
              className="min-h-[--touch-target-min] min-w-[--touch-target-min]"
            />
            <span className="text-sm text-[hsl(var(--text-secondary))]">
              {selectedTasks.size > 0 
                ? `${selectedTasks.size} of ${filteredTasks.length} selected`
                : `${filteredTasks.length} tasks`
              }
            </span>
          </div>
          
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => setShowBulkSelect(!showBulkSelect)}
            className="min-h-[--touch-target-min]"
            aria-label={showBulkSelect ? "Cancel bulk selection" : "Enable bulk selection"}
          >
            {showBulkSelect ? "Cancel" : "Select"}
          </Button>
        </div>
      )}

      <div className="space-y-3" role="list">
        {filteredTasks.map(task => (
          <div key={task.id} role="listitem">
            <TaskItem
              task={task}
              selected={selectedTasks.has(task.id)}
              onSelect={(selected) => handleSelectTask(task.id, selected)}
              showBulkSelect={showBulkSelect}
            />
          </div>
        ))}
      </div>

      <BulkActionsBar
        selectedCount={selectedTasks.size}
        onMarkComplete={() => handleBulkAction('complete')}
        onMarkInProgress={() => handleBulkAction('in_progress')}
        onDefer={() => handleBulkAction('defer')}
        onClearSelection={() => {
          setSelectedTasks(new Set());
          setShowBulkSelect(false);
        }}
      />
    </div>
  );
}
