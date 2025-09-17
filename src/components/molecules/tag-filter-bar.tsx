import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterTag {
  id: string;
  label: string;
  category: string;
  selected: boolean;
}

interface TagFilterBarProps {
  tags: FilterTag[];
  onTagToggle: (tagId: string) => void;
  onClearAll: () => void;
  className?: string;
  showClearAll?: boolean;
}

const categoryColors = {
  speciality: "bg-[hsl(var(--jovial-jade))]/10 text-[hsl(var(--jovial-jade))] border-[hsl(var(--jovial-jade))]/20",
  modality: "bg-[hsl(var(--garden-green))]/10 text-[hsl(var(--garden-green))] border-[hsl(var(--garden-green))]/20", 
  location: "bg-btn-accent/10 text-btn-accent border-btn-accent/20",
  availability: "bg-btn-secondary/10 text-btn-secondary-foreground border-btn-secondary/20",
  default: "bg-[hsl(var(--surface-accent))] text-[hsl(var(--text-secondary))] border-[hsl(var(--border))]"
};

export function TagFilterBar({ 
  tags, 
  onTagToggle, 
  onClearAll, 
  className, 
  showClearAll = true 
}: TagFilterBarProps) {
  const selectedTags = tags.filter(tag => tag.selected);
  const hasSelectedTags = selectedTags.length > 0;

  if (tags.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2 p-4 bg-surface border-b", className)}>
      <div className="flex items-center gap-2 text-sm text-[hsl(var(--text-secondary))]">
        <Filter className="h-4 w-4" />
        <span>Filters:</span>
      </div>
      
      <div className="flex flex-wrap gap-2 flex-1">
        {tags.map(tag => (
          <Badge
            key={tag.id}
            variant={tag.selected ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all hover:scale-105 min-h-touch-target flex items-center gap-1",
              tag.selected 
                ? categoryColors[tag.category as keyof typeof categoryColors] || categoryColors.default
                : "hover:bg-[hsl(var(--surface-accent))]"
            )}
            onClick={() => onTagToggle(tag.id)}
          >
            {tag.label}
            {tag.selected && (
              <X 
                className="h-3 w-3 ml-1" 
                onClick={(e) => {
                  e.stopPropagation();
                  onTagToggle(tag.id);
                }}
              />
            )}
          </Badge>
        ))}
      </div>

      {showClearAll && hasSelectedTags && (
        <Button
          variant="tertiary"
          size="sm"
          onClick={onClearAll}
          className="flex items-center gap-1 min-h-touch-target"
        >
          <X className="h-4 w-4" />
          Clear All
        </Button>
      )}
    </div>
  );
}