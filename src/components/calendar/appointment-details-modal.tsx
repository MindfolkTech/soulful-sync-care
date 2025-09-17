import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
      case 'confirmed': return 'bg-[--success-bg] text-[--success-text]';
      case 'pending': return 'bg-[--warning-bg] text-[--warning-text]';
      case 'cancelled': return 'bg-[--error-bg] text-[--error-text]';
      default: return 'bg-[--surface-accent] text-[--text-primary]';
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
        </DialogHeader>
        
        {/* Header with client info */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-orange-500 text-white font-secondary font-bold text-lg">
                {appointment.clientInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-secondary font-bold text-[--text-primary] text-lg">
                {appointment.clientName}
              </h3>
              <p className="font-secondary text-[--text-secondary] text-sm">
                Active Member
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-[--text-secondary] hover:text-[--text-primary]"
            onClick={() => handleAction(() => onEdit(appointment))}
          >
            EDIT
          </Button>
        </div>

        <div className="space-y-6">
          {/* Session Info */}
          <div>
            <h4 className="font-secondary text-[--text-secondary] text-sm mb-2">
              Upcoming session
            </h4>
            <div className="text-2xl font-bold text-orange-500 mb-1">
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
            <div className="flex items-center gap-2 text-[--text-secondary] text-sm">
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
              className="w-full bg-[--garden-green] hover:bg-[--garden-green]/90 text-white font-secondary font-semibold py-3 text-base"
              onClick={() => handleAction(() => onJoinSession(appointment.id))}
              disabled={isLoading}
            >
              JOIN NOW
            </Button>
          )}

          {/* Session Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-orange-500">
              <MessageCircle className="w-4 h-4" />
              <span className="font-secondary text-sm font-medium">Session details</span>
            </div>
            
            <div>
              <h5 className="font-secondary font-bold text-[--text-primary] mb-2">
                {appointment.type}
              </h5>
              <p className="font-secondary text-[--text-secondary] text-sm">
                {appointment.notes || "No additional notes for this session."}
              </p>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-orange-500">
              <MessageCircle className="w-4 h-4" />
              <span className="font-secondary text-sm font-medium">Main Services</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-secondary font-bold text-[--text-primary]">CBT Therapy</div>
                  <div className="font-secondary text-[--text-secondary] text-sm">Service</div>
                </div>
                <Button variant="outline" size="sm" className="text-orange-500 border-orange-500">
                  ADD SERVICES +
                </Button>
              </div>
              <select className="w-full p-2 border rounded-md font-secondary text-sm">
                <option>Psychotherapy</option>
              </select>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-orange-500">
              <MessageCircle className="w-4 h-4" />
              <span className="font-secondary text-sm font-medium">Notifications</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[--surface-accent] rounded-md">
              <div>
                <div className="font-secondary font-bold text-[--text-primary]">Assessment form</div>
                <div className="font-secondary text-[--text-secondary] text-sm">SEND REMINDER</div>
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                Awaiting Signature
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              className="flex-1 font-secondary"
              onClick={onClose}
            >
              DISCARD
            </Button>
            <Button
              className="flex-1 bg-[--garden-green] hover:bg-[--garden-green]/90 text-white font-secondary"
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
