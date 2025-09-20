import * as React from "react";
import { X, Heart, Flag } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
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

const DetailSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="space-y-2">
        <h4 className="font-secondary font-semibold text-text-primary">{title}</h4>
        {children}
    </div>
);

const TagGroup = ({ tags, category }: { tags: string[], category: 'specialty' | 'modality' | 'personality' | 'language' }) => (
    <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
            <Tag key={tag} category={category} size="sm" shape="rounded">{tag}</Tag>
        ))}
    </div>
);

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
        className="h-[90vh] flex flex-col p-4"
        aria-labelledby="detail-title"
      >
        <SheetHeader className="p-2">
          <SheetTitle id="detail-title" className="sr-only">
            {therapist.name}'s Details
          </SheetTitle>
          <SheetDescription className="sr-only">
            More information about {therapist.name}.
          </SheetDescription>
           <SheetClose className="absolute top-4 right-4 text-text-muted opacity-80 hover:opacity-100">
                <X className="h-5 w-5" />
            </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-6 pb-20 px-2">
            {/* This media carousel can be a simplified version or just the main image */}
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-surface-accent">
                 <img src={therapist.media[0].url} alt={therapist.name} className="w-full h-full object-cover" />
            </div>

            <h3 className="font-primary text-3xl font-bold text-text-primary">{therapist.name}</h3>
            
            <DetailSection title="About me">
                <p className="font-secondary text-text-secondary leading-relaxed">{therapist.quote}</p>
            </DetailSection>

            <DetailSection title="Specialities">
                <TagGroup tags={therapist.specialties} category="specialty" />
            </DetailSection>
            
            <DetailSection title="Modalities">
                <TagGroup tags={therapist.modalities || []} category="modality" />
            </DetailSection>

            <DetailSection title="Personality">
                <TagGroup tags={therapist.personality} category="personality" />
            </DetailSection>
            
            <DetailSection title="Communication Style">
                <TagGroup tags={therapist.personality || []} category="personality" />
            </DetailSection>

            <DetailSection title="Languages">
                <TagGroup tags={therapist.languages} category="language" />
            </DetailSection>
        </div>

        {/* Sticky Action Row */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-surface border-t border-border">
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-btn-primary-bg text-btn-primary-text"
              onClick={() => {
                onSave(therapist);
                onOpenChange(false);
              }}
            >
              <Heart className="h-4 w-4 mr-2" />
              Connect
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
