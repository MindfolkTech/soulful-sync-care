import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SLABadge } from "@/components/ui/sla-badge";
import { TaskItem as TaskItemType } from "@/types/tasks";
import { Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface TaskItemProps {
  task: TaskItemType;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  showBulkSelect?: boolean;
}

const priorityColors = {
  low: "bg-surface-accent text-text-secondary",
  medium: "bg-btn-secondary text-btn-secondary-foreground",
  high: "bg-btn-accent text-btn-accent-foreground",
  urgent: "bg-destructive text-destructive-foreground"
};

const statusColors = {
  todo: "bg-surface text-text-secondary",
  in_progress: "bg-btn-accent text-btn-accent-foreground",
  blocked: "bg-destructive text-destructive-foreground",
  done: "bg-success text-success-foreground"
};

export function TaskItem({ task, selected, onSelect, showBulkSelect }: TaskItemProps) {
  const isOverdue = task.due && new Date(task.due) < new Date() && task.status !== 'done';
  const isDueToday = task.due && new Date(task.due).toDateString() === new Date().toDateString();

  return (
    <Card className={cn(
      "p-4 hover:bg-surface-accent transition-colors",
      selected && "ring-2 ring-btn-primary"
    )}>
      <div className="flex items-start gap-3">
        {showBulkSelect && (
          <Checkbox
            checked={selected}
            onCheckedChange={onSelect}
            className="mt-1"
            aria-label={`Select task: ${task.title}`}
          />
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-medium text-text-primary truncate">{task.title}</h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              {isOverdue && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Overdue
                </Badge>
              )}
              {isDueToday && !isOverdue && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Due today
                </Badge>
              )}
              <SLABadge slaMinutes={task.meta.slaMinutes} />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Badge 
              className={cn("text-xs", priorityColors[task.priority])}
              variant="outline"
            >
              {task.priority}
            </Badge>
            <Badge 
              className={cn("text-xs", statusColors[task.status])}
              variant="outline"
            >
              {task.status.replace('_', ' ')}
            </Badge>
            <Badge variant="outline" className="text-xs capitalize">
              {task.flow}
            </Badge>
            {task.meta.badges?.map((badge, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>

          {task.due && (
            <p className="text-sm text-text-secondary mb-3">
              Due: {new Date(task.due).toLocaleDateString()}
            </p>
          )}

          <Button asChild variant="tertiary" size="sm">
            <Link to={task.cta.href}>
              {task.cta.label}
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}