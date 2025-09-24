import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Shield, 
  Users, 
  UserCheck, 
  BarChart3, 
  Flag, 
  HeadphonesIcon,
  Settings,
  ChevronDown
} from "lucide-react";
import { AdminOnly } from "./AdminOnly";

/**
 * AdminQuickNav - Quick navigation dropdown for admin users
 * 
 * Provides easy access to admin pages from any location in the app.
 * Only visible to users with admin role.
 * Follows design system guidelines for consistent styling.
 */
export function AdminQuickNav() {
  return (
    <AdminOnly>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="min-h-[--touch-target-min] font-secondary"
          >
            <Shield className="w-4 h-4 mr-2" />
            Admin
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-primary">Admin Panel</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem asChild>
            <Link to="/admin/overview" className="flex items-center gap-2 font-secondary">
              <BarChart3 className="w-4 h-4" />
              Overview
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/admin/users" className="flex items-center gap-2 font-secondary">
              <Users className="w-4 h-4" />
              Users
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/admin/therapists" className="flex items-center gap-2 font-secondary">
              <UserCheck className="w-4 h-4" />
              Therapists
              <Badge variant="secondary" className="ml-auto bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]">
                New
              </Badge>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/admin/moderation" className="flex items-center gap-2 font-secondary">
              <Flag className="w-4 h-4" />
              Moderation
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem asChild>
            <Link to="/admin/support" className="flex items-center gap-2 font-secondary">
              <HeadphonesIcon className="w-4 h-4" />
              Support
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/admin/audit" className="flex items-center gap-2 font-secondary">
              <Settings className="w-4 h-4" />
              Audit Trail
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </AdminOnly>
  );
}
