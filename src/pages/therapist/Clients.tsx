import { Link, useNavigate } from "react-router-dom";
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, Users, Calendar, Clock } from "lucide-react";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const clients = [
  {
    id: "1",
    name: "Jane Doe",
    initials: "J.D.",
    email: "j.doe@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b196?w=100&h=100&fit=crop&crop=face",
    status: "Active",
    joinDate: "2024-01-10",
    lastSession: "2024-09-20", // Recent
    nextSession: "2024-09-25T10:00:00Z", // Upcoming
    totalSessions: 3,
  },
  {
    id: "2",
    name: "Michael Smith",
    initials: "M.S.",
    email: "m.smith@email.com", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    status: "Active",
    joinDate: "2024-01-08",
    lastSession: "2024-09-18", // Recent
    nextSession: "2024-09-26T14:00:00Z", // Upcoming
    totalSessions: 5,
  },
  {
    id: "3",
    name: "Sarah Lee",
    initials: "S.L.",
    email: "sarah.lee@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    status: "Inactive",
    joinDate: "2023-12-15",
    lastSession: "2023-12-20", // Not recent
    nextSession: null,
    totalSessions: 2,
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

const ClientRow = ({ client, onRowClick }: { client: any, onRowClick: (id: string) => void }) => (
    <div
        className="block p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b"
        onClick={() => onRowClick(client.id)}
    >
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <Avatar className="w-12 h-12">
                    <AvatarImage src={client.avatar} alt={client.initials} />
                    <AvatarFallback>{client.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold truncate">{client.name}</h4>
                        <Badge variant={client.status === "Active" ? "secondary" : "outline"}>
                            {client.status}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{client.email}</p>
                </div>
            </div>
            <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
        </div>
    </div>
);


export default function TherapistClients() {
  const navigate = useNavigate();
  
  const handleClientClick = (clientId: string) => {
    navigate(`/t/clients/${clientId}`);
  };

  const upcomingClients = clients.filter(c => c.nextSession && new Date(c.nextSession) > new Date());
  
  const recentClients = clients.filter(c => {
      if (!c.lastSession) return false;
      const lastSessionDate = new Date(c.lastSession);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return lastSessionDate > thirtyDaysAgo;
  });

  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-4">
            <div>
              <h1 className="font-primary text-3xl">My Clients</h1>
              <p className="text-muted-foreground">Manage your client relationships and session history.</p>
            </div>

            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search clients..." className="pl-10" />
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList>
                    <TabsTrigger value="all"><Users className="w-4 h-4 mr-2" /> All Clients</TabsTrigger>
                    <TabsTrigger value="upcoming"><Calendar className="w-4 h-4 mr-2" /> Upcoming</TabsTrigger>
                    <TabsTrigger value="recent"><Clock className="w-4 h-4 mr-2" /> Recent</TabsTrigger>
                </TabsList>
                <Card className="mt-4">
                    <CardContent className="p-0">
                        <TabsContent value="all">
                            {clients.map(client => <ClientRow key={client.id} client={client} onRowClick={handleClientClick} />)}
                        </TabsContent>
                        <TabsContent value="upcoming">
                             {upcomingClients.map(client => <ClientRow key={client.id} client={client} onRowClick={handleClientClick} />)}
                        </TabsContent>
                        <TabsContent value="recent">
                            {recentClients.map(client => <ClientRow key={client.id} client={client} onRowClick={handleClientClick} />)}
                        </TabsContent>
                    </CardContent>
                </Card>
            </Tabs>
          </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}
