import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Users, 
  DollarSign, 
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
  ArrowDown,
  ExternalLink,
  Search,
  Home,
  User,
  TrendingUp,
  PlusCircle
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function TherapistDashboard() {
  const upcomingAppointments = [
    {
      id: "1",
      clientName: "Deborah Young",
      clientInitials: "DY",
      type: "Chemistry Call",
      time: "Apr 21 10:00am - 10:30am",
      duration: "30 min",
      status: "confirmed",
      priority: "high",
      canJoin: true
    },
    {
      id: "2", 
      clientName: "Lindsey Jacobs",
      clientInitials: "LJ",
      type: "Therapy Session",
      time: "Apr 21 10:30am - 11:00am",
      duration: "30 min",
      status: "confirmed",
      priority: "medium",
      canJoin: true
    },
    {
      id: "3",
      clientName: "John Smith",
      clientInitials: "JS",
      type: "Therapy Session", 
      time: "Apr 21 11:00am - 11:30am",
      duration: "30 min",
      status: "confirmed",
      priority: "high",
      canJoin: true
    }
  ];

  const recentClients = [
    { 
      id: "1", 
      name: "Jessica Stewarts", 
      initials: "JS", 
      email: "Prabodhan@gmail.com", 
      status: "Active", 
      lastSession: "2 days ago", 
      progress: 75, 
      satisfaction: 4.8 
    },
    { 
      id: "2", 
      name: "Debbie Vectra", 
      initials: "DV", 
      email: "dv1092@gmail.com", 
      status: "Active", 
      lastSession: "1 week ago", 
      progress: 60, 
      satisfaction: 4.6 
    },
    { 
      id: "3", 
      name: "Paul Sung", 
      initials: "PS", 
      email: "p.sung0982@gmail.com", 
      status: "Inactive", 
      lastSession: "Never", 
      progress: 25, 
      satisfaction: 0 
    }
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
    <DashboardLayout title="Welcome Back, Sarah!">
      {/* 4-Widget Grid Layout with proper height constraints */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full min-w-0 h-full max-h-[calc(100vh-12rem)]">
        
        {/* Widget 1: Upcoming Appointments */}
        <Card className="min-w-0 overflow-hidden flex flex-col">
          <CardHeader className="flex-shrink-0 p-3 md:p-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="font-primary text-jovial-jade text-sm md:text-base">
                Upcoming Appointments
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="text-garden-green text-xs px-2">
                  EDIT
                </Button>
                <Button variant="ghost" size="sm" className="text-garden-green text-xs px-2">
                  OPEN CALENDAR
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 p-3 md:p-4 pt-0">
            <div className="space-y-2 h-full overflow-y-auto">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="flex items-center justify-between p-2 border rounded-lg min-h-[44px]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-surface-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-secondary text-foreground text-xs">{appointment.clientInitials}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-secondary text-foreground text-sm truncate">{appointment.clientName}</p>
                      <p className="font-secondary text-muted-foreground text-xs truncate">{appointment.time}</p>
                    </div>
                  </div>
                  <Button className="bg-garden-green text-white hover:bg-elated-emerald text-xs px-3 py-1 flex-shrink-0">
                    Join Now →
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Widget 2: My Client Dashboard */}
        <Card className="min-w-0 overflow-hidden flex flex-col">
          <CardHeader className="flex-shrink-0 p-3 md:p-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="font-primary text-jovial-jade text-sm md:text-base">
                My Client Dashboard
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="text-garden-green text-xs px-2">EDIT</Button>
                <Button variant="ghost" size="sm" className="text-garden-green text-xs px-2">
                  OPEN CLIENTS
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 p-3 md:p-4 pt-0">
            <div className="space-y-2 h-full overflow-y-auto">
              {recentClients.map(client => (
                <div key={client.id} className="flex items-center justify-between p-2 border rounded-lg min-h-[44px]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-surface-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-secondary text-foreground text-xs">{client.initials}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-secondary text-foreground text-sm truncate">{client.name}</p>
                      <p className="font-secondary text-muted-foreground text-xs truncate">{client.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Badge 
                      variant={client.status === "Active" ? "secondary" : "outline"}
                      className={`text-xs ${client.status === "Active" ? "bg-success text-white" : "bg-warning text-foreground"}`}
                    >
                      {client.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-garden-green text-xs px-2">EDIT</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Widget 3: Income Details with Fixed Chart */}
        <Card className="min-w-0 overflow-hidden flex flex-col">
          <CardHeader className="flex-shrink-0 p-3 md:p-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="font-primary text-jovial-jade text-sm md:text-base">Income Details</CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="text-garden-green text-xs px-2">EDIT</Button>
                <Button variant="ghost" size="sm" className="text-garden-green text-xs px-2">
                  OPEN ANALYTICS
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 p-3 md:p-4 pt-0">
            <div className="h-full flex flex-col">
              <h3 className="font-primary text-muted-foreground text-xs mb-2">Appointments</h3>
              <div className="flex-1 min-h-0 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="font-primary text-2xl md:text-3xl font-bold text-jovial-jade">122</span>
                </div>
                <svg className="w-full h-full max-w-[200px] max-h-[200px]" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="hsl(var(--btn-accent-bg))"
                    strokeWidth="12"
                    strokeDasharray="263 176"
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="hsl(var(--tag-language-bg))"
                    strokeWidth="12"
                    strokeDasharray="110 329"
                    strokeDashoffset="-263"
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="hsl(var(--surface-accent))"
                    strokeWidth="12"
                    strokeDasharray="66 373"
                    strokeDashoffset="-373"
                    transform="rotate(-90 100 100)"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Widget 4: My Business Profile */}
        <Card className="min-w-0 overflow-hidden flex flex-col">
          <CardHeader className="flex-shrink-0 p-3 md:p-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="font-primary text-jovial-jade text-sm md:text-base">My Business Profile</CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="text-garden-green text-xs px-2">EDIT</Button>
                <Button variant="ghost" size="sm" className="text-garden-green text-xs px-2">
                  OPEN PROFILE
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 p-3 md:p-4 pt-0">
            <div className="h-full flex flex-col">
              <h3 className="font-primary text-muted-foreground text-xs mb-2">Profile Views in the last year</h3>
              <div className="flex-1 min-h-0 p-2">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <path
                    d="M 20 160 L 80 140 L 140 120 L 200 100 L 260 80 L 320 60 L 380 40"
                    fill="none"
                    stroke="hsl(var(--btn-accent-bg))"
                    strokeWidth="3"
                  />
                  <circle cx="20" cy="160" r="4" fill="hsl(var(--btn-accent-bg))" />
                  <circle cx="80" cy="140" r="4" fill="hsl(var(--btn-accent-bg))" />
                  <circle cx="140" cy="120" r="4" fill="hsl(var(--btn-accent-bg))" />
                  <circle cx="200" cy="100" r="4" fill="hsl(var(--btn-accent-bg))" />
                  <circle cx="260" cy="80" r="4" fill="hsl(var(--btn-accent-bg))" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}