import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  DollarSign,
  Settings,
  User
} from "lucide-react";

const therapistNavItems = [
  { href: "/t/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/t/clients", icon: Users, label: "Clients" },
  { href: "/t/bookings", icon: Calendar, label: "Bookings" },
  { href: "/t/messages", icon: MessageSquare, label: "Messages" },
  { href: "/t/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/t/earnings", icon: DollarSign, label: "Earnings" },
  { href: "/t/profile", icon: User, label: "Profile" },
  { href: "/t/settings", icon: Settings, label: "Settings" },
];

export function TherapistNav() {
  const location = useLocation();

  return (
    <nav 
      role="navigation" 
      aria-label="Therapist navigation"
      className="bg-surface border-b border-[hsl(var(--border))]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {therapistNavItems.map(({ href, icon: Icon, label }) => {
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
