import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

interface CalendarIntegrationProps {
  onConnect: (provider: 'google' | 'outlook') => void;
  onDisconnect: (provider: 'google' | 'outlook') => void;
  connectedCalendars: {
    google: boolean;
    outlook: boolean;
  };
}

export function CalendarIntegration({ 
  onConnect, 
  onDisconnect, 
  connectedCalendars 
}: CalendarIntegrationProps) {
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
    <Card>
      <CardHeader className="p-[--space-sm] md:p-[--space-md] pb-[--space-xs]">
        <CardTitle className="font-primary text-[hsl(var(--jovial-jade))] text-sm md:text-base">
          Calendar Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="p-[--space-sm] md:p-[--space-md] pt-0">
        <div className="space-y-[--space-sm]">
          {/* Google Calendar Integration */}
          <div className="flex items-center justify-between p-[--space-sm] border rounded-lg min-h-[--touch-target-min]">
            <div className="flex items-center gap-[--space-sm]">
              <div className="w-8 h-8 bg-[hsl(var(--surface-accent))] rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[hsl(var(--jovial-jade))]" />
              </div>
              <div>
                <h4 className="font-secondary font-bold text-foreground text-sm">Google Calendar</h4>
                <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs">
                  Sync appointments with your Google Calendar
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[--space-xs]">
              {connectedCalendars.google ? (
                <>
                  <Badge className="bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))] text-xs">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="min-h-[--touch-target-min] font-secondary text-xs"
                    onClick={() => onDisconnect('google')}
                  >
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button 
                  variant="primary"
                  size="sm"
                  className="min-h-[--touch-target-min] font-secondary text-xs"
                  onClick={() => handleConnect('google')}
                  disabled={isConnecting === 'google'}
                >
                  {isConnecting === 'google' ? 'Connecting...' : 'Connect'}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              )}
            </div>
          </div>

          {/* Outlook Calendar Integration */}
          <div className="flex items-center justify-between p-[--space-sm] border rounded-lg min-h-[--touch-target-min]">
            <div className="flex items-center gap-[--space-sm]">
              <div className="w-8 h-8 bg-[hsl(var(--surface-accent))] rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[hsl(var(--jovial-jade))]" />
              </div>
              <div>
                <h4 className="font-secondary font-bold text-foreground text-sm">Microsoft Outlook</h4>
                <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs">
                  Sync appointments with your Outlook Calendar
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[--space-xs]">
              {connectedCalendars.outlook ? (
                <>
                  <Badge className="bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))] text-xs">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="min-h-[--touch-target-min] font-secondary text-xs"
                    onClick={() => onDisconnect('outlook')}
                  >
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button 
                  variant="primary"
                  size="sm"
                  className="min-h-[--touch-target-min] font-secondary text-xs"
                  onClick={() => handleConnect('outlook')}
                  disabled={isConnecting === 'outlook'}
                >
                  {isConnecting === 'outlook' ? 'Connecting...' : 'Connect'}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              )}
            </div>
          </div>

          {/* Sync Status */}
          {(connectedCalendars.google || connectedCalendars.outlook) && (
            <div className="flex items-center gap-[--space-xs] p-[--space-xs] bg-[hsl(var(--surface-accent))] rounded-lg">
              <Clock className="w-4 h-4 text-[hsl(var(--jovial-jade))]" />
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs">
                Calendar sync is active. Changes will appear in both calendars within 5 minutes.
              </p>
            </div>
          )}

          {/* Help Text */}
          <div className="flex items-start gap-[--space-xs] p-[--space-xs] bg-[hsl(var(--surface-accent))] rounded-lg">
            <AlertCircle className="w-4 h-4 text-[hsl(var(--jovial-jade))] mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs">
                <strong>Two-way sync:</strong> Appointments booked through Soulful Sync will appear in your external calendar, 
                and events in your external calendar will block availability for new bookings.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

