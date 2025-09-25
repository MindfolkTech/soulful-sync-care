import * as React from "react";
import { Play, Check, ChevronLeft, ChevronRight, BadgeCheck, Shield } from "lucide-react";
import { TherapistData } from "@/components/molecules/therapist-card";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "@/components/discovery/VideoPlayer";

interface DesktopTherapistCardProps {
  therapist: TherapistData;
  onShowVideo: (therapist: TherapistData) => void;
}

const MediaCarousel = ({ therapist, onShowVideo }: DesktopTherapistCardProps) => {
    // Sort media to prioritize videos first
    const sortedMedia = React.useMemo(() => {
        // Make a copy to avoid mutation
        const mediaItems = [...therapist.media];
        
        // If there are both videos and images, make sure videos come first
        const hasVideo = mediaItems.some(item => item.type === 'video');
        const hasImages = mediaItems.some(item => item.type === 'image');
        
        if (hasVideo && hasImages) {
            return mediaItems.sort((a, b) => {
                if (a.type === 'video' && b.type !== 'video') return -1;
                if (a.type !== 'video' && b.type === 'video') return 1;
                return 0;
            });
        }
        
        return mediaItems;
    }, [therapist.media]);
    
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const currentMedia = sortedMedia[currentIndex];

    const handlePrevious = (e?: React.MouseEvent) => {
        e?.stopPropagation(); // Prevent triggering container click
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? sortedMedia.length - 1 : prevIndex - 1));
    };

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation(); // Prevent triggering container click
        setCurrentIndex((prevIndex) => (prevIndex === sortedMedia.length - 1 ? 0 : prevIndex + 1));
    };
    
    // Handle click on the media container
    const handleMediaClick = () => {
        if (currentMedia.type === 'video') {
            onShowVideo(therapist);
        }
    };

    return (
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
            {/* Media Background */}
            <div className="absolute inset-0 bg-[#2F353A] z-0"></div>
            
            {/* Media Content */}
            <div
                className="relative z-10 h-full w-full cursor-pointer"
                onClick={handleMediaClick}
                aria-label={currentMedia.type === 'video' ? 'Click to play video' : 'Therapist profile image'}
            >
                {currentMedia.type === 'image' ? (
                    <img
                        src={currentMedia.url}
                        alt={`${therapist.name} profile`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <VideoPlayer
                        videoUrl={currentMedia.url}
                        fallbackImageUrl={currentMedia.poster || therapist.media.find(m => m.type === 'image')?.url || '/images/placeholder.svg'}
                        therapistName={therapist.name}
                        showControls={false}
                        className="w-full h-full"
                    />
                )}
            </div>
            
            {/* The VideoPlayer component handles its own play button overlay */}
            {currentMedia.type === 'video' && (
                <div 
                    className="absolute inset-0 cursor-pointer z-10" 
                    onClick={handleMediaClick}
                    aria-label="Click to play full video"
                >
                    {/* Transparent overlay to capture clicks without affecting visuals */}
                </div>
            )}

            {/* Navigation Arrows - Always visible on desktop, show on hover for mobile */}
            {sortedMedia.length > 1 && (
                <>
                    {/* Left Arrow */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevious}
                        className="absolute top-1/2 -translate-y-1/2 left-2 bg-white/90 hover:bg-white rounded-full shadow-md z-50 w-10 h-10"
                        aria-label="Previous media"
                    >
                        <ChevronLeft className="h-5 w-5 text-[#2F353A]" />
                    </Button>
                    
                    {/* Right Arrow */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNext}
                        className="absolute top-1/2 -translate-y-1/2 right-2 bg-white/90 hover:bg-white rounded-full shadow-md z-50 w-10 h-10"
                        aria-label="Next media"
                    >
                        <ChevronRight className="h-5 w-5 text-[#2F353A]" />
                    </Button>
                </>
            )}

            {/* Pagination Dots - Enhanced to match design */}
            {sortedMedia.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                    {sortedMedia.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                "h-2 w-2 rounded-full transition-all", 
                                currentIndex === index 
                                  ? "bg-[hsl(var(--garden-green))]" 
                                  : "bg-white opacity-50 hover:opacity-70"
                            )}
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(index);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setCurrentIndex(index);
                                }
                            }}
                            aria-label={`Go to media ${index + 1} of ${sortedMedia.length}`}
                            aria-current={currentIndex === index}
                        />
                    ))}
                </div>
            )}
            
            {/* Media Type Indicator for Screen Readers */}
            <div className="sr-only" aria-live="polite">
                {currentMedia.type === 'video' 
                    ? `Video ${currentIndex + 1} of ${sortedMedia.length}. Click to play.` 
                    : `Image ${currentIndex + 1} of ${sortedMedia.length}.`
                }
            </div>
        </div>
    );
};

const Credentials = () => (
    <div className="space-y-2 pt-2">
        <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-[hsl(var(--jovial-jade))]" />
            <span className="font-semibold">Accredited Therapist</span>
        </div>
        <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-[hsl(var(--jovial-jade))]" />
            <span className="font-semibold">BACP Member</span>
        </div>
    </div>
);

const InfoSection = ({ title, text }: { title: string; text: string }) => (
    <div>
        <h4 className="font-bold text-lg text-[hsl(var(--text-primary))]">{title}</h4>
        <p className="text-sm mt-1">{text}</p>
    </div>
);

const TagGroup = ({ title, tags, category }: { title: string; tags: string[]; category: 'specialty' | 'modality' | 'personality' | 'language' | 'misc' }) => (
    <div>
        <h4 className="font-bold text-lg text-[hsl(var(--text-primary))]">{title}</h4>
        <div className="flex flex-wrap gap-2 mt-1">
            {tags.map(tag => <Tag key={tag} category={category} size="sm" shape="rounded">{tag}</Tag>)}
        </div>
    </div>
);


export function DesktopTherapistCard({ therapist, onShowVideo }: DesktopTherapistCardProps) {
  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl border border-[hsl(var(--border))] w-full">
      <div className="grid grid-cols-2 gap-10">
        {/* Left Column */}
        <div className="space-y-4">
          <MediaCarousel therapist={therapist} onShowVideo={onShowVideo} />
          
          <h2 className="text-4xl pt-4 font-primary">{therapist.name}</h2>
          
          <p className="text-lg -mt-2 text-[hsl(var(--text-muted))]">
            {therapist.title} • {therapist.years_experience}
          </p>
          
          <p className="text-2xl font-bold text-[hsl(var(--text-primary))]">
            {therapist.rate}
          </p>
          
          <div className="mt-2">
            <div className="flex flex-wrap gap-2">
              {therapist.languages.map((language) => (
                <Tag key={language} category="misc" size="sm" shape="rounded">
                  {language}
                </Tag>
              ))}
            </div>
          </div>
          
          <Credentials />
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          <InfoSection 
            title="About me:" 
            text={therapist.quote || 'I help clients navigate anxiety, depression, and trauma using an integrative approach that combines evidence-based techniques with mindfulness practices. My therapy style is warm and collaborative.'} 
          />
          
          <TagGroup 
            title="Specialities:" 
            tags={therapist.specialties} 
            category="specialty" 
          />
          
          <TagGroup 
            title="Modalities:" 
            tags={therapist.modalities || []} 
            category="modality" 
          />
          
          <TagGroup 
            title="Personality:" 
            tags={therapist.personality} 
            category="personality" 
          />
          
          {/* Communication Style tags - using personality tags if available */}
          <TagGroup 
            title="Communication Style:" 
            tags={therapist.personality.filter(tag => 
              tag.toLowerCase().includes('direct') || 
              tag.toLowerCase().includes('supportive') || 
              tag.toLowerCase().includes('collaborative') || 
              tag.toLowerCase().includes('warm')
            ).length > 0 ? 
              therapist.personality.filter(tag => 
                tag.toLowerCase().includes('direct') || 
                tag.toLowerCase().includes('supportive') || 
                tag.toLowerCase().includes('collaborative') || 
                tag.toLowerCase().includes('warm')
              ) : 
              ['Direct', 'Supportive']} 
            category="personality" 
          />
        </div>
      </div>
    </div>
  );
}
