import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock, Video, MessageCircle, SwipeLeft, SwipeRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface MobileCalendarProps {
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function MobileCalendar({ 
  appointments, 
  onAppointmentClick,
  onSwipeLeft,
  onSwipeRight 
}: MobileCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Get appointments for current date
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => 
      apt.sessionTime.toDateString() === date.toDateString()
    );
  };

  const currentAppointments = getAppointmentsForDate(currentDate);

  const formatTimeDisplay = (time: Date): string => {
    return time.toLocaleTimeString('en-US', { 
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
    if (type.toLowerCase().includes('chemistry')) return <MessageCircle className="w-4 h-4" />;
    if (type.toLowerCase().includes('therapy')) return <Video className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      onSwipeLeft();
    }
    if (isRightSwipe) {
      onSwipeRight();
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  return (
    <Card>
      <CardHeader className="p-[--space-sm] md:p-[--space-md] pb-[--space-xs]">
        <div className="flex items-center justify-between">
          <CardTitle className="font-primary text-[--jovial-jade] text-sm md:text-base">
            Today's Schedule
          </CardTitle>
          <div className="flex items-center gap-[--space-xs]">
            <Button 
              variant="outline" 
              size="sm" 
              className="min-h-[--touch-target-min] font-secondary text-xs"
              onClick={() => navigateDate('prev')}
            >
              <ChevronLeft className="w-3 h-3" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="min-h-[--touch-target-min] font-secondary text-xs"
              onClick={() => navigateDate('next')}
            >
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-[--space-sm] md:p-[--space-md] pt-0">
        <div 
          className="space-y-[--space-sm]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Date Header */}
          <div className="text-center p-[--space-sm] bg-[--surface-accent] rounded-lg">
            <h3 className="font-primary text-[--jovial-jade] text-lg">
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <p className="font-secondary text-[--text-secondary] text-sm">
              {currentAppointments.length} appointment{currentAppointments.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Swipe Instructions */}
          <div className="flex items-center justify-center gap-[--space-sm] text-[--text-muted] text-xs">
            <SwipeLeft className="w-4 h-4" />
            <span className="font-secondary">Swipe to change days</span>
            <SwipeRight className="w-4 h-4" />
          </div>

          {/* Appointments List */}
          <div className="space-y-[--space-xs]">
            {currentAppointments.length > 0 ? (
              currentAppointments
                .sort((a, b) => a.sessionTime.getTime() - b.sessionTime.getTime())
                .map(appointment => (
                  <div 
                    key={appointment.id}
                    className="flex items-center justify-between p-[--space-sm] border rounded-lg min-h-[--touch-target-comfort] cursor-pointer transition-colors hover:bg-[--surface-accent]"
                    onClick={() => onAppointmentClick(appointment)}
                  >
                    <div className="flex items-center gap-[--space-sm] min-w-0 flex-1">
                      <div className="w-10 h-10 bg-[--surface-accent] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-secondary text-[--text-primary] text-sm">
                          {appointment.clientInitials}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-secondary font-bold text-foreground text-sm truncate">
                          {appointment.clientName}
                        </h4>
                        <div className="flex items-center gap-[--space-xs]">
                          {getTypeIcon(appointment.type)}
                          <span className="font-secondary text-[--text-secondary] text-xs">
                            {appointment.type}
                          </span>
                          <span className="font-secondary text-[--text-secondary] text-xs">
                            • {appointment.duration}
                          </span>
                        </div>
                        <p className="font-secondary text-[--text-secondary] text-xs">
                          {formatTimeDisplay(appointment.sessionTime)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-[--space-xs] flex-shrink-0">
                      <Badge className={cn("text-xs", getStatusColor(appointment.status))}>
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center p-[--space-md] text-[--text-muted]">
                <Clock className="w-8 h-8 mx-auto mb-[--space-xs] opacity-50" />
                <p className="font-secondary text-sm">
                  No appointments scheduled for this day
                </p>
                <p className="font-secondary text-xs mt-[--space-xs]">
                  Swipe to check other days
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {currentAppointments.length > 0 && (
            <div className="flex gap-[--space-sm] pt-[--space-sm] border-t">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 min-h-[--touch-target-min] font-secondary text-xs"
                onClick={() => navigateDate('prev')}
              >
                Previous Day
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 min-h-[--touch-target-min] font-secondary text-xs"
                onClick={() => navigateDate('next')}
              >
                Next Day
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

