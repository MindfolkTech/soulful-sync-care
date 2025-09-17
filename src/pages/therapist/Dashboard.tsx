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
      {/* 4-Widget Grid Layout with ONE PAGE VIEWPORT RULE compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full min-w-0 max-h-[calc(100vh-200px)] overflow-hidden">
        
        {/* Widget 1: Upcoming Appointments */}
        <Card className="min-w-0 overflow-hidden flex flex-col h-full max-h-[calc(50vh-120px)]">
          <CardHeader className="flex-shrink-0 p-[--space-sm] md:p-[--space-md] pb-[--space-xs]">
            <div className="flex items-center justify-between">
              <h2 className="font-primary text-jovial-jade text-sm md:text-base">
                Upcoming Appointments
              </h2>
              <div className="flex items-center gap-[--space-xs]">
                <Button variant="ghost" size="sm" className="text-garden-green text-xs px-2 min-h-[--touch-target-min]" aria-label="Manage appointments and calendar">
                  MANAGE
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 p-[--space-sm] md:p-[--space-md] pt-0">
            <div className="space-y-[--space-xs] h-full overflow-y-auto" role="list" aria-label="Upcoming appointments list">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="flex items-center justify-between p-2 border rounded-lg min-h-[--touch-target-min]" role="listitem" aria-label={`Appointment with ${appointment.clientName} at ${appointment.time}`}>
                  <div className="flex items-center gap-[--space-xs]">
                    <div className="w-8 h-8 bg-surface-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-secondary text-foreground text-xs">{appointment.clientInitials}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-secondary font-bold text-foreground text-sm truncate">{appointment.clientName}</h4>
                      <p className="font-secondary text-muted-foreground text-xs truncate">{appointment.time}</p>
                    </div>
                  </div>
                  <Button className="bg-garden-green text-white hover:bg-elated-emerald text-xs px-3 py-1 flex-shrink-0" aria-label={`Join ${appointment.clientName}'s ${appointment.type}`}>
                    Join Now →
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Widget 2: My Client Dashboard */}
        <Card className="min-w-0 overflow-hidden flex flex-col h-full max-h-[calc(50vh-120px)]">
          <CardHeader className="flex-shrink-0 p-[--space-sm] md:p-[--space-md] pb-[--space-xs]">
            <div className="flex items-center justify-between">
              <h2 className="font-primary text-jovial-jade text-sm md:text-base">
                My Client Dashboard
              </h2>
              <div className="flex items-center gap-[--space-xs]">
                <Button variant="ghost" size="sm" className="text-garden-green text-xs px-[--space-xs] min-h-[--touch-target-min]" aria-label="Manage client dashboard">
                  MANAGE
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 p-[--space-sm] md:p-[--space-md] pt-0">
            <div className="space-y-[--space-xs] h-full overflow-y-auto" role="list" aria-label="Client dashboard list">
              {recentClients.map(client => (
                <div key={client.id} className="flex items-center justify-between p-2 border rounded-lg min-h-[--touch-target-min]" role="listitem" aria-label={`Client ${client.name}, status: ${client.status}, email: ${client.email}`}>
                  <div className="flex items-center gap-[--space-xs]">
                    <div className="w-8 h-8 bg-surface-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-secondary text-foreground text-xs">{client.initials}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-secondary font-bold text-foreground text-sm truncate">{client.name}</h4>
                      <p className="font-secondary text-muted-foreground text-xs truncate">{client.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-[--space-xs] flex-shrink-0">
                    <Badge 
                      variant={client.status === "Active" ? "secondary" : "outline"}
                      className={`text-xs ${client.status === "Active" ? "bg-success text-white" : "bg-warning text-foreground"}`}
                    >
                      {client.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Widget 3: Income Details with Fixed Chart */}
        <Card className="min-w-0 overflow-hidden flex flex-col h-full max-h-[calc(50vh-120px)]">
          <CardHeader className="flex-shrink-0 p-[--space-sm] md:p-[--space-md] pb-[--space-xs]">
            <div className="flex items-center justify-between">
              <h2 className="font-primary text-jovial-jade text-sm md:text-base">Income Details</h2>
              <div className="flex items-center gap-[--space-xs]">
                <Button variant="ghost" size="sm" className="text-garden-green text-xs px-[--space-xs] min-h-[--touch-target-min]" aria-label="View analytics dashboard">
                  VIEW
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 p-[--space-sm] md:p-[--space-md] pt-0">
            <div className="h-full flex flex-col">
              <h4 className="font-secondary text-muted-foreground text-xs mb-2">Appointments</h4>
              <div className="flex-1 min-h-0 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="font-primary text-2xl md:text-3xl font-bold text-jovial-jade">122</span>
                </div>
                <svg className="w-full h-full max-w-[200px] max-h-[200px]" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Appointment breakdown chart showing 122 total appointments with completed, cancelled, and rescheduled segments">
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
        <Card className="min-w-0 overflow-hidden flex flex-col h-full max-h-[calc(50vh-120px)]">
          <CardHeader className="flex-shrink-0 p-[--space-sm] md:p-[--space-md] pb-[--space-xs]">
            <div className="flex items-center justify-between">
              <h2 className="font-primary text-jovial-jade text-sm md:text-base">My Business Profile</h2>
              <div className="flex items-center gap-[--space-xs]">
                <Button variant="ghost" size="sm" className="text-garden-green text-xs px-[--space-xs] min-h-[--touch-target-min]" aria-label="Manage business profile">
                  MANAGE
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 p-[--space-sm] md:p-[--space-md] pt-0">
            <div className="h-full flex flex-col">
              <h4 className="font-secondary text-muted-foreground text-xs mb-2">Profile Views in the last year</h4>
                <div className="flex-1 min-h-0 p-[--space-xs]">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Profile views trend chart showing growth from 9k to 20k views over the last year">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="1"/>
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