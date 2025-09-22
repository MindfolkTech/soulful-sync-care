import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, CheckSquare, Clock } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import * as React from "react";

// --- START: Imports from original Bookings.tsx ---
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { Button } from "@/components/ui/button";
import { CalendarIntegrationModal } from "@/components/calendar/calendar-integration-modal";
import { InteractiveCalendar } from "@/components/calendar/interactive-calendar";
import { AvailabilityManager } from "@/components/calendar/availability-manager";
import { AppointmentDetailsModal } from "@/components/calendar/appointment-details-modal";
import { BookingModal } from "@/components/calendar/booking-modal";
import { FilterDropdown } from "@/components/calendar/filter-dropdown";
import { bookings } from "@/data/mock-bookings.tsx";
// --- END: Imports from original Bookings.tsx ---

// --- START: Imports from original Tasks.tsx ---
import { TaskHubShell } from "@/components/organisms/task-hub-shell";
import { mockTherapistTasks } from "@/data/mock-tasks";
import { TaskStats } from "@/types/tasks";
// --- END: Imports from original Tasks.tsx ---

const CalendarView = () => {
    // State and handlers from original TherapistBookings component, simplified for this view
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = React.useState(false);
    const [selectedAppointment, setSelectedAppointment] = React.useState<any>(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = React.useState<string>('');
    const [isIntegrationModalOpen, setIsIntegrationModalOpen] = React.useState(false);
    const [connectedCalendars, setConnectedCalendars] = React.useState({
        google: false,
        outlook: false
    });
    const [filters, setFilters] = React.useState({
        dateRange: 'week' as 'today' | 'week' | 'month' | 'custom',
        appointmentType: [] as string[],
        status: [] as string[],
        client: ''
    });
    
    const handleAppointmentClick = (appointment: any) => { 
        setSelectedAppointment(appointment); 
        setIsAppointmentModalOpen(true); 
    };
    
    const handleTimeSlotClick = (date: Date, time: string) => { 
        console.log("Time slot clicked", date, time);
        setSelectedDate(date);
        setSelectedTime(time);
        setIsBookingModalOpen(true);
    };
    
    const handleAppointmentMove = (appointmentId: string, newDate: Date, newTime: string) => { 
        console.log('Appointment moved:', appointmentId, newDate, newTime); 
    };
    
    const handleBookTime = (bookingData: any) => {
        console.log('Booking time:', bookingData);
        // TODO: Integrate with backend to save blocked time
        setIsBookingModalOpen(false);
    };

    const handleCalendarConnect = (provider: 'google' | 'outlook') => {
        console.log(`Connecting to ${provider} calendar...`);
        setConnectedCalendars(prev => ({ ...prev, [provider]: true }));
        // TODO: Implement actual calendar integration
    };

    const handleCalendarDisconnect = (provider: 'google' | 'outlook') => {
        console.log(`Disconnecting from ${provider} calendar...`);
        setConnectedCalendars(prev => ({ ...prev, [provider]: false }));
        // TODO: Implement actual calendar disconnection
    };

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
        console.log('Filters changed:', newFilters);
        // TODO: Apply filters to appointments
    };

    // Filter available appointment types and clients from bookings
    const availableTypes = Array.from(new Set(bookings.map(b => b.type)));
    const availableClients = Array.from(new Set(bookings.map(b => b.clientName)));

    return (
        <>
            {/* Calendar Toolbar */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setIsIntegrationModalOpen(true)}
                            className="flex items-center gap-2"
                        >
                            <CalendarIcon className="w-4 h-4" />
                            Calendar Integration
                            {(connectedCalendars.google || connectedCalendars.outlook) && (
                                <div className="w-2 h-2 bg-success-bg rounded-full"></div>
                            )}
                        </Button>
                        
                        <FilterDropdown
                            onFilterChange={handleFilterChange}
                            currentFilters={filters}
                            availableClients={availableClients}
                            availableTypes={availableTypes}
                        />
                    </div>
                    
                    <div className="text-sm text-text-muted">
                        {connectedCalendars.google && "Google Calendar connected"}
                        {connectedCalendars.google && connectedCalendars.outlook && " • "}
                        {connectedCalendars.outlook && "Outlook connected"}
                        {!connectedCalendars.google && !connectedCalendars.outlook && "No calendars connected"}
                    </div>
                </div>
            </div>

            <InteractiveCalendar 
                appointments={bookings} 
                onAppointmentClick={handleAppointmentClick} 
                onTimeSlotClick={handleTimeSlotClick} 
                onAppointmentMove={handleAppointmentMove} 
            />
            
            <AppointmentDetailsModal 
                isOpen={isAppointmentModalOpen} 
                onClose={() => setIsAppointmentModalOpen(false)} 
                appointment={selectedAppointment} 
                onEdit={() => {}} 
                onReschedule={() => {}} 
                onCancel={() => {}} 
                onJoinSession={() => {}} 
                onMessageClient={() => {}} 
            />
            
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onBookTime={handleBookTime}
            />
            
            <CalendarIntegrationModal
                isOpen={isIntegrationModalOpen}
                onClose={() => setIsIntegrationModalOpen(false)}
                onConnect={handleCalendarConnect}
                onDisconnect={handleCalendarDisconnect}
                connectedCalendars={connectedCalendars}
            />
        </>
    );
}

const ManageAvailabilityView = () => {
    // State and handlers from original AvailabilityManager
    const [workingHours, setWorkingHours] = React.useState([ { day: 'Monday', enabled: true, startTime: '09:00', endTime: '17:00' }, { day: 'Tuesday', enabled: true, startTime: '09:00', endTime: '17:00' }, { day: 'Wednesday', enabled: true, startTime: '09:00', endTime: '17:00' }, { day: 'Thursday', enabled: true, startTime: '09:00', endTime: '17:00' }, { day: 'Friday', enabled: true, startTime: '09:00', endTime: '17:00' }, { day: 'Saturday', enabled: false, startTime: '10:00', endTime: '14:00' }, { day: 'Sunday', enabled: false, startTime: '10:00', endTime: '14:00' } ]);
    const [blockedTimes, setBlockedTimes] = React.useState([ { id: '1', title: 'Lunch Break', startDate: '2024-01-15', endDate: '2024-01-15', startTime: '12:00', endTime: '13:00', recurring: true } ]);
    const handleAddBlockedTime = (blockedTime: any) => { const newBlockedTime = { ...blockedTime, id: Date.now().toString() }; setBlockedTimes(prev => [...prev, newBlockedTime]); };
    const handleRemoveBlockedTime = (id: string) => { setBlockedTimes(prev => prev.filter(bt => bt.id !== id)); };
    const handleSaveAvailability = () => { console.log('Saving availability:', { workingHours, blockedTimes }); };

    return (
        <AvailabilityManager workingHours={workingHours} blockedTimes={blockedTimes} onUpdateWorkingHours={setWorkingHours} onAddBlockedTime={handleAddBlockedTime} onRemoveBlockedTime={handleRemoveBlockedTime} onSave={handleSaveAvailability} />
    )
}

const TaskHubView = () => {
    // All state and handlers from original TherapistTasks component
    const [loading] = React.useState(false);
    const [error] = React.useState<string | null>(null);
    const stats: TaskStats = React.useMemo(() => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return {
            total: mockTherapistTasks.filter(t => t.status !== 'done').length,
            dueToday: mockTherapistTasks.filter(t => t.due && new Date(t.due) >= today && new Date(t.due) < tomorrow && t.status !== 'done' ).length,
            overdue: mockTherapistTasks.filter(t => t.due && new Date(t.due) < today && t.status !== 'done').length,
            completed: mockTherapistTasks.filter(t => t.status === 'done').length
        };
    }, []);

    return (
        <TaskHubShell role="therapist" tasks={mockTherapistTasks} stats={stats} title="" subtitle="" loading={loading} error={error} onRetry={() => { console.log("Retrying..."); }} />
    )
}

export default function TherapistSchedule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'calendar';

  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
            <div className="space-y-4">
                <div className="space-y-1">
                    <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))]">Schedule & Tasks</h1>
                    <p className="font-secondary text-[hsl(var(--text-secondary))]">Manage your appointments, tasks, and working hours.</p>
                </div>
                <Tabs value={activeTab} onValueChange={(value) => setSearchParams({ tab: value })} className="w-full">
                    <TabsList>
                        <TabsTrigger value="calendar"><CalendarIcon className="w-4 h-4 mr-2" /> Calendar</TabsTrigger>
                        <TabsTrigger value="tasks"><CheckSquare className="w-4 h-4 mr-2" /> Task Hub</TabsTrigger>
                        <TabsTrigger value="availability"><Clock className="w-4 h-4 mr-2" /> Manage Availability</TabsTrigger>
                    </TabsList>
                    <TabsContent value="calendar" className="mt-4">
                        <CalendarView />
                    </TabsContent>
                    <TabsContent value="tasks" className="mt-4">
                        <TaskHubView />
                    </TabsContent>
                    <TabsContent value="availability" className="mt-4">
                        <ManageAvailabilityView />
                    </TabsContent>
                </Tabs>
            </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}


