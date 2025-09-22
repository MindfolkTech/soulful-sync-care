import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User as UserIcon,
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
  { path: "/t/earnings", label: "Earnings", icon: DollarSign },
];

const settingsNavItem = { path: "/t/settings", label: "Settings", icon: Settings };

export function TherapistSidebar({ className = "" }: TherapistSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<{ first_name: string; last_name: string; avatar_url: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('therapist_profiles')
          .select('first_name, last_name, avatar_url')
          .eq('user_id', user.id)
          .single();
        
        if (error) {
          console.error("Error fetching therapist profile:", error);
        } else {
          setUserProfile(data);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
  
  const getInitials = () => {
    if (userProfile) {
      return `${userProfile.first_name?.[0] || ''}${userProfile.last_name?.[0] || ''}`;
    }
    return user?.email?.[0]?.toUpperCase() || 'T';
  }

  return (
    <div className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} ${className}`}>
      {/* Header */}
      <div className={`flex items-center p-4 border-b border-border ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <Link to="/" className="flex items-center space-x-2 text-card-foreground">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-primary font-bold text-lg">M</span>
            </div>
            <span className="font-primary font-bold text-xl">Mindfolk</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow p-2 space-y-1">
        {mainNavItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors group ${isCollapsed ? 'justify-center' : ''} ${isActive ? 'bg-muted text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-card-foreground'}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-secondary text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      
      {/* Footer Navigation */}
      <div className="p-2 border-t border-border">
          <Link
              to={settingsNavItem.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors group ${isCollapsed ? 'justify-center' : ''} ${location.pathname.startsWith(settingsNavItem.path) ? 'bg-muted text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-card-foreground'}`}
              title={isCollapsed ? settingsNavItem.label : undefined}
            >
              <settingsNavItem.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-secondary text-sm font-medium">{settingsNavItem.label}</span>}
            </Link>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-border">
        <Link 
            to="/t/profile"
            aria-label="Manage Profile"
            className="flex items-center gap-3 group"
        >
            <Avatar className="h-10 w-10">
                <AvatarImage src={userProfile?.avatar_url} alt="Therapist avatar" />
                <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate text-card-foreground">{userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : 'Therapist'}</p>
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
  );
}

