import { useNavigate } from "react-router-dom";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";

export const bookings = [
    {
      id: "1",
      clientName: "Jessica Davis",
      clientInitials: "J.D.",
      clientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b196?w=100&h=100&fit=crop&crop=face",
      type: "Chemistry Call",
      sessionTime: new Date(Date.now() + 8 * 60 * 1000), // 8 minutes from now (will show JOIN NOW)
      duration: "15 min",
      status: "confirmed" as const,
      notes: "First time client - anxiety and stress management"
    },
    {
      id: "2",
      clientName: "Michael Smith",
      clientInitials: "M.S.",
      clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      type: "Therapy Session",
      sessionTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
      duration: "60 min",
      status: "confirmed" as const,
      notes: "Regular session - working on communication skills"
    },
    {
      id: "3",
      clientName: "Robert Parker",
      clientInitials: "R.P.",
      clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      type: "Therapy Session",
      sessionTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      duration: "60 min",
      status: "pending" as const,
      notes: "Follow-up session - stress management techniques"
    },
    {
      id: "4",
      clientName: "Lisa Martinez",
      clientInitials: "L.M.",
      clientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      type: "Therapy Session",
      sessionTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      duration: "60 min",
      status: "confirmed" as const,
      notes: "Long-term client - depression management progress review"
    }
  ];

export function BookingItem({ booking }: { booking: any }) {
    const navigate = useNavigate();
    const [timeRemaining, setTimeRemaining] = React.useState<number>(0);
  
    React.useEffect(() => {
      const updateTime = () => {
        const now = new Date().getTime();
        const session = new Date(booking.sessionTime).getTime();
        setTimeRemaining(session - now);
      };
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }, [booking.sessionTime]);
  
    const showJoinNow = timeRemaining <= 10 * 60 * 1000 && timeRemaining > 0;
  
    const formatTimeDisplay = (): string => {
      const minutes = Math.floor(timeRemaining / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      if (hours > 0) {
        return `in ${hours} hour${hours !== 1 ? 's' : ''}`;
      }
      return `in ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    };
  
    const handleJoinSession = () => {
      navigate(`/session/${booking.id}`);
    };
  
    const handleClientClick = () => {
      navigate(`/t/clients/${booking.id}`);
    };
  
    const getStatusBadge = (status: string) => {
      switch (status) {
        case "confirmed":
          return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
        case "pending":
          return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
        case "cancelled":
          return <Badge variant="destructive">Cancelled</Badge>;
        default:
          return <Badge variant="outline">{status}</Badge>;
      }
    };
  
    const clientFirstName = booking.clientName.split(' ')[0];
  
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={handleClientClick}
                className="w-12 h-12 rounded-full overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
                aria-label={`View ${booking.clientName}'s profile`}
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage src={booking.clientAvatar} alt={booking.clientInitials} />
                  <AvatarFallback className="bg-surface-accent text-primary font-semibold">
                    {booking.clientInitials}
                  </AvatarFallback>
                </Avatar>
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-foreground">
                    {booking.type} with {clientFirstName}
                  </h3>
                  {getStatusBadge(booking.status)}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {booking.sessionTime.toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {booking.sessionTime.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </div>
                  <div>
                    Duration: {booking.duration}
                  </div>
                </div>
                
                {booking.notes && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {booking.notes}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="font-secondary text-xs text-muted-foreground tabular-nums">
                {formatTimeDisplay()}
              </span>
              
              {showJoinNow ? (
                <Button
                  variant="primary"
                  onClick={handleJoinSession}
                  className="font-semibold animate-pulse"
                  aria-label={`Join ${booking.clientName}'s ${booking.type}`}
                >
                  JOIN NOW
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="text-xs"
                >
                  Scheduled
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }




