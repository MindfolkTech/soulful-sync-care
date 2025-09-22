import { useParams, Link } from "react-router-dom";
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Calendar, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  Bell,
  Settings,
  Plus,
  Edit,
  Save,
  TrendingUp,
  Clock
} from "lucide-react";

// Mock client data - in real app this would come from API
const getClientData = (id: string) => ({
  id,
  name: "Francesca James",
  initials: "F.J.",
  email: "francescajames@gmail.com",
  phone: "07126790128",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b196?w=100&h=100&fit=crop&crop=face",
  status: "Active",
  joinDate: "2024-01-10",
  lastSession: "2024-01-12",
  nextSession: "2024-04-22 13:30",
  totalSessions: 8,
  sessionType: "Therapy Session",
  preferredNotifications: "email",
  gadScore: 18,
  gadScoreChange: -3,
  upcomingAppointments: [
    {
      id: "1",
      date: "Apr 22 1:30pm",
      duration: "30 min",
      type: "call"
    },
    {
      id: "2", 
      date: "May 18 10:00am",
      duration: "60 min",
      type: "call"
    },
    {
      id: "3",
      date: "Jun 01 3:30pm", 
      duration: "30 min",
      type: "call"
    }
  ],
  recentNotes: [
    {
      id: "1",
      date: "APRIL 28, 2024",
      title: "New note",
      content: "Sent consultation form to fill out. Client filled out processing request will begin to...",
      type: "consultation"
    },
    {
      id: "2",
      date: "APRIL 22, 2024", 
      title: "Score Measured",
      content: "GAD #123",
      type: "assessment"
    }
  ]
});

export default function ClientDetail() {
  const { id } = useParams();
  const client = getClientData(id || "1");

  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">{client.name}</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Client Profile & Session History</p>
            </div>
      <Stack className="space-y-[--space-lg]">
        {/* Back Navigation */}
        <div className="flex items-center gap-[--space-sm]">
          <Button variant="ghost" size="sm" asChild className="min-h-[--touch-target-min]">
            <Link to="/t/clients" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Clients
            </Link>
          </Button>
        </div>

        {/* Session Reminder Banner */}
        <Card className="border-l-4 border-l-[--warning-bg]" style={{ backgroundColor: "var(--warning-bg)" }}>
          <CardContent className="p-[--space-md] flex items-center justify-between">
            <div className="flex items-center gap-[--space-sm]">
              <Bell className="w-5 h-5 text-[hsl(var(--warning-text))]" />
              <span className="font-secondary text-[hsl(var(--warning-text))]">
                Reminder: You have an appointment on April 29th at 3pm (starting in 20 minutes)
              </span>
            </div>
            <Button 
              style={{ 
                backgroundColor: "var(--garden-green)", 
                color: "var(--on-dark)" 
              }}
              className="min-h-[--touch-target-min]"
            >
              JOIN NOW
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[--space-lg]">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="summary" className="space-y-[--space-md]">
              <div className="flex items-center justify-between">
                <TabsList className="grid grid-cols-3 w-fit">
                  <TabsTrigger value="summary">SUMMARY</TabsTrigger>
                  <TabsTrigger value="notifications">NOTIFICATIONS</TabsTrigger>
                  <TabsTrigger value="files">FILES</TabsTrigger>
                </TabsList>
                
                <HStack className="gap-[--space-sm]">
                  <Button variant="outline" size="sm" className="min-h-[--touch-target-min]">
                    <Settings className="w-4 h-4 mr-2" />
                    SHARE
                  </Button>
                  <Button variant="outline" size="sm" className="min-h-[--touch-target-min]">
                    UPLOAD
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="min-h-[--touch-target-min]"
                    style={{ color: "var(--garden-green)" }}
                  >
                    NEW
                  </Button>
                </HStack>
              </div>

              <TabsContent value="summary" className="space-y-[--space-md]">
                {/* Add New Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary text-lg">Add New Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-[--space-md]">
                    <div className="relative">
                      <Input 
                        placeholder="Search Client Notes, Keywords, past notes"
                        className="pl-10 min-h-[--touch-target-min]"
                      />
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[hsl(var(--text-secondary))]" />
                    </div>
                    
                    <Textarea
                      placeholder="Add chart notes: Include notes from a video call; copy & paste the contents of an email"
                      className="min-h-[120px]"
                      rows={6}
                    />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[--space-sm]">
                        <Label htmlFor="date-time" className="font-secondary text-sm">Set date and time</Label>
                        <Input 
                          id="date-time"
                          type="datetime-local" 
                          defaultValue="2024-04-02T13:04"
                          className="w-auto"
                        />
                      </div>
                      
                      <Button 
                        style={{ 
                          backgroundColor: "var(--garden-green)", 
                          color: "var(--on-dark)" 
                        }}
                        className="min-h-[--touch-target-min]"
                      >
                        SAVE NOTES
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Past Appointment Notes */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-primary text-lg">Past appointment notes</CardTitle>
                    <div className="flex items-center gap-[--space-sm]">
                      <Label className="font-secondary text-sm">Date range</Label>
                      <select className="px-3 py-1 border rounded-md bg-background font-secondary text-sm">
                        <option>Last week</option>
                        <option>Last month</option>
                        <option>Last 3 months</option>
                      </select>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-[--space-md]">
                    {client.recentNotes.map((note) => (
                      <div key={note.id} className="border-b border-[hsl(var(--border))] pb-[--space-md] last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-[--space-sm]">
                            <div className="w-6 h-6 rounded-full bg-[hsl(var(--surface-accent))] flex items-center justify-center">
                              {note.type === "consultation" ? (
                                <Edit className="w-3 h-3 text-[hsl(var(--garden-green))]" />
                              ) : (
                                <TrendingUp className="w-3 h-3 text-[hsl(var(--garden-green))]" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-secondary font-semibold text-sm">{note.title}</h4>
                              <p className="font-secondary text-xs text-[hsl(var(--text-secondary))]">{note.date}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="font-secondary text-sm text-[hsl(var(--text-primary))] ml-8">
                          {note.content}
                        </p>
                      </div>
                    ))}
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-center text-[hsl(var(--garden-green))] min-h-[--touch-target-min]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      ADD ADDITIONAL NOTE
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-[--space-md]">
                <Card>
                  <CardContent className="p-[--space-lg] text-center">
                    <p className="font-secondary text-muted-foreground">
                      Notification preferences and settings would go here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="files" className="space-y-[--space-md]">
                <Card>
                  <CardContent className="p-[--space-lg] text-center">
                    <p className="font-secondary text-muted-foreground">
                      Client files and documents would go here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-[--space-md]">
            {/* Client Info */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-primary text-base">CLIENT INFO</CardTitle>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-[--space-md]">
                <div className="flex items-center gap-[--space-sm]">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={client.avatar} alt={client.name} />
                    <AvatarFallback>{client.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-secondary font-semibold">{client.name}</h3>
                    <Badge 
                      className={`text-xs ${
                        client.status === "Active" 
                          ? "bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]" 
                          : "bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]"
                      }`}
                    >
                      {client.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[hsl(var(--text-secondary))]" />
                    <span className="font-secondary">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[hsl(var(--text-secondary))]" />
                    <span className="font-secondary">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[hsl(var(--text-secondary))]" />
                    <span className="font-secondary">Prefers email notifications</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="font-primary text-base">UPCOMING APPOINTMENTS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-[--space-sm]">
                {client.upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg min-h-[var(--touch-target-comfort)]">
                    <div className="min-w-0 flex-1">
                      <p className="font-secondary font-semibold text-sm sm:text-base truncate">{appointment.date}</p>
                      <p className="font-secondary text-xs sm:text-sm text-[hsl(var(--text-secondary))] truncate">{appointment.duration} {appointment.type}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="min-h-[var(--touch-target-min)] min-w-[var(--touch-target-min)] flex-shrink-0">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* GAD Score */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-primary text-base">GAD SCORE</CardTitle>
                <Button variant="ghost" size="sm" className="text-[hsl(var(--garden-green))]">
                  VIEW DETAILS
                </Button>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="var(--border)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="var(--garden-green)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(client.gadScore / 30) * 251.2} 251.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{client.gadScore}</span>
                    <span className="text-xs text-[hsl(var(--text-secondary))]">Moderate</span>
                  </div>
                </div>
                <p className="font-secondary text-xs text-[hsl(var(--text-secondary))]">
                  {client.gadScoreChange < 0 ? "↓" : "↑"} {Math.abs(client.gadScoreChange)} points since last assessment
                </p>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-primary text-base">NOTIFICATION SETTINGS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-[--space-sm]">
                <div className="flex items-center justify-between p-3 sm:p-4 border rounded-lg min-h-[var(--touch-target-comfort)]">
                  <span className="font-secondary text-sm sm:text-base">Apt Reminders</span>
                  <Button variant="ghost" size="sm" className="min-h-[var(--touch-target-min)] min-w-[var(--touch-target-min)]">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 border rounded-lg min-h-[var(--touch-target-comfort)]">
                  <span className="font-secondary text-sm sm:text-base">Document Reminders</span>
                  <Button variant="ghost" size="sm" className="min-h-[var(--touch-target-min)] min-w-[var(--touch-target-min)]">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Stack>
          </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}

