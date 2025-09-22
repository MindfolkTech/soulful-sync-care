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
    const handleAppointmentClick = (appointment: any) => { setSelectedAppointment(appointment); setIsAppointmentModalOpen(true); };
    const handleTimeSlotClick = (date: Date, time: string) => { console.log("Time slot clicked", date, time); };
    const handleAppointmentMove = (appointmentId: string, newDate: Date, newTime: string) => { console.log('Appointment moved:', appointmentId, newDate, newTime); };

    return (
        <>
            <InteractiveCalendar appointments={bookings} onAppointmentClick={handleAppointmentClick} onTimeSlotClick={handleTimeSlotClick} onAppointmentMove={handleAppointmentMove} />
            <AppointmentDetailsModal isOpen={isAppointmentModalOpen} onClose={() => setIsAppointmentModalOpen(false)} appointment={selectedAppointment} onEdit={() => {}} onReschedule={() => {}} onCancel={() => {}} onJoinSession={() => {}} onMessageClient={() => {}} />
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


