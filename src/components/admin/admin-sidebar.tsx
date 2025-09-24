import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  UserCheck, 
  Shield, 
  Calendar, 
  Flag, 
  Webhook, 
  FileText, 
  HeadphonesIcon,
  CheckSquare,
  BarChart3,
  Settings,
  RefreshCw
} from "lucide-react";
import { NotificationBell } from "@/components/notifications/NotificationBell";

interface AdminSidebarProps {
  className?: string;
}

const adminNavItems = [
  {
    path: "/admin/overview",
    label: "Overview",
    icon: BarChart3,
    description: "System overview and metrics"
  },
  {
    path: "/admin/users",
    label: "Users",
    icon: Users,
    description: "Manage clients and therapists",
    badge: "12"
  },
  {
    path: "/admin/therapists",
    label: "Therapists",
    icon: UserCheck,
    description: "Therapist verification queue",
    badge: "3"
  },
  {
    path: "/admin/bookings",
    label: "Appointments",
    icon: Calendar,
    description: "Manage all appointments"
  },
  {
    path: "/admin/moderation",
    label: "Moderation",
    icon: Shield,
    description: "Content and behavior moderation"
  },
  {
    path: "/admin/support",
    label: "Support",
    icon: HeadphonesIcon,
    description: "Customer support tools"
  },
  {
    path: "/admin/role-switcher",
    label: "Role Switcher",
    icon: RefreshCw,
    description: "Test user experiences"
  }
];

export function AdminSidebar({ className = "" }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`hidden lg:block fixed left-0 top-0 h-screen bg-[hsl(var(--surface))] border-r border-[hsl(var(--border))] transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
        {!isCollapsed ? (
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-[hsl(var(--text-primary))] hover:text-[hsl(var(--jovial-jade))] transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--garden-green))] flex items-center justify-center">
              <span className="text-[hsl(var(--on-dark))] font-primary font-bold text-lg">M</span>
            </div>
            <span className="font-primary font-bold text-xl">Mindfolk</span>
          </Link>
        ) : (
          <Link 
            to="/" 
            className="flex items-center justify-center"
            aria-label="Go to Mindfolk homepage"
          >
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--garden-green))] flex items-center justify-center">
              <span className="text-[hsl(var(--on-dark))] font-primary font-bold text-lg">M</span>
            </div>
          </Link>
        )}
        <div className="flex items-center gap-2">
          {!isCollapsed && <NotificationBell />}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0 min-h-[--touch-target-min] min-w-[--touch-target-min]"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2">
        <ul className="space-y-1">
          {adminNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors group ${
                    isActive
                      ? 'bg-[hsl(var(--surface))]-accent text-[hsl(var(--text-primary))]'
                      : 'text-text-secondary hover:bg-[hsl(var(--surface))]-accent hover:text-[hsl(var(--text-primary))]'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-[hsl(var(--text-primary))]' : 'text-text-secondary group-hover:text-[hsl(var(--text-primary))]'}`} />
                  
                  {!isCollapsed && (
                    <>
                      <div className="flex-1 min-w-0">
                        <span className="font-secondary text-sm font-medium truncate">
                          {item.label}
                        </span>
                        <p className="font-secondary text-xs text-text-secondary truncate">
                          {item.description}
                        </p>
                      </div>
                      
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))] text-xs h-5 px-1.5"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer with Sign Out */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-[hsl(var(--surface-accent))] flex items-center justify-center">
              <Settings className="h-4 w-4 text-[hsl(var(--text-primary))]" />
            </div>
            <div className="min-w-0">
              <p className="font-secondary text-sm font-medium text-[hsl(var(--text-primary))] truncate">
                Admin User
              </p>
              <p className="font-secondary text-xs text-[hsl(var(--text-secondary))] truncate">
                System Administrator
              </p>
            </div>
          </div>
          <button 
            className="w-full text-left px-3 py-2 text-sm text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--surface-accent))] rounded-md transition-colors"
            onClick={() => {
              // TODO: Implement sign out logic
              console.log('Sign out clicked');
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

