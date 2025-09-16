import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
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
    joinDate: "2024-01-05",
    lastSession: "2024-01-10",
    nextSession: "2024-01-15 2:00 PM",
    totalSessions: 5,
    sessionType: "Therapy Session",
    notes: "Working on work-life balance and stress management"
  },
  {
    id: "3",
    initials: "A.R.",
    email: "a.robinson@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    status: "Inactive", 
    joinDate: "2023-12-20",
    lastSession: "2024-01-08",
    nextSession: null,
    totalSessions: 8,
    sessionType: "Therapy Session",
    notes: "Completed initial treatment goals, on break"
  },
  {
    id: "4",
    initials: "T.W.",
    email: "t.wilson@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    status: "Pending",
    joinDate: "2024-01-14",
    lastSession: null,
    nextSession: "2024-01-16 11:00 AM",
    totalSessions: 0,
    sessionType: "Chemistry Call",
    notes: "New client, first meeting scheduled"
  }
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, string> = {
    "Active": "bg-success text-success-foreground",
    "Inactive": "bg-muted text-muted-foreground", 
    "Pending": "bg-warning text-warning-foreground",
    "Cancelled": "bg-destructive text-destructive-foreground"
  };

  return (
    <Badge className={variants[status] || "bg-muted text-muted-foreground"}>
      {status}
    </Badge>
  );
};

export default function TherapistClients() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-primary text-3xl font-bold text-text-primary">
                  Client Directory
                </h1>
                <p className="font-secondary text-text-secondary mt-2">
                  Manage your client relationships and files
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                <Input 
                  placeholder="Search clients..." 
                  className="pl-10"
                />
              </div>
              <select className="px-3 py-2 border rounded-md bg-background font-secondary text-text-primary">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Client List */}
            <div className="space-y-4">
              {clients.map((client) => (
                <Card key={client.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={client.avatar} />
                          <AvatarFallback>{client.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-primary font-semibold text-text-primary">
                              Client {client.initials}
                            </h3>
                            {getStatusBadge(client.status)}
                          </div>
                          <p className="font-secondary text-text-secondary text-sm">
                            {client.email}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-text-muted">
                            <span>Joined: {client.joinDate}</span>
                            <span>Sessions: {client.totalSessions}</span>
                            {client.lastSession && (
                              <span>Last: {client.lastSession}</span>
                            )}
                          </div>
                          {client.notes && (
                            <p className="font-secondary text-text-muted text-sm mt-2 max-w-md">
                              {client.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          {client.nextSession ? (
                            <div>
                              <p className="font-secondary text-text-primary text-sm font-semibold">
                                Next Session
                              </p>
                              <p className="font-secondary text-text-secondary text-sm">
                                {client.nextSession}
                              </p>
                              <p className="font-secondary text-text-muted text-xs">
                                {client.sessionType}
                              </p>
                            </div>
                          ) : (
                            <p className="font-secondary text-text-muted text-sm">
                              No upcoming sessions
                            </p>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            Notes
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <p className="font-secondary text-text-secondary text-sm">
                Showing 4 of 4 clients
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}