import * as React from "react";
import { Play, Pause, Volume2, VolumeX, Captions, Maximize, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useSwipeable } from "react-swipeable";

// Helper function to determine video source type
const getVideoSourceType = (url: string): 'cloudflare' | 'youtube' | 'vimeo' | 'standard' => {
  if (!url) return 'standard';
  
  if (url.includes('cloudflarestream.com') || url.includes('.m3u8')) {
    return 'cloudflare';
  } else if (
    url.includes('youtube.com') ||
    url.includes('youtu.be')
  ) {
    return 'youtube';
  } else if (url.includes('vimeo.com')) {
    return 'vimeo';
  } else {
    return 'standard';
  }
};

// Extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  // Handle youtu.be format
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1]?.split(/[?&#]/)[0] || null;
  }
  
  // Handle youtube.com format
  const match = url.match(/[?&]v=([^?&]+)/);
  return match ? match[1] : null;
};

// Extract Vimeo video ID
const getVimeoVideoId = (url: string): string | null => {
  const match = url.match(/vimeo\.com\/(?:.*?\/(\d+)|\/(\d+))/);
  return match ? match[1] || match[2] : null;
};

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  className?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, title, className }) => {
  return (
    <div className={cn("relative aspect-video w-full", className)}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title || "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        style={{ border: 0 }}
      />
    </div>
  );
};

export interface CloudflareVideoProps {
  src: string;
  poster?: string;
  title?: string;
  subtitle?: string; // For therapist rate or additional info
  onClose?: () => void;
  className?: string;
  onError?: (error: Error) => void;
  fallbackImage?: string; // Additional fallback image if poster fails
}

export function CloudflareStreamPlayer({
  src,
  poster,
  title,
  subtitle,
  onClose,
  className,
  onError,
  fallbackImage
}: CloudflareVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [showCaptions, setShowCaptions] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [controlsVisible, setControlsVisible] = React.useState(true);
  const controlsTimerRef = React.useRef<number | null>(null);
  const [loadError, setLoadError] = React.useState<Error | null>(null);
  const [retryCount, setRetryCount] = React.useState(0);
  const [currentQuality, setCurrentQuality] = React.useState<'high' | 'medium' | 'low'>('high');

  // Handle loading metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Determine video source type early to avoid reference errors
  const videoSourceType = React.useMemo(() => getVideoSourceType(src), [src]);

  // Handle loading errors
  const handleVideoError = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const error = new Error(`Video loading failed: ${(event.target as HTMLVideoElement).error?.message || 'Unknown error'}`);
    console.error("Video loading error:", error);

    setLoadError(error);

    // Try to recover by lowering quality if we have retry attempts left
    if (retryCount < 2 && videoSourceType === 'cloudflare') {
      setRetryCount(prev => prev + 1);

      // Try lower quality version if available
      if (currentQuality === 'high') {
        console.log('Retrying with medium quality...');
        setCurrentQuality('medium');
      } else if (currentQuality === 'medium') {
        console.log('Retrying with low quality...');
        setCurrentQuality('low');
      }
    } else {
      // Report error to parent component if callback provided
      if (onError) {
        onError(error);
      }
    }
  };

  // Play/Pause functionality
  const handlePlayPause = () => {
    if (!videoRef.current || loadError) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => {
          // Only set playing state if play() succeeds
          setIsPlaying(true);
          resetControlsTimer();
        })
        .catch(error => {
          console.error("Playback failed:", error);
          setLoadError(error);
          setIsPlaying(false); // Ensure state stays false on error
          if (onError) onError(error);
        });
    }
  };

  // Mute toggle
  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    resetControlsTimer();
  };

  // Captions toggle
  const handleCaptionsToggle = () => {
    setShowCaptions(!showCaptions);
    resetControlsTimer();

    if (videoRef.current) {
      const tracks = videoRef.current.textTracks;
      for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].kind === 'captions' || tracks[i].kind === 'subtitles') {
          tracks[i].mode = !showCaptions ? 'showing' : 'hidden';
        }
      }
    }
  };

  // Fullscreen toggle
  const handleFullscreen = () => {
    if (!videoRef.current) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
    resetControlsTimer();
  };

  // Seek functionality
  const handleSeek = (values: number[]) => {
    if (!videoRef.current || values.length === 0) return;
    
    const newTime = values[0];
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    resetControlsTimer();
  };

  // Format time display (MM:SS)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Auto-hide controls after inactivity
  const resetControlsTimer = () => {
    if (controlsTimerRef.current) {
      window.clearTimeout(controlsTimerRef.current);
    }
    
    setControlsVisible(true);
    
    controlsTimerRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setControlsVisible(false);
      }
    }, 3000);
  };

  // Set up swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedDown: () => onClose?.(),
    onSwipedUp: () => handleFullscreen(),
    onTap: () => {
      resetControlsTimer();
      if (!controlsVisible) {
        setControlsVisible(true);
      }
    },
    // Configuration options directly on the object
    delta: 10,          // Min distance required before swipe action is triggered
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false
  });

  // Setup keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;
      
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'm':
          e.preventDefault();
          handleMuteToggle();
          break;
        case 'c':
          e.preventDefault();
          handleCaptionsToggle();
          break;
        case 'f':
          e.preventDefault();
          handleFullscreen();
          break;
        case 'Escape':
          if (onClose) {
            e.preventDefault();
            onClose();
          }
          break;
        case 'ArrowLeft':
          if (videoRef.current) {
            e.preventDefault();
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
            resetControlsTimer();
          }
          break;
        case 'ArrowRight':
          if (videoRef.current) {
            e.preventDefault();
            videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5);
            resetControlsTimer();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, isMuted, showCaptions, duration, onClose]);

  // Clean up timer on unmount
  React.useEffect(() => {
    return () => {
      if (controlsTimerRef.current) {
        window.clearTimeout(controlsTimerRef.current);
      }
    };
  }, []);

  // Mouse move event to show controls
  React.useEffect(() => {
    const handleMouseMove = () => {
      resetControlsTimer();
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPlaying]);

  // Reload video when quality changes
  React.useEffect(() => {
    if (videoRef.current && videoSourceType === 'cloudflare') {
      const currentTime = videoRef.current.currentTime;
      const wasPlaying = isPlaying;

      // Force reload by setting src
      videoRef.current.load();

      // Restore playback position and state
      const handleLoadedMetadata = () => {
        if (videoRef.current) {
          videoRef.current.currentTime = currentTime;
          if (wasPlaying) {
            videoRef.current.play().catch(error => {
              console.error("Failed to resume playback after quality change:", error);
              setIsPlaying(false);
            });
          }
        }
      };

      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });

      return () => {
        videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [currentQuality, videoSourceType]);

  // Generate caption URL for Cloudflare Stream videos
  const getCaptionUrl = React.useMemo(() => {
    if (!src) return null;
    
    // For Cloudflare Stream videos
    if (videoSourceType === 'cloudflare' || src.includes('cloudflarestream.com') || src.includes('.m3u8')) {
      // Extract video ID from various Cloudflare Stream URL formats
      let videoId = '';
      
      // Format: https://customer-<id>.cloudflarestream.com/<id>/manifest/video.m3u8
      const manifestMatch = src.match(/\/([a-zA-Z0-9_-]+)\/manifest\/video\.m3u8/i);
      if (manifestMatch && manifestMatch[1]) {
        videoId = manifestMatch[1];
      }
      
      // Format: https://videodelivery.net/<id>/manifest/video.m3u8
      const deliveryMatch = src.match(/videodelivery\.net\/([a-zA-Z0-9_-]+)/i);
      if (deliveryMatch && deliveryMatch[1]) {
        videoId = deliveryMatch[1];
      }
      
      // Format: https://watch.cloudflarestream.com/<id>
      const watchMatch = src.match(/watch\.cloudflarestream\.com\/([a-zA-Z0-9_-]+)/i);
      if (watchMatch && watchMatch[1]) {
        videoId = watchMatch[1];
      }
      
      if (videoId) {
        // Auto-generated captions URL
        return `https://customer-${videoId}.cloudflarestream.com/${videoId}/subtitles/eng.vtt`;
      }
    }
    
    return null;
  }, [src, videoSourceType]);
  
  // Load and enable captions
  React.useEffect(() => {
    if (!videoRef.current) return;
    
    // Attempt to enable captions when video loads
    const handleLoadedMetadata = () => {
      const textTracks = videoRef.current?.textTracks;
      if (textTracks?.length > 0) {
        // Enable the first available track
        for (let i = 0; i < textTracks.length; i++) {
          if (textTracks[i].kind === 'captions' || textTracks[i].kind === 'subtitles') {
            textTracks[i].mode = showCaptions ? 'showing' : 'hidden';
          }
        }
      }
    };
    
    videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    // Try to enable immediately if metadata already loaded
    if (videoRef.current.readyState >= 1) {
      handleLoadedMetadata();
    }
    
    return () => {
      videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoRef, showCaptions]);
  
  // Render YouTube player
  if (videoSourceType === 'youtube') {
    const youtubeId = getYouTubeVideoId(src);
    if (!youtubeId) {
      return <div className="p-4 text-red-500">Invalid YouTube URL</div>;
    }
    
    return (
      <YouTubePlayer
        videoId={youtubeId}
        title={title}
        className={className}
      />
    );
  }
  
  // Render Vimeo player
  if (videoSourceType === 'vimeo') {
    const vimeoId = getVimeoVideoId(src);
    if (!vimeoId) {
      return <div className="p-4 text-red-500">Invalid Vimeo URL</div>;
    }
    
    return (
      <div className={cn("relative aspect-video w-full", className)}>
        <iframe 
          src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
          title={title || "Vimeo video player"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          style={{ border: 0 }}
        />
      </div>
    );
  }
  
  // Adjust source URL based on quality setting for Cloudflare streams
  const getQualityAdjustedSrc = React.useMemo(() => {
    if (videoSourceType !== 'cloudflare' || !src.includes('cloudflarestream.com')) {
      return src;
    }

    // Only adjust quality for Cloudflare Stream URLs
    if (currentQuality === 'high') {
      return src; // Use original URL for high quality
    } else if (currentQuality === 'medium') {
      // Add medium quality parameter
      return src.includes('?') ? `${src}&quality=720p` : `${src}?quality=720p`;
    } else {
      // Low quality
      return src.includes('?') ? `${src}&quality=480p` : `${src}?quality=480p`;
    }
  }, [src, currentQuality, videoSourceType]);

  // Render error message if all retries failed
  if (loadError && retryCount >= 2) {
    return (
      <div className={cn("relative flex flex-col items-center justify-center bg-[#2F353A] text-white p-6", className)}>
        <div className="text-center">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Video Playback Error</h3>
          <p className="text-sm mb-4">Sorry, we couldn't load this video. Please try again later.</p>
          {(poster || fallbackImage) && (
            <img 
              src={poster || fallbackImage} 
              alt={title || "Video thumbnail"}
              className="max-w-full h-auto rounded mb-4"
            />
          )}
          {title && <p className="font-medium">{title}</p>}
          {subtitle && <p className="text-sm text-gray-300">{subtitle}</p>}
        </div>
      </div>
    );
  }

  // Default player for Cloudflare and standard video files
  return (
    <div 
      className={cn("relative group bg-black overflow-hidden", className)}
      {...swipeHandlers}
    >
      <video
        ref={videoRef}
        src={getQualityAdjustedSrc}
        poster={poster}
        className="w-full h-full"
        playsInline
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={() => handlePlayPause()}
        onError={handleVideoError}
        aria-label={title ? `Video: ${title}` : "Video player"}
      >
        {/* Caption tracks */}
        {showCaptions && (
          <>
            {/* Default empty track for browser-generated captions */}
            <track 
              kind="captions" 
              srcLang="en" 
              label="English" 
              default 
            />
            
            {/* Cloudflare Stream auto-generated captions */}
            {getCaptionUrl && (
              <track 
                kind="captions" 
                srcLang="en" 
                label="English" 
                src={getCaptionUrl}
                default 
              />
            )}
          </>
        )}
      </video>

      {/* Play button overlay (when paused) */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer"
          onClick={handlePlayPause}
        >
          <div className="bg-black/60 rounded-full p-6">
            <Play className="h-12 w-12 text-white" fill="white" />
          </div>
        </div>
      )}

      {/* Control bar - animated visibility */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 pt-10 pb-4 transition-opacity duration-300",
          controlsVisible || !isPlaying ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Top controls with title and close button */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-b from-black/90 to-transparent">
          <div className="text-white">
            {title && <h3 className="font-semibold truncate max-w-[200px]">{title}</h3>}
            {subtitle && <p className="text-sm text-white/70">{subtitle}</p>}
          </div>
          {onClose && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="rounded-full h-10 w-10 bg-black/30 text-white hover:bg-black/50"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        {/* Seek bar */}
        <div className="mb-2 px-1">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
            aria-label="Video progress"
          />
          <div className="flex justify-between text-xs text-white/70 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Bottom controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={handlePlayPause}
              className="h-10 w-10 rounded-full text-white hover:bg-white/10"
              aria-label={isPlaying ? "Pause" : "Play"}
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
              className="h-10 w-10 rounded-full text-white hover:bg-white/10"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCaptionsToggle}
              className={cn(
                "h-10 w-10 rounded-full text-white hover:bg-white/10",
                showCaptions && "bg-white/20"
              )}
              aria-label={showCaptions ? "Hide captions" : "Show captions"}
              aria-pressed={showCaptions}
            >
              <Captions className="h-5 w-5" />
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              onClick={handleFullscreen}
              className="h-10 w-10 rounded-full text-white hover:bg-white/10"
              aria-label="Fullscreen"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite">
        {isPlaying ? "Video is playing" : "Video is paused"}
      </div>
    </div>
  );
}
