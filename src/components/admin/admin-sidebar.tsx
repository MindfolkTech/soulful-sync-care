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
  Settings
} from "lucide-react";

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
    path: "/admin/moderation",
    label: "Moderation",
    icon: Shield,
    description: "Content and behavior moderation"
  },
  {
    path: "/admin/bookings",
    label: "Bookings",
    icon: Calendar,
    description: "Manage all appointments"
  },
  {
    path: "/admin/feature-flags",
    label: "Feature Flags",
    icon: Flag,
    description: "Control feature rollouts"
  },
  {
    path: "/admin/webhooks",
    label: "Webhooks",
    icon: Webhook,
    description: "API integrations"
  },
  {
    path: "/admin/audit",
    label: "Audit Logs",
    icon: FileText,
    description: "System activity logs"
  },
  {
    path: "/admin/support",
    label: "Support",
    icon: HeadphonesIcon,
    description: "Customer support tools"
  },
  {
    path: "/admin/tasks",
    label: "Tasks",
    icon: CheckSquare,
    description: "Admin task management"
  }
];

export function AdminSidebar({ className = "" }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`bg-surface border-r border-border transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed ? (
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-text-primary hover:text-jovial-jade transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-garden-green flex items-center justify-center">
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
            <div className="h-8 w-8 rounded-full bg-garden-green flex items-center justify-center">
              <span className="text-[hsl(var(--on-dark))] font-primary font-bold text-lg">M</span>
            </div>
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="h-8 w-8 p-0"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
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
                      ? 'bg-surface-accent text-text-primary'
                      : 'text-text-secondary hover:bg-surface-accent hover:text-text-primary'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`} />
                  
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
                          className="bg-warning text-warning-foreground text-xs h-5 px-1.5"
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

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-surface">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-surface-accent flex items-center justify-center">
              <Settings className="h-4 w-4 text-text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-secondary text-sm font-medium text-text-primary truncate">
                Admin User
              </p>
              <p className="font-secondary text-xs text-text-secondary truncate">
                System Administrator
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

