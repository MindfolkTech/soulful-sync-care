import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/ui/bottom-nav";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Video, MessageCircle, MoreHorizontal } from "lucide-react";

const appointments = [
  {
    id: "1",
    therapist: "Dr. Sarah Chen",
    type: "Chemistry Call",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "15 min",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "2",
    therapist: "Michael Thompson",
    type: "Therapy Session",
    date: "2024-01-12",
    time: "2:00 PM", 
    duration: "60 min",
    status: "completed",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face"
  }
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    confirmed: "default",
    completed: "secondary", 
    cancelled: "destructive",
    pending: "outline"
  };

  return (
    <Badge variant={variants[status] || "outline"}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default function Appointments() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-primary text-3xl font-bold text-text-primary">
                My Appointments
              </h1>
              <p className="font-secondary text-text-secondary mt-2">
                Manage your therapy sessions and chemistry calls
              </p>
            </div>

            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {appointments
                  .filter(apt => apt.status === "confirmed")
                  .map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={appointment.image}
                              alt={appointment.therapist}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-primary text-lg font-semibold text-text-primary">
                                {appointment.therapist}
                              </h3>
                              <p className="font-secondary text-text-secondary">
                                {appointment.type}
                              </p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-text-muted">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{appointment.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{appointment.time} ({appointment.duration})</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            {getStatusBadge(appointment.status)}
                            <div className="flex space-x-2">
                              <Button size="sm" onClick={() => window.location.href = `/session/${appointment.id}`}>
                                <Video className="w-4 h-4 mr-2" />
                                Join
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => window.location.href = '/messages'}>
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Message
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => {
                                // TODO: Implement appointment options menu
                                console.log("Show appointment options");
                              }}>
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
                {appointments
                  .filter(apt => apt.status === "completed")
                  .map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={appointment.image}
                              alt={appointment.therapist}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-primary text-lg font-semibold text-text-primary">
                                {appointment.therapist}
                              </h3>
                              <p className="font-secondary text-text-secondary">
                                {appointment.type}
                              </p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-text-muted">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{appointment.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{appointment.time} ({appointment.duration})</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            {getStatusBadge(appointment.status)}
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => window.location.href = `/therapists/${appointment.id}`}>
                                Book Again
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => {
                                // TODO: Implement review system
                                console.log("Leave review for", appointment.therapist);
                              }}>
                                Leave Review
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
      <BottomNav />
    </div>
  );
}