import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminBottomNav } from "@/components/admin/admin-bottom-nav";
import { Container } from "@/components/ui/container";

/**
 * AdminLayout - Base layout component for all admin pages
 * 
 * Provides consistent sidebar navigation and responsive behavior across all admin interfaces.
 * 
 * ## Usage Requirements
 * - MUST wrap content in responsive padding: p-4 md:p-6 lg:p-8
 * - MUST use Container component for proper max-width constraints
 * - SHOULD use layout atoms (Stack, HStack, Cluster) for consistent spacing
 * - SHOULD follow responsive design patterns from design tokens
 * 
 * ## Responsive Behavior
 * - Mobile/Tablet: Sidebar hidden, bottom navigation visible
 * - Desktop: Sidebar visible and collapsible, no bottom navigation
 * - Breakpoint: Switches at lg: (1024px)
 * 
 * ## Accessibility
 * - Provides proper ARIA landmarks (main, navigation)
 * - Supports keyboard navigation through sidebar
 * - Maintains focus management across layout changes
 * 
 * @param children - Page content (should include Container wrapper)
 * @param className - Additional CSS classes for main content area
 */
interface AdminLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AdminLayout({ children, className = "" }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <AdminSidebar />
      <main className={`ml-0 lg:ml-64 overflow-auto pb-20 lg:pb-0 ${className}`}>
        {children}
      </main>
      <AdminBottomNav />
    </div>
  );
}

