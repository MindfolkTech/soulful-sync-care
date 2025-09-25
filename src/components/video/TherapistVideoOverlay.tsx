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
    const checkOrientation = () => {
      // Check if mobile
      setIsMobile(window.matchMedia('(max-width: 640px)').matches);
      
      // Check if landscape
      setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
    };
    
    // Initial check
    checkOrientation();
    
    // Listen for orientation changes
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    // Setup back button handler for mobile
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
      window.history.pushState(null, document.title, window.location.href);
      window.addEventListener('popstate', handleBackButton);
    }
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
      window.removeEventListener('popstate', handleBackButton);
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
          isMobile ? "max-w-[95vw] sm:max-w-none h-[85vh]" : "max-w-4xl",
          isLandscape && isMobile ? "h-[90vh] max-h-[90vh]" : "",
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
