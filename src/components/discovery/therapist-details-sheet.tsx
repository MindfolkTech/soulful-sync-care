import * as React from "react";
import { X, Heart, Flag, ChevronDown, BadgeCheck } from "lucide-react";
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
import { TherapistData, MediaItem } from "@/components/discovery/therapist-card";
import { ExpandableStyleSection } from "@/components/discovery/expandable-style-section";

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
  if (!therapist) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-dvh flex flex-col p-0 bg-surface"
        aria-labelledby="detail-title"
      >
        <div className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide">
            {/* Header section with close button */}
            <div className="p-4 sticky top-0 bg-surface/80 backdrop-blur-sm z-10">
                 <button 
                   onClick={() => onOpenChange(false)}
                   className="w-10 h-10 rounded-full bg-surface-accent flex items-center justify-center mx-auto hover:bg-[hsl(var(--surface-accent)/0.8)] transition-colors"
                   aria-label="Close details"
                 >
                    <ChevronDown className="w-5 h-5 text-[hsl(var(--garden-green))]" />
                 </button>
            </div>
            
            <div className="px-4 pb-4">
                 <h2 className="text-3xl font-bold text-text-primary font-primary">{therapist.name}</h2>
                 <p className="text-md text-text-muted mt-1 font-secondary">{therapist.title}, {therapist.years_experience}</p>
            </div>

            <div className="px-4 pb-4 border-b border-border">
                <h3 className="text-xl font-semibold text-text-primary mb-2 font-secondary">About Me</h3>
                <p className="text-text-secondary leading-relaxed font-secondary">I help clients navigate anxiety, depression, and trauma using an integrative approach that combines evidence-based techniques with mindfulness practices. My therapy style is warm, collaborative, and focused on your goals.</p>
            </div>

            <div className="px-4 py-4 border-b border-border">
                <h3 className="text-xl font-semibold text-text-primary mb-3 font-secondary">Specialities</h3>
                <TagGroup tags={therapist.specialties} category="specialty" />
            </div>
            
            <div className="px-4 py-4 border-b border-border">
                <h3 className="text-xl font-semibold text-text-primary mb-3 font-secondary">Modalities</h3>
                <TagGroup tags={therapist.modalities || []} category="modality" />
            </div>
            
            <div className="px-4 py-4 border-b border-border">
                <h3 className="text-xl font-semibold text-text-primary mb-3 font-secondary">Personality</h3>
                <TagGroup tags={therapist.personality} category="personality" />
            </div>

            {/* Communication Style - Expandable Section */}
            {therapist.communication_style && (
              <div className="px-4 py-4 border-b border-border">
                <ExpandableStyleSection
                  title="Communication Style"
                  label={therapist.communication_style.label}
                  description={therapist.communication_style.description}
                />
              </div>
            )}

            {/* Session Format - Expandable Section */}
            {therapist.session_format && (
              <div className="px-4 py-4 border-b border-border">
                <ExpandableStyleSection
                  title="Session Format"
                  label={therapist.session_format.label}
                  description={therapist.session_format.description}
                />
              </div>
            )}

            <div className="px-4 py-4 border-b border-border">
                <h3 className="text-xl font-semibold text-text-primary mb-3 font-secondary">Languages</h3>
                <TagGroup tags={therapist.languages} category="language" />
            </div>

            <div className="px-4 py-4 pb-24">
                <h3 className="text-xl font-semibold text-text-primary mb-3 font-secondary">Credentials</h3>
                <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-surface-accent mr-3 flex items-center justify-center">
                        <BadgeCheck className="w-6 h-6 text-[hsl(var(--garden-green))]" />
                      </div>
                      <span className="text-text-secondary font-secondary">Ph.D. in Clinical Psychology</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-surface-accent mr-3 flex items-center justify-center">
                        <BadgeCheck className="w-6 h-6 text-[hsl(var(--garden-green))]" />
                      </div>
                      <span className="text-text-secondary font-secondary">Licensed Psychologist (#12345)</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Fixed Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-surface border-t border-border pb-[env(safe-area-inset-bottom)]">
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-[hsl(var(--btn-primary-bg))] text-[hsl(var(--btn-primary-text))] font-secondary"
              onClick={() => {
                onSave(therapist);
                onOpenChange(false);
              }}
            >
              <Heart className="h-4 w-4 mr-2" />
              Connect
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => onReport(therapist)}
              aria-label="Report therapist"
              className="bg-surface border-border"
            >
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <SheetTitle id="detail-title" className="sr-only">
          {therapist.name}'s Details
        </SheetTitle>
        <SheetDescription className="sr-only">
          More information about {therapist.name}.
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
