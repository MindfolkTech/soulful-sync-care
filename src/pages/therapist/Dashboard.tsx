import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Video, 
  Bell, 
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  BarChart3,
  Settings,
  Star,
  ArrowUp,
  ArrowDown
} from "lucide-react";

export default function TherapistDashboard() {
  const upcomingAppointments = [
    {
      id: "1",
      clientName: "J.D.",
      type: "Chemistry Call",
      time: "2:00 PM",
      duration: "15 min",
      status: "confirmed",
      priority: "high",
      clientProgress: 75
    },
    {
      id: "2", 
      clientName: "M.S.",
      type: "Therapy Session",
      time: "4:00 PM",
      duration: "60 min",
      status: "confirmed",
      priority: "medium",
      clientProgress: 60
    },
    {
      id: "3",
      clientName: "A.R.",
      type: "Therapy Session", 
      time: "6:00 PM",
      duration: "60 min",
      status: "pending",
      priority: "high",
      clientProgress: 25
    }
  ];

  const recentClients = [
    { id: "1", initials: "J.D.", status: "Active", lastSession: "2 days ago", progress: 75, satisfaction: 4.8 },
    { id: "2", initials: "M.S.", status: "Active", lastSession: "1 week ago", progress: 60, satisfaction: 4.6 },
    { id: "3", initials: "A.R.", status: "Pending", lastSession: "Never", progress: 25, satisfaction: 0 }
  ];

  const notifications = [
    { id: "1", type: "urgent", message: "Client A.R. has rescheduled 3 times", icon: AlertTriangle },
    { id: "2", type: "info", message: "2 new messages from clients", icon: MessageSquare },
    { id: "3", type: "success", message: "Payment received: £120", icon: CheckCircle2 }
  ];

  const practiceMetrics = {
    clientRetention: 85,
    avgSatisfaction: 4.7,
    weeklyRevenue: 640,
    profileViews: 28,
    profileViewsChange: 12
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="space-y-8">
            {/* Header with Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-primary text-3xl font-bold text-text-primary">
                  Welcome back, Dr. Chen
                </h1>
                <p className="font-secondary text-text-secondary mt-2">
                  Here's what's happening with your practice today
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="w-4 h-4 mr-2" />
                  Alerts
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 text-xs">
                    3
                  </Badge>
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Customize
                </Button>
              </div>
            </div>

            {/* Urgent Notifications */}
            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="font-secondary font-semibold text-red-800">Attention Required</p>
                    <p className="font-secondary text-red-700 text-sm">
                      Client A.R. has rescheduled 3 times - consider reaching out
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto">
                    Take Action
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-secondary text-text-secondary text-sm">Today's Sessions</p>
                      <p className="font-primary text-2xl font-bold text-text-primary">3</p>
                      <p className="font-secondary text-success text-xs flex items-center">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        +1 from yesterday
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-secondary text-text-secondary text-sm">Client Retention</p>
                      <p className="font-primary text-2xl font-bold text-text-primary">{practiceMetrics.clientRetention}%</p>
                      <p className="font-secondary text-success text-xs flex items-center">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        +5% this month
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-secondary text-text-secondary text-sm">Avg Satisfaction</p>
                      <p className="font-primary text-2xl font-bold text-text-primary">{practiceMetrics.avgSatisfaction}</p>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(practiceMetrics.avgSatisfaction) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-warning" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-secondary text-text-secondary text-sm">This Week's Revenue</p>
                      <p className="font-primary text-2xl font-bold text-text-primary">£{practiceMetrics.weeklyRevenue}</p>
                      <p className="font-secondary text-success text-xs flex items-center">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        +15% from last week
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-info" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Enhanced Upcoming Appointments */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-primary">Today's Schedule</CardTitle>
                    <div className="flex space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {upcomingAppointments.filter(a => a.priority === 'high').length} High Priority
                      </Badge>
                      <Button variant="outline" size="sm">View All</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className={`flex items-center justify-between p-4 border rounded-lg ${
                        appointment.priority === 'high' ? 'border-red-200 bg-red-50' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            appointment.priority === 'high' ? 'bg-red-100' : 'bg-surface-accent'
                          }`}>
                            <span className="font-secondary font-semibold text-text-primary text-sm">
                              {appointment.clientName}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-secondary font-semibold text-text-primary">
                                {appointment.type}
                              </p>
                              {appointment.priority === 'high' && (
                                <Badge variant="destructive" className="text-xs">High Priority</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
                              <Clock className="w-4 h-4" />
                              <span>{appointment.time} • {appointment.duration}</span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-text-secondary">Progress</span>
                                <span className="text-text-primary font-medium">{appointment.clientProgress}%</span>
                              </div>
                              <Progress value={appointment.clientProgress} className="h-2" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Badge variant={appointment.status === 'confirmed' ? 'secondary' : 'outline'}>
                            {appointment.status}
                          </Badge>
                          <Button size="sm" disabled={appointment.status !== 'confirmed'}>
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

              {/* Enhanced Sidebar */}
              <div className="space-y-6">
                {/* Notifications Panel */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-primary text-lg">Notifications</CardTitle>
                    <Badge variant="destructive" className="text-xs">3 New</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`flex items-start space-x-3 p-3 rounded-lg ${
                        notification.type === 'urgent' ? 'bg-red-50 border border-red-200' : 
                        notification.type === 'success' ? 'bg-green-50 border border-green-200' : 
                        'bg-blue-50 border border-blue-200'
                      }`}>
                        <notification.icon className={`w-4 h-4 mt-0.5 ${
                          notification.type === 'urgent' ? 'text-red-500' : 
                          notification.type === 'success' ? 'text-green-500' : 
                          'text-blue-500'
                        }`} />
                        <p className="font-secondary text-sm text-text-primary">
                          {notification.message}
                        </p>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full">
                      View All Notifications
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
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
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Messages
                      <Badge variant="secondary" className="ml-auto text-xs">2</Badge>
                    </Button>
                  </CardContent>
                </Card>

                {/* Enhanced Client Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary">Client Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentClients.map((client) => (
                      <div key={client.id} className="space-y-2">
                        <div className="flex items-center justify-between">
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
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-text-secondary">Progress</span>
                            <span className="text-text-primary font-medium">{client.progress}%</span>
                          </div>
                          <Progress value={client.progress} className="h-2" />
                          {client.satisfaction > 0 && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-text-secondary">{client.satisfaction}/5.0</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full">
                      View All Clients
                    </Button>
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