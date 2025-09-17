import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, MessageCircle, MoreHorizontal, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";

const bookings = [
  {
    id: "1",
    clientName: "Jessica Davis",
    clientInitials: "J.D.",
    clientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b196?w=100&h=100&fit=crop&crop=face",
    type: "Chemistry Call",
    sessionTime: new Date(Date.now() + 8 * 60 * 1000), // 8 minutes from now (will show JOIN NOW)
    duration: "15 min",
    status: "confirmed",
    notes: "First time client - anxiety and stress management"
  },
  {
    id: "2",
    clientName: "Michael Smith",
    clientInitials: "M.S.",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    type: "Therapy Session",
    sessionTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
    duration: "60 min",
    status: "confirmed",
    notes: "Regular session - working on communication skills"
  },
  {
    id: "3",
    clientName: "Robert Parker",
    clientInitials: "R.P.",
    clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    type: "Therapy Session",
    sessionTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    duration: "60 min",
    status: "pending",
    notes: "Follow-up session - stress management techniques"
  },
  {
    id: "4",
    clientName: "Lisa Martinez",
    clientInitials: "L.M.",
    clientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    type: "Therapy Session",
    sessionTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    duration: "60 min",
    status: "confirmed",
    notes: "Long-term client - depression management progress review"
  }
];

const availabilitySlots = [
  { day: "Monday", slots: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"] },
  { day: "Tuesday", slots: ["9:00 AM", "11:00 AM", "1:00 PM", "4:00 PM"] },
  { day: "Wednesday", slots: ["10:00 AM", "2:00 PM", "3:00 PM"] },
  { day: "Thursday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"] },
  { day: "Friday", slots: ["9:00 AM", "1:00 PM", "2:00 PM"] },
];

// Booking item component with countdown logic
function BookingItem({ booking }: { booking: any }) {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = React.useState<number>(0);

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      const session = new Date(booking.sessionTime).getTime();
      setTimeRemaining(session - now);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [booking.sessionTime]);

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
    navigate(`/session/${booking.id}`);
  };

  const handleClientClick = () => {
    navigate(`/t/clients/${booking.id}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-success text-white">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-warning text-foreground">Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const clientFirstName = booking.clientName.split(' ')[0];

  return (
    <Card>
      <CardContent className="p-[--space-md] md:p-[--space-lg] lg:p-[--space-xl]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={handleClientClick}
              className="w-12 h-12 rounded-full overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
              aria-label={`View ${booking.clientName}'s profile`}
            >
              <Avatar className="w-12 h-12">
                <AvatarImage src={booking.clientAvatar} alt={booking.clientInitials} />
                <AvatarFallback className="bg-surface-accent text-jovial-jade font-secondary font-semibold">
                  {booking.clientInitials}
                </AvatarFallback>
              </Avatar>
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-primary font-semibold text-foreground">
                  {booking.type} with {clientFirstName}
                </h3>
                {getStatusBadge(booking.status)}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {booking.sessionTime.toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {booking.sessionTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
                <div>
                  Duration: {booking.duration}
                </div>
              </div>
              
              {booking.notes && (
                <p className="text-sm text-muted-foreground mt-2">
                  {booking.notes}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-[--space-xs] flex-shrink-0">
            <span className="font-secondary text-xs text-muted-foreground tabular-nums">
              {formatTimeDisplay()}
            </span>
            
            {showJoinNow ? (
              <Button
                variant="primary"
                onClick={handleJoinSession}
                className="min-h-[--touch-target-min] font-secondary font-semibold animate-pulse"
                aria-label={`Join ${booking.clientName}'s ${booking.type}`}
              >
                JOIN NOW
              </Button>
            ) : (
              <Button
                variant="secondary"
                className="min-h-[--touch-target-min] font-secondary text-xs"
                disabled
              >
                Scheduled
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TherapistBookings() {

  return (
    <DashboardLayout 
      title="Bookings & Schedule"
      subtitle="Manage your appointments and availability"
    >
      <Stack className="space-y-[--space-lg]">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[--space-md]">
          <Card>
            <CardContent className="p-[--space-md] md:p-[--space-lg] lg:p-[--space-xl]">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-foreground">4</div>
                <div className="font-secondary text-muted-foreground text-sm">Today's Sessions</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-[--space-md] md:p-[--space-lg] lg:p-[--space-xl]">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-foreground">12</div>
                <div className="font-secondary text-muted-foreground text-sm">This Week</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-[--space-md] md:p-[--space-lg] lg:p-[--space-xl]">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-success">3</div>
                <div className="font-secondary text-muted-foreground text-sm">Pending</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-[--space-md] md:p-[--space-lg] lg:p-[--space-xl]">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-foreground">18</div>
                <div className="font-secondary text-muted-foreground text-sm">Available Slots</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-[--space-lg]">
          <HStack className="justify-between">
            <TabsList className="grid grid-cols-3 w-fit">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>
            
            <HStack>
              <Button variant="outline" className="min-h-touch-min" aria-label="Filter appointments">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </HStack>
          </HStack>

          <TabsContent value="upcoming" className="space-y-[--space-md]">
            {bookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </TabsContent>

          <TabsContent value="calendar" className="space-y-[--space-md]">
            <Card>
              <CardContent className="p-[--space-md] md:p-[--space-lg] lg:p-[--space-xl]">
                <div className="h-96 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                  <div className="text-center">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="font-secondary text-muted-foreground">Calendar view would go here</p>
                    <p className="font-secondary text-muted-foreground text-sm">
                      Interactive calendar with booking management
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-[--space-md]">
            <Card>
              <CardContent className="p-[--space-md] md:p-[--space-lg] lg:p-[--space-xl]">
                <div className="space-y-[--space-lg]">
                  <HStack className="justify-between">
                    <h3 className="font-primary text-[--text-lg] font-semibold text-[--jovial-jade]">
                      Weekly Availability
                    </h3>
                    <Button variant="outline" size="sm" className="min-h-touch-min" aria-label="Edit weekly availability schedule">
                      Edit Schedule
                    </Button>
                  </HStack>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[--space-md]">
                    {availabilitySlots.map((day) => (
                      <Card key={day.day} className="border-border">
                        <CardContent className="p-[--space-md]">
                          <h4 className="font-secondary text-[--text-base] font-semibold text-[--text-primary] mb-[--space-sm]">
                            {day.day}
                          </h4>
                          <div className="space-y-[--space-xs]">
                            {day.slots.map((slot, index) => (
                              <div 
                                key={index}
                                className="flex items-center justify-between p-2 bg-surface-accent rounded text-sm"
                              >
                                <span className="font-secondary text-foreground">{slot}</span>
                                <Badge variant="outline" className="text-xs">
                                  Available
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Stack>
    </DashboardLayout>
  );
}