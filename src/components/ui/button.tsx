import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--garden-green))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-[hsl(var(--garden-green))] text-[hsl(var(--btn-primary-text))] hover:bg-[hsl(var(--garden-green))]/90",
        secondary: "bg-[hsl(var(--btn-secondary-bg))] text-[hsl(var(--btn-secondary-text))] hover:bg-[hsl(var(--surface-accent))] border border-[hsl(var(--garden-green))]",
        tertiary: "bg-transparent text-[hsl(var(--btn-tertiary-text))] hover:bg-[hsl(var(--surface-accent))]",
        accent: "bg-[hsl(var(--btn-accent-bg))] text-[hsl(var(--btn-accent-text))] hover:bg-[hsl(var(--btn-accent-bg))]/90",
        cta: "bg-[hsl(var(--btn-cta-bg))] text-[hsl(var(--btn-cta-text))] hover:bg-[hsl(var(--btn-cta-bg))]/90",
        destructive: "bg-error text-error-foreground hover:bg-error/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-[hsl(var(--garden-green))] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[--touch-target-min] px-[--space-md] py-[--space-sm]",
        sm: "h-[--touch-target-min] rounded-md px-[--space-sm]",
        lg: "h-[--touch-target-comfort] rounded-md px-[--space-lg]",
        icon: "h-[--touch-target-min] w-[--touch-target-min]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
