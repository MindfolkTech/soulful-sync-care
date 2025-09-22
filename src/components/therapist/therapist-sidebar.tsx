import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Briefcase,
  Settings,
  User as UserIcon,
  LogOut
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TherapistSidebarProps {
  className?: string;
}

const mainNavItems = [
  { path: "/t/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/t/clients", label: "Clients", icon: Users },
  { path: "/t/schedule", label: "Schedule", icon: Calendar },
  { path: "/t/business", label: "Business", icon: Briefcase },
];

const settingsNavItem = { path: "/t/settings", label: "Settings", icon: Settings };

export function TherapistSidebar({ className = "" }: TherapistSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<{ first_name: string; last_name: string; avatar_url: string; } | null>(null);

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
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-border">
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
      <nav className="flex-grow p-2 space-y-1 overflow-y-auto">
        {mainNavItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors group ${
                isActive
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
          <Link to="/t/profile" aria-label="Manage Profile" className="flex items-center gap-3 group">
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

