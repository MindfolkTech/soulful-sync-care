import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, User, Stethoscope, Eye, RotateCcw } from "lucide-react";
import { useRoleSwitching } from "@/contexts/role-switching-context";

/**
 * AdminRoleSwitcher - Role switching component for admin sidebar footer
 * 
 * Allows admins to switch between viewing the application as different roles.
 * Follows all design system guidelines including responsive patterns,
 * typography, spacing, and touch targets.
 * 
 * Features:
 * - Visual role indicators with icons
 * - Responsive design for all screen sizes
 * - Proper touch targets (44px minimum)
 * - Design token compliance
 * - Loading states during role switching
 */
export function AdminRoleSwitcher() {
  const { currentViewRole, isAdmin, switchToRole, isRoleSwitching } = useRoleSwitching();

  // Only show for actual admins
  if (!isAdmin) {
    return null;
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4" />;
      case 'therapist':
        return <Stethoscope className="w-4 h-4" />;
      case 'client':
        return <User className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Admin View';
      case 'therapist':
        return 'Therapist View';
      case 'client':
        return 'Client View';
      default:
        return 'Unknown View';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--tag-specialty-text))]';
      case 'therapist':
        return 'bg-[hsl(var(--tag-modality-bg))] text-[hsl(var(--tag-modality-text))]';
      case 'client':
        return 'bg-[hsl(var(--tag-personality-bg))] text-[hsl(var(--tag-personality-text))]';
      default:
        return 'bg-[hsl(var(--tag-misc-bg))] text-[hsl(var(--tag-misc-text))]';
    }
  };

  return (
    <div className="space-y-2">
      <Select 
        value={currentViewRole} 
        onValueChange={switchToRole}
        disabled={isRoleSwitching}
      >
        <SelectTrigger className="min-h-[--touch-target-min] font-secondary">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin" className="font-secondary">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Admin View
            </div>
          </SelectItem>
          <SelectItem value="therapist" className="font-secondary">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Therapist View
            </div>
          </SelectItem>
          <SelectItem value="client" className="font-secondary">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Client View
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {currentViewRole !== 'admin' && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => switchToRole('admin')}
          disabled={isRoleSwitching}
          className="w-full min-h-[--touch-target-min] font-secondary text-xs"
        >
          <RotateCcw className="w-3 h-3 mr-2" />
          {isRoleSwitching ? 'Switching...' : 'Back to Admin'}
        </Button>
      )}
    </div>
  );
}
