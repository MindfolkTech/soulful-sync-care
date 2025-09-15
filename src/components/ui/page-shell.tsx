import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

export interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

const PageShell = React.forwardRef<HTMLDivElement, PageShellProps>(
  ({ children, showHeader = true, showFooter = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-rows-[auto_1fr_auto] min-h-dvh overflow-hidden bg-warm-white",
          className
        )}
        {...props}
      >
        {/* Header Row */}
        {showHeader && (
          <header className="row-start-1">
            {/* Header content will be injected by parent components */}
          </header>
        )}

        {/* Main Content Row */}
        <main className="row-start-2 overflow-hidden">
          <Container>
            <div className="min-h-full flex flex-col">
              {children}
            </div>
          </Container>
        </main>

        {/* Footer Row */}
        {showFooter && (
          <footer className="row-start-3 md:hidden px-4 pb-[env(safe-area-inset-bottom)]">
            {/* Footer content will be injected by parent components */}
          </footer>
        )}
      </div>
    );
  }
);
PageShell.displayName = "PageShell";

export { PageShell };
