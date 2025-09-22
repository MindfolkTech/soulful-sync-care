import * as React from "react";
import { Link } from "react-router-dom";
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
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { useNavigate } from "react-router-dom";
import { OnboardingChecklist } from "@/components/therapist/setup/OnboardingChecklist";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { mockTherapistTasks } from "@/data/mock-tasks";

// Custom component for appointment items with JOIN NOW logic
function AppointmentItem({ appointment }: { appointment: any }) {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = React.useState<number>(0);

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      const session = new Date(appointment.sessionTime).getTime();
      setTimeRemaining(session - now);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [appointment.sessionTime]);

  // Show JOIN NOW button if within 10 minutes of session start
  const showJoinNow = timeRemaining <= 10 * 60 * 1000 && timeRemaining > 0;
  
  const formatTimeDisplay = (): string => {
    const minutes = Math.floor(timeRemaining / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `in ${hours} hour${hours !== 1 ? 's' : ''}`;
    }
    return `in ${minutes} minute${minutes !== 1 ? 's' : ''}`;
  };

  const handleJoinSession = () => {
    navigate(`/session/${appointment.id}`);
  };

  return (
    <div className="flex items-center justify-between p-2 border rounded-lg min-h-[--touch-target-min]" role="listitem">
      <div className="flex items-center gap-[--space-xs] min-w-0 flex-1">
        <div className="w-8 h-8 bg-surface-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-secondary text-foreground text-xs">{appointment.clientInitials}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-secondary font-bold text-[hsl(var(--text-primary))] text-sm truncate">{appointment.clientName}</h4>
          <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs truncate">
            {appointment.sessionTime.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })} {appointment.sessionTime.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })} • {appointment.duration}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-[--space-xs] flex-shrink-0">
        <span className="font-secondary text-xs text-[hsl(var(--text-secondary))] tabular-nums">
          {formatTimeDisplay()}
        </span>
        
        {showJoinNow ? (
          <Button 
            variant="primary"
            onClick={handleJoinSession}
            className="min-h-[--touch-target-min] font-secondary font-semibold animate-pulse"
            aria-label={`Join ${appointment.clientName}'s ${appointment.type}`}
          >
            JOIN NOW
          </Button>
        ) : (
          <Button 
            variant="tertiary"
            className="min-h-[--touch-target-min] font-secondary text-xs bg-[hsl(var(--surface-accent))] text-[hsl(var(--text-secondary))]"
          >
            Scheduled
          </Button>
        )}
      </div>
    </div>
  );
}

export default function TherapistDashboard() {
  const { user } = useAuth();
  const [therapist, setTherapist] = React.useState<{first_name: string} | null>(null);

  React.useEffect(() => {
    const fetchTherapistName = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('therapist_profiles')
          .select('name')
          .eq('user_id', user.id)
          .single();
        if (data) {
          // Split the name into first_name for display
          const nameParts = data.name.split(' ');
          setTherapist({ first_name: nameParts[0] });
        }
        else if (error) console.error("Error fetching therapist name", error);
      }
    };
    fetchTherapistName();
  }, [user]);

  // Create realistic upcoming session times for demo
  const now = new Date();
  const upcomingAppointments = [
    {
      id: "1",
      clientName: "Deborah Young",
      clientInitials: "DY",
      type: "Chemistry Call",
      sessionTime: new Date(now.getTime() + 8 * 60 * 1000), // 8 minutes from now (will show JOIN NOW)
      duration: "30 min",
      status: "confirmed",
      priority: "high"
    },
    {
      id: "2", 
      clientName: "Lindsey Jacobs",
      clientInitials: "LJ",
      type: "Therapy Session",
      sessionTime: new Date(now.getTime() + 45 * 60 * 1000), // 45 minutes from now
      duration: "60 min",
      status: "confirmed",
      priority: "medium"
    },
    {
      id: "3",
      clientName: "John Smith",
      clientInitials: "JS",
      type: "Therapy Session", 
      sessionTime: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
      duration: "60 min",
      status: "confirmed",
      priority: "high"
    }
  ];

  const recentClients = [
    { 
      id: "1", 
      name: "Jessica Stewarts", 
      initials: "JS", 
      status: "Active", 
      lastSession: "2 days ago", 
    },
    { 
      id: "2", 
      name: "Debbie Vectra", 
      initials: "DV", 
      status: "Active", 
      lastSession: "1 week ago", 
    },
    { 
      id: "3", 
      name: "Paul Sung", 
      initials: "PS", 
      status: "Inactive", 
      lastSession: "3 weeks ago", 
    }
  ];

  const notifications = [
    { id: "1", type: "urgent", message: "Client A.R. has rescheduled 3 times", icon: AlertTriangle },
    { id: "2", type: "info", message: "2 new messages from clients", icon: MessageSquare },
    { id: "3", type: "success", message: "Payment received: £120", icon: CheckCircle2 }
  ];

  const practiceMetrics = {
    weeklyRevenue: 640,
  };

  return (
    <>
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">Welcome Back, {therapist?.first_name || '...'}!</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Here's your professional dashboard overview</p>
            </div>
            
            {/* 4-Widget Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
              {/* Widget 1: Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="font-primary text-lg font-semibold text-[hsl(var(--jovial-jade))]">
                      Upcoming Appointments
                    </h2>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/t/schedule">
                        VIEW ALL
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {upcomingAppointments.map(appointment => (
                    <AppointmentItem key={appointment.id} appointment={appointment} />
                  ))}
                </CardContent>
              </Card>

              {/* Widget 2: Recent Clients */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="font-primary text-lg font-semibold text-[hsl(var(--jovial-jade))]">
                      Recent Clients
                    </h2>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/t/clients?tab=recent">
                        VIEW ALL
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {recentClients.slice(0, 3).map(client => (
                    <div key={client.id} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[hsl(var(--surface-accent))] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-secondary text-[hsl(var(--text-primary))] text-xs">{client.initials}</span>
                        </div>
                        <div>
                          <h4 className="font-secondary font-bold text-[hsl(var(--text-primary))] text-sm">{client.name}</h4>
                          <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs">Last session: {client.lastSession}</p>
                        </div>
                      </div>
                      <Badge variant={client.status === "Active" ? "secondary" : "outline"} className={`text-xs ${client.status === "Active" ? "bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]" : "bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]"}`}>
                        {client.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Widget 3: My Tasks */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="font-primary text-lg font-semibold text-[hsl(var(--jovial-jade))]">
                      My Tasks
                    </h2>
                      <Button variant="ghost" size="sm" asChild>
                      <Link to="/t/schedule?tab=tasks">
                        VIEW ALL
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {mockTherapistTasks.slice(0, 3).map(task => (
                      <div key={task.id} className="flex items-center justify-between p-2 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={`w-5 h-5 ${task.status === 'done' ? 'text-[hsl(var(--success-text))]' : 'text-[hsl(var(--text-secondary)))]'}`} />
                          <div>
                          <h4 className={`font-secondary text-sm ${task.status === 'done' ? 'line-through text-[hsl(var(--text-secondary))]' : 'text-[hsl(var(--text-primary))]'}`}>{task.title}</h4>
                          <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs">{task.due ? new Date(task.due).toLocaleDateString() : 'No due date'}</p>
                          </div>
                        </div>
                      </div>
                  ))}
                </CardContent>
              </Card>

              {/* Widget 4: Business Summary */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="font-primary text-lg font-semibold text-[hsl(var(--jovial-jade))]">
                      Business Summary
                    </h2>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/t/business">
                        VIEW ALL
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div style={{ width: '100%', height: 150 }}>
                    <ResponsiveContainer>
                      <BarChart data={[{name: 'Weekly Revenue', value: practiceMetrics.weeklyRevenue}]} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `£${value}`}/>
                        <Tooltip />
                        <Bar dataKey="value" fill="hsl(var(--jovial-jade))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </TherapistLayout>
    <OnboardingChecklist />
    </>
  );
}
