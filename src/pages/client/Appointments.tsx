import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/ui/bottom-nav";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionCountdown } from "@/components/ui/session-countdown";
import { SessionReminderBanner } from "@/components/ui/session-reminder-banner";
import { Calendar, Clock, Video, MessageCircle, MoreHorizontal } from "lucide-react";

// Create realistic upcoming session times for demo
const now = new Date();
const appointments = [
  {
    id: "1",
    therapist: "Dr. Sarah Chen",
    type: "Chemistry Call",
    sessionType: "chemistry" as const,
    // Session in 8 minutes (will show JOIN NOW)
    sessionTime: new Date(now.getTime() + 8 * 60 * 1000),
    duration: "15 min",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "2",
    therapist: "Michael Thompson",
    type: "Therapy Session",
    sessionType: "therapy" as const,
    // Session in 45 minutes (will show reminder banner)
    sessionTime: new Date(now.getTime() + 45 * 60 * 1000),
    duration: "60 min",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "3",
    therapist: "Dr. Priya Patel",
    type: "Therapy Session",
    sessionType: "therapy" as const,
    // Session tomorrow
    sessionTime: new Date(now.getTime() + 24 * 60 * 60 * 1000),
    duration: "60 min",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1594824919066-c0f76fe0cd0d?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: "4",
    therapist: "Dr. James Wilson",
    type: "Chemistry Call",
    sessionType: "chemistry" as const,
    // Completed session
    sessionTime: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    duration: "15 min",
    status: "completed",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face"
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
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-primary text-3xl font-bold text-[hsl(var(--text-primary))]">
                My Appointments
              </h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))] mt-2">
                Manage your therapy sessions and chemistry calls
              </p>
            </div>

            {/* Session Reminder Banners */}
            <div className="space-y-4 mb-6">
              {appointments
                .filter(apt => apt.status === "confirmed")
                .map((appointment) => (
                  <SessionReminderBanner
                    key={`reminder-${appointment.id}`}
                    sessionTime={appointment.sessionTime}
                    sessionId={appointment.id}
                    therapistName={appointment.therapist}
                    sessionType={appointment.sessionType}
                  />
                ))}
            </div>

            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3" role="tablist" aria-label="Appointment filter tabs">
                <TabsTrigger value="upcoming" className="min-h-[--touch-target-min]" aria-label="View upcoming appointments">Upcoming</TabsTrigger>
                <TabsTrigger value="past" className="min-h-[--touch-target-min]" aria-label="View past appointments">Past</TabsTrigger>
                <TabsTrigger value="cancelled" className="min-h-[--touch-target-min]" aria-label="View cancelled appointments">Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4" role="tabpanel" aria-labelledby="upcoming-tab">
                <div role="list" aria-label="Upcoming appointments">
                {appointments
                  .filter(apt => apt.status === "confirmed")
                  .map((appointment) => (
                    <Card key={appointment.id} role="listitem">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Therapist Info Row */}
                          <div className="flex items-center space-x-4">
                            <img
                              src={appointment.image}
                              alt={`Profile photo of ${appointment.therapist}`}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-primary text-lg font-semibold text-[hsl(var(--text-primary))]">
                                {appointment.therapist}
                              </h3>
                              <p className="font-secondary text-[hsl(var(--text-secondary))]">
                                {appointment.type} • {appointment.duration}
                              </p>
                              <p className="font-secondary text-sm text-[hsl(var(--text-muted))] mt-1">
                                {appointment.sessionTime.toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                            
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => navigate('/messages')} 
                              className="min-h-[--touch-target-min] text-[hsl(var(--garden-green))]" 
                              aria-label={`Send message to ${appointment.therapist}`}
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Session Countdown Row */}
                          <SessionCountdown
                            sessionTime={appointment.sessionTime}
                            sessionId={appointment.id}
                            therapistName={appointment.therapist}
                            className="pt-3 border-t border-[hsl(var(--border))]"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="past" className="space-y-4" role="tabpanel" aria-labelledby="past-tab">
                <div role="list" aria-label="Past appointments">
                {appointments
                  .filter(apt => apt.status === "completed")
                  .map((appointment) => (
                    <Card key={appointment.id} role="listitem">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={appointment.image}
                              alt={`Profile photo of ${appointment.therapist}`}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-primary text-lg font-semibold text-[hsl(var(--text-primary))]">
                                {appointment.therapist}
                              </h3>
                              <p className="font-secondary text-[hsl(var(--text-secondary))]">
                                {appointment.type} • {appointment.duration}
                              </p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-[hsl(var(--text-muted))]">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{appointment.sessionTime.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                  })}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{appointment.sessionTime.toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true
                                  })}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            {getStatusBadge(appointment.status)}
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => navigate(`/therapists/${appointment.id}`)} className="min-h-[--touch-target-min]" aria-label={`Book another session with ${appointment.therapist}`}>
                                Book Again
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => {
                                // TODO: Implement review system
                                console.log("Leave review for", appointment.therapist);
                              }} className="min-h-[--touch-target-min] text-[hsl(var(--garden-green))]" aria-label={`Leave review for ${appointment.therapist}`}>
                                ⭐
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="cancelled" role="tabpanel" aria-labelledby="cancelled-tab">
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="font-secondary text-[hsl(var(--text-secondary))]">
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
