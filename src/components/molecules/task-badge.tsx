import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListTodo } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TaskBadgeProps {
  count: number;
  role: 'client' | 'therapist' | 'admin';
  className?: string;
  variant?: 'icon' | 'full';
}

const roleRoutes = {
  client: '/client/tasks',
  therapist: '/t/tasks',
  admin: '/admin/tasks'
};

const roleColors = {
  client: "hover:bg-[hsl(var(--jovial-jade))]/10 text-[hsl(var(--jovial-jade))]",
  therapist: "hover:bg-[hsl(var(--garden-green))]/10 text-[hsl(var(--garden-green))]", 
  admin: "hover:bg-btn-accent/10 text-btn-accent"
};

export function TaskBadge({ count, role, className, variant = 'icon' }: TaskBadgeProps) {
  if (count === 0) return null;

  const content = variant === 'full' ? (
    <div className="flex items-center gap-2">
      <ListTodo className="h-4 w-4" />
      <span>Tasks</span>
      <Badge variant="secondary" className="ml-1">
        {count}
      </Badge>
    </div>
  ) : (
    <div className="relative">
      <ListTodo className="h-5 w-5" />
      <Badge 
        variant="destructive" 
        className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
      >
        {count > 99 ? '99+' : count}
      </Badge>
    </div>
  );

  return (
    <Button 
      asChild 
      variant="ghost" 
      size={variant === 'full' ? 'default' : 'icon'}
      className={cn(
        "relative",
        roleColors[role],
        className
      )}
    >
      <Link to={roleRoutes[role]} aria-label={`${count} pending tasks`}>
        {content}
      </Link>
    </Button>
  );
}
