import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, User, Stethoscope, Crown } from "lucide-react";
import { useRoleSwitching } from "@/contexts/role-switching-context";

/**
 * RoleSwitchingGuide - Shows admins what they can access in current view mode
 * 
 * Provides quick navigation to key pages based on the current view role.
 * Only visible to admins and adapts content based on selected view mode.
 */
export function RoleSwitchingGuide() {
  const { currentViewRole, isAdmin } = useRoleSwitching();

  if (!isAdmin) {
    return null;
  }

  const getRoleIcon = () => {
    switch (currentViewRole) {
      case 'admin':
        return <Crown className="w-5 h-5" />;
      case 'therapist':
        return <Stethoscope className="w-5 h-5" />;
      case 'client':
        return <User className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getNavigationLinks = () => {
    switch (currentViewRole) {
      case 'admin':
        return [
          { path: '/admin/overview', label: 'Admin Overview' },
          { path: '/admin/users', label: 'User Management' },
          { path: '/admin/therapists', label: 'Therapist Verification' },
          { path: '/admin/moderation', label: 'Content Moderation' },
        ];
      case 'therapist':
        return [
          { path: '/t/onboarding', label: 'Therapist Onboarding' },
          { path: '/t/dashboard', label: 'Therapist Dashboard' },
          { path: '/t/clients', label: 'Client Management' },
          { path: '/t/profile', label: 'Profile Setup' },
        ];
      case 'client':
        return [
          { path: '/client/onboarding', label: 'Client Onboarding' },
          { path: '/assessment', label: 'Assessment Flow' },
          { path: '/discover', label: 'Therapist Discovery' },
          { path: '/appointments', label: 'Appointments' },
        ];
      default:
        return [];
    }
  };

  const links = getNavigationLinks();

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="p-4 md:p-5 lg:p-6 pb-0">
        <CardTitle className="font-primary text-lg flex items-center gap-2">
          {getRoleIcon()}
          {currentViewRole === 'admin' ? 'Admin Panel' : `${currentViewRole.charAt(0).toUpperCase() + currentViewRole.slice(1)} Experience`}
          <Badge variant="secondary" className="ml-auto font-secondary text-xs">
            Test Mode
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-5 lg:p-6">
        <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mb-4">
          {currentViewRole === 'admin' 
            ? 'Access admin tools and management features.'
            : `Experience the platform as a ${currentViewRole} would see it.`
          }
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {links.map((link) => (
            <Button
              key={link.path}
              variant="outline"
              size="sm"
              asChild
              className="justify-start font-secondary"
            >
              <Link to={link.path} className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                {link.label}
              </Link>
            </Button>
          ))}
        </div>

        {currentViewRole !== 'admin' && (
          <p className="font-secondary text-xs text-[hsl(var(--text-secondary))] mt-4 leading-relaxed">
            💡 Switch back to Admin View to access management tools, or try different view modes to test user experiences.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
