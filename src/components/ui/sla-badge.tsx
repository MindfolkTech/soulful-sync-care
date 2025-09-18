import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SLABadgeProps {
  slaMinutes?: number;
  className?: string;
}

export function SLABadge({ slaMinutes, className }: SLABadgeProps) {
  if (!slaMinutes) return null;

  const hours = Math.floor(slaMinutes / 60);
  const minutes = slaMinutes % 60;
  
  const isUrgent = slaMinutes <= 60;
  const isWarning = slaMinutes <= 240 && slaMinutes > 60;

  const timeText = hours > 0 
    ? `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`
    : `${minutes}m`;

  return (
    <Badge
      variant={isUrgent ? "destructive" : isWarning ? "secondary" : "outline"}
      className={cn(
        "flex items-center gap-1 text-xs",
        className
      )}
    >
      <Clock className="h-3 w-3 text-[hsl(var(--garden-green))]" />
      {timeText}
    </Badge>
  );
}
