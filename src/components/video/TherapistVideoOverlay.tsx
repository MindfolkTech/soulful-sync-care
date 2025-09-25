import * as React from "react";
import { useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogOverlay
} from "@/components/ui/dialog";
import { CloudflareStreamPlayer } from "./CloudflareStreamPlayer";
import { cn } from "@/lib/utils";

interface TherapistVideoOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
  posterUrl?: string;
  therapistName?: string;
  therapistRate?: string;
  className?: string;
}

export function TherapistVideoOverlay({
  open,
  onOpenChange,
  videoUrl,
  posterUrl,
  therapistName,
  therapistRate,
  className
}: TherapistVideoOverlayProps) {
  // Handle media query for responsive sizing
  const [isMobile, setIsMobile] = React.useState(false);
  const [isLandscape, setIsLandscape] = React.useState(false);
  
  // Handle device orientation and screen size
  useEffect(() => {
    // More precise device detection
    const checkDevice = () => {
      // Check if mobile (smaller screens)
      const isMobileDevice = window.matchMedia('(max-width: 640px)').matches;
      setIsMobile(isMobileDevice);
      
      // Check orientation
      const isLandscapeOrientation = window.matchMedia('(orientation: landscape)').matches;
      setIsLandscape(isLandscapeOrientation);
      
      // Handle iOS-specific quirks
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIOS && isLandscapeOrientation) {
        // iOS needs special handling for landscape fullscreen
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      } else {
        document.documentElement.style.removeProperty('--vh');
      }
      
      // Log device info for debugging
      console.debug('Device:', { 
        isMobile: isMobileDevice, 
        isLandscape: isLandscapeOrientation,
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth
      });
    };
    
    // Initial check
    checkDevice();
    
    // Listen for various orientation and size changes
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    window.addEventListener('deviceorientation', checkDevice);
    
    // Setup back button handler for mobile - critical for good UX
    const handleBackButton = (e: PopStateEvent) => {
      if (open) {
        // Prevent default back action
        e.preventDefault();
        // Close the overlay
        onOpenChange(false);
        // Push a new state to replace the one we just popped
        window.history.pushState(null, document.title, window.location.href);
      }
    };
    
    // Push state when opening to enable back button for closing
    if (open) {
      // Ensure we only push state once when opening
      window.history.pushState(null, document.title, window.location.href);
      window.addEventListener('popstate', handleBackButton);
      
      // Lock body scroll when overlay is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
      window.removeEventListener('deviceorientation', checkDevice);
      window.removeEventListener('popstate', handleBackButton);
      
      // Restore scroll when overlay is closed
      document.body.style.overflow = '';
      
      // Clean up any custom properties
      document.documentElement.style.removeProperty('--vh');
    };
  }, [open, onOpenChange]);
  
  // Handle Picture-in-Picture fallback for desktop
  const handlePiP = async () => {
    try {
      if (typeof document === 'undefined') return;
      
      const videoElement = document.querySelector('video');
      if (!videoElement) return;
      
      if ((document as any).pictureInPictureEnabled) {
        if ((document as any).pictureInPictureElement !== videoElement) {
          // TypeScript doesn't know about requestPictureInPicture, so we need to cast
          await (videoElement as any).requestPictureInPicture();
          // Optionally close the dialog when PiP is active
          onOpenChange(false);
        } else {
          await (document as any).exitPictureInPicture();
        }
      }
    } catch (err) {
      console.error('Failed to enter Picture-in-Picture mode:', err);
    }
  };
    
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-[hsl(var(--modal-backdrop))] backdrop-blur-sm" />
      <DialogContent 
        className={cn(
          "bg-transparent border-none shadow-none p-0 w-full",
          isMobile ? "max-w-[100vw] sm:max-w-none" : "max-w-4xl",
          // Use CSS custom property for height in mobile landscape
          isMobile && !isLandscape ? "h-[85vh]" : "",
          isMobile && isLandscape ? "h-[calc(var(--vh,1vh)*90)]" : "",
          className
        )}
      >
        <div className={cn(
          "w-full overflow-hidden rounded-lg shadow-2xl",
          isMobile ? (isLandscape ? "aspect-video" : "aspect-[9/16]") : "aspect-video"
        )}>
          <CloudflareStreamPlayer
            src={videoUrl}
            poster={posterUrl}
            title={therapistName}
            subtitle={therapistRate}
            onClose={() => onOpenChange(false)}
            className="w-full h-full"
          />
        </div>
        
        {/* Desktop Picture-in-Picture Button */}
        {!isMobile && typeof document !== 'undefined' && 'pictureInPictureEnabled' in document && (document as any).pictureInPictureEnabled && (
          <button 
            className="absolute top-2 right-12 bg-black/50 text-white p-2 rounded-md text-xs"
            onClick={handlePiP}
          >
            PiP Mode
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}
