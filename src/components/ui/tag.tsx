import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center justify-center min-h-touch-min px-3 py-1 text-sm font-secondary font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        personality: "bg-tag-personality text-tag-personality-foreground",
        modality: "bg-tag-modality text-tag-modality-foreground",
        specialty: "bg-tag-specialty text-tag-specialty-foreground",
        language: "bg-tag-language text-tag-language-foreground",
        misc: "bg-tag-misc text-tag-misc-foreground",
        default: "bg-surface-accent text-text-primary",
      },
      size: {
        default: "px-3 py-1 text-sm",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-4 py-2 text-base",
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-pill",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "pill",
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  category?: "personality" | "modality" | "specialty" | "language" | "misc";
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant, size, shape, category, ...props }, ref) => {
    // Use category to determine variant if provided
    const finalVariant = category || variant;
    
    return (
      <div
        className={cn(tagVariants({ variant: finalVariant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Tag.displayName = "Tag";

export { Tag, tagVariants };