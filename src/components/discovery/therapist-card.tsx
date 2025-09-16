import * as React from "react";
import { X, Heart, ChevronDown, Play } from "lucide-react";
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
  onShowVideo?: (therapist: TherapistData) => void;
  className?: string;
  showDetailsButton?: boolean;
  showActionButtons?: boolean;
}

export function TherapistCard({ 
  therapist, 
  onPass, 
  onSave, 
  onShowDetails, 
  onShowVideo,
  className,
  showDetailsButton = true,
  showActionButtons = true 
}: TherapistCardProps) {
  
  const handleMediaClick = () => {
    if (therapist.video_url && onShowVideo) {
      onShowVideo(therapist);
    } else {
      onShowDetails(therapist);
    }
  };

  // Generate initials for fallback
  const initials = therapist.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <article
      role="article"
      aria-labelledby={`therapist-name-${therapist.id}`}
      aria-label={`Therapist card. Swipe left to pass, right to save. Press Enter to open video.`}
      className={cn(
        "relative w-full bg-surface rounded-lg shadow-sm border border-border overflow-hidden",
        className
      )}
      style={{ padding: "16px" }}
    >
      {/* Personality/Identity Chips Row - Above Media per Style Guide */}
      <div className="flex flex-wrap gap-1 mb-3">
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

      {/* Portrait Media Area with Play Overlay */}
      <div 
        className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface-accent cursor-pointer group"
        onClick={handleMediaClick}
      >
        {/* Image */}
        {therapist.image ? (
          <img
            src={therapist.image}
            alt={`${therapist.name} profile photo`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : therapist.video_url ? (
          <video
            className="w-full h-full object-cover"
            poster=""
            preload="metadata"
          >
            <source src={therapist.video_url} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-garden-green to-elated-emerald flex items-center justify-center">
            <span className="text-[--on-dark] font-primary font-bold text-4xl">
              {initials}
            </span>
          </div>
        )}

        {/* Play Overlay - only show if video exists */}
        {therapist.video_url && (
          <div className="absolute inset-0 bg-[--overlay-dark]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-[--overlay-dark]/60 rounded-full p-4">
              <Play className="h-8 w-8 text-[--on-dark]" />
            </div>
          </div>
        )}

        {/* Corner action buttons for desktop/tablet */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100">
          <Button
            size="icon"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onPass(therapist);
            }}
            className="h-8 w-8 rounded-full bg-surface/90 hover:bg-surface border-border backdrop-blur-sm"
            aria-label="Pass"
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onSave(therapist);
            }}
            className="h-8 w-8 rounded-full bg-surface/90 hover:bg-surface border-border backdrop-blur-sm"
            aria-label="Save to favorites"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Info Grid - Simple layout below portrait */}
      <div 
        className="mt-4 space-y-3"
        role="group"
        aria-label="Therapist information"
      >
        {/* Credentials + Price Row */}
        <div className="flex justify-between items-center text-sm font-secondary text-text-secondary">
          <span>{therapist.title}</span>
          <span className="font-semibold text-text-primary">{therapist.rate}</span>
        </div>

        {/* Name Row */}
        <h2 
          id={`therapist-name-${therapist.id}`}
          className="font-primary text-xl font-semibold text-text-primary leading-tight"
        >
          {therapist.name}
        </h2>

        {/* Location + One-liner Row */}
        <div className="text-sm text-text-secondary font-secondary">
          <p className="line-clamp-1">"{therapist.quote}"</p>
          {therapist.location && (
            <p className="text-xs mt-1">{therapist.location}</p>
          )}
        </div>
      </div>

      {/* Mobile Details Chevron */}
      {showDetailsButton && (
        <div className="mt-3 flex justify-center md:hidden">
          <button
            onClick={() => onShowDetails(therapist)}
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1"
            aria-label="More details"
          >
            <span>More details</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Mobile Action Buttons - Only show on mobile and if enabled */}
      {showActionButtons && (
        <div 
          className="mt-4 flex justify-center items-center gap-4 md:hidden"
          role="group"
          aria-label="Card actions"
        >
          <Button
            size="icon"
            variant="outline"
            onClick={() => onPass(therapist)}
            className="rounded-full bg-surface hover:bg-surface-accent border-border h-14 w-14"
            aria-label="Pass"
          >
            <X className="h-6 w-6" />
          </Button>
          
          <Button
            size="icon"
            variant="outline"
            onClick={() => onSave(therapist)}
            className="rounded-full bg-surface hover:bg-surface-accent border-border h-14 w-14"
            aria-label="Save to favorites"
          >
            <Heart className="h-6 w-6" />
          </Button>
        </div>
      )}
    </article>
  );
}