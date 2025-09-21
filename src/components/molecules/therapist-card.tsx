import * as React from "react";
import { X, Heart, ChevronDown, Play, ChevronLeft, ChevronRight, BadgeCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";


// Re-defining TherapistData here temporarily to avoid circular dependencies
// In a real app, this would be in a shared types file.
export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  poster?: string;
}

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
  media: MediaItem[];
  location?: string;
  compatibility_score?: number;
  years_experience?: string;
  modalities?: string[];
}

const MediaCarousel = ({ media, onShowVideo, therapistName, tags }: { media: MediaItem[], onShowVideo: () => void, therapistName: string, tags: {label: string, category: 'personality' | 'modality' | 'specialty' | 'language' | 'misc'}[] }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const currentMedia = media[currentIndex];

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full h-full group bg-surface-accent">
            <div 
                className="w-full h-full cursor-pointer"
                onClick={() => { if (currentMedia.type === 'video') onShowVideo()}}
            >
                {currentMedia.type === 'image' ? (
                    <img src={currentMedia.url} alt={therapistName} className="w-full h-full object-cover" />
                ) : (
                    <video src={currentMedia.url} poster={currentMedia.poster} className="w-full h-full object-cover" />
                )}
            </div>
            {currentMedia.type === 'video' && (
                <div className="absolute inset-0 bg-ink-slate/30 flex items-center justify-center pointer-events-none">
                    <div className="bg-ink-slate/60 rounded-full p-3">
                        <Play className="h-6 w-6 text-on-dark" />
                    </div>
                </div>
            )}
            
            {/* Tags Overlay - Bottom of image - Enhanced contrast for personality focus */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                <div className="flex flex-wrap gap-1.5 justify-start">
                    {tags.map((tag, index) => (
                        <Tag key={`${tag.category}-${tag.label}-${index}`} category={tag.category} size="sm" className="bg-[hsl(var(--tag-personality-bg)/0.9)] text-[hsl(var(--tag-personality-text))] border-[hsl(var(--tag-personality-bg)/0.3)] backdrop-blur-sm font-medium shadow-sm">
                            {tag.label}
                        </Tag>
                    ))}
                </div>
            </div>
            
             {media.length > 1 && (
                <>
                    <Button variant="ghost" size="icon" onClick={handlePrevious} className="absolute top-1/2 -translate-y-1/2 left-2 bg-surface/50 hover:bg-surface/80 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100"><ChevronLeft className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon" onClick={handleNext} className="absolute top-1/2 -translate-y-1/2 right-2 bg-surface/50 hover:bg-surface/80 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100"><ChevronRight className="h-5 w-5" /></Button>
                </>
            )}
        </div>
    );
};

const Credentials = () => (
    <div className="space-y-1">
        <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-text-primary" /><span className="font-secondary text-xs text-text-primary">Accredited Therapist</span></div>
        <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-text-primary" /><span className="font-secondary text-xs text-text-primary">BACP Member</span></div>
    </div>
);

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
        ))}
    </div>
);

const IdentityStatement = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center gap-2">
        {icon}
        <span className="font-secondary text-xs text-text-secondary">{text}</span>
    </div>
);


interface TherapistCardProps {
  therapist: TherapistData;
  onPass: (therapist: TherapistData) => void;
  onSave: (therapist: TherapistData) => void;
  onShowDetails: (therapist: TherapistData) => void;
  onShowVideo?: (therapist: TherapistData) => void;
  className?: string;
}

export function TherapistCard({ 
  therapist, 
  onPass, 
  onSave, 
  onShowDetails,
  onShowVideo,
  className,
}: TherapistCardProps) {
    const [isExpanded, setIsExpanded] = React.useState(false);
  
  return (
    <article 
        className={cn("relative w-full h-full bg-surface rounded-2xl shadow-lg overflow-hidden flex flex-col", className)}
    >
        {/* Media Section - 55% height */}
        <div className="relative h-[55%] w-full" onClick={() => {
          const videoMedia = therapist.media.find(m => m.type === 'video');
          if (videoMedia) {
            onShowVideo?.(therapist);
          } else {
            onShowDetails(therapist);
          }
        }}>
          <MediaCarousel 
              media={therapist.media}
              onShowVideo={() => onShowVideo?.(therapist)}
              therapistName={therapist.name}
              tags={[
                  ...therapist.personality.slice(0,3).map(p => ({ label: p, category: 'personality' as const }))
              ]}
          />
          {/* Progress indicators for media carousel */}
          {therapist.media.length > 1 && (
            <div className="absolute top-2 left-2 right-2 flex items-center gap-1">
              {therapist.media.map((_, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "h-1 flex-1 rounded-full",
                    index === 0 ? "bg-white/90" : "bg-white/40"
                  )} 
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Info Panel - 45% height */}
        <div className="relative h-[45%] w-full bg-surface p-4 flex flex-col justify-between">
            <div className="space-y-3">
                <div className="flex justify-between items-start">
                     <div className="flex-1">
                        <h2 className="text-2xl font-bold text-text-primary font-primary leading-tight">{therapist.name}</h2>
                        <p className="text-sm text-text-muted mt-1 font-secondary">
                            {therapist.title}
                            {therapist.years_experience && (
                                <>
                                    <span className="mx-1">•</span>
                                    {therapist.years_experience}
                                </>
                            )}
                        </p>
                     </div>
                     <span className="text-xl font-bold text-text-primary font-secondary ml-2">
                       {therapist.rate.replace('/session', '')}<span className="text-sm font-medium text-text-muted">/hr</span>
                     </span>
                </div>
                
                {/* Quote - max 80 characters for optimal mobile display */}
                <p className="text-base italic text-text-secondary border-l-2 border-l-[hsl(var(--jovial-jade))] pl-3 font-secondary leading-relaxed">
                    {therapist.quote.length > 80 ? `${therapist.quote.substring(0, 77)}...` : therapist.quote}
                </p>
                
                {/* Credential Badges & Testimonials */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <BadgeCheck className="h-4 w-4 text-[hsl(var(--jovial-jade))]" />
                            <span className="font-secondary text-xs text-text-secondary">BACP</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <BadgeCheck className="h-4 w-4 text-[hsl(var(--jovial-jade))]" />
                            <span className="font-secondary text-xs text-text-secondary">Accredited</span>
                        </div>
                    </div>
                    {/* Testimonials count instead of star rating */}
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onShowDetails(therapist);
                        }}
                        className="text-xs text-text-secondary hover:text-text-primary transition-colors font-secondary underline"
                    >
                        View 24 testimonials
                    </button>
                </div>
            </div>
            
            {/* View Profile Button */}
            <div className="text-center">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowDetails(therapist);
                  }}
                  className="w-10 h-10 rounded-full bg-surface-accent flex items-center justify-center mx-auto hover:bg-[hsl(var(--surface-accent)/0.8)] transition-colors"
                  aria-label="View full profile"
                >
                    <ChevronDown className="w-5 h-5 text-[hsl(var(--garden-green))]" />
                </button>
            </div>
        </div>
    </article>
  );
}
