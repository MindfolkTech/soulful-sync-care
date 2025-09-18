import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  UserCheck, 
  Shield, 
  Calendar 
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { href: "/admin/overview", icon: BarChart3, label: "Overview" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/therapists", icon: UserCheck, label: "Therapists" },
  { href: "/admin/moderation", icon: Shield, label: "Moderation" },
  { href: "/admin/bookings", icon: Calendar, label: "Bookings" },
];

export function AdminBottomNav() {
  const location = useLocation();

  return (
    <nav 
      role="navigation" 
      aria-label="Admin navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[hsl(var(--surface))] border-t border-[hsl(var(--border))] lg:hidden"
      style={{ height: "8vh" }}
    >
      <div className="flex h-full">
        {adminNavItems.map(({ href, icon: Icon, label }) => {
          const isActive = location.pathname === href;
          return (
            <Link
              key={href}
              to={href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 text-xs font-secondary transition-colors",
                "min-h-touch-min focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                isActive 
                  ? "text-[hsl(var(--garden-green))]" 
                  : "text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
              )}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
