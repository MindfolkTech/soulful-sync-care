import { Container } from "@/components/ui/container";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Stethoscope, 
  User, 
  ExternalLink, 
  UserPlus, 
  Settings, 
  Search,
  Calendar,
  Heart,
  MessageSquare,
  Crown,
  RotateCcw
} from "lucide-react";
import { useRoleSwitching } from "@/contexts/role-switching-context";

export default function AdminRoleSwitcher() {
  const { currentViewRole, switchToRole } = useRoleSwitching();

  const TherapistExperienceCard = () => (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="p-4 md:p-5 lg:p-6 pb-0">
        <CardTitle className="font-primary text-lg flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-[hsl(var(--tag-modality-text))]" />
          Therapist Experience
          {currentViewRole === 'therapist' && (
            <Badge variant="secondary" className="ml-auto bg-[hsl(var(--tag-modality-bg))] text-[hsl(var(--tag-modality-text))] font-secondary text-xs">
              Active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-5 lg:p-6">
        <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mb-4">
          Experience the platform as a therapist would see it, including onboarding flows and dashboard setup.
        </p>
        
        <div className="space-y-3">
          <Button
            onClick={() => switchToRole('therapist')}
            variant={currentViewRole === 'therapist' ? 'primary' : 'outline'}
            className="w-full justify-start font-secondary"
          >
            <Stethoscope className="w-4 h-4 mr-2" />
            {currentViewRole === 'therapist' ? 'Currently in Therapist View' : 'Switch to Therapist View'}
          </Button>
          
          {currentViewRole === 'therapist' && (
            <div className="space-y-2 pt-2 border-t border-[hsl(var(--border))]">
              <p className="font-secondary text-xs font-medium text-[hsl(var(--text-secondary))] mb-2">
                Available Therapist Flows:
              </p>
              
              <Button variant="outline" size="sm" asChild className="w-full justify-start font-secondary">
                <Link to="/t/onboarding" className="flex items-center gap-2">
                  <UserPlus className="w-3 h-3" />
                  Therapist Onboarding (Sign-up Process)
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" asChild className="w-full justify-start font-secondary">
                <Link to="/t/dashboard" className="flex items-center gap-2">
                  <Settings className="w-3 h-3" />
                  Dashboard Setup Wizard (with coaching tips)
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" asChild className="w-full justify-start font-secondary">
                <Link to="/t/clients" className="flex items-center gap-2">
                  <User className="w-3 h-3" />
                  Client Management
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const ClientExperienceCard = () => (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="p-4 md:p-5 lg:p-6 pb-0">
        <CardTitle className="font-primary text-lg flex items-center gap-2">
          <User className="w-5 h-5 text-[hsl(var(--tag-personality-text))]" />
          Client Experience
          {currentViewRole === 'client' && (
            <Badge variant="secondary" className="ml-auto bg-[hsl(var(--tag-personality-bg))] text-[hsl(var(--tag-personality-text))] font-secondary text-xs">
              Active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-5 lg:p-6">
        <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mb-4">
          Experience the platform as a client would see it, including assessment flows and therapist discovery.
        </p>
        
        <div className="space-y-3">
          <Button
            onClick={() => switchToRole('client')}
            variant={currentViewRole === 'client' ? 'primary' : 'outline'}
            className="w-full justify-start font-secondary"
          >
            <User className="w-4 h-4 mr-2" />
            {currentViewRole === 'client' ? 'Currently in Client View' : 'Switch to Client View'}
          </Button>
          
          {currentViewRole === 'client' && (
            <div className="space-y-2 pt-2 border-t border-[hsl(var(--border))]">
              <p className="font-secondary text-xs font-medium text-[hsl(var(--text-secondary))] mb-2">
                Available Client Flows:
              </p>
              
              <Button variant="outline" size="sm" asChild className="w-full justify-start font-secondary">
                <Link to="/assessment" className="flex items-center gap-2">
                  <UserPlus className="w-3 h-3" />
                  Client Assessment (Onboarding)
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" asChild className="w-full justify-start font-secondary">
                <Link to="/discover" className="flex items-center gap-2">
                  <Search className="w-3 h-3" />
                  Therapist Discovery
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" asChild className="w-full justify-start font-secondary">
                <Link to="/appointments" className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  Appointments
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" asChild className="w-full justify-start font-secondary">
                <Link to="/favorites" className="flex items-center gap-2">
                  <Heart className="w-3 h-3" />
                  Favorites
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" asChild className="w-full justify-start font-secondary">
                <Link to="/messages" className="flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" />
                  Messages
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))] mb-2">
                Role Switcher
              </h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">
                Test user experiences by switching between different role views. Perfect for testing onboarding flows and UI changes.
              </p>
            </div>

            {/* End Test Button */}
            {currentViewRole !== 'admin' && (
              <Card className="min-w-0 overflow-hidden border-[hsl(var(--warning-border))] bg-[hsl(var(--warning-bg))]">
                <CardContent className="p-4 md:p-5 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Crown className="w-5 h-5 text-[hsl(var(--warning-text))]" />
                      <div>
                        <p className="font-secondary font-medium text-[hsl(var(--warning-text))]">
                          Currently testing as {currentViewRole}
                        </p>
                        <p className="font-secondary text-sm text-[hsl(var(--warning-text))] opacity-80">
                          Return to admin view to access management tools
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => switchToRole('admin')}
                      variant="outline"
                      className="border-[hsl(var(--warning-border))] text-[hsl(var(--warning-text))] hover:bg-[hsl(var(--warning-text))] hover:text-[hsl(var(--warning-bg))] font-secondary"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      End Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TherapistExperienceCard />
              <ClientExperienceCard />
            </div>

            <Card className="min-w-0 overflow-hidden">
              <CardContent className="p-4 md:p-5 lg:p-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--jovial-jade))] mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-secondary text-sm font-medium text-[hsl(var(--text-primary))] mb-1">
                      💡 How Role Switching Works
                    </p>
                    <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] leading-relaxed">
                      Switch between role views to experience the platform from different user perspectives. 
                      This is perfect for testing onboarding flows, UI changes, and user experiences without 
                      affecting audit trails or user data. You can always return to admin view from the sidebar footer.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
}
