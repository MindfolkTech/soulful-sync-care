import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, MessageCircle, MoreHorizontal, Filter } from "lucide-react";

const bookings = [
  {
    id: "1",
    clientInitials: "J.D.",
    clientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b196?w=100&h=100&fit=crop&crop=face",
    type: "Chemistry Call",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "15 min",
    status: "confirmed",
    rate: "Free",
    notes: "First meeting to discuss anxiety management"
  },
  {
    id: "2",
    clientInitials: "M.S.",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    type: "Therapy Session",
    date: "2024-01-15",
    time: "2:00 PM",
    duration: "60 min",
    status: "confirmed",
    rate: "£80",
    notes: "Follow-up session on work-related stress"
  },
  {
    id: "3",
    clientInitials: "A.R.",
    clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    type: "Therapy Session", 
    date: "2024-01-12",
    time: "4:00 PM",
    duration: "60 min",
    status: "completed",
    rate: "£80",
    notes: "Session focused on relationship challenges"
  }
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    confirmed: "default",
    completed: "secondary",
    cancelled: "destructive",
    pending: "outline",
    "no-show": "destructive"
  };

  const colors: Record<string, string> = {
    confirmed: "bg-primary text-primary-foreground",
    completed: "bg-success text-success-foreground",
    cancelled: "bg-destructive text-destructive-foreground",
    pending: "bg-warning text-warning-foreground",
    "no-show": "bg-destructive text-destructive-foreground"
  };

  return (
    <Badge className={colors[status] || "bg-muted text-muted-foreground"}>
      {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
    </Badge>
  );
};

export default function TherapistBookings() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-primary text-3xl font-bold text-text-primary">
                  Bookings
                </h1>
                <p className="font-secondary text-text-secondary mt-2">
                  Manage your appointments and sessions
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

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="font-secondary text-text-secondary text-sm">Today</p>
                  <p className="font-primary text-2xl font-bold text-text-primary">3</p>
                  <p className="font-secondary text-text-muted text-xs">Sessions</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="font-secondary text-text-secondary text-sm">This Week</p>
                  <p className="font-primary text-2xl font-bold text-primary">12</p>
                  <p className="font-secondary text-text-muted text-xs">Confirmed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="font-secondary text-text-secondary text-sm">Revenue</p>
                  <p className="font-primary text-2xl font-bold text-success">£640</p>
                  <p className="font-secondary text-text-muted text-xs">This week</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="font-secondary text-text-secondary text-sm">No-shows</p>
                  <p className="font-primary text-2xl font-bold text-destructive">1</p>
                  <p className="font-secondary text-text-muted text-xs">This month</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {bookings
                  .filter(booking => booking.status === "confirmed" && booking.date >= "2024-01-15")
                  .map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={booking.clientAvatar} />
                              <AvatarFallback>{booking.clientInitials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-secondary font-semibold text-text-primary">
                                Client {booking.clientInitials}
                              </h3>
                              <p className="font-secondary text-text-secondary">
                                {booking.type}
                              </p>
                              <div className="flex items-center space-x-4 mt-1 text-sm text-text-muted">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{booking.time} ({booking.duration})</span>
                                </div>
                              </div>
                              {booking.notes && (
                                <p className="font-secondary text-text-muted text-sm mt-1 max-w-md">
                                  {booking.notes}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-secondary font-semibold text-text-primary">
                                {booking.rate}
                              </p>
                              {getStatusBadge(booking.status)}
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm">
                                <Video className="w-4 h-4 mr-2" />
                                Join
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Message
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
              </TabsContent>

              <TabsContent value="today" className="space-y-4">
                {bookings
                  .filter(booking => booking.date === "2024-01-15")
                  .map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={booking.clientAvatar} />
                              <AvatarFallback>{booking.clientInitials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-secondary font-semibold text-text-primary">
                                Client {booking.clientInitials}
                              </h3>
                              <p className="font-secondary text-text-secondary">
                                {booking.type}
                              </p>
                              <div className="flex items-center space-x-1 mt-1 text-sm text-text-muted">
                                <Clock className="w-4 h-4" />
                                <span>{booking.time} ({booking.duration})</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-secondary font-semibold text-text-primary">
                                {booking.rate}
                              </p>
                              {getStatusBadge(booking.status)}
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm">
                                <Video className="w-4 h-4 mr-2" />
                                Join
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {bookings
                  .filter(booking => booking.status === "completed")
                  .map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={booking.clientAvatar} />
                              <AvatarFallback>{booking.clientInitials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-secondary font-semibold text-text-primary">
                                Client {booking.clientInitials}
                              </h3>
                              <p className="font-secondary text-text-secondary">
                                {booking.type}
                              </p>
                              <div className="flex items-center space-x-4 mt-1 text-sm text-text-muted">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{booking.time} ({booking.duration})</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-secondary font-semibold text-text-primary">
                                {booking.rate}
                              </p>
                              {getStatusBadge(booking.status)}
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                Add Notes
                              </Button>
                              <Button size="sm" variant="outline">
                                Schedule Next
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="cancelled">
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="font-secondary text-text-secondary">
                      No cancelled appointments
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}