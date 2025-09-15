import * as React from "react";
import { cn } from "@/lib/utils";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing = "md", align = "stretch", ...props }, ref) => {
    const spacingClasses = {
      xs: "gap-xs",
      sm: "gap-sm", 
      md: "gap-md",
      lg: "gap-lg",
      xl: "gap-xl",
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center", 
      end: "items-end",
      stretch: "items-stretch",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          spacingClasses[spacing],
          alignClasses[align],
          className
        )}
        {...props}
      />
    );
  }
);
Stack.displayName = "Stack";

export { Stack };
