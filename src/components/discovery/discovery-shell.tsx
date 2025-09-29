import * as React from "react";
import { PageShell } from "@/components/ui/page-shell";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/ui/bottom-nav";
import { cn } from "@/lib/utils";

export interface DiscoveryShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const DiscoveryShell = React.forwardRef<HTMLDivElement, DiscoveryShellProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <PageShell
        ref={ref}
        className={cn("overflow-hidden", className)}
        {...props}
      >
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-warm-white border-b border-[hsl(var(--border))]">
          <Header />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 pt-16 pb-20 overflow-auto">
          {children}
        </div>

        {/* Fixed Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-warm-white border-t border-[hsl(var(--border))]">
          <BottomNav />
        </div>
      </PageShell>
    );
  }
);
DiscoveryShell.displayName = "DiscoveryShell";

export { DiscoveryShell };
