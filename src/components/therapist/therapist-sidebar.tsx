import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  LayoutDashboard, 
  Users, 
  Calendar, 
  Briefcase,
  Settings,
  User as UserIcon,
  LogOut,
  ListTodo,
  UserCheck,
  MessageCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationBell } from "@/components/notifications/NotificationBell";

interface TherapistSidebarProps {
  className?: string;
}

interface SubNavItem {
  path: string;
  label: string;
  icon?: any;
}

interface NavItem {
  path: string;
  label: string;
  icon: any;
  subItems?: SubNavItem[];
}

const mainNavItems: NavItem[] = [
  { path: "/t/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { 
    path: "/t/clients", 
    label: "Clients", 
    icon: Users,
    subItems: [
      { path: "/t/clients", label: "All Clients" },
      { path: "/t/clients/tasks", label: "Client Tasks", icon: ListTodo }
    ]
  },
  { 
    path: "/t/schedule", 
    label: "Schedule", 
    icon: Calendar,
    subItems: [
      { path: "/t/schedule", label: "Calendar" },
      { path: "/t/schedule?tab=availability", label: "Availability" }
    ]
  },
  { 
    path: "/t/business", 
    label: "Business", 
    icon: Briefcase,
    subItems: [
      { path: "/t/business", label: "Earnings" },
      { path: "/t/business?tab=analytics", label: "Analytics" }
    ]
  },
  { 
    path: "/t/practice", 
    label: "Practice", 
    icon: UserIcon,
    subItems: [
      { path: "/t/practice/profile", label: "Profile" },
      { path: "/t/practice/credentials", label: "Credentials" },
      { path: "/t/practice/services", label: "Services & Pricing" },
      { path: "/t/practice/policies", label: "Policies" }
    ]
  },
];

const settingsNavItem = { path: "/t/settings", label: "Settings", icon: Settings };

export function TherapistSidebar({ className = "" }: TherapistSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const location = useLocation();
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<{ first_name: string; last_name: string; avatar_url: string; } | null>(null);

  // Auto-expand current section
  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = mainNavItems.find(item => 
      currentPath.startsWith(item.path) || 
      item.subItems?.some(sub => currentPath.startsWith(sub.path))
    );
    if (currentItem && currentItem.subItems) {
      setExpandedItems(prev => new Set([...prev, currentItem.path]));
    }
  }, [location.pathname]);

  const toggleExpanded = (itemPath: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemPath)) {
        newSet.delete(itemPath);
      } else {
        newSet.add(itemPath);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('therapist_profiles')
          .select('name, avatar_url')
          .eq('user_id', user.id)
          .single();
        if (error) {
          console.error("Error fetching therapist profile", error);
        } else if (data) {
          // Split the name into first_name and last_name for display
          const nameParts = data.name.split(' ');
          setUserProfile({
            first_name: nameParts[0],
            last_name: nameParts.slice(1).join(' '),
            avatar_url: data.avatar_url
          });
        }
      }
    };
    fetchUserProfile();
  }, [user]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  
  const getInitials = () => {
    if (userProfile) {
      return `${userProfile.first_name?.[0] || ''}${userProfile.last_name?.[0] || ''}`.toUpperCase();
    }
    return 'T';
  }

  return (
    <div className={`hidden lg:block fixed left-0 top-0 h-screen bg-surface border-r border-border transition-all duration-300 flex flex-col ${isCollapsed ? 'w-16' : 'w-64'} ${className}`}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
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
      <nav className="flex-grow p-2 space-y-1 overflow-y-auto">
        {mainNavItems.map((item) => {
          const isMainActive = location.pathname.startsWith(item.path);
          const isExpanded = expandedItems.has(item.path);
          const Icon = item.icon;
          
          return (
            <div key={item.path}>
              {/* Main nav item */}
              <div className="flex items-center">
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors group flex-1 ${
                    isMainActive
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-secondary text-sm font-medium">{item.label}</span>
                  )}
                </Link>
                
                {/* Expand/collapse button for items with subitems */}
                {item.subItems && !isCollapsed && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(item.path)}
                    className="h-8 w-8 p-0 ml-1"
                    aria-label={isExpanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
              
              {/* Sub-navigation */}
              {item.subItems && !isCollapsed && isExpanded && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.subItems.map((subItem) => {
                    const isSubActive = location.pathname === subItem.path || 
                      (subItem.path.includes('?') && location.pathname + location.search === subItem.path);
                    
                    return (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors text-sm ${
                          isSubActive
                            ? 'bg-muted/50 text-foreground font-medium'
                            : 'text-muted-foreground hover:bg-muted/25 hover:text-foreground'
                        }`}
                      >
                        {subItem.icon && <subItem.icon className="h-4 w-4 flex-shrink-0" />}
                        <span className="font-secondary">{subItem.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer sections */}
      <div className="flex-shrink-0 mt-auto">
        {/* Settings Link */}
        <div className="p-2 border-t border-border">
          <Link
            to={settingsNavItem.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors group ${
              location.pathname.startsWith(settingsNavItem.path)
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
            title={isCollapsed ? settingsNavItem.label : undefined}
          >
            <settingsNavItem.icon className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="font-secondary text-sm font-medium">{settingsNavItem.label}</span>
            )}
          </Link>
        </div>

        {/* Footer with User Profile and Sign Out */}
        <div className="p-4 border-t border-border">
          <Link to="/t/practice/profile" aria-label="Manage Profile" className="flex items-center gap-3 group">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userProfile?.avatar_url} alt="Therapist avatar" />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate text-card-foreground">
                  {userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : 'Therapist'}
                </p>
                <p className="text-xs text-muted-foreground">Manage Profile</p>
              </div>
            )}
          </Link>
          {!isCollapsed && (
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-card-foreground mt-2" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2"/>
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

