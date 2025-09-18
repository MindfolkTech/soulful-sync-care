import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, Video, MessageCircle, Edit, Trash2, X } from "lucide-react";
import { useState } from "react";

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

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onEdit: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
  onCancel: (appointmentId: string) => void;
  onJoinSession: (appointmentId: string) => void;
  onMessageClient: (clientName: string) => void;
}

export function AppointmentDetailsModal({
  isOpen,
  onClose,
  appointment,
  onEdit,
  onReschedule,
  onCancel,
  onJoinSession,
  onMessageClient
}: AppointmentDetailsModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!appointment) return null;

  const formatDateTime = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]';
      case 'pending': return 'bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]';
      case 'cancelled': return 'bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))]';
      default: return 'bg-[hsl(var(--surface-accent))] text-[hsl(var(--text-primary))]';
    }
  };

  const getTypeIcon = (type: string) => {
    if (type.toLowerCase().includes('chemistry')) return <MessageCircle className="w-5 h-5" />;
    if (type.toLowerCase().includes('therapy')) return <Video className="w-5 h-5" />;
    return <Clock className="w-5 h-5" />;
  };

  const canJoinSession = () => {
    const now = new Date();
    const sessionTime = new Date(appointment.sessionTime);
    const timeDiff = sessionTime.getTime() - now.getTime();
    return timeDiff <= 10 * 60 * 1000 && timeDiff > 0; // Within 10 minutes
  };

  const handleAction = async (action: () => void) => {
    setIsLoading(true);
    try {
      await action();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">Appointment Details</DialogTitle>
          <DialogDescription className="sr-only">
            View and manage appointment details
          </DialogDescription>
        </DialogHeader>
        
        {/* Header with client info */}
        <div className="flex items-center justify-between pb-[--space-md]">
          <div className="flex items-center gap-[--space-sm]">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-[hsl(var(--btn-accent-bg))] text-[hsl(var(--btn-accent-text))] font-secondary font-bold text-[length:var(--text-lg)]">
                {appointment.clientInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-secondary font-bold text-[hsl(var(--text-primary))] text-[length:var(--text-lg)]">
                {appointment.clientName}
              </h3>
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-[length:var(--text-sm)]">
                Active Member
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] focus-visible-outline min-h-[--touch-target-min]"
            onClick={() => handleAction(() => onEdit(appointment))}
          >
            EDIT
          </Button>
        </div>

        <div className="space-y-[--space-lg]">
          {/* Session Info */}
          <div>
            <h4 className="font-secondary text-[hsl(var(--text-secondary))] text-[length:var(--text-sm)] mb-[--space-xs]">
              Upcoming session
            </h4>
            <div className="text-[length:var(--text-2xl)] font-bold text-[hsl(var(--btn-accent-text))] mb-[--space-xs]">
              {appointment.sessionTime.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })} - {new Date(appointment.sessionTime.getTime() + 60*60*1000).toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })}
            </div>
            <div className="flex items-center gap-[--space-xs] text-[hsl(var(--text-secondary))] text-[length:var(--text-sm)]">
              <span>{appointment.duration}</span>
              <span>•</span>
              <span>{appointment.sessionTime.toLocaleDateString('en-US', { 
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}</span>
            </div>
          </div>

          {/* Join Button */}
          {canJoinSession() && (
            <Button
              className="w-full bg-[hsl(var(--btn-cta-bg))] text-[hsl(var(--btn-cta-text))] font-secondary font-semibold py-[--space-sm] text-[length:var(--text-base)] min-h-[--touch-target-comfort] focus-visible-outline"
              onClick={() => handleAction(() => onJoinSession(appointment.id))}
              disabled={isLoading}
            >
              JOIN NOW
            </Button>
          )}

          {/* Session Details */}
          <div className="space-y-[--space-md]">
            <div className="flex items-center gap-[--space-xs] text-[hsl(var(--btn-accent-text))]">
              <MessageCircle className="w-4 h-4" />
              <span className="font-secondary text-[length:var(--text-sm)] font-medium">Session details</span>
            </div>
            
            <div>
              <h5 className="font-secondary font-bold text-[hsl(var(--text-primary))] mb-[--space-xs]">
                {appointment.type}
              </h5>
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-[length:var(--text-sm)]">
                {appointment.notes || "No additional notes for this session."}
              </p>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-[--space-sm]">
            <div className="flex items-center gap-[--space-xs] text-[hsl(var(--btn-accent-text))]">
              <MessageCircle className="w-4 h-4" />
              <span className="font-secondary text-[length:var(--text-sm)] font-medium">Main Services</span>
            </div>
            
            <div className="space-y-[--space-xs]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-secondary font-bold text-[hsl(var(--text-primary))]">CBT Therapy</div>
                  <div className="font-secondary text-[hsl(var(--text-secondary))] text-[length:var(--text-sm)]">Service</div>
                </div>
                <Button className="bg-transparent text-[hsl(var(--btn-accent-text))] border border-[hsl(var(--btn-accent-text))] font-secondary text-[length:var(--text-sm)] min-h-[--touch-target-min] focus-visible-outline">
                  ADD SERVICES +
                </Button>
              </div>
              <select className="w-full p-[--space-xs] border border-[hsl(var(--border))] rounded-[--radius-md] font-secondary text-[length:var(--text-sm)] text-[hsl(var(--text-primary))] bg-[hsl(var(--surface))] focus-visible-outline">
                <option>Psychotherapy</option>
              </select>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-[--space-sm]">
            <div className="flex items-center gap-[--space-xs] text-[hsl(var(--btn-accent-text))]">
              <MessageCircle className="w-4 h-4" />
              <span className="font-secondary text-[length:var(--text-sm)] font-medium">Notifications</span>
            </div>
            
            <div className="flex items-center justify-between p-[--space-sm] bg-[hsl(var(--surface-accent))] rounded-[--radius-md]">
              <div>
                <div className="font-secondary font-bold text-[hsl(var(--text-primary))]">Assessment form</div>
                <div className="font-secondary text-[hsl(var(--text-secondary))] text-[length:var(--text-sm)]">SEND REMINDER</div>
              </div>
              <Badge className="bg-[hsl(var(--btn-accent-bg))] text-[hsl(var(--btn-accent-text))] border border-[hsl(var(--btn-accent-text))]">
                Awaiting Signature
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-[--space-sm] pt-[--space-md] border-t border-[hsl(var(--border))]">
            <Button
              className="flex-1 bg-transparent text-[hsl(var(--btn-secondary-text))] border border-[hsl(var(--btn-secondary-text))] font-secondary min-h-[--touch-target-min] focus-visible-outline"
              onClick={onClose}
            >
              DISCARD
            </Button>
            <Button
              className="flex-1 bg-[hsl(var(--btn-primary-bg))] text-[hsl(var(--btn-primary-text))] font-secondary min-h-[--touch-target-min] focus-visible-outline"
              onClick={onClose}
            >
              SAVE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
