import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Search, 
  Heart, 
  Calendar, 
  MessageSquare, 
  Bell, 
  User,
  CreditCard,
  Settings
} from "lucide-react";

const clientNavItems = [
  { href: "/discover", icon: Search, label: "Discover" },
  { href: "/favorites", icon: Heart, label: "Favorites" },
  { href: "/appointments", icon: Calendar, label: "Appointments" },
  { href: "/messages", icon: MessageSquare, label: "Messages" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/account", icon: User, label: "Account" },
  { href: "/billing", icon: CreditCard, label: "Billing" },
  { href: "/client/tasks", icon: Settings, label: "Tasks" },
];

export function ClientNav() {
  const location = useLocation();

  return (
    <nav 
      role="navigation" 
      aria-label="Client navigation"
      className="bg-surface border-b border-[hsl(var(--border))]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {clientNavItems.map(({ href, icon: Icon, label }) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={cn(
                  "flex items-center gap-2 px-3 py-4 text-sm font-medium transition-colors duration-200",
                  "border-b-2 border-transparent hover:text-[hsl(var(--jovial-jade))] hover:border-[hsl(var(--garden-green))]",
                  "min-h-touch-target focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  isActive 
                    ? "text-[hsl(var(--jovial-jade))] border-[hsl(var(--garden-green))]" 
                    : "text-[hsl(var(--text-secondary))]"
                )}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:block">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
