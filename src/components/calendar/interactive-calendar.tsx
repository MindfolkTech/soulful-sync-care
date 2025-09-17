import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Video, MessageCircle, MoreHorizontal } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Appointment {
  id: string;
  clientName: string;
  clientInitials: string;
  type: string;
  sessionTime: Date;
  duration: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
}

interface InteractiveCalendarProps {
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
  onTimeSlotClick: (date: Date, time: string) => void;
  onAppointmentMove: (appointmentId: string, newDate: Date, newTime: string) => void;
}

// Day View Component - Time slot grid for single day (mobile-optimized)
function DayView({ 
  date, 
  appointments, 
  onAppointmentClick, 
  onTimeSlotClick, 
  getAppointmentsForDate, 
  getTypeIcon,
  getAppointmentForTimeSlot,
  timeSlots,
  formatTimeDisplay,
  getStatusColor
}: any) {
  const appointmentsForDay = getAppointmentsForDate(date);
  
  return (
    <div className="space-y-[--space-sm]">
      {/* Day Header */}
      <div className="text-center border-b pb-[--space-sm]">
        <div className="font-primary text-[--jovial-jade] text-lg font-semibold">
          {format(date, 'EEEE, MMMM do')}
        </div>
      </div>

      {/* Time Slot Grid - Single Column - ONE VIEWPORT on mobile */}
      <div className="space-y-[--space-xs] h-[calc(100vh-300px)] md:h-[500px] overflow-y-auto">
        {timeSlots.map(time => {
          const appointment = getAppointmentForTimeSlot(date, time);
          return (
            <div 
              key={time}
              className="flex items-center gap-[--space-sm] min-h-[--touch-target-comfort]"
            >
              {/* Time Label */}
              <div className="w-20 text-right font-secondary text-[--text-secondary] text-sm">
                {formatTimeDisplay(time)}
              </div>
              
              {/* Time Slot */}
              <div 
                className={cn(
                  "flex-1 min-h-[--touch-target-comfort] border rounded-[--radius-md] cursor-pointer transition-all duration-200",
                  appointment 
                    ? "bg-[--surface-accent] border-[--garden-green] hover:bg-[--surface-accent]/90 shadow-sm" 
                    : "border-[--border] hover:border-[--garden-green] hover:bg-[--surface-accent]/30"
                )}
                onClick={() => appointment ? onAppointmentClick(appointment) : onTimeSlotClick(date, time)}
              >
                {appointment ? (
                  <div className="p-[--space-sm]">
                    <div className="flex items-center justify-between mb-[--space-xs]">
                      <div className="flex items-center gap-[--space-xs]">
                        {getTypeIcon(appointment.type)}
                        <span className="font-secondary text-[--text-primary] text-sm font-medium">
                          {appointment.clientName}
                        </span>
                      </div>
                      <Badge className={cn("text-xs px-2 py-1", getStatusColor(appointment.status))}>
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="text-[--text-secondary] text-xs">
                      {appointment.duration}
                    </div>
                  </div>
                ) : (
                  <div className="p-[--space-sm] flex items-center justify-center">
                    <span className="font-secondary text-[--text-muted] text-sm">
                      Available
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Week View Component - Proper time grid like Google Calendar
function WeekView({ 
  currentDate, 
  appointments, 
  onAppointmentClick, 
  onTimeSlotClick, 
  getAppointmentsForDate, 
  getTypeIcon,
  getAppointmentForTimeSlot,
  timeSlots,
  formatTimeDisplay,
  getStatusColor,
  getWeekDays
}: any) {
  const weekDays = getWeekDays();
  
  return (
    <div className="space-y-[--space-sm]">
      {/* Week Header - Days of the week */}
      <div className="grid grid-cols-8 gap-[--space-xs] border-b pb-[--space-sm]">
        {/* Empty cell for time column */}
        <div className="w-20"></div>
        
        {/* Day Headers */}
        {weekDays.map((day, index) => {
          const isToday = day.toDateString() === new Date().toDateString();
          return (
            <div key={index} className="text-center">
              <div className="font-secondary text-[--text-secondary] text-xs font-medium">
                {format(day, 'EEE')}
              </div>
              <div className={cn(
                "font-secondary text-sm font-semibold mt-1",
                isToday ? "text-[--garden-green]" : "text-[--text-primary]"
              )}>
                {day.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time Grid - ONE VIEWPORT rule */}
      <div className="space-y-[--space-xs] h-[400px] overflow-y-auto">
        {timeSlots.map(time => (
          <div key={time} className="grid grid-cols-8 gap-[--space-xs] items-center">
            {/* Time Column */}
            <div className="w-20 text-right font-secondary text-[--text-secondary] text-xs py-[--space-xs]">
              {formatTimeDisplay(time)}
            </div>
            
            {/* Day Columns */}
            {weekDays.map((day, dayIndex) => {
              const appointment = getAppointmentForTimeSlot(day, time);
              return (
                <div 
                  key={dayIndex}
                  className={cn(
                    "min-h-[50px] border rounded-[--radius-sm] cursor-pointer transition-all duration-200",
                    appointment 
                      ? "bg-[--surface-accent] border-[--garden-green] hover:bg-[--surface-accent]/90 shadow-sm" 
                      : "border-[--border] hover:border-[--garden-green] hover:bg-[--surface-accent]/30"
                  )}
                  onClick={() => appointment ? onAppointmentClick(appointment) : onTimeSlotClick(day, time)}
                >
                  {appointment ? (
                    <div className="p-[--space-xs] h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-1">
                        <Badge className={cn("text-xs px-1 py-0.5", getStatusColor(appointment.status))}>
                          {appointment.status}
                        </Badge>
                        <div className="text-[--garden-green]">
                          {getTypeIcon(appointment.type)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-secondary font-bold text-[--text-primary] text-xs truncate">
                          {appointment.clientName}
                        </h4>
                        <p className="font-secondary text-[--text-secondary] text-xs">
                          {appointment.duration}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <span className="font-secondary text-[--text-muted] text-xs opacity-0 hover:opacity-100 transition-opacity">
                        +
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-[--space-sm] justify-center border-t pt-[--space-sm]">
        <div className="flex items-center gap-[--space-xs]">
          <div className="w-3 h-3 border border-[--border] rounded-[--radius-sm]"></div>
          <span className="font-secondary text-[--text-secondary] text-xs">Available</span>
        </div>
        <div className="flex items-center gap-[--space-xs]">
          <div className="w-3 h-3 bg-[--surface-accent] border border-[--garden-green] rounded-[--radius-sm]"></div>
          <span className="font-secondary text-[--text-secondary] text-xs">Booked</span>
        </div>
      </div>
    </div>
  );
}

// Month View Component - Consistent design with proper month grid
function MonthView({ 
  currentDate, 
  appointments, 
  onAppointmentClick, 
  onTimeSlotClick, 
  getAppointmentsForDate, 
  getTypeIcon,
  getStatusColor,
  getMonthDays
}: any) {
  const monthDays = getMonthDays();
  
  return (
    <div className="space-y-[--space-sm]">
      {/* Month Header */}
      <div className="text-center border-b pb-[--space-sm]">
        <div className="font-primary text-[--jovial-jade] text-lg font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </div>
      </div>

      {/* Month Grid Header */}
      <div className="grid grid-cols-7 gap-[--space-xs] border-b pb-[--space-xs]">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-secondary text-[--text-secondary] text-xs font-medium p-[--space-xs]">
            {day}
          </div>
        ))}
      </div>

      {/* Month Grid - Fixed height for ONE VIEWPORT, no overflow */}
      <div className="grid grid-cols-7 gap-[--space-xs] h-[400px] overflow-hidden">
        {monthDays.map((day, index) => {
          const appointmentsForDay = getAppointmentsForDate(day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday = day.toDateString() === new Date().toDateString();
          
          return (
            <div 
              key={index}
              className={cn(
                "border rounded-[--radius-sm] p-[--space-xs] cursor-pointer transition-all duration-200 flex flex-col",
                isCurrentMonth ? "border-[--border]" : "border-[--border]/30",
                isToday && "bg-[--surface-accent] border-[--garden-green]",
                "hover:border-[--garden-green] hover:bg-[--surface-accent]/30"
              )}
              onClick={() => onTimeSlotClick(day, '09:00')}
            >
              {/* Day Number */}
              <div className={cn(
                "font-secondary text-xs font-medium mb-[--space-xs] text-center",
                isCurrentMonth ? "text-[--text-primary]" : "text-[--text-muted]",
                isToday && "text-[--garden-green] font-bold"
              )}>
                {day.getDate()}
              </div>
              
              {/* Appointments */}
              <div className="flex-1 space-y-[--space-xs] overflow-hidden">
                {appointmentsForDay.slice(0, 2).map(appointment => (
                  <div 
                    key={appointment.id}
                    className="bg-[--surface-accent] border border-[--garden-green] rounded-[--radius-sm] p-1 cursor-pointer hover:bg-[--surface-accent]/90 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAppointmentClick(appointment);
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <div className="text-[--garden-green] flex-shrink-0">
                        {getTypeIcon(appointment.type)}
                      </div>
                      <span className="font-secondary text-[--text-primary] text-xs truncate">
                        {appointment.clientName}
                      </span>
                    </div>
                    <div className="font-secondary text-[--text-secondary] text-xs">
                      {appointment.sessionTime.toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </div>
                  </div>
                ))}
                {appointmentsForDay.length > 2 && (
                  <div className="text-center">
                    <span className="font-secondary text-[--text-muted] text-xs">
                      +{appointmentsForDay.length - 2} more
                    </span>
                  </div>
                )}
                {appointmentsForDay.length === 0 && isCurrentMonth && (
                  <div className="flex-1 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="font-secondary text-[--text-muted] text-xs">+</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-[--space-sm] justify-center border-t pt-[--space-sm]">
        <div className="flex items-center gap-[--space-xs]">
          <div className="w-3 h-3 border border-[--border] rounded-[--radius-sm]"></div>
          <span className="font-secondary text-[--text-secondary] text-xs">Available</span>
        </div>
        <div className="flex items-center gap-[--space-xs]">
          <div className="w-3 h-3 bg-[--surface-accent] border border-[--garden-green] rounded-[--radius-sm]"></div>
          <span className="font-secondary text-[--text-secondary] text-xs">Booked</span>
        </div>
      </div>
    </div>
  );
}

export function InteractiveCalendar({ 
  appointments, 
  onAppointmentClick, 
  onTimeSlotClick,
  onAppointmentMove 
}: InteractiveCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Generate time slots for the day (8 AM to 6 PM) - Reduced for less clutter
  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 8; // Start at 8 AM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Get appointments for a specific date
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => 
      apt.sessionTime.toDateString() === date.toDateString()
    );
  };

  // Get appointments for a specific time slot
  const getAppointmentForTimeSlot = (date: Date, time: string) => {
    const appointmentsForDate = getAppointmentsForDate(date);
    return appointmentsForDate.find(apt => {
      const aptTime = apt.sessionTime.toTimeString().slice(0, 5);
      return aptTime === time;
    });
  };

  // Generate week days
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  // Generate month days
  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    
    const days = [];
    const endDate = new Date(lastDay);
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    
    return days;
  };

  const formatTimeDisplay = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-[--success-bg] text-[--success-text]';
      case 'pending': return 'bg-[--warning-bg] text-[--warning-text]';
      case 'cancelled': return 'bg-[--error-bg] text-[--error-text]';
      default: return 'bg-[--surface-accent] text-[--text-primary]';
    }
  };

  const getTypeIcon = (type: string) => {
    if (type.toLowerCase().includes('chemistry')) return <MessageCircle className="w-3 h-3" />;
    if (type.toLowerCase().includes('therapy')) return <Video className="w-3 h-3" />;
    return <Clock className="w-3 h-3" />;
  };

  // Mobile responsive view logic - Clear mobile behavior
  const getResponsiveView = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) { // Mobile
      // Mobile: Day view for focused interaction, Week view shows compact week grid
      return view === 'week' ? 'day' : view === 'month' ? 'week' : view;
    }
    // Desktop: All views available
    return view;
  };

  const responsiveView = getResponsiveView();

  return (
    <Card>
      <CardHeader className="p-[--space-sm] md:p-[--space-md] pb-[--space-xs]">
        <div className="flex items-center justify-between">
          <CardTitle className="font-primary text-[--jovial-jade] text-sm md:text-base">
            Calendar View
          </CardTitle>
          <div className="flex items-center gap-[--space-xs]">
            {/* Responsive View Toggle */}
            <div className="flex border rounded-md">
              <Button 
                variant={responsiveView === 'day' || responsiveView === 'week' ? 'primary' : 'outline'}
                size="sm" 
                className="rounded-r-none min-h-[--touch-target-min] font-secondary text-xs"
                onClick={() => setView('week')}
              >
                <span className="md:hidden">Day</span>
                <span className="hidden md:inline">Week</span>
              </Button>
              <Button 
                variant={responsiveView === 'month' ? 'primary' : 'outline'}
                size="sm" 
                className="rounded-l-none min-h-[--touch-target-min] font-secondary text-xs"
                onClick={() => setView('month')}
              >
                <span className="md:hidden">Week</span>
                <span className="hidden md:inline">Month</span>
              </Button>
            </div>
            <div className="flex items-center gap-[--space-xs]">
              <Button 
                variant="outline" 
                size="sm" 
                className="min-h-[--touch-target-min] font-secondary text-xs"
                onClick={() => {
                  const daysToSubtract = responsiveView === 'day' ? 1 : responsiveView === 'week' ? 7 : 30;
                  setCurrentDate(new Date(currentDate.getTime() - daysToSubtract * 24 * 60 * 60 * 1000));
                }}
              >
                <ChevronLeft className="w-3 h-3" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="min-h-[--touch-target-min] font-secondary text-xs"
                onClick={() => {
                  const daysToAdd = responsiveView === 'day' ? 1 : responsiveView === 'week' ? 7 : 30;
                  setCurrentDate(new Date(currentDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000));
                }}
              >
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-[--space-sm] md:p-[--space-md] pt-0">
        {responsiveView === 'day' ? (
          <DayView 
            date={currentDate}
            appointments={appointments}
            onAppointmentClick={onAppointmentClick}
            onTimeSlotClick={onTimeSlotClick}
            getAppointmentsForDate={getAppointmentsForDate}
            getTypeIcon={getTypeIcon}
            getAppointmentForTimeSlot={getAppointmentForTimeSlot}
            timeSlots={timeSlots}
            formatTimeDisplay={formatTimeDisplay}
            getStatusColor={getStatusColor}
          />
        ) : responsiveView === 'week' ? (
          <WeekView 
            currentDate={currentDate}
            appointments={appointments}
            onAppointmentClick={onAppointmentClick}
            onTimeSlotClick={onTimeSlotClick}
            getAppointmentsForDate={getAppointmentsForDate}
            getTypeIcon={getTypeIcon}
            getAppointmentForTimeSlot={getAppointmentForTimeSlot}
            timeSlots={timeSlots}
            formatTimeDisplay={formatTimeDisplay}
            getStatusColor={getStatusColor}
            getWeekDays={getWeekDays}
          />
        ) : (
          <MonthView 
            currentDate={currentDate}
            appointments={appointments}
            onAppointmentClick={onAppointmentClick}
            onTimeSlotClick={onTimeSlotClick}
            getAppointmentsForDate={getAppointmentsForDate}
            getTypeIcon={getTypeIcon}
            getStatusColor={getStatusColor}
            getMonthDays={getMonthDays}
          />
        )}
      </CardContent>
    </Card>
  );
}
