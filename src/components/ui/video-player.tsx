import * as React from "react";
import { Play, Pause, Volume2, VolumeX, Captions, Maximize } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  showControls?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
}

const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ 
    src, 
    poster, 
    autoPlay = false, 
    muted = true, 
    showControls = true,
    className,
    onPlay,
    onPause,
    ...props 
  }, ref) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(autoPlay);
    const [isMuted, setIsMuted] = React.useState(muted);
    const [showCaptions, setShowCaptions] = React.useState(true);
    const [isFullscreen, setIsFullscreen] = React.useState(false);

    // Combine refs
    React.useImperativeHandle(ref, () => videoRef.current!);

    const handlePlayPause = () => {
      if (!videoRef.current) return;
      
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        onPause?.();
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        onPlay?.();
      }
    };

    const handleMuteToggle = () => {
      if (!videoRef.current) return;
      
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    };

    const handleFullscreen = () => {
      if (!videoRef.current) return;
      
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    };

    return (
      <div className={cn("relative group", className)}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={isMuted}
          className="w-full h-full object-cover rounded-lg"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          {...props}
        >
          <source src={src} type="video/mp4" />
          {showCaptions && (
            <track kind="captions" srcLang="en" label="English" />
          )}
        </video>

        {/* Overlay Controls */}
        {showControls && (
          <>
            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button
                  size="icon"
                  onClick={handlePlayPause}
                  className="h-16 w-16 rounded-full bg-black/60 hover:bg-black/80"
                  aria-label="Play video"
                >
                  <Play className="h-8 w-8 text-white ml-1" />
                </Button>
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handlePlayPause}
                    className="h-8 w-8 text-white hover:bg-white/20"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleMuteToggle}
                    className="h-8 w-8 text-white hover:bg-white/20"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowCaptions(!showCaptions)}
                    className="h-8 w-8 text-white hover:bg-white/20"
                    aria-label={showCaptions ? "Hide captions" : "Show captions"}
                  >
                    <Captions className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleFullscreen}
                    className="h-8 w-8 text-white hover:bg-white/20"
                    aria-label="Fullscreen"
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);
VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer };
