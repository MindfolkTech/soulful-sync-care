import * as React from "react";
import { Mic, MicOff, Video, VideoOff, Phone, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Timer } from "@/components/ui/timer";
import { Stack, HStack } from "@/components/ui/stack";
import { cn } from "@/lib/utils";

export interface SessionRoomProps extends React.HTMLAttributes<HTMLDivElement> {
  sessionId: string;
  therapistName: string;
  duration: number; // in seconds
  onEndCall: () => void;
  className?: string;
}

const SessionRoom = React.forwardRef<HTMLDivElement, SessionRoomProps>(
  ({ sessionId, therapistName, duration, onEndCall, className, ...props }, ref) => {
    const [isMuted, setIsMuted] = React.useState(false);
    const [isVideoOff, setIsVideoOff] = React.useState(false);
    const [isConnected, setIsConnected] = React.useState(true);

    const handleMuteToggle = () => {
      setIsMuted(!isMuted);
    };

    const handleVideoToggle = () => {
      setIsVideoOff(!isVideoOff);
    };

    const handleEndCall = () => {
      onEndCall();
    };

    return (
      <div
        ref={ref}
        className={cn(
          "min-h-screen bg-black flex flex-col",
          className
        )}
        {...props}
      >
        {/* Video Grid */}
        <div className="flex-1 relative">
          {/* Therapist Video */}
          <div className="absolute inset-0 bg-gradient-to-br from-garden-green to-elated-emerald">
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold">
                    {therapistName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h2 className="text-xl font-primary font-semibold">
                  {therapistName}
                </h2>
                <p className="text-sm opacity-80">
                  {isConnected ? "Connected" : "Connecting..."}
                </p>
              </div>
            </div>
          </div>

          {/* User Video (Picture-in-Picture) */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold">You</span>
                </div>
                <p className="text-xs">Your video</p>
              </div>
            </div>
          </div>

          {/* Session Timer */}
          <div className="absolute top-4 left-4">
            <Timer 
              duration={duration}
              showWarningAt={300} // 5 minutes
              onComplete={handleEndCall}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="bg-black/80 backdrop-blur-sm border-t border-white/10 p-6">
          <HStack justify="center" spacing="lg">
            <Button
              size="icon"
              variant={isMuted ? "destructive" : "secondary"}
              onClick={handleMuteToggle}
              className="h-12 w-12 rounded-full"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>

            <Button
              size="icon"
              variant={isVideoOff ? "destructive" : "secondary"}
              onClick={handleVideoToggle}
              className="h-12 w-12 rounded-full"
              aria-label={isVideoOff ? "Turn on video" : "Turn off video"}
            >
              {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
            </Button>

            <Button
              size="icon"
              variant="secondary"
              className="h-12 w-12 rounded-full"
              aria-label="Settings"
            >
              <Settings className="h-6 w-6" />
            </Button>

            <Button
              size="icon"
              variant="destructive"
              onClick={handleEndCall}
              className="h-12 w-12 rounded-full"
              aria-label="End call"
            >
              <Phone className="h-6 w-6" />
            </Button>
          </HStack>
        </div>
      </div>
    );
  }
);
SessionRoom.displayName = "SessionRoom";

export { SessionRoom };
