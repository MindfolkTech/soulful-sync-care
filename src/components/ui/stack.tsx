import * as React from "react";
import { cn } from "@/lib/utils";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing = "md", align = "stretch", justify, ...props }, ref) => {
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
          "flex flex-col",
          spacingClasses[spacing],
          alignClasses[align],
          justify && justifyClasses[justify],
          className
        )}
        {...props}
      />
    );
  }
);
Stack.displayName = "Stack";

// HStack for horizontal layout
const HStack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing = "md", align = "center", justify, ...props }, ref) => {
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
          justify && justifyClasses[justify],
          className
        )}
        {...props}
      />
    );
  }
);
HStack.displayName = "HStack";

export { Stack, HStack };
