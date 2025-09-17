import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, LogOut, AlertTriangle, Home, Users, BarChart3, Shield, Settings } from "lucide-react";
import { useImpersonation } from "@/contexts/impersonation-context";
import { useNavigate } from "react-router-dom";

export function GlobalImpersonationBar() {
  const { isImpersonating, impersonatedUser, endImpersonation } = useImpersonation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!isImpersonating || !impersonatedUser) {
    return null;
  }

  const handleQuickNav = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))] hover:bg-[hsl(var(--warning-bg))]/90 shadow-lg border border-[hsl(var(--warning-text))]/20"
          >
            <Shield className="h-4 w-4 mr-2" />
            Admin Mode
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-2 pb-2 border-b">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="font-secondary font-semibold text-sm">
                    IMPERSONATION MODE
                  </span>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--surface-accent))] flex items-center justify-center">
                    <User className="h-5 w-5 text-[hsl(var(--text-primary))]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-secondary font-medium text-[hsl(var(--text-primary))] text-sm">
                      {impersonatedUser.name}
                    </p>
                    <p className="font-secondary text-xs text-[hsl(var(--text-secondary))]">
                      {impersonatedUser.email}
                    </p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      impersonatedUser.role === 'therapist' 
                        ? 'bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--tag-specialty-text))]'
                        : impersonatedUser.role === 'client'
                        ? 'bg-[hsl(var(--tag-personality-bg))] text-[hsl(var(--tag-personality-text))]'
                        : 'bg-[hsl(var(--tag-misc-bg))] text-[hsl(var(--tag-misc-text))]'
                    }`}
                  >
                    {impersonatedUser.role}
                  </Badge>
                </div>

                {/* Quick Navigation */}
                <div className="space-y-2">
                  <p className="font-secondary text-xs text-[hsl(var(--text-secondary))] font-medium">Quick Navigation</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => handleQuickNav('/admin/users')}
                    >
                      <Home className="h-3 w-3 mr-1" />
                      Admin Dashboard
                    </Button>
                    
                    {impersonatedUser.role === 'client' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => handleQuickNav('/discover')}
                        >
                          <Users className="h-3 w-3 mr-1" />
                          Discover
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => handleQuickNav('/appointments')}
                        >
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Appointments
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => handleQuickNav('/messages')}
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          Messages
                        </Button>
                      </>
                    )}
                    
                    {impersonatedUser.role === 'therapist' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => handleQuickNav('/t/dashboard')}
                        >
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Dashboard
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => handleQuickNav('/t/clients')}
                        >
                          <Users className="h-3 w-3 mr-1" />
                          Clients
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => handleQuickNav('/t/bookings')}
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          Bookings
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* End Session */}
                <div className="pt-2 border-t">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="w-full text-xs h-8"
                      >
                        <LogOut className="h-3 w-3 mr-2" />
                        End Impersonation
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-primary">End Impersonation Session?</AlertDialogTitle>
                        <AlertDialogDescription className="font-secondary">
                          You will return to your admin view and all impersonation activity will be logged.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={endImpersonation}>
                          End Session
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}
