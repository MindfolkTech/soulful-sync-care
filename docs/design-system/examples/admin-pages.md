# Admin Pages Examples

## Overview

This document provides comprehensive examples of how to implement admin pages using the AdminLayout component and following the content structure pattern.

## 🏗️ Base Structure

All admin pages must follow this exact structure:

```tsx
import { AdminLayout } from "@/components/layout/admin-layout";
import { Container } from "@/components/ui/container";

export default function AdminPage() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            {/* Page content goes here */}
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
}
```

## 📊 Overview Dashboard

### Overview
The main admin dashboard showing system metrics, user statistics, and platform insights.

```tsx
import { AdminLayout } from "@/components/layout/admin-layout";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Shield, Calendar, TrendingUp, TrendingDown } from "lucide-react";

export default function AdminOverview() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold font-primary">Admin Overview</h1>
              <p className="text-gray-600">System metrics and platform insights</p>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Therapists</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% from last month
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <div className="flex items-center text-xs text-red-600">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -5 from last week
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,432</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +18% from last month
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts and Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart component would go here
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Uptime</span>
                      <span className="text-sm font-medium">99.9%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Response Time</span>
                      <span className="text-sm font-medium">120ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Error Rate</span>
                      <span className="text-sm font-medium">0.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
}
```

## 👥 User Management

### Overview
Comprehensive user management page with search, filtering, and user actions.

```tsx
import { AdminLayout } from "@/components/layout/admin-layout";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, MoreHorizontal, Edit, Trash2, Shield } from "lucide-react";

export default function UserManagement() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold font-primary">User Management</h1>
                <p className="text-gray-600">Monitor and manage platform users</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
            
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search users..." className="pl-10" />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="client">Clients</SelectItem>
                      <SelectItem value="therapist">Therapists</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            {/* User Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">SJ</span>
                          </div>
                          <div>
                            <p className="font-medium">Sarah Johnson</p>
                            <p className="text-sm text-gray-600">sarah.johnson@email.com</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Client
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>Jan 15, 2024</TableCell>
                      <TableCell>2 hours ago</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-green-600">MC</span>
                          </div>
                          <div>
                            <p className="font-medium">Mike Chen</p>
                            <p className="text-sm text-gray-600">mike.chen@email.com</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]">
                          Therapist
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell>Feb 3, 2024</TableCell>
                      <TableCell>1 day ago</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
}
```

## 🛡️ Content Moderation

### Overview
Content moderation page for reviewing flagged content and managing platform safety.

```tsx
import { AdminLayout } from "@/components/layout/admin-layout";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, AlertTriangle, Shield, Eye } from "lucide-react";

export default function ContentModeration() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold font-primary">Content Moderation</h1>
              <p className="text-gray-600">Review and manage flagged content</p>
            </div>
            
            {/* Status Overview */}
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]">
                <AlertTriangle className="h-3 w-3 mr-1" />
                3 Pending Review
              </Badge>
              <Badge variant="secondary" className="bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))]">
                <Shield className="h-3 w-3 mr-1" />
                1 High Priority
              </Badge>
              <Button variant="outline" size="sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Selected
              </Button>
            </div>
            
            {/* Moderation Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Reported User</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reported</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="font-medium">Message</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-gray-600">john.doe@email.com</p>
                        </div>
                      </TableCell>
                      <TableCell>Inappropriate language</TableCell>
                      <TableCell>
                        <Badge variant="destructive" className="bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))]">
                          High
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell>2 hours ago</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="font-medium">Profile</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">Jane Smith</p>
                          <p className="text-sm text-gray-600">jane.smith@email.com</p>
                        </div>
                      </TableCell>
                      <TableCell>Misleading information</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]">
                          Medium
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell>4 hours ago</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
}
```

## 👨‍⚕️ Therapist Management

### Overview
Therapist verification and management page.

```tsx
import { AdminLayout } from "@/components/layout/admin-layout";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, UserCheck, FileText, Star } from "lucide-react";

export default function TherapistManagement() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold font-primary">Therapist Management</h1>
              <p className="text-gray-600">Verify and manage therapist applications</p>
            </div>
            
            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Awaiting review</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Verified Therapists</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">Active on platform</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.7</div>
                  <p className="text-xs text-muted-foreground">Platform average</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Therapist Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Therapist</TableHead>
                      <TableHead>License</TableHead>
                      <TableHead>Specialties</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">ED</span>
                          </div>
                          <div>
                            <p className="font-medium">Emily Davis</p>
                            <p className="text-sm text-gray-600">emily.davis@email.com</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>LPC-12345</TableCell>
                      <TableCell>Anxiety, Depression</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">4.8</span>
                        </div>
                      </TableCell>
                      <TableCell>3 days ago</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-green-600">RJ</span>
                          </div>
                          <div>
                            <p className="font-medium">Robert Johnson</p>
                            <p className="text-sm text-gray-600">robert.johnson@email.com</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>LCSW-67890</TableCell>
                      <TableCell>PTSD, Trauma</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]">
                          Verified
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">4.9</span>
                        </div>
                      </TableCell>
                      <TableCell>2 weeks ago</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
}
```

## 📅 Booking Management

### Overview
Admin booking oversight and management page.

```tsx
import { AdminLayout } from "@/components/layout/admin-layout";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Users, Video, MessageSquare } from "lucide-react";

export default function BookingManagement() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold font-primary">Booking Management</h1>
              <p className="text-gray-600">Monitor and manage platform bookings</p>
            </div>
            
            {/* Booking Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">Scheduled</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,450</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Session</TableHead>
                      <TableHead>Therapist</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Video className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Individual Therapy</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">Dr. Sarah Johnson</p>
                          <p className="text-sm text-gray-600">LPC-12345</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">Mike Chen</p>
                          <p className="text-sm text-gray-600">mike.chen@email.com</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">Today, 2:00 PM</p>
                          <p className="text-sm text-gray-600">1 hour</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]">
                          Confirmed
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
}
```

## 🎯 Key Implementation Notes

### 1. Always Use the Base Structure
Every admin page must start with the AdminLayout wrapper and follow the content structure pattern.

### 2. Typography Hierarchy
- **H1, H2, H3**: Use `font-primary` (Crimson Pro) for page titles and major section headings
- **H4, H5, H6, Body Text**: Use `font-secondary` (Helvetica Neue) for all other text
- **Client Names**: Use `font-secondary font-bold` for special emphasis

### 3. Responsive Design
- Use responsive grid classes (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`)
- Implement responsive padding (`p-4 md:p-6 lg:p-8`)
- Test on multiple breakpoints

### 4. Accessibility
- Use proper heading hierarchy (h1, h2, h3)
- Ensure all interactive elements have proper labels
- Test with keyboard navigation

### 5. Performance
- Use lazy loading for heavy components
- Implement proper image optimization
- Minimize re-renders with React.memo

### 6. Consistency
- Follow the same spacing patterns (`space-y-6`)
- Use consistent card layouts
- Maintain the same button and input styles

## Related Documentation

- **[AdminLayout Component](../components/AdminLayout.md)**: Component documentation
- **[Content Structure Pattern](../patterns/content-structure.md)**: Structure requirements
- **[Responsive Patterns](../../RESPONSIVE_PATTERNS.md)**: Responsive design guidelines
