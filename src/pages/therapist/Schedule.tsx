import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Calendar as CalendarIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import * as React from "react";

// --- START: Imports from original Bookings.tsx ---
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { Button } from "@/components/ui/button";
import { CalendarIntegrationModal } from "@/components/calendar/calendar-integration-modal";
import { InteractiveCalendar } from "@/components/calendar/interactive-calendar";
import { EnhancedAvailabilityManager } from "@/components/calendar/enhanced-availability-manager";
import { AppointmentDetailsModal } from "@/components/calendar/appointment-details-modal";
import { BookingModal } from "@/components/calendar/booking-modal";
import { FilterDropdown } from "@/components/calendar/filter-dropdown";
import { bookings } from "@/data/mock-bookings.tsx";
// --- END: Imports from original Bookings.tsx ---


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
                            data-onboarding="calendar-integration-button"
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

            <div data-onboarding="availability-hours">
                <InteractiveCalendar 
                    appointments={bookings} 
                    onAppointmentClick={handleAppointmentClick} 
                    onTimeSlotClick={handleTimeSlotClick} 
                    onAppointmentMove={handleAppointmentMove} 
                />
            </div>

            {/* Onboarding Target Sections - Hidden by default */}
            <div className="mt-6 space-y-4 opacity-0 pointer-events-none" aria-hidden="true">
                <div data-onboarding="buffer-settings" className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Buffer Time Settings</h3>
                    <p className="text-sm text-gray-600">Add automatic buffer time between appointments</p>
                </div>
                
                <div data-onboarding="auto-accept-settings" className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Auto-Accept Rules</h3>
                    <p className="text-sm text-gray-600" aria-label="Mindfolk will automatically accept new bookings on your behalf. We will send you an email notifying you of your new booking. Please tell us how much notice you require for new bookings. (Note: To ensure your required notice is always respected, clients will not be able to book any available slots that fall within your notice period).">
                        Set your booking notice requirements
                    </p>
                </div>
                
                <div data-onboarding="cancellation-agreement" className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Cancellation Agreement</h3>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span className="text-sm">I understand that if I don't show up to an appointment without giving the client reasonable notice, or if I cancel an appointment more than 3 times, my account may be suspended.</span>
                    </label>
                </div>
            </div>
            
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
    return <EnhancedAvailabilityManager />;
}


export default function TherapistSchedule() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab');
  const isAvailability = activeTab === 'availability';

  // Dynamic page title based on active view
  const pageTitle = isAvailability ? 'Manage Availability' : 'Schedule Calendar';
  const pageDescription = isAvailability 
    ? 'Set your working hours and availability preferences.' 
    : 'Manage your appointments and calendar.';

  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-4">
            <div className="space-y-1">
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))]">{pageTitle}</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">{pageDescription}</p>
            </div>
            {isAvailability ? <ManageAvailabilityView /> : <CalendarView />}
          </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}


