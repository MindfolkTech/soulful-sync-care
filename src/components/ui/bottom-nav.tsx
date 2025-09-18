import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Heart, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/discover", icon: Home, label: "Home" },
  { href: "/favorites", icon: Heart, label: "Favorites" },
  { href: "/appointments", icon: Calendar, label: "Appointments" },
  { href: "/account", icon: User, label: "Profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav 
      role="navigation" 
      aria-label="Primary navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-[hsl(var(--border))]"
      style={{ height: "8vh" }}
    >
      <div className="flex h-full">
        {navItems.map(({ href, icon: Icon, label }) => {
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
