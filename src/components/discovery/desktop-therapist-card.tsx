import * as React from "react";
import { Play, Check, ChevronLeft, ChevronRight, BadgeCheck, Shield } from "lucide-react";
import { TherapistData } from "@/components/molecules/therapist-card";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";

interface DesktopTherapistCardProps {
  therapist: TherapistData;
  onShowVideo: (therapist: TherapistData) => void;
}

const MediaCarousel = ({ therapist, onShowVideo }: DesktopTherapistCardProps) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const currentMedia = therapist.media[currentIndex];

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? therapist.media.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === therapist.media.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
            {/* Media Background */}
            <div className="absolute inset-0 bg-[#2F353A] z-0"></div>
            
            <div
            className="relative z-10 h-full w-full cursor-pointer"
            onClick={() => currentMedia.type === 'video' && onShowVideo(therapist)}
            >
            {currentMedia.type === 'image' ? (
                <img
                    src={currentMedia.url}
                    alt={`${therapist.name} profile`}
                    className="w-full h-full object-contain object-bottom"
                />
            ) : (
                <div className="w-full h-full bg-black">
                    <video
                        src={currentMedia.url}
                        poster={currentMedia.poster}
                        className="w-full h-full object-contain"
                        preload="metadata"
                    />
                </div>
            )}
            
            {currentMedia.type === 'video' && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-black/60 rounded-full p-4">
                        <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                </div>
            )}
            </div>

            {/* Navigation Arrows */}
            {therapist.media.length > 1 && (
                <>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevious}
                        className="absolute top-1/2 -translate-y-1/2 left-2 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronLeft className="h-6 w-6 text-[#2F353A]" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNext}
                        className="absolute top-1/2 -translate-y-1/2 right-2 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronRight className="h-6 w-6 text-[#2F353A]" />
                    </Button>
                </>
            )}

            {/* Pagination Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {therapist.media.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
                    />
                ))}
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
