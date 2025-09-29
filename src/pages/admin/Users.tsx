import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Container } from "@/components/ui/container";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ImpersonationBar } from "@/components/admin/impersonation-bar";
import { Search, User, Calendar, Shield, Eye, Ban, UserCheck, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// Matches the 'profiles' table and adds a computed status
interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: "client" | "therapist" | "admin";
  created_at: string;
  // These fields are not directly in profiles but we'll compute them
  status: "active" | "inactive" | "suspended"; 
  last_active: string; 
  sessions_count: number;
}

const useAdminUsers = () => {
  return useQuery<Profile[], Error>({
    queryKey: ['admin_users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) {
        throw new Error(error.message);
      }

      // Mock status, last_active and sessions_count for now
      return data.map(profile => ({
        ...profile,
        status: 'active', // Placeholder
        last_active: new Date().toISOString(), // Placeholder
        sessions_count: Math.floor(Math.random() * 50), // Placeholder
      }));
    },
  });
};

export default function AdminUsers() {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading, isError, error } = useAdminUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const { toast } = useToast();

  const statusMutation = useMutation({
    mutationFn: async ({ userId, newStatus }: { userId: string, newStatus: Profile['status'] }) => {
        // In a real app, you'd update the user's status in the database.
        // Since 'status' is a computed field for this example, we'll just simulate the change.
        console.log(`Simulating status change for ${userId} to ${newStatus}`);
        return Promise.resolve();
    },
    onSuccess: (_, { userId, newStatus }) => {
        queryClient.invalidateQueries({ queryKey: ['admin_users'] });
        toast({
            title: `User status updated`,
            description: `User has been set to ${newStatus}.`,
        });
    },
    onError: (error: Error) => {
        toast({
            title: 'Error updating status',
            description: error.message,
            variant: 'destructive',
        });
    }
  });

  const impersonationMutation = useMutation({
      mutationFn: async (targetUserId: string) => {
          const { error } = await supabase.rpc('log_impersonation_event', { 
              target_user_id: targetUserId,
              event_type: 'START' 
          });
          if (error) throw error;
      },
      onSuccess: (_, targetUserId) => {
          // Here you would typically set some global state to activate the impersonation bar
          // For now, we just show a toast.
          const user = users.find(u => u.id === targetUserId);
          toast({
              title: 'Impersonation Started',
              description: `You are now impersonating ${user?.first_name || 'user'}. An event has been logged.`,
          });
          // This would trigger the ImpersonationBar to show
      },
      onError: (error: Error) => {
          toast({
              title: 'Impersonation Failed',
              description: error.message,
              variant: 'destructive',
          });
      }
  });

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const name = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
      const email = user.email?.toLowerCase() || '';
      const search = searchQuery.toLowerCase();
      
      const matchesSearch = name.includes(search) || email.includes(search);
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, searchQuery, statusFilter, roleFilter]);

  const getRoleBadgeClass = (role: Profile["role"]) => {
    switch (role) {
      case "therapist":
        return "bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--tag-specialty-text))]";
      case "client":
        return "bg-[hsl(var(--tag-personality-bg))] text-[hsl(var(--tag-personality-text))]";
      case "admin":
        return "bg-[hsl(var(--tag-misc-bg))] text-[hsl(var(--tag-misc-text))]";
    }
  };

  const getStatusBadgeClass = (status: Profile["status"]) => {
    switch (status) {
      case "active":
        return "bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]";
      case "inactive":
        return "bg-[hsl(var(--text-secondary))] text-[hsl(var(--on-dark))]";
      case "suspended":
        return "bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))]";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(dateString);
  };

  const activeUsers = filteredUsers.filter(user => user.status === "active");
  const inactiveUsers = filteredUsers.filter(user => user.status === "inactive");
  const suspendedUsers = filteredUsers.filter(user => user.status === "suspended");

    return (
    <AdminLayout>
      <div className="p-8">
        <Container>
          <div className="space-y-8">
            <div>
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">User Management</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Monitor and manage platform users</p>
            </div>

            <ImpersonationBar />

            <Card>
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(var(--text-secondary))]" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 min-h-[--touch-target-min]"
                        aria-label="Search users by name or email"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[140px] min-h-[--touch-target-min]" aria-label="Filter users by status">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="w-full sm:w-[140px] min-h-[--touch-target-min]" aria-label="Filter users by role">
                        <SelectValue placeholder="All Roles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="client">Clients</SelectItem>
                        <SelectItem value="therapist">Therapists</SelectItem>
                        <SelectItem value="admin">Admins</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]">
                      {activeUsers.length} Active
                    </Badge>
                    <Badge variant="secondary" className="bg-[hsl(var(--text-secondary))] text-[hsl(var(--on-dark))]">
                      {inactiveUsers.length} Inactive
                    </Badge>
                    <Badge variant="secondary" className="bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))]">
                      {suspendedUsers.length} Suspended
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isLoading && (
                <div className="flex justify-center items-center py-16">
                    <Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--text-secondary))]" />
                </div>
            )}

            {isError && (
                <Card className="bg-error-bg border-error-text/50">
                    <CardContent className="p-6 flex items-center gap-4">
                        <AlertCircle className="h-8 w-8 text-error-text" />
                        <div>
                            <h3 className="font-bold text-error-text">Failed to load users</h3>
                            <p className="text-sm text-error-text/90">{error.message}</p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {!isLoading && !isError && (
                <Card>
                    <CardContent className="p-0">
                        <Table role="table" aria-label="User management table">
                            <TableHeader role="rowgroup">
                                <TableRow role="row">
                                    <TableHead>User</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Join Date</TableHead>
                                    <TableHead>Last Active</TableHead>
                                    <TableHead>Sessions</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody role="rowgroup">
                                {filteredUsers.length === 0 ? (
                                <TableRow role="row">
                                    <TableCell colSpan={7} className="text-center py-8">
                                    <User className="mx-auto h-12 w-12 text-[hsl(var(--text-secondary))] mb-2" />
                                    <p className="font-secondary text-[hsl(var(--text-secondary))]">No users found</p>
                                    </TableCell>
                                </TableRow>
                                ) : (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id} role="row" aria-label={`User: ${user.first_name} ${user.last_name}`}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-[hsl(var(--surface-accent))] flex items-center justify-center">
                                            <User className="h-5 w-5 text-[hsl(var(--text-primary))]" />
                                        </div>
                                        <div>
                                            <h4 className="font-secondary font-bold text-[hsl(var(--text-primary))]">{`${user.first_name || ''} ${user.last_name || ''}`}</h4>
                                            <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">{user.email}</p>
                                        </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge 
                                        variant="secondary" 
                                        className={getRoleBadgeClass(user.role)}
                                        >
                                        {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge 
                                        variant="secondary" 
                                        className={getStatusBadgeClass(user.status)}
                                        >
                                        {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-[hsl(var(--text-secondary))]" />
                                        <span className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                                            {formatDate(user.created_at)}
                                        </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                                        {formatLastActive(user.last_active)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-secondary font-medium text-[hsl(var(--text-primary))]">
                                        {user.sessions_count}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="min-h-[--touch-target-min]"
                                            onClick={() => setSelectedUser(user)}
                                            aria-label={`View details for ${user.first_name}`}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        {user.status === "suspended" ? (
                                            <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-[hsl(var(--success-text))] hover:bg-[hsl(var(--success-bg))] hover:text-[hsl(var(--success-text))] min-h-[--touch-target-min]"
                                            onClick={() => statusMutation.mutate({ userId: user.id, newStatus: "active" })}
                                            aria-label={`Reactivate ${user.first_name}`}
                                            >
                                            <UserCheck className="h-4 w-4" />
                                            </Button>
                                        ) : (
                                            <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-[hsl(var(--error-text))] hover:bg-[hsl(var(--error-bg))] hover:text-[hsl(var(--error-text))] min-h-[--touch-target-min]"
                                            onClick={() => statusMutation.mutate({ userId: user.id, newStatus: "suspended" })}
                                            aria-label={`Suspend ${user.first_name}`}
                                            >
                                            <Ban className="h-4 w-4" />
                                            </Button>
                                        )}
                                        </div>
                                    </TableCell>
                                    </TableRow>
                                ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {selectedUser && (
              <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="font-primary">User Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-[hsl(var(--surface-accent))] flex items-center justify-center">
                        <User className="h-8 w-8 text-[hsl(var(--text-primary))]" />
                      </div>
                      <div className="space-y-1">
                        <h1 className="font-primary text-xl text-[hsl(var(--text-primary))]">{`${selectedUser.first_name || ''} ${selectedUser.last_name || ''}`}</h1>
                        <p className="font-secondary text-[hsl(var(--text-secondary))]">{selectedUser.email}</p>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary" 
                            className={getRoleBadgeClass(selectedUser.role)}
                          >
                            {selectedUser.role}
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className={getStatusBadgeClass(selectedUser.status)}
                          >
                            {selectedUser.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Join Date</p>
                        <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{formatDate(selectedUser.created_at)}</p>
                      </div>
                      <div>
                        <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Last Active</p>
                        <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{formatLastActive(selectedUser.last_active)}</p>
                      </div>
                      <div>
                        <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Total Sessions</p>
                        <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{selectedUser.sessions_count}</p>
                      </div>
                      <div>
                        <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">User ID</p>
                        <p className="font-secondary font-medium text-[hsl(var(--text-primary))] break-all">{selectedUser.id}</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button variant="outline" className="min-h-[--touch-target-min]" onClick={() => setSelectedUser(null)} aria-label="Close user details dialog">
                        Close
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() => {
                          impersonationMutation.mutate(selectedUser.id);
                          setSelectedUser(null);
                        }}
                        className="min-h-[--touch-target-min]"
                        aria-label={`Impersonate ${selectedUser.first_name}`}
                        disabled={impersonationMutation.isPending}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Impersonate
                      </Button>

                      {selectedUser.status === "suspended" ? (
                        <Button
                          onClick={() => {
                            statusMutation.mutate({ userId: selectedUser.id, newStatus: "active" });
                            setSelectedUser(null);
                          }}
                          className="bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))] hover:bg-[hsl(var(--success-bg))]/90 min-h-[--touch-target-min]"
                          aria-label={`Reactivate ${selectedUser.first_name}`}
                          disabled={statusMutation.isPending}
                        >
                          <UserCheck className="h-4 w-4 mr-2" />
                          Reactivate User
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            statusMutation.mutate({ userId: selectedUser.id, newStatus: "suspended" });
                            setSelectedUser(null);
                          }}
                          className="bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))] hover:bg-[hsl(var(--error-bg))]/90 min-h-[--touch-target-min]"
                          aria-label={`Suspend ${selectedUser.first_name}`}
                          disabled={statusMutation.isPending}
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          Suspend User
                        </Button>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
}
