import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Shield, User, LogOut, Search, ChevronDown, Eye, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useImpersonation } from "@/contexts/impersonation-context";

interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "therapist" | "admin";
  status: "active" | "inactive" | "suspended";
  joinDate: string;
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "therapist",
    status: "active",
    joinDate: "2024-01-15"
  },
  {
    id: "2", 
    name: "Michael Chen",
    email: "michael.chen@email.com",
    role: "client",
    status: "active",
    joinDate: "2024-01-10"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    role: "therapist", 
    status: "active",
    joinDate: "2024-01-08"
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@email.com",
    role: "client",
    status: "suspended",
    joinDate: "2024-01-05"
  }
];

interface ImpersonationBarProps {
  // No props needed since we use context
}

export function ImpersonationBar({}: ImpersonationBarProps = {}) {
  const { isImpersonating, impersonatedUser, startImpersonation, endImpersonation } = useImpersonation();
  const { toast } = useToast();

  const handleStartImpersonation = (user: User) => {
    startImpersonation(user);
    toast({
      title: "Impersonation Started",
      description: `Now viewing as ${user.name} (${user.role})`,
    });
  };

  const handleEndImpersonation = () => {
    endImpersonation();
    toast({
      title: "Impersonation Ended",
      description: "Returned to admin view",
    });
  };

  if (isImpersonating && impersonatedUser) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--warning-bg))] border-b border-[hsl(var(--border))]">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[hsl(var(--warning-text))]" />
                <span className="font-secondary font-semibold text-[hsl(var(--warning-text))]">
                  ADMIN IMPERSONATION MODE
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[hsl(var(--surface))]/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-[hsl(var(--warning-text))]" />
                </div>
                <div>
                  <p className="font-secondary font-medium text-[hsl(var(--warning-text))]">
                    {impersonatedUser.name}
                  </p>
                  <p className="font-secondary text-sm text-[hsl(var(--warning-text))]/80">
                    {impersonatedUser.email}
                  </p>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${
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
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-[hsl(var(--surface))]/20 border-[hsl(var(--surface))]/30 text-[hsl(var(--warning-text))] hover:bg-[hsl(var(--surface))]/30"
                >
                  <LogOut className="h-4 w-4 mr-2" />
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
                  <AlertDialogAction onClick={handleEndImpersonation}>
                    End Session
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="mb-6">
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-[hsl(var(--text-primary))]" />
            <div>
              <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))]">User Impersonation</h3>
              <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                View the platform from a user's perspective for support and testing
              </p>
            </div>
          </div>
          <UserSearchDialog onSelectUser={handleStartImpersonation} />
        </div>
      </CardContent>
    </Card>
  );
}

interface UserSearchDialogProps {
  onSelectUser: (user: User) => void;
}

function UserSearchDialog({ onSelectUser }: UserSearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockUsers.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
    setOpen(false);
    setSearchQuery("");
    setFilteredUsers(mockUsers);
  };

  const getRoleBadgeClass = (role: User["role"]) => {
    switch (role) {
      case "therapist":
        return "bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--tag-specialty-text))]";
      case "client":
        return "bg-[hsl(var(--tag-personality-bg))] text-[hsl(var(--tag-personality-text))]";
      case "admin":
        return "bg-[hsl(var(--tag-misc-bg))] text-[hsl(var(--tag-misc-text))]";
    }
  };

  const getStatusBadgeClass = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]";
      case "inactive":
        return "bg-[hsl(var(--text-secondary))] text-[hsl(var(--on-dark))]";
      case "suspended":
        return "bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))]";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Search Users
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-primary">Select User to Impersonate</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-[hsl(var(--text-secondary))]" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8">
                <User className="mx-auto h-12 w-12 text-[hsl(var(--text-secondary))] mb-2" />
                <p className="font-secondary text-[hsl(var(--text-secondary))]">No users found</p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border border-[hsl(var(--border))] rounded-md hover:bg-[hsl(var(--surface-accent))] cursor-pointer transition-colors"
                  onClick={() => handleSelectUser(user)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[hsl(var(--surface-accent))] flex items-center justify-center">
                      <User className="h-5 w-5 text-[hsl(var(--text-primary))]" />
                    </div>
                    <div>
                      <h4 className="font-secondary font-bold text-[hsl(var(--text-primary))]">{user.name}</h4>
                      <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary" 
                      className={getRoleBadgeClass(user.role)}
                    >
                      {user.role}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={getStatusBadgeClass(user.status)}
                    >
                      {user.status}
                    </Badge>
                    <Eye className="h-4 w-4 text-[hsl(var(--text-secondary))]" />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-[hsl(var(--surface-accent))] p-4 rounded-md">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
              <div className="space-y-1">
                <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">Security Notice</p>
                <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                  All impersonation activities are logged and monitored. Only use this feature for legitimate support and testing purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
