import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, MessageCircle, MoreHorizontal, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarIntegrationModal } from "@/components/calendar/calendar-integration-modal";
import { InteractiveCalendar } from "@/components/calendar/interactive-calendar";
import { AvailabilityManager } from "@/components/calendar/availability-manager";
import { AppointmentDetailsModal } from "@/components/calendar/appointment-details-modal";
import { BookingModal } from "@/components/calendar/booking-modal";
import { FilterDropdown } from "@/components/calendar/filter-dropdown";
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
  const [connectedCalendars, setConnectedCalendars] = React.useState({
    google: false,
    outlook: false
  });

  const [isCalendarModalOpen, setIsCalendarModalOpen] = React.useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = React.useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] = React.useState<any>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string>('09:00');
  const [filters, setFilters] = React.useState({
    dateRange: 'week',
    appointmentType: [],
    status: [],
    client: ''
  });

  const [workingHours, setWorkingHours] = React.useState([
    { day: 'Monday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Tuesday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Wednesday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Thursday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Friday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Saturday', enabled: false, startTime: '10:00', endTime: '14:00' },
    { day: 'Sunday', enabled: false, startTime: '10:00', endTime: '14:00' }
  ]);

  const [blockedTimes, setBlockedTimes] = React.useState([
    {
      id: '1',
      title: 'Lunch Break',
      startDate: '2024-01-15',
      endDate: '2024-01-15',
      startTime: '12:00',
      endTime: '13:00',
      recurring: true
    }
  ]);

  const handleConnectCalendar = async (provider: 'google' | 'outlook') => {
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1000));
    setConnectedCalendars(prev => ({ ...prev, [provider]: true }));
  };

  const handleDisconnectCalendar = (provider: 'google' | 'outlook') => {
    setConnectedCalendars(prev => ({ ...prev, [provider]: false }));
  };

  const handleAppointmentClick = (appointment: any) => {
    console.log('Appointment clicked:', appointment);
    setSelectedAppointment(appointment);
    setIsAppointmentModalOpen(true);
  };

  const handleTimeSlotClick = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setIsBookingModalOpen(true);
  };

  const handleAppointmentMove = (appointmentId: string, newDate: Date, newTime: string) => {
    console.log('Appointment moved:', appointmentId, newDate, newTime);
    // Update appointment in backend
  };

  const handleAddBlockedTime = (blockedTime: any) => {
    const newBlockedTime = {
      ...blockedTime,
      id: Date.now().toString()
    };
    setBlockedTimes(prev => [...prev, newBlockedTime]);
  };

  const handleRemoveBlockedTime = (id: string) => {
    setBlockedTimes(prev => prev.filter(bt => bt.id !== id));
  };

  const handleSaveAvailability = () => {
    console.log('Saving availability:', { workingHours, blockedTimes });
    // Save to backend
  };

  // Appointment action handlers
  const handleEditAppointment = (appointment: any) => {
    console.log('Edit appointment:', appointment);
    // Open edit modal or navigate to edit page
  };

  const handleRescheduleAppointment = (appointment: any) => {
    console.log('Reschedule appointment:', appointment);
    // Open reschedule modal
  };

  const handleCancelAppointment = (appointmentId: string) => {
    console.log('Cancel appointment:', appointmentId);
    // Show confirmation and cancel appointment
  };

  const handleJoinSession = (appointmentId: string) => {
    console.log('Join session:', appointmentId);
    // Navigate to video session
  };

  const handleMessageClient = (clientName: string) => {
    console.log('Message client:', clientName);
    // Open messaging interface
  };

  const handleBookTime = (bookingData: any) => {
    console.log('Book time:', bookingData);
    // Add to blocked times or personal appointments
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Apply filters to appointments
  };

  return (
    <DashboardLayout 
      title="Bookings & Schedule"
      subtitle="Manage your appointments and availability"
    >
      <Stack className="space-y-[--space-lg]">

        {/* Main Content Tabs */}
        <Tabs defaultValue="calendar" className="space-y-[--space-lg]">
          <HStack className="justify-between">
            <TabsList className="grid grid-cols-3 w-fit">
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="availability">Manage Availability</TabsTrigger>
            </TabsList>
            
            <HStack>
              <FilterDropdown
                onFilterChange={handleFilterChange}
                currentFilters={filters}
                availableClients={['Jessica Davis', 'Michael Smith', 'Robert Parker', 'Lisa Martinez']}
                availableTypes={['Chemistry Call', 'Therapy Session']}
              />
              <Button 
                variant="outline" 
                className="min-h-touch-min font-secondary" 
                onClick={() => setIsCalendarModalOpen(true)}
                aria-label="Add calendar integration"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Add My Calendar
              </Button>
            </HStack>
          </HStack>

          <TabsContent value="calendar" className="space-y-[--space-md]">
            <InteractiveCalendar
              appointments={bookings}
              onAppointmentClick={handleAppointmentClick}
              onTimeSlotClick={handleTimeSlotClick}
              onAppointmentMove={handleAppointmentMove}
            />
          </TabsContent>

          <TabsContent value="list" className="space-y-[--space-md]">
            {bookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </TabsContent>

          <TabsContent value="availability" className="space-y-[--space-md]">
            <AvailabilityManager
              workingHours={workingHours}
              blockedTimes={blockedTimes}
              onUpdateWorkingHours={setWorkingHours}
              onAddBlockedTime={handleAddBlockedTime}
              onRemoveBlockedTime={handleRemoveBlockedTime}
              onSave={handleSaveAvailability}
            />
          </TabsContent>
        </Tabs>

        {/* Calendar Integration Modal */}
        <CalendarIntegrationModal
          isOpen={isCalendarModalOpen}
          onClose={() => setIsCalendarModalOpen(false)}
          onConnect={handleConnectCalendar}
          onDisconnect={handleDisconnectCalendar}
          connectedCalendars={connectedCalendars}
        />

        {/* Appointment Details Modal */}
        <AppointmentDetailsModal
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
          appointment={selectedAppointment}
          onEdit={handleEditAppointment}
          onReschedule={handleRescheduleAppointment}
          onCancel={handleCancelAppointment}
          onJoinSession={handleJoinSession}
          onMessageClient={handleMessageClient}
        />

        {/* Booking Modal */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onBookTime={handleBookTime}
        />
      </Stack>
    </DashboardLayout>
  );
}