import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { VolumeX, Volume2, Play, Pause, Maximize, SkipBack, SkipForward } from "lucide-react";

interface VideoPlayerProps {
  videoUrl?: string;
  fallbackImageUrl?: string;
  therapistName: string;
  autoplay?: boolean;
  showControls?: boolean;
  onError?: () => void;
  className?: string;
}

export function VideoPlayer({
  videoUrl,
  fallbackImageUrl,
  therapistName,
  autoplay = false,
  showControls = true,
  onError,
  className = "",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showFallback, setShowFallback] = useState(!videoUrl);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true); // Default captions ON
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const fadeTimeoutRef = useRef<number | null>(null);
  
  // Initialize player when video URL changes
  useEffect(() => {
    setShowFallback(!videoUrl || loadFailed);
  }, [videoUrl, loadFailed]);
  
  // Reset fade timeout when user interacts
  const resetFadeTimeout = () => {
    if (fadeTimeoutRef.current) {
      window.clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    
    setControlsVisible(true);
    
    // Only start the fade timeout if the video is playing
    if (isPlaying && showControls) {
      fadeTimeoutRef.current = window.setTimeout(() => {
        setControlsVisible(false);
      }, 3500); // 3.5 seconds of inactivity before fading
    }
  };
  
  // Set up mouse/touch move listeners
  useEffect(() => {
    if (!showControls) return;
    
    const handleUserActivity = () => {
      resetFadeTimeout();
    };
    
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('touchmove', handleUserActivity);
    document.addEventListener('click', handleUserActivity);
    
    return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('touchmove', handleUserActivity);
      document.removeEventListener('click', handleUserActivity);
      
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [isPlaying, showControls]);
  
  // Start/reset fade timeout when play state changes
  useEffect(() => {
    if (isPlaying && showControls) {
      resetFadeTimeout();
    } else if (!isPlaying && showControls) {
      // Always show controls when paused
      setControlsVisible(true);
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = null;
      }
    }
  }, [isPlaying, showControls]);
  
  // Set up video event listeners
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };
    
    const handleDurationChange = () => {
      setDuration(videoElement.duration);
    };
    
    const handlePlay = () => {
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      if (videoElement) {
        videoElement.currentTime = 0;
      }
    };
    
    const handleError = () => {
      console.error("Video failed to load:", videoUrl);
      setLoadFailed(true);
      setShowFallback(true);
      if (onError) onError();
    };
    
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!document.fullscreenElement ||
        // @ts-ignore - Safari support
        !!document.webkitFullscreenElement ||
        // @ts-ignore - IE support
        !!document.msFullscreenElement
      );
    };
    
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("durationchange", handleDurationChange);
    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handleEnded);
    videoElement.addEventListener("error", handleError);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);
    
    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("durationchange", handleDurationChange);
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("ended", handleEnded);
      videoElement.removeEventListener("error", handleError);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, [videoUrl, onError]);
  
  // Autoplay when requested (respects browser autoplay policies)
  useEffect(() => {
    const videoElement = videoRef.current;
    if (autoplay && videoElement && videoUrl && !showFallback) {
      videoElement.muted = true; // Browsers usually require muted for autoplay
      setIsMuted(true);
      videoElement.play().catch(err => {
        console.warn("Autoplay prevented:", err);
      });
    }
  }, [autoplay, videoUrl, showFallback]);
  
  const togglePlay = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play().catch(err => {
        console.warn("Playback prevented:", err);
      });
    }
  };
  
  const toggleMute = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    videoElement.muted = !videoElement.muted;
    setIsMuted(videoElement.muted);
  };
  
  const seekTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const newTime = parseFloat(e.target.value);
    videoElement.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    
    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      // @ts-ignore - Safari support
      } else if (container.webkitRequestFullscreen) {
        // @ts-ignore
        container.webkitRequestFullscreen();
      // @ts-ignore - IE support
      } else if (container.msRequestFullscreen) {
        // @ts-ignore
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      // @ts-ignore - Safari support
      } else if (document.webkitExitFullscreen) {
        // @ts-ignore
        document.webkitExitFullscreen();
      // @ts-ignore - IE support
      } else if (document.msExitFullscreen) {
        // @ts-ignore
        document.msExitFullscreen();
      }
    }
  };
  
  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const seek = (seconds: number) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const newTime = Math.max(0, Math.min(videoElement.duration, videoElement.currentTime + seconds));
    videoElement.currentTime = newTime;
  };
  
  const toggleCaptions = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    // Toggle captions if available
    if (videoElement.textTracks && videoElement.textTracks.length > 0) {
      const track = videoElement.textTracks[0];
      if (track.mode === "showing") {
        track.mode = "hidden";
        setShowCaptions(false);
      } else {
        track.mode = "showing";
        setShowCaptions(true);
      }
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={`relative rounded-lg overflow-hidden aspect-video bg-black ${className}`}
      role="region"
      aria-label={`Video player: ${therapistName}'s introduction`}
    >
      {/* Fallback Image */}
      {showFallback && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[hsl(var(--surface-accent))]">
          {fallbackImageUrl ? (
            <img 
              src={fallbackImageUrl} 
              alt={`${therapistName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[hsl(var(--surface))] flex items-center justify-center mb-2">
                <Play className="w-8 h-8 text-[hsl(var(--text-primary))]" />
              </div>
              <p className="font-primary text-lg text-[hsl(var(--text-primary))]">
                Video introduction coming soon
              </p>
              <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                {therapistName} hasn't uploaded a video yet
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Video Player */}
      {videoUrl && !showFallback && (
        <>
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            playsInline
            preload="metadata"
            poster={fallbackImageUrl}
            aria-label={`${therapistName}'s introduction video`}
          >
            <track 
              kind="subtitles" 
              label="English" 
              srcLang="en"
              src="" // No captions by default, would be added by Cloudflare
            />
            <p>Your browser doesn't support HTML5 video.</p>
          </video>
          
          {/* Custom Controls (shown when showControls is true) */}
          {showControls && (
            <div 
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 transition-opacity duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}
              onMouseEnter={() => setControlsVisible(true)}
              onMouseLeave={() => isPlaying && resetFadeTimeout()}
            >
              <div className="flex flex-col gap-1">
                {/* Progress Bar */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white font-secondary min-w-[40px]">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={seekTo}
                    className="w-full h-1 appearance-none bg-white/30 rounded-full cursor-pointer"
                    aria-label="Video progress"
                  />
                  <span className="text-xs text-white font-secondary min-w-[40px]">
                    {formatTime(duration)}
                  </span>
                </div>
                
                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-white hover:bg-white/20 p-1 h-8 w-8"
                      onClick={() => seek(-10)}
                      aria-label="Skip back 10 seconds"
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-white hover:bg-white/20 p-1 h-8 w-8"
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-white hover:bg-white/20 p-1 h-8 w-8"
                      onClick={() => seek(10)}
                      aria-label="Skip forward 10 seconds"
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-white hover:bg-white/20 p-1 h-8 w-8"
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-white hover:bg-white/20 p-1 h-8 w-8"
                      onClick={toggleCaptions}
                      aria-label={showCaptions ? "Hide captions" : "Show captions"}
                      aria-pressed={showCaptions}
                    >
                      <span className="font-bold text-xs">CC</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-white hover:bg-white/20 p-1 h-8 w-8"
                      onClick={toggleFullscreen}
                      aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
