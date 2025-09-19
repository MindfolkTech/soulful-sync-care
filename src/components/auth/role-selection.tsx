import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRole, getRoleBasedRedirect } from "@/hooks/use-user-role";
import { Users, Stethoscope, Shield } from "lucide-react";

const roleOptions = [
  {
    id: "client" as UserRole,
    title: "I'm seeking therapy",
    description: "Find and book sessions with licensed therapists",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50 hover:bg-blue-100"
  },
  {
    id: "therapist" as UserRole,
    title: "I'm a therapist", 
    description: "Provide therapy services and manage your practice",
    icon: Stethoscope,
    color: "text-green-600", 
    bgColor: "bg-green-50 hover:bg-green-100"
  },
  {
    id: "admin" as UserRole,
    title: "I'm an administrator",
    description: "Manage platform operations and user accounts",
    icon: Shield,
    color: "text-purple-600",
    bgColor: "bg-purple-50 hover:bg-purple-100"
  }
];

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleRoleSelect = async (role: UserRole) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      await user.update({
        unsafeMetadata: { role }
      });
      
      // Redirect to appropriate dashboard
      navigate(getRoleBasedRedirect(role), { replace: true });
    } catch (error) {
      console.error("Failed to set user role:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-[--space-2xl]">
      <Container size="sm">
        <div className="text-center space-y-[--space-lg]">
          <div className="space-y-[--space-sm]">
            <h1 className="font-primary text-[hsl(var(--text-3xl))]">Welcome to MindFolk</h1>
            <p className="font-secondary text-[hsl(var(--text-secondary))] text-lg">
              Tell us how you'd like to use our platform
            </p>
          </div>

          <div className="grid gap-[--space-md] max-w-2xl mx-auto">
            {roleOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedRole === option.id;
              
              return (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  } ${option.bgColor}`}
                  onClick={() => setSelectedRole(option.id)}
                >
                  <CardContent className="p-[--space-lg]">
                    <div className="flex items-center space-x-[--space-md]">
                      <div className={`p-3 rounded-full ${option.bgColor}`}>
                        <Icon className={`w-6 h-6 ${option.color}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <CardTitle className="font-primary text-[hsl(var(--text-xl))]">
                          {option.title}
                        </CardTitle>
                        <CardDescription className="font-secondary text-[hsl(var(--text-secondary))] mt-1">
                          {option.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Button 
            onClick={() => selectedRole && handleRoleSelect(selectedRole)}
            disabled={!selectedRole || isLoading}
            className="min-h-touch-target px-[--space-xl]"
            size="lg"
          >
            {isLoading ? "Setting up your account..." : "Continue"}
          </Button>
        </div>
      </Container>
    </div>
  );
}