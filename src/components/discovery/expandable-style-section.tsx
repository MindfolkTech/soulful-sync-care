import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ExpandableStyleSection
 *
 * A clickable section that displays either a label or description for
 * Communication Style and Session Format fields.
 *
 * - Initially shows the label (e.g., "Supportive and Relational")
 * - When clicked, expands to show the description
 * - When clicked again, collapses to show the label
 *
 * Accessibility:
 * - Keyboard navigable (Enter/Space to toggle)
 * - ARIA expanded state
 * - Focus visible styling
 */

interface ExpandableStyleSectionProps {
  title: string;
  label: string;
  description: string;
  className?: string;
}

export function ExpandableStyleSection({
  title,
  label,
  description,
  className
}: ExpandableStyleSectionProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="font-secondary font-semibold text-text-primary">{title}</h4>
      <button
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-label={`${title}: ${label}. Click to ${isExpanded ? 'hide' : 'show'} description`}
        className={cn(
          "w-full text-left p-3 rounded-lg",
          "bg-surface-accent border border-border",
          "hover:bg-[hsl(var(--surface-accent)/0.8)] transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--garden-green))] focus:ring-offset-2",
          "cursor-pointer group"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            {!isExpanded ? (
              <p className="font-secondary font-medium text-text-primary">
                {label}
              </p>
            ) : (
              <div className="space-y-2">
                <p className="font-secondary font-medium text-text-primary">
                  {label}
                </p>
                <p className="font-secondary text-sm text-text-secondary leading-relaxed">
                  {description}
                </p>
              </div>
            )}
          </div>
          <div className="flex-shrink-0 mt-0.5">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-[hsl(var(--garden-green))] group-hover:text-[hsl(var(--jovial-jade))]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[hsl(var(--garden-green))] group-hover:text-[hsl(var(--jovial-jade))]" />
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
