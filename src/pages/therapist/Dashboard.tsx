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
import { QuickActionCards } from "@/components/therapist/onboarding";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { mockTherapistTasks } from "@/data/mock-tasks";
import { useTherapistAppointments, useTherapistEarnings, useTherapistAnalytics } from "@/hooks/use-therapist-data";
import { AddTaskDialog } from "@/components/therapist/add-task-dialog";
import { TaskItem } from "@/types/tasks";

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
    <div className="flex items-center justify-between p-3 sm:p-4 border rounded-lg min-h-[var(--touch-target-comfort)]" role="listitem">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[hsl(var(--surface-accent))] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="font-secondary text-[hsl(var(--text-primary))] text-sm font-medium">{appointment.clientInitials}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-secondary font-bold text-[hsl(var(--text-primary))] text-sm sm:text-base truncate">{appointment.clientName}</h4>
          <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs sm:text-sm truncate">
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
      
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 flex-shrink-0">
        <span className="font-secondary text-xs sm:text-sm text-[hsl(var(--text-secondary))] tabular-nums whitespace-nowrap">
          {formatTimeDisplay()}
        </span>
        
        {showJoinNow ? (
          <Button 
            variant="primary"
            onClick={handleJoinSession}
            className="min-h-[var(--touch-target-min)] min-w-[var(--touch-target-min)] font-secondary font-semibold animate-pulse text-xs sm:text-sm px-3 sm:px-4"
            aria-label={`Join ${appointment.clientName}'s ${appointment.type}`}
          >
            JOIN NOW
          </Button>
        ) : (
          <Button 
            variant="tertiary"
            className="min-h-[var(--touch-target-min)] min-w-[var(--touch-target-min)] font-secondary text-xs sm:text-sm bg-[hsl(var(--surface-accent))] text-[hsl(var(--text-secondary))] px-3 sm:px-4"
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
  const [tasks, setTasks] = React.useState<TaskItem[]>(mockTherapistTasks);
  const [testimonials, setTestimonials] = React.useState<{testimonial_text: string}[]>([]);
  const { appointments } = useTherapistAppointments();
  const { getTotalEarnings } = useTherapistEarnings();
  const { analytics, getTotalStats } = useTherapistAnalytics();

  React.useEffect(() => {
    const fetchTherapistData = async () => {
      if (user) {
        // Fetch therapist name
        const { data: profileData, error: profileError } = await supabase
          .from('therapist_profiles')
          .select('name')
          .eq('user_id', user.id)
          .single();
        
        if (profileData) {
          const nameParts = profileData.name.split(' ');
          setTherapist({ first_name: nameParts[0] });
        }
        else if (profileError) console.error("Error fetching therapist name", profileError);

        // Fetch testimonials
        const { data: testimonialsData, error: testimonialsError } = await supabase
          .from('client_testimonials')
          .select('testimonial_text')
          .eq('therapist_id', user.id)
          .eq('is_public', true)
          .order('created_at', { ascending: false })
          .limit(1);

        if (testimonialsData) {
          setTestimonials(testimonialsData);
        }
      }
    };
    fetchTherapistData();
  }, [user]);

  const handleAddTask = (newTask: Omit<TaskItem, 'id'>) => {
    const taskWithId = {
      ...newTask,
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    setTasks(prev => [taskWithId, ...prev]);
  };

  // Filter real appointments for upcoming sessions
  const now = new Date();
  const upcomingAppointments = appointments
    .filter(apt => {
      const aptDateTime = new Date(`${apt.session_date}T${apt.session_time}`);
      return aptDateTime > now && apt.status === 'confirmed';
    })
    .slice(0, 3)
    .map(apt => ({
      id: apt.id,
      clientName: `Client ${apt.client_id.slice(-4)}`, // Placeholder - should fetch client names
      clientInitials: `C${apt.client_id.slice(-2)}`,
      type: apt.session_type,
      sessionTime: new Date(`${apt.session_date}T${apt.session_time}`),
      duration: `${apt.duration_minutes} min`,
      status: apt.status,
      priority: "medium" as const
    }));

  // Get recent completed sessions as clients
  const recentClients = appointments
    .filter(apt => apt.status === 'completed')
    .slice(0, 3)
    .map(apt => ({
      id: apt.client_id,
      name: `Client ${apt.client_id.slice(-4)}`, // Placeholder
      initials: `C${apt.client_id.slice(-2)}`,
      status: "Active" as const,
      lastSession: new Date(apt.session_date).toLocaleDateString(),
    }));

  const notifications = [
    { id: "1", type: "urgent", message: "Client A.R. has rescheduled 3 times", icon: AlertTriangle },
    { id: "2", type: "info", message: "2 new messages from clients", icon: MessageSquare },
    { id: "3", type: "success", message: "Payment received: £120", icon: CheckCircle2 }
  ];

  const totalStats = getTotalStats();
  const weeklyRevenue = getTotalEarnings();

  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            <div data-onboarding="dashboard-overview">
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">Welcome Back, {therapist?.first_name || '...'}!</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Here's your professional dashboard overview</p>
            </div>

            {/* Quick Actions Section */}
            <div data-onboarding="quick-actions">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))]">
                  Quick Actions
                </h2>
                <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                  Complete these to strengthen your profile
                </p>
              </div>
              <QuickActionCards
                userId={user?.id || ""}
                maxCards={4}
                onActionClick={(actionId) => {
                  console.log('Quick action clicked:', actionId);
                  // Could trigger analytics, show hints, etc.
                }}
              />
            </div>

            {/* 4-Widget Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        
              {/* Widget 1: My Schedule */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="font-primary text-lg font-semibold text-[hsl(var(--jovial-jade))]">
                      My Schedule
                    </h2>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/t/schedule">
                        MANAGE
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

              {/* Widget 2: My Clients */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="font-primary text-lg font-semibold text-[hsl(var(--jovial-jade))]">
                      My Clients
                    </h2>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/t/clients">
                        VIEW ALL
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentClients.slice(0, 3).map(client => (
                    <div key={client.id} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg min-h-[var(--touch-target-comfort)]">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[hsl(var(--surface-accent))] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-secondary text-[hsl(var(--text-primary))] text-sm font-medium">{client.initials}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-secondary font-bold text-[hsl(var(--text-primary))] text-sm sm:text-base truncate">{client.name}</h4>
                          <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs sm:text-sm truncate">Last session: {client.lastSession}</p>
                        </div>
                      </div>
                      <Badge variant={client.status === "Active" ? "secondary" : "outline"} className={`text-xs sm:text-sm flex-shrink-0 ${client.status === "Active" ? "bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]" : "bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]"}`}>
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
                    <div className="flex items-center gap-2">
                      <AddTaskDialog onAddTask={handleAddTask} data-onboarding="add-task-button" />
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/t/schedule?tab=tasks">
                          VIEW ALL
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3" data-onboarding="tasks-list">
                  {tasks.slice(0, 3).map(task => (
                      <div key={task.id} className={`flex items-center justify-between p-3 sm:p-4 border rounded-lg min-h-[var(--touch-target-comfort)] task-item ${task.status === 'done' ? 'completed' : ''}`}>
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <CheckCircle2 className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${task.status === 'done' ? 'text-[hsl(var(--success-text))]' : 'text-[hsl(var(--text-secondary)))]'}`} data-onboarding="complete-task-button" />
                          <div className="min-w-0 flex-1">
                          <h4 className={`font-secondary text-sm sm:text-base truncate ${task.status === 'done' ? 'line-through text-[hsl(var(--text-secondary))]' : 'text-[hsl(var(--text-primary))]'}`}>{task.title}</h4>
                          <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs sm:text-sm truncate">{task.due ? new Date(task.due).toLocaleDateString() : 'No due date'}</p>
                          </div>
                        </div>
                        {task.status === 'done' && (
                          <Button variant="ghost" size="sm" className="text-xs" data-onboarding="undo-button">
                            Undo
                          </Button>
                        )}
                      </div>
                  ))}
                </CardContent>
              </Card>

              {/* Widget 4: My Business */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="font-primary text-lg font-semibold text-[hsl(var(--jovial-jade))]">
                      My Business
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
                  <div className="grid grid-cols-2 gap-4">
                    {/* Monthly Revenue Trend */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Total Earned (Net)</span>
                      </div>
                      <div className="text-xl font-bold">
                        £{weeklyRevenue.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">After 15% platform fee</p>
                      <div className="h-[40px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[{revenue: weeklyRevenue}]}>
                            <Bar 
                              dataKey="revenue" 
                              fill="hsl(var(--jovial-jade))" 
                              radius={[2, 2, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Session Completion Rate */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Completion Rate</span>
                      </div>
                      <div className="text-xl font-bold">
                        {appointments.length > 0 ? Math.round((appointments.filter(apt => apt.status === 'completed').length / appointments.length) * 100) : 0}%
                      </div>
                      <Progress 
                        value={appointments.length > 0 ? (appointments.filter(apt => apt.status === 'completed').length / appointments.length) * 100 : 0} 
                        className="h-2"
                      />
                    </div>

                    {/* Upcoming This Week */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">This Week</span>
                      </div>
                      <div className="text-xl font-bold">
                        {upcomingAppointments.length}
                      </div>
                      <p className="text-xs text-muted-foreground">sessions scheduled</p>
                    </div>

                    {/* Client Testimonial Preview */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Latest Feedback</span>
                      </div>
                      <div className="text-xs italic text-muted-foreground">
                        {testimonials.length > 0 
                          ? `"${testimonials[0].testimonial_text.substring(0, 50)}..."`
                          : "No testimonials yet"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}
