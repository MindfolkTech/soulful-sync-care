import * as React from "react";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  cite: string;
}

interface TestimonialCarouselProps {
  items: Testimonial[];
  className?: string;
}

export function TestimonialCarousel({ items, className }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div 
            key={index}
            className="w-full flex-shrink-0 text-center px-4"
          >
            <blockquote className="font-secondary text-lg lg:text-xl text-text-primary leading-relaxed mb-4 max-w-3xl mx-auto">
              "{item.quote}"
            </blockquote>
            <cite className="font-secondary text-sm text-text-secondary not-italic">
              — {item.cite}
            </cite>
          </div>
        ))}
      </div>
      
      {items.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex 
                  ? "bg-jovial-jade" 
                  : "bg-text-tertiary"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}