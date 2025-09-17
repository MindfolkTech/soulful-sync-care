import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, Calendar, FileText, MoreHorizontal, Filter } from "lucide-react";

const clients = [
  {
    id: "1",
    initials: "J.D.",
    email: "j.doe@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b196?w=100&h=100&fit=crop&crop=face",
    status: "Active",
    joinDate: "2024-01-10",
    lastSession: "2024-01-12",
    nextSession: "2024-01-15 10:00 AM",
    totalSessions: 3,
    sessionType: "Chemistry Call",
    notes: "Making good progress with anxiety management techniques"
  },
  {
    id: "2",
    initials: "M.S.",
    email: "m.smith@email.com", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    status: "Active",
    joinDate: "2024-01-08",
    lastSession: "2024-01-11",
    nextSession: "2024-01-16 2:00 PM",
    totalSessions: 5,
    sessionType: "Therapy Session",
    notes: "Working on communication skills and relationship building"
  },
  {
    id: "3",
    initials: "S.L.",
    email: "sarah.lee@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    status: "Inactive",
    joinDate: "2023-12-15",
    lastSession: "2023-12-20",
    nextSession: null,
    totalSessions: 2,
    sessionType: "Chemistry Call",
    notes: "Completed initial sessions, considering ongoing therapy"
  },
  {
    id: "4",
    initials: "R.P.",
    email: "robert.parker@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    status: "Active",
    joinDate: "2024-01-05",
    lastSession: "2024-01-10",
    nextSession: "2024-01-17 11:00 AM",
    totalSessions: 4,
    sessionType: "Therapy Session",
    notes: "Focusing on stress management and work-life balance"
  },
  {
    id: "5",
    initials: "L.M.",
    email: "lisa.martinez@email.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    status: "Active",
    joinDate: "2023-12-28",
    lastSession: "2024-01-09",
    nextSession: "2024-01-18 3:30 PM",
    totalSessions: 6,
    sessionType: "Therapy Session",
    notes: "Long-term client showing excellent progress with depression management"
  }
];

export default function TherapistClients() {
  return (
    <DashboardLayout 
      title="My Clients"
      subtitle="Manage your client relationships and session history"
    >
      <Stack className="space-y-6">
        {/* Search and Filter Controls */}
        <HStack className="justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search clients..." 
              className="pl-10 min-h-touch-min"
            />
          </div>
          <HStack>
            <Button variant="outline" className="min-h-touch-min">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <select className="px-3 py-2 border rounded-md bg-background font-secondary text-foreground min-h-touch-min">
              <option>All Clients</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </HStack>
        </HStack>

        {/* Client Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 md:p-5 lg:p-6">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-foreground">5</div>
                <div className="font-secondary text-muted-foreground text-sm">Total Clients</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-5 lg:p-6">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-success">4</div>
                <div className="font-secondary text-muted-foreground text-sm">Active</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-5 lg:p-6">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-foreground">20</div>
                <div className="font-secondary text-muted-foreground text-sm">Total Sessions</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-5 lg:p-6">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-foreground">4.9</div>
                <div className="font-secondary text-muted-foreground text-sm">Avg Rating</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client List */}
        <Card>
          <CardContent className="p-0">
            <div className="space-y-0">
              {clients.map((client, index) => (
                <div 
                  key={client.id} 
                  className={`p-4 md:p-5 lg:p-6 hover:bg-muted/50 transition-colors ${
                    index !== clients.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={client.avatar} alt={client.initials} />
                        <AvatarFallback className="bg-surface-accent text-jovial-jade font-secondary font-semibold">
                          {client.initials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-secondary font-semibold text-foreground truncate">
                            {client.email}
                          </h3>
                          <Badge 
                            variant={client.status === "Active" ? "secondary" : "outline"}
                            className={client.status === "Active" ? "bg-success text-white" : "bg-warning text-foreground"}
                          >
                            {client.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Sessions:</span> {client.totalSessions}
                          </div>
                          <div>
                            <span className="font-medium">Last:</span> {new Date(client.lastSession).toLocaleDateString()}
                          </div>
                          {client.nextSession && (
                            <div>
                              <span className="font-medium">Next:</span> {client.nextSession}
                            </div>
                          )}
                        </div>
                        
                        {client.notes && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {client.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <HStack className="gap-2">
                      <Button variant="ghost" size="sm" className="min-h-touch-min">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="min-h-touch-min">
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="min-h-touch-min">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="min-h-touch-min">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </HStack>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Stack>
    </DashboardLayout>
  );
}