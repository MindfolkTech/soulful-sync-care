import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, X, Archive, Clock, AlertTriangle } from "lucide-react";

interface BulkActionsBarProps {
  selectedCount: number;
  onMarkComplete: () => void;
  onMarkInProgress: () => void;
  onDefer: () => void;
  onClearSelection: () => void;
}

export function BulkActionsBar({ 
  selectedCount, 
  onMarkComplete, 
  onMarkInProgress, 
  onDefer, 
  onClearSelection 
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-surface border border-[hsl(var(--border))] rounded-lg shadow-lg p-4 flex items-center gap-3">
        <Badge variant="secondary" className="flex items-center gap-1">
          {selectedCount} selected
        </Badge>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="tertiary" 
            size="sm"
            onClick={onMarkComplete}
            className="flex items-center gap-1 min-h-[--touch-target-min]"
            aria-label="Mark selected tasks as complete"
          >
            <CheckCircle className="h-4 w-4" />
            Complete
          </Button>
          
          <Button 
            variant="tertiary" 
            size="sm"
            onClick={onMarkInProgress}
            className="flex items-center gap-1 min-h-[--touch-target-min]"
            aria-label="Mark selected tasks as in progress"
          >
            <Clock className="h-4 w-4" />
            In Progress
          </Button>
          
          <Button 
            variant="tertiary" 
            size="sm"
            onClick={onDefer}
            className="flex items-center gap-1 min-h-[--touch-target-min]"
            aria-label="Defer selected tasks"
          >
            <Archive className="h-4 w-4" />
            Defer
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClearSelection}
          className="flex items-center gap-1 min-h-[--touch-target-min] min-w-[--touch-target-min]"
          aria-label="Clear selection"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
