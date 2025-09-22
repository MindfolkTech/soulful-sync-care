import * as React from "react";
import { PageShell, PageShellProps } from "@/components/ui/page-shell";
import { Header } from "./header";
import { Footer } from "./footer";

export interface PublicPageLayoutProps extends Omit<PageShellProps, 'children'> {
  children: React.ReactNode;
}

const PublicPageLayout = React.forwardRef<HTMLDivElement, PublicPageLayoutProps>(
  ({ children, showHeader = true, showFooter = true, className, ...props }, ref) => {
    return (
      <PageShell 
        ref={ref}
        showHeader={false} // We'll handle header/footer manually
        showFooter={false}
        className={className}
        {...props}
      >
        {/* Fixed Header */}
        {showHeader && (
          <div className="fixed top-0 left-0 right-0 z-50">
            <Header />
          </div>
        )}

        {/* Main Content with header offset when header is shown */}
        <div className={`flex-1 ${showHeader ? 'pt-16' : ''} ${showFooter ? 'pb-0' : ''}`}>
          {children}
        </div>

        {/* Footer */}
        {showFooter && <Footer />}
      </PageShell>
    );
  }
);
PublicPageLayout.displayName = "PublicPageLayout";

export { PublicPageLayout };