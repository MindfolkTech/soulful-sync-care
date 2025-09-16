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
  TrendingUp
} from "lucide-react";

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
    <div className="min-h-screen bg-[--warm-white]">
      {/* Header Section */}
      <header className="bg-[--jovial-jade] text-[--btn-primary-text] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-[--font-primary] text-xl font-bold text-[--btn-primary-text]">Mindfolk</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[--text-muted]" />
              <input 
                id="client-search"
                name="clientSearch"
                type="search" 
                placeholder="Search Clients" 
                className="pl-10 pr-4 py-2 bg-white text-[--text-primary] rounded border-0 focus:ring-2 focus:ring-white/30 focus:outline-none min-h-[44px] w-64"
                aria-label="Search clients"
              />
            </div>
          </div>
          <div className="w-10 h-10 bg-[--surface-accent] rounded-full flex items-center justify-center">
            <span className="font-[--font-secondary] text-sm font-semibold text-[--jovial-jade]">CT</span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-surface-accent min-h-screen py-6">
          <nav className="space-y-2 px-4">
            <div className="flex items-center gap-3 px-3 py-2 bg-[--jovial-jade] text-[--on-dark] rounded-md">
              <Home className="w-5 h-5" />
              <span className="font-helvetica font-medium">Dashboard</span>
              </div>
            <Link to="/t/clients" className="flex items-center gap-3 px-3 py-2 text-[--jovial-jade] hover:bg-[--jovial-jade] hover:text-[--on-dark] rounded-md transition-colors">
              <Users className="w-5 h-5" />
              <span className="font-helvetica">My Clients</span>
            </Link>
            <Link to="/t/profile" className="flex items-center gap-3 px-3 py-2 text-[--jovial-jade] hover:bg-[--jovial-jade] hover:text-[--on-dark] rounded-md transition-colors">
              <User className="w-5 h-5" />
              <span className="font-helvetica">My Profile</span>
            </Link>
            <Link to="/t/analytics" className="flex items-center gap-3 px-3 py-2 text-[--jovial-jade] hover:bg-[--jovial-jade] hover:text-[--on-dark] rounded-md transition-colors">
              <BarChart3 className="w-5 h-5" />
              <span className="font-helvetica">Performance & Analytics</span>
            </Link>
            
            <div className="border-t border-border my-4"></div>
            
            <div className="px-3">
              <h3 className="font-helvetica text-jovial-jade font-semibold text-sm mb-2">QUICK ACTIONS</h3>
              <div className="space-y-1">
                <button className="block text-left text-jovial-jade hover:text-garden-green text-sm py-1">Update pricing</button>
                <button className="block text-left text-jovial-jade hover:text-garden-green text-sm py-1">Add a new video</button>
                <button className="block text-left text-jovial-jade hover:text-garden-green text-sm py-1">Learn engagement boost</button>
                <button className="block text-left text-jovial-jade hover:text-garden-green text-sm py-1">FAQ</button>
              </div>
            </div>

            <div className="border-t border-border my-4"></div>
            
            <button className="flex items-center gap-3 px-3 py-2 text-jovial-jade hover:text-garden-green transition-colors">
              <span className="font-helvetica text-sm">Sign out</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="font-crimson text-3xl font-bold text-jovial-jade mb-2">
              Welcome Back, Sarah!
            </h1>
          </div>

          {/* 4-Widget Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Widget 1: Upcoming Appointments (Top Left) */}
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-crimson text-jovial-jade">Upcoming Appointments</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-garden-green">EDIT</Button>
                  <Button variant="ghost" size="sm" className="text-garden-green">
                    OPEN CALENDAR
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 max-h-64 overflow-y-auto">
                {upcomingAppointments.map(appointment => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-accent rounded-full flex items-center justify-center">
                        <span className="font-helvetica text-text-primary text-sm">{appointment.clientInitials}</span>
                      </div>
                      <div>
                        <p className="font-helvetica text-text-primary">{appointment.clientName}</p>
                        <p className="font-helvetica text-text-secondary text-sm">{appointment.time}</p>
                      </div>
                    </div>
                    <Button className="bg-[--garden-green] text-[--on-dark] hover:bg-[--elated-emerald]">
                      Join Now →
                    </Button>
                  </div>
                ))}
                  </CardContent>
                </Card>

            {/* Widget 2: My Client Dashboard (Top Right) */}
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-crimson text-jovial-jade">My Client Dashboard</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-garden-green">EDIT</Button>
                  <Button variant="ghost" size="sm" className="text-garden-green">
                    OPEN CLIENTS
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentClients.map(client => (
                  <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-accent rounded-full flex items-center justify-center">
                        <span className="font-helvetica text-text-primary text-sm">{client.initials}</span>
                      </div>
                      <div>
                        <p className="font-helvetica text-text-primary">{client.name}</p>
                        <p className="font-helvetica text-text-secondary text-sm">{client.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={client.status === "Active" ? "secondary" : "outline"}
                        className={client.status === "Active" ? "bg-success-bg text-success-text" : "bg-warning-bg text-warning-text"}
                      >
                        {client.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-garden-green">EDIT</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Widget 3: Income Details (Bottom Left) */}
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-crimson text-jovial-jade">Income Details</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-garden-green">EDIT</Button>
                  <Button variant="ghost" size="sm" className="text-garden-green">
                    OPEN ANALYTICS
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                    </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-helvetica text-text-secondary text-sm mb-4">Appointments</h3>
                  <div className="relative w-full h-48 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-crimson text-4xl font-bold text-jovial-jade">122</span>
                    </div>
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke="#ffd9be"
                        strokeWidth="8"
                        strokeDasharray="60 40"
                        aria-label="Completed sessions: 60%"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke="#ede6fa"
                        strokeWidth="8"
                        strokeDasharray="25 75"
                        strokeDashoffset="-60"
                        aria-label="Cancelled sessions: 25%"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke="#e6eee9"
                        strokeWidth="8"
                        strokeDasharray="15 85"
                        strokeDashoffset="-85"
                        aria-label="Rescheduled sessions: 15%"
                      />
                    </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

            {/* Widget 4: My Business Profile (Bottom Right) */}
            <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-crimson text-jovial-jade">My Business Profile</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-garden-green">EDIT</Button>
                  <Button variant="ghost" size="sm" className="text-garden-green">
                    OPEN PROFILE
                    <ExternalLink className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                  </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-helvetica text-text-secondary text-sm mb-4">Profile Views in the last year</h3>
                  <div className="w-full h-48 p-4">
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      {/* Grid lines */}
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                      
                      {/* Trend line */}
                      <path
                        d="M 20 160 L 80 140 L 140 120 L 200 100 L 260 80 L 320 60 L 380 40"
                        fill="none"
                        stroke="#ffd9be"
                        strokeWidth="3"
                        aria-label="Profile views trend: increasing from 9k to 20k"
                      />
                      
                      {/* Data points */}
                      <circle cx="20" cy="160" r="4" fill="#ffd9be" aria-label="9k views" />
                      <circle cx="80" cy="140" r="4" fill="#ffd9be" aria-label="11k views" />
                      <circle cx="140" cy="120" r="4" fill="#ffd9be" aria-label="14k views" />
                      <circle cx="200" cy="100" r="4" fill="#ffd9be" aria-label="17k views" />
                      <circle cx="260" cy="80" r="4" fill="#ffd9be" aria-label="20k views" />
                    </svg>
                        </div>
                      </div>
                  </CardContent>
                </Card>
          </div>
      </main>
      </div>
    </div>
  );
}