import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign, TrendingUp, Clock, Video } from "lucide-react";

export default function TherapistDashboard() {
  const upcomingAppointments = [
    {
      id: "1",
      clientName: "J.D.",
      type: "Chemistry Call",
      time: "2:00 PM",
      duration: "15 min",
      status: "confirmed"
    },
    {
      id: "2", 
      clientName: "M.S.",
      type: "Therapy Session",
      time: "4:00 PM",
      duration: "60 min",
      status: "confirmed"
    }
  ];

  const recentClients = [
    { id: "1", initials: "J.D.", status: "Active", lastSession: "2 days ago" },
    { id: "2", initials: "M.S.", status: "Active", lastSession: "1 week ago" },
    { id: "3", initials: "A.R.", status: "Pending", lastSession: "Never" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="space-y-8">
            <div>
              <h1 className="font-primary text-3xl font-bold text-text-primary">
                Welcome back, Dr. Chen
              </h1>
              <p className="font-secondary text-text-secondary mt-2">
                Here's what's happening with your practice today
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-secondary text-text-secondary text-sm">Today's Sessions</p>
                      <p className="font-primary text-2xl font-bold text-text-primary">3</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-secondary text-text-secondary text-sm">Active Clients</p>
                      <p className="font-primary text-2xl font-bold text-text-primary">12</p>
                    </div>
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-secondary text-text-secondary text-sm">This Week's Revenue</p>
                      <p className="font-primary text-2xl font-bold text-text-primary">£640</p>
                    </div>
                    <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-warning" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-secondary text-text-secondary text-sm">Profile Views</p>
                      <p className="font-primary text-2xl font-bold text-text-primary">28</p>
                      <p className="font-secondary text-success text-xs">+12% this week</p>
                    </div>
                    <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-info" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Upcoming Appointments */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-primary">Today's Schedule</CardTitle>
                    <Button variant="outline" size="sm">View All</Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-surface-accent rounded-full flex items-center justify-center">
                            <span className="font-secondary font-semibold text-text-primary text-sm">
                              {appointment.clientName}
                            </span>
                          </div>
                          <div>
                            <p className="font-secondary font-semibold text-text-primary">
                              {appointment.type}
                            </p>
                            <div className="flex items-center space-x-2 text-sm text-text-secondary">
                              <Clock className="w-4 h-4" />
                              <span>{appointment.time} • {appointment.duration}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Badge variant="secondary">
                            {appointment.status}
                          </Badge>
                          <Button size="sm">
                            <Video className="w-4 h-4 mr-2" />
                            Join
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {upcomingAppointments.length === 0 && (
                      <div className="text-center py-8">
                        <Calendar className="w-12 h-12 mx-auto text-text-muted mb-4" />
                        <p className="font-secondary text-text-secondary">
                          No appointments scheduled for today
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Client Status */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Calendar
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Clients
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary">Recent Clients</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentClients.map((client) => (
                      <div key={client.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-surface-accent rounded-full flex items-center justify-center">
                            <span className="font-secondary text-text-primary text-sm">
                              {client.initials}
                            </span>
                          </div>
                          <div>
                            <p className="font-secondary text-text-primary text-sm">
                              Client {client.initials}
                            </p>
                            <p className="font-secondary text-text-muted text-xs">
                              {client.lastSession}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant={client.status === "Active" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {client.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}