import * as React from "react";
import { X, Play, Pause, Volume2, VolumeX, Subtitles } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogOverlay 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
  posterUrl: string;
  title: string;
}

export function VideoOverlay({
  open,
  onOpenChange,
  videoUrl,
  posterUrl,
  title
}: VideoOverlayProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [captionsEnabled, setCaptionsEnabled] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleCaptionsToggle = () => {
    if (!videoRef.current) return;
    
    const tracks = videoRef.current.textTracks;
    if (tracks.length > 0) {
      tracks[0].mode = captionsEnabled ? 'hidden' : 'showing';
      setCaptionsEnabled(!captionsEnabled);
    }
  };

  // Reset state when dialog opens
  React.useEffect(() => {
    if (open) {
      setIsPlaying(false);
      setIsMuted(false);
      setCaptionsEnabled(true);
    }
  }, [open]);

  // Handle video events
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
      <DialogContent 
        className={cn(
          "w-full h-full md:h-auto md:max-w-4xl md:max-h-[85vh]",
          "p-0 bg-black border-0",
          "focus:outline-none"
        )}
        aria-label={`Video introduction by ${title}`}
      >
        <div className="relative w-full h-full flex flex-col">
          {/* Video */}
          <div className="relative flex-1 flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              poster={posterUrl}
              muted={isMuted}
              playsInline
              preload="metadata"
              onClick={handlePlayPause}
            >
              <source src={videoUrl} type="video/mp4" />
              <track 
                kind="captions" 
                src="" 
                label="English captions" 
                default
                id="captions-track"
              />
              Your browser does not support the video tag.
            </video>

            {/* Play overlay when paused */}
            {!isPlaying && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute inset-0 w-full h-full bg-black/20 hover:bg-black/30 rounded-none"
                onClick={handlePlayPause}
                aria-label="Play video"
              >
                <Play className="h-16 w-16 text-white" />
              </Button>
            )}
          </div>

          {/* Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handlePlayPause}
                  className="text-white hover:bg-white/20"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleMuteToggle}
                  className="text-white hover:bg-white/20"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleCaptionsToggle}
                  className={cn(
                    "text-white hover:bg-white/20",
                    captionsEnabled && "bg-white/20"
                  )}
                  aria-label={captionsEnabled ? "Disable captions" : "Enable captions"}
                  aria-pressed={captionsEnabled}
                >
                  <Subtitles className="h-5 w-5" />
                </Button>
              </div>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="text-white hover:bg-white/20"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}