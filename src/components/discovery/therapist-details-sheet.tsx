import * as React from "react";
import { X, Heart, Flag } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetClose 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { TherapistData, MediaItem } from "@/components/molecules/therapist-card";

interface TherapistDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  therapist: TherapistData | null;
  onSave: (therapist: TherapistData) => void;
  onReport: (therapist: TherapistData) => void;
}

export function TherapistDetailsSheet({
  open,
  onOpenChange,
  therapist,
  onSave,
  onReport
}: TherapistDetailsSheetProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  if (!therapist) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
      >
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle id="detail-title" className="font-primary text-xl">
              {therapist.name}
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="tertiary" size="icon" aria-label="Close details">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-6 pb-20">
          {/* Video Section */}
          <div className="aspect-video rounded-lg overflow-hidden bg-surface-accent">
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

          {/* Basic Info */}
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-primary text-lg font-semibold text-[hsl(var(--text-primary))]">
                  {therapist.name}
                </h3>
                <p className="text-[hsl(var(--text-secondary))] font-secondary">{therapist.title}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[hsl(var(--text-primary))]">{therapist.rate}</p>
                <p className="text-sm text-[hsl(var(--text-secondary))]">per session</p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="font-secondary text-[hsl(var(--text-secondary))] italic border-l-4 border-surface-accent pl-4">
            "{therapist.quote}"
          </blockquote>

          {/* Specialties */}
          <div className="space-y-2">
            <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {therapist.specialties.map((specialty) => (
                <Tag key={specialty} category="specialty" size="sm">
                  {specialty}
                </Tag>
              ))}
            </div>
          </div>

          {/* Personality */}
          <div className="space-y-2">
            <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">Communication Style</h4>
            <div className="flex flex-wrap gap-2">
              {therapist.personality.map((trait) => (
                <Tag key={trait} category="personality" size="sm">
                  {trait}
                </Tag>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {therapist.languages.map((lang) => (
                <Tag key={lang} category="language" size="sm">
                  {lang}
                </Tag>
              ))}
            </div>
          </div>

          {/* Bio Section - Placeholder */}
          <div className="space-y-2">
            <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">About</h4>
            <p className="font-secondary text-[hsl(var(--text-secondary))]">
              Bio and credentials information would be displayed here based on the therapist's profile data.
            </p>
          </div>

          {/* Availability Section - Placeholder */}
          <div className="space-y-2">
            <h4 className="font-secondary font-semibold text-[hsl(var(--text-primary))]">Availability</h4>
            <p className="font-secondary text-[hsl(var(--text-secondary))]">
              Available scheduling information would be displayed here.
            </p>
          </div>
        </div>

        {/* Sticky Action Row */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface border-t border-border">
          <div className="flex gap-3">
            <Button 
              className="flex-1"
              onClick={() => {
                // Navigate to booking
                console.log("Book chemistry call for", therapist.name);
              }}
            >
              Book Chemistry Call
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                onSave(therapist);
                onOpenChange(false);
              }}
              className="flex-1"
            >
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button 
              variant="tertiary" 
              size="icon"
              onClick={() => onReport(therapist)}
              aria-label="Report therapist"
            >
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
