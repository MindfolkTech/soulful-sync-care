import * as React from "react";
import { Play, Check, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
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
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-surface-accent z-0">
                <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="none" className="absolute top-0 left-0">
                    <circle cx="200" cy="150" r="120" fill="hsl(var(--garden-green) / 0.1)" />
                    <path d="M 50,150 Q 200,100 350,150" stroke="hsl(var(--garden-green) / 0.5)" fill="none" strokeWidth="2" />
                </svg>
            </div>
            
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
                <div className="absolute inset-0 bg-ink-slate/30 flex items-center justify-center">
                <div className="bg-ink-slate/60 rounded-full p-4">
                    <Play className="h-8 w-8 text-on-dark" />
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
                        className="absolute top-1/2 -translate-y-1/2 left-2 bg-surface/50 hover:bg-surface/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNext}
                        className="absolute top-1/2 -translate-y-1/2 right-2 bg-surface/50 hover:bg-surface/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronRight className="h-6 w-6" />
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
        <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-text-primary" />
            <span className="font-secondary text-sm text-text-primary">Accredited Therapist</span>
        </div>
        <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-text-primary" />
            <span className="font-secondary text-sm text-text-primary">BACP Member</span>
        </div>
    </div>
);

const InfoSection = ({ title, text }: { title: string; text: string }) => (
    <div>
        <h3 className="font-secondary font-semibold text-text-primary mb-2">{title}</h3>
        <p className="font-secondary text-text-secondary leading-relaxed">{text}</p>
    </div>
);

const TagGroup = ({ title, tags, category }: { title: string; tags: string[]; category: 'specialty' | 'modality' | 'personality' }) => (
    <div>
        <h3 className="font-secondary font-semibold text-text-primary mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {tags.map(tag => <Tag key={tag} category={category} size="sm" shape="rounded">{tag}</Tag>)}
        </div>
    </div>
);


export function DesktopTherapistCard({ therapist, onShowVideo }: DesktopTherapistCardProps) {
  return (
    <div className="bg-surface p-6 rounded-2xl shadow-xl border border-border grid grid-cols-2 gap-8">
      {/* Left Column */}
      <div className="flex flex-col space-y-3">
        <MediaCarousel therapist={therapist} onShowVideo={onShowVideo} />
        <div className="space-y-2">
            <h2 className="font-primary text-3xl font-bold text-text-primary">
              {therapist.name}
            </h2>
            <p className="font-secondary text-lg text-text-muted">
              {therapist.title}
            </p>
            <p className="font-secondary text-xl font-bold text-text-primary pt-1">
              {therapist.rate}
            </p>
        </div>
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
                {therapist.languages.map((language) => (
                    <Tag key={language} category="language" size="sm" shape="rounded">
                    {language}
                    </Tag>
                ))}
            </div>
            <Credentials />
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-3 pt-2">
        <InfoSection title="About me:" text={therapist.quote} />
        <TagGroup title="Specialities:" tags={therapist.specialties} category="specialty" />
        <TagGroup title="Modalities:" tags={therapist.modalities || []} category="modality" />
        <TagGroup title="Personality:" tags={therapist.personality} category="personality" />
        <TagGroup title="Communication Style:" tags={['Direct', 'Supportive']} category="personality" />
      </div>
    </div>
  );
}
