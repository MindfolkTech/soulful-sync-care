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
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden group bg-surface-accent">
            {/* Tag Overlays */}
            <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-2">
                {tags.slice(0, 2).map(tag => (
                    <Tag key={tag.label} category={tag.category} shape="pill" className="bg-black/50 text-white border-none">
                        {tag.label}
                    </Tag>
                ))}
            </div>

            <div 
                className="w-full h-full"
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
             {media.length > 1 && (
                <>
                    <Button variant="ghost" size="icon" onClick={handlePrevious} className="absolute top-1/2 -translate-y-1/2 left-2 bg-surface/50 hover:bg-surface/80 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100"><ChevronLeft className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon" onClick={handleNext} className="absolute top-1/2 -translate-y-1/2 right-2 bg-surface/50 hover:bg-surface/80 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100"><ChevronRight className="h-5 w-5" /></Button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {media.map((_, index) => <div key={index} className={`h-1.5 w-1.5 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`} />)}
                    </div>
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
        className={cn("relative w-full h-full bg-surface rounded-2xl shadow-lg border border-border overflow-hidden flex flex-col cursor-pointer", className)}
        onClick={() => onShowDetails(therapist)}
    >
        <MediaCarousel 
            media={therapist.media}
            onShowVideo={() => onShowVideo?.(therapist)}
            therapistName={therapist.name}
            tags={[
                ...therapist.personality.slice(0,1).map(p => ({ label: p, category: 'personality' as const })),
                // Assuming communication style is part of personality for now
                ...therapist.personality.slice(1,2).map(p => ({ label: p, category: 'personality' as const }))
            ]}
        />
        
        <div className="relative flex-1 flex flex-col p-3 space-y-2 overflow-hidden">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <h2 className="font-primary text-xl font-bold text-text-primary leading-tight">{therapist.name}</h2>
                </div>
                <p className="font-secondary text-base font-bold text-text-primary">{therapist.rate}</p>
            </div>

            <div className={cn("space-y-2 transition-all duration-300", isExpanded ? 'max-h-full' : 'max-h-[50px] overflow-hidden')}>
                <div className="flex flex-wrap gap-2">
                    {therapist.personality.slice(0, 3).map(p => <Tag key={p} category="personality" shape="rounded" size="sm">{p}</Tag>)}
                </div>
            </div>

            {/* Fade and Expand Button */}
            <div 
                className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-surface to-transparent"
            />
            <button
                onClick={(e) => { e.stopPropagation(); onShowDetails(therapist); }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
            >
                <ChevronDown className="h-5 w-5 text-text-muted" />
            </button>
        </div>
    </article>
  );
}
