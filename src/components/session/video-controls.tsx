import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  PhoneOff, 
  Settings, 
  ScreenShare,
  Captions,
  Volume2
} from "lucide-react";

interface VideoControlsProps {
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onToggleCaptions: () => void;
  onEndCall: () => void;
}

export function VideoControls({ 
  onToggleMute, 
  onToggleVideo, 
  onToggleCaptions, 
  onEndCall 
}: VideoControlsProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(true); // Style Guide 2.3: Captions ON by default
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    onToggleMute();
  };

  const handleVideoToggle = () => {
    setIsVideoOff(!isVideoOff);
    onToggleVideo();
  };

  const handleCaptionsToggle = () => {
    setCaptionsEnabled(!captionsEnabled);
    onToggleCaptions();
  };

  const handleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex items-center justify-center gap-2">
        {/* Microphone Control */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="lg"
              className="h-12 w-12 rounded-full"
              onClick={handleMuteToggle}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isMuted ? "Unmute" : "Mute"} (Ctrl/Cmd + M)</p>
          </TooltipContent>
        </Tooltip>

        {/* Video Control */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isVideoOff ? "destructive" : "secondary"}
              size="lg"
              className="h-12 w-12 rounded-full"
              onClick={handleVideoToggle}
            >
              {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isVideoOff ? "Turn on" : "Turn off"} camera</p>
          </TooltipContent>
        </Tooltip>

        {/* Screen Share */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isScreenSharing ? "primary" : "secondary"}
              size="lg"
              className="h-12 w-12 rounded-full"
              onClick={handleScreenShare}
            >
              <ScreenShare className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isScreenSharing ? "Stop" : "Start"} screen share</p>
          </TooltipContent>
        </Tooltip>

        {/* Captions */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={captionsEnabled ? "primary" : "secondary"}
              size="lg"
              className="h-12 w-12 rounded-full"
              onClick={handleCaptionsToggle}
            >
              <Captions className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{captionsEnabled ? "Hide" : "Show"} captions (Ctrl/Cmd + C)</p>
          </TooltipContent>
        </Tooltip>

        {/* Volume */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="lg"
              className="h-12 w-12 rounded-full"
            >
              <Volume2 className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Audio settings</p>
          </TooltipContent>
        </Tooltip>

        {/* Settings */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="lg"
              className="h-12 w-12 rounded-full"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Session settings</p>
          </TooltipContent>
        </Tooltip>

        {/* End Call */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              size="lg"
              className="h-12 w-12 rounded-full ml-4"
              onClick={onEndCall}
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>End session</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="mt-3 text-xs text-muted-foreground text-center">
        <span className="inline-flex items-center gap-1">
          <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Space</kbd> 
          Play/Pause • 
          <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+M</kbd> 
          Mute • 
          <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+C</kbd> 
          Captions
        </span>
      </div>
    </div>
  );
}
