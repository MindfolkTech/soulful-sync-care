import * as React from "react";
import { cn } from "@/lib/utils";

export interface HStackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
}

const HStack = React.forwardRef<HTMLDivElement, HStackProps>(
  ({ className, spacing = "md", align = "center", justify = "start", ...props }, ref) => {
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

    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around", 
      evenly: "justify-evenly",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row",
          spacingClasses[spacing],
          alignClasses[align],
          justifyClasses[justify],
          className
        )}
        {...props}
      />
    );
  }
);
HStack.displayName = "HStack";

export { HStack };
