import { Home, Heart, Calendar, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", href: "/", active: true },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: Calendar, label: "Appointments", href: "/appointments" },
  { icon: User, label: "Profile", href: "/profile" },
];

export function BottomNav() {
  return (
    <footer 
      className="bg-surface"
      style={{ height: '10vh' }}
    >
      <nav className="grid grid-cols-4 h-full max-w-lg mx-auto">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center text-xs font-medium h-full",
              item.active ? "text-primary-garden-green" : "text-text-muted",
              "hover:text-text-primary"
            )}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
    </footer>
  );
}
