import * as React from "react";
import { X, Heart, ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Stack, HStack, Cluster } from "@/components/ui/stack";
import { VideoPlayer } from "@/components/ui/video-player";
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
        "relative w-full bg-surface rounded-lg shadow-sm border border-border overflow-hidden p-4",
        className
      )}
    >
      <Stack spacing="sm">
        {/* Personality/Identity Chips Row - Above Media per Style Guide */}
        <Cluster spacing="xs">
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
        </Cluster>

        {/* Portrait Media Area with Play Overlay */}
        <div 
          className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface-accent cursor-pointer group"
          onClick={handleMediaClick}
        >
          {/* Image or Video */}
          {therapist.image ? (
            <img
              src={therapist.image}
              alt={`${therapist.name} profile photo`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : therapist.video_url ? (
            <VideoPlayer
              src={therapist.video_url}
              className="w-full h-full"
              showControls={false}
              onPlay={() => onShowVideo?.(therapist)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-garden-green to-elated-emerald flex items-center justify-center">
              <span className="text-white font-primary font-bold text-4xl">
                {initials}
              </span>
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

        {/* Info Stack */}
        <Stack spacing="sm">
          {/* Credentials + Price Row */}
          <HStack justify="between" align="center">
            <span className="text-sm font-secondary text-text-secondary">
              {therapist.title}
            </span>
            <span className="font-semibold text-text-primary">
              {therapist.rate}
            </span>
          </HStack>

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
        </Stack>

        {/* Mobile Details Chevron */}
        {showDetailsButton && (
          <div className="flex justify-center md:hidden">
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
          <HStack justify="center" spacing="lg" className="md:hidden">
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
          </HStack>
        )}
      </Stack>
    </article>
  );
}
