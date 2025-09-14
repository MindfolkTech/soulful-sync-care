import * as React from "react";
import { X, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

export interface TherapistData {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  personality: string[];
  languages: string[];
  rate: string;
  rating: number;
  quote: string;
  image: string;
  video_url?: string;
  location?: string;
}

interface TherapistCardProps {
  therapist: TherapistData;
  onPass: (therapist: TherapistData) => void;
  onSave: (therapist: TherapistData) => void;
  onShowDetails: (therapist: TherapistData) => void;
  className?: string;
  showDetailsButton?: boolean;
}

export function TherapistCard({ 
  therapist, 
  onPass, 
  onSave, 
  onShowDetails, 
  className,
  showDetailsButton = true 
}: TherapistCardProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  return (
    <article
      role="article"
      aria-labelledby={`therapist-name-${therapist.id}`}
      className={cn(
        "relative w-full bg-surface rounded-lg shadow-sm border border-border overflow-hidden",
        className
      )}
      style={{ padding: "16px" }}
    >
      {/* Media Area - 60% of card height */}
      <div 
        className="relative w-full rounded-lg overflow-hidden bg-gray-100"
        style={{ height: "60%", aspectRatio: "16/9" }}
      >
        {therapist.video_url ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={therapist.image}
            controls
            muted
            playsInline
            preload="metadata"
          >
            <source src={therapist.video_url} type="video/mp4" />
            <track kind="captions" src="" label="English captions" default />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={therapist.image}
            alt={`${therapist.name} profile`}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Info Stack - 28% of card height */}
      <div 
        className="flex flex-col justify-between py-3"
        style={{ height: "28%" }}
        role="group"
        aria-label="Therapist information"
      >
        {/* Credentials + Price Row - 6% */}
        <div className="flex justify-between items-center text-sm font-secondary text-text-secondary">
          <span>{therapist.title}</span>
          <span className="font-semibold text-text-primary">{therapist.rate}</span>
        </div>

        {/* Name Row - 8% */}
        <h2 
          id={`therapist-name-${therapist.id}`}
          className="font-primary text-xl font-semibold text-text-primary leading-tight"
        >
          {therapist.name}
        </h2>

        {/* Personality/Identity Chips Row - 7% */}
        <div className="flex flex-wrap gap-1">
          {therapist.personality.slice(0, 2).map((trait) => (
            <Tag key={trait} category="personality" size="sm">
              {trait}
            </Tag>
          ))}
          {therapist.specialties.slice(0, 1).map((specialty) => (
            <Tag key={specialty} category="specialty" size="sm">
              {specialty}
            </Tag>
          ))}
        </div>

        {/* Location + One-liner Row - 7% */}
        <div className="text-sm text-text-secondary font-secondary">
          <p className="line-clamp-1">"{therapist.quote}"</p>
          {therapist.location && (
            <p className="text-xs mt-1">{therapist.location}</p>
          )}
        </div>
      </div>

      {/* Mobile Details Chevron */}
      {showDetailsButton && (
        <button
          onClick={() => onShowDetails(therapist)}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 md:hidden p-2 rounded-full bg-surface border border-border shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Open therapist details"
          title="More details"
        >
          <ChevronDown className="h-6 w-6 text-text-secondary" />
        </button>
      )}

      {/* Actions Row - 12% of card height */}
      <div 
        className="absolute bottom-0 left-4 right-4 flex justify-center items-center gap-[8%]"
        style={{ height: "12%" }}
        role="group"
        aria-label="Card actions"
      >
        <Button
          size="icon"
          variant="outline"
          onClick={() => onPass(therapist)}
          className="rounded-full bg-surface hover:bg-surface-accent border-border aspect-square"
          style={{ 
            width: "18%", 
            minWidth: "56px", 
            maxWidth: "72px",
            height: "auto"
          }}
          aria-label={`Pass on ${therapist.name}`}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <Button
          size="icon"
          variant="outline"
          onClick={() => onSave(therapist)}
          className="rounded-full bg-surface hover:bg-surface-accent border-border aspect-square"
          style={{ 
            width: "18%", 
            minWidth: "56px", 
            maxWidth: "72px",
            height: "auto"
          }}
          aria-label={`Save ${therapist.name} to favorites`}
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
    </article>
  );
}