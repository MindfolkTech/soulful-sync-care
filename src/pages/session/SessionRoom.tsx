import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VideoControls } from "@/components/session/video-controls";
import { SessionSidebar } from "@/components/session/session-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Phone } from "lucide-react";

export default function SessionRoom() {
  const { sessionId } = useParams();
  const [sessionTimer, setSessionTimer] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);

  // Mock session data
  const session = {
    id: sessionId,
    therapist: "Dr. Sarah Chen",
    client: "Alex Johnson",
    startTime: "2:00 PM",
    duration: 50,
    status: "active"
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionActive) {
      interval = setInterval(() => {
        setSessionTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        // Toggle video/audio
      } else if (e.code === 'KeyC' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        // Toggle captions
      } else if (e.code === 'KeyM' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        // Toggle mute
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Session Header */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-semibold">
                Session with {session.therapist}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Started at {session.startTime}</span>
                <Badge variant="secondary" className="ml-2">
                  {formatTime(sessionTimer)}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Invite Support
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setSessionActive(false)}
            >
              End Session
            </Button>
          </div>
        </div>
      </header>

      {/* Main Session Area */}
      <div className="flex-1 flex">
        {/* Video Area - 65% */}
        <div className="flex-1 lg:flex-[0.65] p-6">
          <div className="h-full flex flex-col gap-4">
            {/* Main Video Feed */}
            <Card className="flex-1 bg-muted/20 border-2 border-dashed border-muted-foreground/20 flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-medium text-primary">
                    {session.therapist.charAt(0)}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  Video will appear here when Daily.co is integrated
                </p>
              </div>
              
              {/* Video overlay for client */}
              <div className="absolute bottom-4 right-4 w-32 h-24 bg-muted border rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">You</span>
              </div>
            </Card>

            {/* Video Controls */}
            <VideoControls 
              onToggleMute={() => {}}
              onToggleVideo={() => {}}
              onToggleCaptions={() => {}}
              onEndCall={() => setSessionActive(false)}
            />
          </div>
        </div>

        {/* Sidebar - 35% */}
        <div className="w-full lg:w-[35%] border-l">
          <SessionSidebar sessionId={sessionId || ""} />
        </div>
      </div>
    </div>
  );
}
