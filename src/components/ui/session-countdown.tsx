import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HStack } from "@/components/ui/hstack";
import { Video, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionCountdownProps {
  sessionTime: Date;
  sessionId: string;
  therapistName: string;
  onJoinSession?: (sessionId: string) => void;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export function SessionCountdown({ 
  sessionTime, 
  sessionId, 
  therapistName,
  onJoinSession,
  className 
}: SessionCountdownProps) {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0
  });

  const calculateTimeRemaining = (targetTime: Date): TimeRemaining => {
    const now = new Date().getTime();
    const target = new Date(targetTime).getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total: difference };
  };

  useEffect(() => {
    const updateCountdown = () => {
      setTimeRemaining(calculateTimeRemaining(sessionTime));
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [sessionTime]);

  const handleJoinSession = () => {
    if (onJoinSession) {
      onJoinSession(sessionId);
    } else {
      // Default behavior - navigate to session room
      navigate(`/session/${sessionId}`);
    }
  };

  // Show JOIN NOW button if within 10 minutes of session start
  const showJoinButton = timeRemaining.total <= 10 * 60 * 1000 && timeRemaining.total > 0;
  
  // Session has started or passed
  const sessionStarted = timeRemaining.total <= 0;

  // Format time display
  const formatTimeDisplay = (): string => {
    if (sessionStarted) {
      return "Session time";
    }

    if (timeRemaining.days > 0) {
      return `in ${timeRemaining.days} day${timeRemaining.days !== 1 ? 's' : ''}`;
    }
    
    if (timeRemaining.hours > 0) {
      return `in ${timeRemaining.hours} hour${timeRemaining.hours !== 1 ? 's' : ''}`;
    }
    
    if (timeRemaining.minutes > 0) {
      return `in ${timeRemaining.minutes} minute${timeRemaining.minutes !== 1 ? 's' : ''}`;
    }
    
    return `in ${timeRemaining.seconds} second${timeRemaining.seconds !== 1 ? 's' : ''}`;
  };

  // Get status badge variant and text
  const getStatusInfo = () => {
    if (sessionStarted) {
      return { variant: "destructive" as const, text: "Live Now", icon: Video };
    }
    
    if (showJoinButton) {
      return { variant: "default" as const, text: "Starting Soon", icon: Video };
    }
    
    return { variant: "outline" as const, text: "Scheduled", icon: Clock };
  };

  const statusInfo = getStatusInfo();

  return (
    <HStack justify="between" spacing="sm" className={cn("min-w-0", className)}>
      <HStack spacing="sm" className="min-w-0 flex-1">
        <HStack spacing="xs">
          <statusInfo.icon className="w-4 h-4 text-[--text-secondary]" />
          <span className="font-secondary text-sm text-[--text-secondary]">
            {formatTimeDisplay()}
          </span>
        </HStack>
        
        <Badge variant={statusInfo.variant} className="text-xs">
          {statusInfo.text}
        </Badge>
      </HStack>

      {showJoinButton || sessionStarted ? (
        <Button 
          size="sm" 
          onClick={handleJoinSession}
          className={cn(
            "min-h-[--touch-target-min] font-secondary font-semibold",
            showJoinButton && "bg-[--btn-primary-bg] text-[--btn-primary-text] hover:bg-[--btn-primary-bg]/90 animate-pulse"
          )}
          aria-label={`Join therapy session with ${therapistName}`}
        >
          <Video className="w-4 h-4 mr-2" />
          {sessionStarted ? "Join Session" : "JOIN NOW"}
        </Button>
      ) : (
        <span className="text-xs font-secondary text-[--text-secondary] tabular-nums">
          {new Date(sessionTime).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}
        </span>
      )}
    </HStack>
  );
}
