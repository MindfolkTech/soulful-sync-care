import { Link } from "react-router-dom";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface ClientHeaderProps {
  title?: string;
  showNotifications?: boolean;
  onMenuClick?: () => void;
}

/**
 * ClientHeader - Header component for client pages
 * 
 * Provides consistent header with branding, notifications, and optional menu
 * following the design system guidelines.
 * 
 * ## Usage Requirements
 * - Use at the top of client pages
 * - Follows responsive design patterns
 * - Includes proper touch targets and accessibility
 * 
 * ## Design System Compliance
 * - Uses design tokens for colors and spacing
 * - Primary font (Crimson Pro) for branding
 * - Secondary font (Helvetica Neue) for UI text
 * - Proper touch target sizes (44px minimum)
 * - Responsive padding and layout
 */
export function ClientHeader({ 
  title, 
  showNotifications = true, 
  onMenuClick 
}: ClientHeaderProps) {
  return (
    <header className="bg-[hsl(var(--surface))] border-b border-[hsl(var(--border))] sticky top-0 z-40">
      <div className="flex items-center justify-between p-4 md:p-6 lg:p-8">
        {/* Left side - Logo and title */}
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden min-h-[--touch-target-min] min-w-[--touch-target-min]"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <Link 
            to="/" 
            className="flex items-center gap-2 text-[hsl(var(--text-primary))] hover:text-[hsl(var(--jovial-jade))] transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--garden-green))] flex items-center justify-center">
              <span className="text-[hsl(var(--on-dark))] font-primary font-bold text-lg">M</span>
            </div>
            <span className="font-primary font-bold text-xl hidden sm:block">Mindfolk</span>
          </Link>
          
          {title && (
            <>
              <div className="hidden sm:block w-px h-6 bg-[hsl(var(--border))]" />
              <h1 className="font-primary text-lg font-semibold text-[hsl(var(--text-primary))] hidden sm:block">
                {title}
              </h1>
            </>
          )}
        </div>

        {/* Right side - Notifications */}
        <div className="flex items-center gap-2">
          {showNotifications && <NotificationBell />}
        </div>
      </div>
      
      {/* Mobile title */}
      {title && (
        <div className="sm:hidden px-4 pb-4">
          <h1 className="font-primary text-lg font-semibold text-[hsl(var(--text-primary))]">
            {title}
          </h1>
        </div>
      )}
    </header>
  );
}
