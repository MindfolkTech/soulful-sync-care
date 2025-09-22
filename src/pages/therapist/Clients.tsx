import { Link, useNavigate } from "react-router-dom";
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, Calendar, FileText, MoreHorizontal, Filter } from "lucide-react";
import * as React from "react";

const clients = [
  {
    id: "1",
    name: "Jane Doe",
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
    name: "Michael Smith",
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
    name: "Sarah Lee",
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
    name: "Robert Parker",
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
    name: "Lisa Martinez",
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
  const navigate = useNavigate();
  const [clientList, setClientList] = React.useState(clients);

  const handleClientClick = (clientId: string) => {
    navigate(`/t/clients/${clientId}`);
  };

  const handleStatusToggle = (clientId: string, event: React.MouseEvent) => {
    event.preventDefault(); // Prevent navigation when clicking the badge
    event.stopPropagation();
    
    setClientList(prevClients => 
      prevClients.map(client => 
        client.id === clientId 
          ? { ...client, status: client.status === "Active" ? "Inactive" : "Active" }
          : client
      )
    );
  };

  return (
    <TherapistLayout>
      <div className="p-8">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">My Clients</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Manage your client relationships and session history</p>
            </div>
      <Stack className="space-y-[--space-lg]">
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
            <Button variant="outline" className="min-h-touch-min" aria-label="Filter clients">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[--space-md]">
          <Card>
            <CardContent className="p-[--space-md] md:p-[--space-lg] lg:p-[--space-xl]">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-foreground">5</div>
                <div className="font-secondary text-muted-foreground text-sm">Total Clients</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-[--space-md] md:p-[--space-lg] lg:p-[--space-xl]">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-[hsl(var(--success-text))]">4</div>
                <div className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Active</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-[--space-md] md:p-[--space-lg] lg:p-[--space-xl]">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-foreground">20</div>
                <div className="font-secondary text-muted-foreground text-sm">Total Sessions</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-[--space-md] md:p-[--space-lg] lg:p-[--space-xl]">
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
              {clientList.map((client, index) => (
                <div
                  key={client.id}
                  className={`block p-[--space-md] md:p-[--space-lg] lg:p-[--space-xl] hover:bg-muted/50 transition-colors cursor-pointer ${
                    index !== clientList.length - 1 ? 'border-b border-border' : ''
                  }`}
                  onClick={() => handleClientClick(client.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClientClick(client.id);
                        }}
                        className="w-12 h-12 rounded-full overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
                        aria-label={`View ${client.name}'s profile`}
                      >
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={client.avatar} alt={client.initials} />
                          <AvatarFallback className="bg-surface-accent text-[hsl(var(--jovial-jade))] font-secondary font-semibold">
                            {client.initials}
                          </AvatarFallback>
                        </Avatar>
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-secondary font-bold text-foreground truncate">
                            {client.name || 'Unknown Client'}
                          </h4>
                          <button
                            onClick={(e) => handleStatusToggle(client.id, e)}
                            className="cursor-pointer"
                            aria-label={`Toggle ${client.name} status between Active and Inactive`}
                          >
                            <Badge 
                              variant={client.status === "Active" ? "secondary" : "outline"}
                              className={client.status === "Active" ? "bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))] hover:bg-[hsl(var(--success-bg))]/90" : "bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))] hover:bg-[hsl(var(--warning-bg))]/90"}
                            >
                              {client.status}
                            </Badge>
                          </button>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:gap-4 gap-1 text-sm text-muted-foreground">
                          <div className="flex-1">
                            <span className="font-secondary font-medium">Sessions:</span> {client.totalSessions}
                          </div>
                          <div className="flex-1">
                            <span className="font-secondary font-medium">Last:</span> {new Date(client.lastSession).toLocaleDateString()}
                          </div>
                          {client.nextSession && (
                            <div className="flex-1">
                              <span className="font-secondary font-medium">Next:</span> {client.nextSession}
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
                    
                    {/* Action buttons - Mobile: Vertical stack, Desktop: Horizontal */}
                    <div className="flex flex-col md:flex-row gap-2">
                      <Button variant="ghost" size="sm" className="min-h-touch-min" aria-label={`Send message to ${client.name}`}>
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="min-h-touch-min" aria-label={`Schedule appointment with ${client.name}`}>
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="min-h-touch-min" aria-label={`View notes for ${client.name}`}>
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="min-h-touch-min" aria-label={`More options for ${client.name}`}>
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </Stack>
          </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}
