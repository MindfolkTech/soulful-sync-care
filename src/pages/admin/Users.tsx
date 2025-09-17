import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImpersonationBar } from "@/components/admin/impersonation-bar";
import { Search, Filter, MoreHorizontal, User, Mail, Calendar, Shield, Eye, Ban, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "therapist" | "admin";
  status: "active" | "inactive" | "suspended";
  joinDate: string;
  lastActive: string;
  sessionsCount: number;
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "therapist",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20T10:30:00Z",
    sessionsCount: 45
  },
  {
    id: "2", 
    name: "Michael Chen",
    email: "michael.chen@email.com",
    role: "client",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "2024-01-19T14:20:00Z",
    sessionsCount: 8
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    role: "therapist",
    status: "inactive",
    joinDate: "2024-01-08",
    lastActive: "2024-01-12T09:15:00Z",
    sessionsCount: 23
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@email.com",
    role: "client",
    status: "suspended",
    joinDate: "2024-01-05",
    lastActive: "2024-01-08T16:45:00Z",
    sessionsCount: 2
  }
];

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleStatusChange = (userId: string, newStatus: User["status"]) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    toast({
      title: `User ${newStatus}`,
      description: `User status has been updated to ${newStatus}.`,
    });
  };

  const getRoleBadgeClass = (role: User["role"]) => {
    switch (role) {
      case "therapist":
        return "bg-tag-specialty text-tag-specialty-foreground";
      case "client":
        return "bg-tag-personality text-tag-personality-foreground";
      case "admin":
        return "bg-tag-misc text-tag-misc-foreground";
    }
  };

  const getStatusBadgeClass = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "inactive":
        return "bg-text-secondary text-[--on-dark]";
      case "suspended":
        return "bg-destructive text-destructive-foreground";
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
    
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(dateString);
  };

  const activeUsers = filteredUsers.filter(user => user.status === "active");
  const inactiveUsers = filteredUsers.filter(user => user.status === "inactive");
  const suspendedUsers = filteredUsers.filter(user => user.status === "suspended");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <Container>
          <div className="space-y-8">
            <div>
              <h1 className="font-primary text-3xl text-text-primary mb-2">User Management</h1>
              <p className="font-secondary text-text-secondary">Monitor and manage platform users</p>
            </div>

            {/* Impersonation Bar */}
            <ImpersonationBar />

            {/* Filters and Search */}
            <Card>
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[140px]">
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
                      <SelectTrigger className="w-full sm:w-[140px]">
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
                    <Badge variant="secondary" className="bg-success text-success-foreground">
                      {activeUsers.length} Active
                    </Badge>
                    <Badge variant="secondary" className="bg-text-secondary text-[--on-dark]">
                      {inactiveUsers.length} Inactive
                    </Badge>
                    <Badge variant="secondary" className="bg-destructive text-destructive-foreground">
                      {suspendedUsers.length} Suspended
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Sessions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <User className="mx-auto h-12 w-12 text-text-secondary mb-2" />
                          <p className="font-secondary text-text-secondary">No users found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-surface-accent flex items-center justify-center">
                                <User className="h-5 w-5 text-text-primary" />
                              </div>
                              <div>
                                <h4 className="font-secondary font-bold text-text-primary">{user.name}</h4>
                                <p className="font-secondary text-sm text-text-secondary">{user.email}</p>
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
                              <Calendar className="h-4 w-4 text-text-secondary" />
                              <span className="font-secondary text-sm text-text-secondary">
                                {formatDate(user.joinDate)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-secondary text-sm text-text-secondary">
                              {formatLastActive(user.lastActive)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="font-secondary font-medium text-text-primary">
                              {user.sessionsCount}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedUser(user)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {user.status === "suspended" ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleStatusChange(user.id, "active")}
                                  className="text-success hover:bg-success hover:text-success-foreground"
                                >
                                  <UserCheck className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleStatusChange(user.id, "suspended")}
                                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
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
          </div>
        </Container>
      </main>
      <Footer />

      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-primary">User Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-surface-accent flex items-center justify-center">
                  <User className="h-8 w-8 text-text-primary" />
                </div>
                <div className="space-y-1">
                  <h1 className="font-primary text-xl text-text-primary">{selectedUser.name}</h1>
                  <p className="font-secondary text-text-secondary">{selectedUser.email}</p>
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
                  <p className="font-secondary text-sm text-text-secondary">Join Date</p>
                  <p className="font-secondary font-medium text-text-primary">{formatDate(selectedUser.joinDate)}</p>
                </div>
                <div>
                  <p className="font-secondary text-sm text-text-secondary">Last Active</p>
                  <p className="font-secondary font-medium text-text-primary">{formatLastActive(selectedUser.lastActive)}</p>
                </div>
                <div>
                  <p className="font-secondary text-sm text-text-secondary">Total Sessions</p>
                  <p className="font-secondary font-medium text-text-primary">{selectedUser.sessionsCount}</p>
                </div>
                <div>
                  <p className="font-secondary text-sm text-text-secondary">User ID</p>
                  <p className="font-secondary font-medium text-text-primary">{selectedUser.id}</p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  Close
                </Button>
                {selectedUser.status === "suspended" ? (
                  <Button
                    onClick={() => {
                      handleStatusChange(selectedUser.id, "active");
                      setSelectedUser(null);
                    }}
                    className="bg-success text-success-foreground hover:bg-success/90"
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Reactivate User
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleStatusChange(selectedUser.id, "suspended");
                      setSelectedUser(null);
                    }}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
  );
}