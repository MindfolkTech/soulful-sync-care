import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, MessageCircle, Heart, CheckCircle } from "lucide-react";

const notifications = [
  {
    id: "1",
    type: "appointment",
    title: "Chemistry call with Dr. Sarah Chen in 1 hour",
    message: "Your 15-minute chemistry call is scheduled for 2:00 PM today.",
    time: "1 hour ago",
    unread: true,
    icon: Calendar
  },
  {
    id: "2", 
    type: "message",
    title: "New message from Michael Thompson",
    message: "I've prepared some resources for our next session...",
    time: "3 hours ago",
    unread: true,
    icon: MessageCircle
  },
  {
    id: "3",
    type: "favorite",
    title: "Dr. Sarah Chen has new availability",
    message: "Your favorite therapist has opened new slots for next week.",
    time: "1 day ago",
    unread: false,
    icon: Heart
  },
  {
    id: "4",
    type: "booking",
    title: "Session confirmed with Michael Thompson",
    message: "Your 60-minute session on Jan 20th at 2:00 PM has been confirmed.",
    time: "2 days ago",
    unread: false,
    icon: CheckCircle
  }
];

const getIconColor = (type: string) => {
  switch (type) {
    case "appointment":
      return "text-primary";
    case "message":
      return "text-blue-500";
    case "favorite":
      return "text-red-500";
    case "booking":
      return "text-green-500";
    default:
      return "text-text-muted";
  }
};

export default function Notifications() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-primary text-3xl font-bold text-text-primary">
                  Notifications
                </h1>
                <p className="font-secondary text-text-secondary mt-2">
                  Stay updated on your appointments and messages
                </p>
              </div>
              
              <Button variant="outline" size="sm">
                Mark all as read
              </Button>
            </div>

            {notifications.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center space-y-4">
                  <Bell className="w-16 h-16 mx-auto text-text-muted" />
                  <div>
                    <h3 className="font-primary text-lg font-semibold text-text-primary mb-2">
                      No notifications
                    </h3>
                    <p className="font-secondary text-text-secondary">
                      You're all caught up! New notifications will appear here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  
                  return (
                    <Card 
                      key={notification.id}
                      className={`cursor-pointer hover:shadow-md transition-shadow ${
                        notification.unread ? 'border-l-4 border-l-primary bg-surface-accent/30' : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className={`p-2 rounded-full bg-surface-accent ${getIconColor(notification.type)}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-secondary font-semibold text-text-primary">
                                {notification.title}
                              </h3>
                              <div className="flex items-center space-x-2">
                                {notification.unread && (
                                  <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                                    New
                                  </Badge>
                                )}
                                <span className="text-xs text-text-muted font-secondary">
                                  {notification.time}
                                </span>
                              </div>
                            </div>
                            
                            <p className="font-secondary text-text-secondary text-sm">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}