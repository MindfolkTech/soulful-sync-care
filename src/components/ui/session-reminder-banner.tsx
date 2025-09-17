import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HStack } from "@/components/ui/hstack";
import { Video, Clock, Bell, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionReminderBannerProps {
  sessionTime: Date;
  sessionId: string;
  therapistName: string;
  sessionType: "chemistry" | "therapy";
  onJoinSession?: (sessionId: string) => void;
  onDismiss?: () => void;
  className?: string;
}

export function SessionReminderBanner({
  sessionTime,
  sessionId,
  therapistName,
  sessionType,
  onJoinSession,
  onDismiss,
  className
}: SessionReminderBannerProps) {
  const navigate = useNavigate();
  const [timeUntilSession, setTimeUntilSession] = useState<number>(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      const session = new Date(sessionTime).getTime();
      setTimeUntilSession(session - now);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [sessionTime]);

  const handleJoinSession = () => {
    if (onJoinSession) {
      onJoinSession(sessionId);
    } else {
      navigate(`/session/${sessionId}`);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  // Don't show if dismissed or session is more than 1 hour away
  if (isDismissed || timeUntilSession > 60 * 60 * 1000) {
    return null;
  }

  // Session has passed
  if (timeUntilSession <= 0) {
    return null;
  }

  // Determine reminder type and urgency
  const isUrgent = timeUntilSession <= 10 * 60 * 1000; // 10 minutes
  const isImmediate = timeUntilSession <= 5 * 60 * 1000; // 5 minutes

  const formatTimeRemaining = (): string => {
    const minutes = Math.floor(timeUntilSession / (1000 * 60));
    const seconds = Math.floor((timeUntilSession % (1000 * 60)) / 1000);
    
    if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  };

  const getBannerVariant = () => {
    if (isImmediate) return "destructive";
    if (isUrgent) return "default";
    return "default";
  };

  const getBannerMessage = () => {
    const sessionTypeText = sessionType === "chemistry" ? "Chemistry Call" : "Therapy Session";
    
    if (isImmediate) {
      return `Your ${sessionTypeText} with ${therapistName} starts in ${formatTimeRemaining()}!`;
    }
    
    if (isUrgent) {
      return `Reminder: Your ${sessionTypeText} with ${therapistName} starts in ${formatTimeRemaining()}`;
    }
    
    return `Upcoming: ${sessionTypeText} with ${therapistName} in ${formatTimeRemaining()}`;
  };

  return (
    <Alert 
      className={cn(
        "border-l-4 mb-4 transition-all duration-300",
        isImmediate && "border-l-[--error-bg] bg-[--error-bg]/10 animate-pulse",
        isUrgent && !isImmediate && "border-l-[--garden-green] bg-[--surface-accent]",
        !isUrgent && "border-l-[--info-bg] bg-[--info-bg]/10",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="flex-shrink-0 mt-0.5">
            {isUrgent ? (
              <Bell className={cn(
                "w-4 h-4",
                isImmediate ? "text-[--ink-slate]" : "text-[--garden-green]"
              )} />
            ) : (
              <Clock className="w-4 h-4 text-[--text-secondary]" />
            )}
          </div>
          
          <div className="min-w-0 flex-1">
            <AlertDescription className="font-secondary text-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-[--text-primary]">
                  {getBannerMessage()}
                </span>
                <Badge 
                  variant={isUrgent ? "default" : "outline"}
                  className="text-xs"
                >
                  {new Date(sessionTime).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </Badge>
              </div>
              
              {isUrgent && (
                <p className="text-xs text-[--text-secondary] mb-3">
                  Make sure you're in a quiet, private space with a stable internet connection.
                </p>
              )}
            </AlertDescription>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {isUrgent && (
            <Button 
              size="sm"
              onClick={handleJoinSession}
              className={cn(
                "min-h-[--touch-target-min] font-secondary font-semibold",
                isImmediate && "bg-[--garden-green] text-[--on-dark] hover:bg-[--garden-green]/90"
              )}
            >
              <Video className="w-4 h-4 mr-2" />
              {isImmediate ? "JOIN NOW" : "Join Early"}
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="h-6 w-6 text-[--text-muted] hover:text-[--text-primary]"
            aria-label="Dismiss reminder"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Alert>
  );
}
