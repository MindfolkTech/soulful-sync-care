import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useState } from "react";

interface CalendarIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (provider: 'google' | 'outlook') => void;
  onDisconnect: (provider: 'google' | 'outlook') => void;
  connectedCalendars: {
    google: boolean;
    outlook: boolean;
  };
}

export function CalendarIntegrationModal({ 
  isOpen,
  onClose,
  onConnect, 
  onDisconnect, 
  connectedCalendars 
}: CalendarIntegrationModalProps) {
  const [isConnecting, setIsConnecting] = useState<'google' | 'outlook' | null>(null);

  const handleConnect = async (provider: 'google' | 'outlook') => {
    setIsConnecting(provider);
    try {
      await onConnect(provider);
    } finally {
      setIsConnecting(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-primary text-[--jovial-jade] text-lg">
            Connect Your Calendar
          </DialogTitle>
          <DialogDescription>
            Sync your calendar to manage availability and prevent double bookings
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-[--space-md]">
          {/* Google Calendar Integration */}
          <div className="flex items-center justify-between p-[--space-md] border rounded-lg min-h-[--touch-target-min]">
            <div className="flex items-center gap-[--space-md]">
              <div className="w-12 h-12 bg-[--surface-accent] rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[--jovial-jade]" />
              </div>
              <div>
                <h4 className="font-secondary font-bold text-foreground text-base">Google Calendar</h4>
                <p className="font-secondary text-[--text-secondary] text-sm">
                  Sync appointments with your Google Calendar
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[--space-sm]">
              {connectedCalendars.google ? (
                <>
                  <Badge className="bg-[--success-bg] text-[--success-text] text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Connected
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="min-h-[--touch-target-min] font-secondary text-sm"
                    onClick={() => onDisconnect('google')}
                  >
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button 
                  variant="primary"
                  size="sm"
                  className="min-h-[--touch-target-min] font-secondary text-sm"
                  onClick={() => handleConnect('google')}
                  disabled={isConnecting === 'google'}
                >
                  {isConnecting === 'google' ? 'Connecting...' : 'Connect'}
                </Button>
              )}
            </div>
          </div>

          {/* Outlook Calendar Integration */}
          <div className="flex items-center justify-between p-[--space-md] border rounded-lg min-h-[--touch-target-min]">
            <div className="flex items-center gap-[--space-md]">
              <div className="w-12 h-12 bg-[--surface-accent] rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[--jovial-jade]" />
              </div>
              <div>
                <h4 className="font-secondary font-bold text-foreground text-base">Microsoft Outlook</h4>
                <p className="font-secondary text-[--text-secondary] text-sm">
                  Sync appointments with your Outlook Calendar
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[--space-sm]">
              {connectedCalendars.outlook ? (
                <>
                  <Badge className="bg-[--success-bg] text-[--success-text] text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Connected
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="min-h-[--touch-target-min] font-secondary text-sm"
                    onClick={() => onDisconnect('outlook')}
                  >
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button 
                  variant="primary"
                  size="sm"
                  className="min-h-[--touch-target-min] font-secondary text-sm"
                  onClick={() => handleConnect('outlook')}
                  disabled={isConnecting === 'outlook'}
                >
                  {isConnecting === 'outlook' ? 'Connecting...' : 'Connect'}
                </Button>
              )}
            </div>
          </div>

          {/* Sync Status */}
          {(connectedCalendars.google || connectedCalendars.outlook) && (
            <div className="flex items-center gap-[--space-sm] p-[--space-sm] bg-[--surface-accent] rounded-lg">
              <Clock className="w-5 h-5 text-[--jovial-jade]" />
              <p className="font-secondary text-[--text-secondary] text-sm">
                Calendar sync is active. Changes will appear in both calendars within 5 minutes.
              </p>
            </div>
          )}

          {/* Help Text */}
          <div className="flex items-start gap-[--space-sm] p-[--space-sm] bg-[--surface-accent] rounded-lg">
            <AlertCircle className="w-5 h-5 text-[--jovial-jade] mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-secondary text-[--text-secondary] text-sm">
                <strong>Two-way sync:</strong> Appointments booked through Soulful Sync will appear in your external calendar, 
                and events in your external calendar will block availability for new bookings.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
