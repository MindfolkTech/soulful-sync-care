import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, Clock, Save, X } from "lucide-react";
import { useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  selectedTime: string;
  onBookTime: (bookingData: BookingData) => void;
}

interface BookingData {
  title: string;
  date: Date;
  time: string;
  duration: string;
  type: 'personal' | 'break' | 'appointment';
  notes?: string;
  recurring: boolean;
}

export function BookingModal({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  onBookTime
}: BookingModalProps) {
  const [bookingData, setBookingData] = useState<BookingData>({
    title: '',
    date: selectedDate,
    time: selectedTime,
    duration: '60',
    type: 'personal',
    notes: '',
    recurring: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleSubmit = async () => {
    if (!bookingData.title.trim()) return;
    
    setIsLoading(true);
    try {
      await onBookTime(bookingData);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setBookingData({
      title: '',
      date: selectedDate,
      time: selectedTime,
      duration: '60',
      type: 'personal',
      notes: '',
      recurring: false
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-primary text-[--jovial-jade] text-lg">
            Block Time
          </DialogTitle>
          <DialogDescription>
            Block time slots to prevent bookings
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-[--space-md]">
          {/* Selected Date & Time */}
          <div className="p-[--space-md] bg-[--surface-accent] rounded-lg">
            <div className="flex items-center gap-[--space-sm] mb-[--space-xs]">
              <Calendar className="w-4 h-4 text-[--garden-green]" />
              <span className="font-secondary text-[--text-secondary] text-sm">Selected Time</span>
            </div>
            <p className="font-secondary text-[--text-primary] text-sm">
              {formatDate(selectedDate)} at {formatTime(selectedTime)}
            </p>
          </div>

          {/* Booking Form */}
          <div className="space-y-[--space-md]">
            <div>
              <Label className="font-secondary text-[--text-primary] text-sm">
                Title *
              </Label>
              <Input
                value={bookingData.title}
                onChange={(e) => setBookingData({ ...bookingData, title: e.target.value })}
                placeholder="e.g., Personal appointment, Lunch break"
                className="min-h-[--touch-target-min] font-secondary text-sm mt-[--space-xs]"
              />
            </div>

            <div>
              <Label className="font-secondary text-[--text-primary] text-sm">
                Type
              </Label>
              <RadioGroup
                value={bookingData.type}
                onValueChange={(value) => setBookingData({ ...bookingData, type: value as any })}
                className="mt-[--space-xs]"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personal" id="personal" />
                  <Label htmlFor="personal" className="font-secondary text-[--text-primary] text-sm">
                    Personal Appointment
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="break" id="break" />
                  <Label htmlFor="break" className="font-secondary text-[--text-primary] text-sm">
                    Break Time
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="appointment" id="appointment" />
                  <Label htmlFor="appointment" className="font-secondary text-[--text-primary] text-sm">
                    Other Appointment
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-[--space-sm]">
              <div>
                <Label className="font-secondary text-[--text-primary] text-sm">
                  Duration (minutes)
                </Label>
                <Input
                  type="number"
                  value={bookingData.duration}
                  onChange={(e) => setBookingData({ ...bookingData, duration: e.target.value })}
                  min="15"
                  max="480"
                  step="15"
                  className="min-h-[--touch-target-min] font-secondary text-sm mt-[--space-xs]"
                />
              </div>
              <div>
                <Label className="font-secondary text-[--text-primary] text-sm">
                  End Time
                </Label>
                <Input
                  value={(() => {
                    const [hours, minutes] = bookingData.time.split(':').map(Number);
                    const duration = parseInt(bookingData.duration);
                    const endTime = new Date();
                    endTime.setHours(hours, minutes + duration);
                    return endTime.toTimeString().slice(0, 5);
                  })()}
                  disabled
                  className="min-h-[--touch-target-min] font-secondary text-sm mt-[--space-xs] bg-[--surface-accent]"
                />
              </div>
            </div>

            <div>
              <Label className="font-secondary text-[--text-primary] text-sm">
                Notes (Optional)
              </Label>
              <Textarea
                value={bookingData.notes}
                onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                placeholder="Add any additional notes..."
                className="min-h-[--touch-target-min] font-secondary text-sm mt-[--space-xs]"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="recurring"
                checked={bookingData.recurring}
                onChange={(e) => setBookingData({ ...bookingData, recurring: e.target.checked })}
                className="min-h-[--touch-target-min]"
              />
              <Label htmlFor="recurring" className="font-secondary text-[--text-primary] text-sm">
                Recurring weekly
              </Label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-[--space-sm] pt-[--space-sm] border-t">
            <Button
              variant="outline"
              className="flex-1 min-h-[--touch-target-min] font-secondary"
              onClick={handleClose}
              disabled={isLoading}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1 min-h-[--touch-target-min] font-secondary"
              onClick={handleSubmit}
              disabled={isLoading || !bookingData.title.trim()}
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Block Time'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
