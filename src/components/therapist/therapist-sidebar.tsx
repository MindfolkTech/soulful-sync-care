import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  BarChart3, 
  Users, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  TrendingUp, 
  CheckSquare,
  User,
  Settings,
  Bell
} from "lucide-react";

interface TherapistSidebarProps {
  className?: string;
}

const therapistNavItems = [
  {
    path: "/t/dashboard",
    label: "Dashboard",
    icon: BarChart3,
    description: "Overview and analytics"
  },
  {
    path: "/t/clients",
    label: "Clients",
    icon: Users,
    description: "Manage your clients",
    badge: "8"
  },
  {
    path: "/t/bookings",
    label: "Bookings",
    icon: Calendar,
    description: "Schedule and appointments",
    badge: "5"
  },
  {
    path: "/t/messages",
    label: "Messages",
    icon: MessageSquare,
    description: "Client communications",
    badge: "3"
  },
  {
    path: "/t/analytics",
    label: "Analytics",
    icon: TrendingUp,
    description: "Performance insights"
  },
  {
    path: "/t/earnings",
    label: "Earnings",
    icon: DollarSign,
    description: "Income and payouts"
  },
  {
    path: "/t/tasks",
    label: "Tasks",
    icon: CheckSquare,
    description: "Daily tasks and reminders",
    badge: "2"
  },
  {
    path: "/t/profile",
    label: "Profile",
    icon: User,
    description: "Professional profile"
  }
];

export function TherapistSidebar({ className = "" }: TherapistSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`bg-surface border-r border-border transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div>
            <h2 className="font-primary font-semibold text-text-primary">Therapist Portal</h2>
            <p className="font-secondary text-xs text-text-secondary">Professional Dashboard</p>
          </div>
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
          {therapistNavItems.map((item) => {
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
              <User className="h-4 w-4 text-text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-secondary text-sm font-medium text-text-primary truncate">
                Dr. Sarah Johnson
              </p>
              <p className="font-secondary text-xs text-text-secondary truncate">
                Licensed Therapist
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

