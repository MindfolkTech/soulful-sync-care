import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface TimeSlot {
  time: string;
  available: boolean;
  disabled?: boolean;
}

interface TimeSlotPickerProps {
  selectedDate: Date | undefined;
  selectedTime: string | undefined;
  onTimeSelect: (time: string) => void;
  therapistId?: string;
}

export function TimeSlotPicker({ selectedDate, selectedTime, onTimeSelect, therapistId }: TimeSlotPickerProps) {
  // Generate 15-minute slots from 9 AM to 6 PM
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 18;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = `${formatTime(hour, minute)}`;
        
        slots.push({
          time: timeString,
          available: Math.random() > 0.3, // Mock availability
          disabled: !selectedDate
        });
      }
    }
    
    return slots;
  };
  
  const formatTime = (hour: number, minute: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const [timeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  
  const morningSlots = timeSlots.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    return hour < 12;
  });
  
  const afternoonSlots = timeSlots.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    return hour >= 12;
  });

  const TimeSlotButton = ({ slot }: { slot: TimeSlot }) => {
    const hour = parseInt(slot.time.split(':')[0]);
    const minute = parseInt(slot.time.split(':')[1]);
    const displayTime = formatTime(hour, minute);
    
    return (
      <Button
        variant={selectedTime === slot.time ? "primary" : "outline"}
        size="sm"
        className={cn(
          "min-h-touch-min w-full justify-start",
          !slot.available && "opacity-50 cursor-not-allowed",
          slot.disabled && "opacity-30 cursor-not-allowed"
        )}
        disabled={!slot.available || slot.disabled}
        onClick={() => slot.available && !slot.disabled && onTimeSelect(slot.time)}
      >
        <Clock className="w-3 h-3 mr-2" />
        {displayTime}
      </Button>
    );
  };

  if (!selectedDate) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-primary text-lg">Available Times</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="w-12 h-12 mx-auto text-[hsl(var(--text-muted))] mb-4" />
            <p className="font-secondary text-[hsl(var(--text-secondary))]">
              Please select a date first to see available times
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-primary text-lg">Available Times</CardTitle>
        <p className="text-sm text-[hsl(var(--text-secondary))] font-secondary">
          {selectedDate.toLocaleDateString('en-GB', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))] mb-3">Morning</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {morningSlots.map((slot) => (
              <TimeSlotButton key={slot.time} slot={slot} />
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))] mb-3">Afternoon</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {afternoonSlots.map((slot) => (
              <TimeSlotButton key={slot.time} slot={slot} />
            ))}
          </div>
        </div>
        
        <div className="text-xs text-[hsl(var(--text-muted))] font-secondary">
          <p>• All times are in your local timezone</p>
          <p>• Sessions are 15 minutes apart to allow for transitions</p>
        </div>
      </CardContent>
    </Card>
  );
}
