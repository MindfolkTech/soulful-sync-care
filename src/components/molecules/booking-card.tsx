import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface BookingCardProps {
  booking: {
    id: string;
    therapistName: string;
    therapistImage?: string;
    date: Date;
    time: string;
    duration: number;
    type: 'chemistry' | 'session' | 'follow-up';
    status: 'upcoming' | 'completed' | 'cancelled' | 'no-show';
    location?: 'online' | 'in-person';
    address?: string;
  };
  variant?: 'default' | 'compact';
  showActions?: boolean;
  className?: string;
}

const statusColors = {
  upcoming: "bg-btn-accent text-btn-accent-foreground",
  completed: "bg-success text-success-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
  'no-show': "bg-text-secondary text-white"
};

const typeLabels = {
  chemistry: "Chemistry Call",
  session: "Therapy Session",
  'follow-up': "Follow-up"
};

export function BookingCard({ 
  booking, 
  variant = 'default', 
  showActions = true, 
  className 
}: BookingCardProps) {
  const isUpcoming = booking.status === 'upcoming';
  const isPast = booking.date < new Date();
  
  return (
    <Card className={cn(
      "p-4",
      variant === 'compact' && "p-3",
      className
    )}>
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src={booking.therapistImage} alt={booking.therapistName} />
          <AvatarFallback>
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-medium text-text-primary">
                {booking.therapistName}
              </h3>
              <p className="text-sm text-text-secondary">
                {typeLabels[booking.type]}
              </p>
            </div>
            <Badge 
              className={cn("text-xs", statusColors[booking.status])}
              variant="outline"
            >
              {booking.status.replace('-', ' ')}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{booking.date.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{booking.time} ({booking.duration} min)</span>
            </div>
            <div className="flex items-center gap-1">
              {booking.location === 'online' ? (
                <Video className="h-4 w-4" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
              <span>
                {booking.location === 'online' 
                  ? 'Online' 
                  : booking.address || 'In-person'
                }
              </span>
            </div>
          </div>

          {showActions && (
            <div className="flex items-center gap-2">
              {isUpcoming && (
                <>
                  <Button asChild variant="default" size="sm">
                    <Link to={`/session/${booking.id}`}>
                      Join Session
                    </Link>
                  </Button>
                  <Button variant="tertiary" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="tertiary" size="sm">
                    Cancel
                  </Button>
                </>
              )}
              {isPast && booking.status === 'completed' && (
                <Button asChild variant="tertiary" size="sm">
                  <Link to={`/client/feedback/${booking.id}`}>
                    Leave Feedback
                  </Link>
                </Button>
              )}
              <Button asChild variant="tertiary" size="sm">
                <Link to={`/therapists/${booking.id}`}>
                  View Profile
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}