import * as React from "react";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SwipeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onTap?: () => void;
  disabled?: boolean;
  className?: string;
}

const SwipeCard = React.forwardRef<HTMLDivElement, SwipeCardProps>(
  ({ 
    children, 
    onSwipeLeft, 
    onSwipeRight, 
    onTap,
    disabled = false,
    className,
    ...props 
  }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragOffset, setDragOffset] = React.useState(0);
    const [startX, setStartX] = React.useState(0);

    const handleStart = (clientX: number) => {
      if (disabled) return;
      setIsDragging(true);
      setStartX(clientX);
    };

    const handleMove = (clientX: number) => {
      if (!isDragging || disabled) return;
      const offset = clientX - startX;
      setDragOffset(offset);
    };

    const handleEnd = () => {
      if (!isDragging || disabled) return;
      
      const threshold = 100;
      
      if (dragOffset > threshold) {
        onSwipeRight?.();
      } else if (dragOffset < -threshold) {
        onSwipeLeft?.();
      } else {
        onTap?.();
      }
      
      setIsDragging(false);
      setDragOffset(0);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      handleStart(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      handleMove(e.clientX);
    };

    const handleMouseUp = () => {
      handleEnd();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      handleStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      handleEnd();
    };

    const rotation = dragOffset * 0.1;
    const opacity = Math.max(0.3, 1 - Math.abs(dragOffset) / 200);

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full h-full cursor-grab active:cursor-grabbing",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        style={{
          transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
          opacity,
          transition: isDragging ? "none" : "var(--motion-swipe)",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
        {children}

        {/* Swipe Indicators */}
        {isDragging && (
          <>
            {dragOffset > 50 && (
              <div className="absolute inset-0 flex items-center justify-center bg-success/20 rounded-lg">
                <div className="flex items-center gap-2 text-success-foreground">
                  <Heart className="h-8 w-8" />
                  <span className="font-semibold">Save</span>
                </div>
              </div>
            )}
            
            {dragOffset < -50 && (
              <div className="absolute inset-0 flex items-center justify-center bg-error/20 rounded-lg">
                <div className="flex items-center gap-2 text-error-foreground">
                  <X className="h-8 w-8" />
                  <span className="font-semibold">Pass</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);
SwipeCard.displayName = "SwipeCard";

export { SwipeCard };
