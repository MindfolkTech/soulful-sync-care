import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, MessageCircle, MoreHorizontal, Filter } from "lucide-react";

const bookings = [
  {
    id: "1",
    clientInitials: "J.D.",
    clientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b196?w=100&h=100&fit=crop&crop=face",
    type: "Chemistry Call",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "15 min",
    status: "confirmed",
    notes: "First time client - anxiety and stress management"
  },
  {
    id: "2",
    clientInitials: "M.S.",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    type: "Therapy Session",
    date: "2024-01-15",
    time: "2:00 PM",
    duration: "60 min",
    status: "confirmed",
    notes: "Regular session - working on communication skills"
  },
  {
    id: "3",
    clientInitials: "R.P.",
    clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    type: "Therapy Session",
    date: "2024-01-16",
    time: "11:00 AM",
    duration: "60 min",
    status: "pending",
    notes: "Follow-up session - stress management techniques"
  },
  {
    id: "4",
    clientInitials: "L.M.",
    clientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    type: "Therapy Session",
    date: "2024-01-17",
    time: "3:30 PM",
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

export default function TherapistBookings() {
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

  return (
    <DashboardLayout 
      title="Bookings & Schedule"
      subtitle="Manage your appointments and availability"
    >
      <Stack className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 md:p-5 lg:p-6">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-foreground">4</div>
                <div className="font-secondary text-muted-foreground text-sm">Today's Sessions</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-5 lg:p-6">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-foreground">12</div>
                <div className="font-secondary text-muted-foreground text-sm">This Week</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-5 lg:p-6">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-success">3</div>
                <div className="font-secondary text-muted-foreground text-sm">Pending</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-5 lg:p-6">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-foreground">18</div>
                <div className="font-secondary text-muted-foreground text-sm">Available Slots</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <HStack className="justify-between">
            <TabsList className="grid grid-cols-3 w-fit">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>
            
            <HStack>
              <Button variant="outline" className="min-h-touch-min">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-garden-green text-white hover:bg-elated-emerald min-h-touch-min">
                <Calendar className="w-4 h-4 mr-2" />
                Add Appointment
              </Button>
            </HStack>
          </HStack>

          <TabsContent value="upcoming" className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-4 md:p-5 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={booking.clientAvatar} alt={booking.clientInitials} />
                        <AvatarFallback className="bg-surface-accent text-jovial-jade font-secondary font-semibold">
                          {booking.clientInitials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-primary font-semibold text-foreground">
                            {booking.type}
                          </h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {booking.time}
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
                    
                    <HStack className="gap-2">
                      <Button variant="ghost" size="sm" className="min-h-touch-min">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="min-h-touch-min">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="min-h-touch-min">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </HStack>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardContent className="p-4 md:p-5 lg:p-6">
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

          <TabsContent value="availability" className="space-y-4">
            <Card>
              <CardContent className="p-4 md:p-5 lg:p-6">
                <div className="space-y-6">
                  <HStack className="justify-between">
                    <h3 className="font-primary text-lg font-semibold text-jovial-jade">
                      Weekly Availability
                    </h3>
                    <Button variant="outline" size="sm" className="min-h-touch-min">
                      Edit Schedule
                    </Button>
                  </HStack>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availabilitySlots.map((day) => (
                      <Card key={day.day} className="border-border">
                        <CardContent className="p-4">
                          <h4 className="font-secondary font-semibold text-foreground mb-3">
                            {day.day}
                          </h4>
                          <div className="space-y-2">
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