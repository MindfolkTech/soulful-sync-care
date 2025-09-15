import * as React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/ui/bottom-nav";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TherapistCard, TherapistData } from "@/components/molecules/therapist-card";
import { TherapistDetailsSheet } from "@/components/discovery/therapist-details-sheet";
import { FiltersDialog } from "@/components/discovery/filters-dialog";
import { VideoOverlay } from "@/components/discovery/video-overlay";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useSwipeGestures } from "@/hooks/use-swipe-gestures";
import { useAriaLive } from "@/hooks/use-aria-live";

const mockTherapists: TherapistData[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Trauma"],
    personality: ["Empathetic", "Structured"],
    languages: ["English", "Mandarin"],
    rate: "£80/session",
    rating: 4.9,
    quote: "I believe in creating a safe space where you can explore your authentic self.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    location: "London, UK"
  },
  {
    id: "2", 
    name: "Michael Thompson",
    title: "Counselling Psychologist",
    specialties: ["Relationships", "Work Stress"],
    personality: ["Flexible", "Calm"],
    languages: ["English", "French"],
    rate: "£70/session", 
    rating: 4.8,
    quote: "Together, we'll find practical solutions that work for your unique situation.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    location: "Manchester, UK"
  },
  {
    id: "3",
    name: "Dr. Priya Patel",
    title: "Clinical Psychologist",
    specialties: ["Identity", "Cultural Issues", "Anxiety"],
    personality: ["Understanding", "Direct"],
    languages: ["English", "Hindi", "Gujarati"],
    rate: "£85/session",
    rating: 4.9,
    quote: "Your cultural identity is a strength in your healing journey.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    location: "Birmingham, UK"
  }
];

export default function Discover() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [viewedTherapists, setViewedTherapists] = React.useState<Set<string>>(new Set());
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [videoOpen, setVideoOpen] = React.useState(false);
  const [selectedTherapist, setSelectedTherapist] = React.useState<TherapistData | null>(null);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  
  const { announce, ariaLiveProps } = useAriaLive();

  const availableTherapists = mockTherapists.filter(t => !viewedTherapists.has(t.id));
  const currentTherapist = availableTherapists[currentIndex];

  const handleNext = React.useCallback(() => {
    if (currentIndex < availableTherapists.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, availableTherapists.length]);

  const handlePrevious = React.useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const handlePass = React.useCallback((therapist: TherapistData) => {
    setViewedTherapists(prev => new Set([...prev, therapist.id]));
    announce(`Removed ${therapist.name}`);
    
    // Move to next card
    if (currentIndex >= availableTherapists.length - 1) {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  }, [currentIndex, availableTherapists.length, announce]);

  const handleSave = React.useCallback((therapist: TherapistData) => {
    setFavorites(prev => new Set([...prev, therapist.id]));
    setViewedTherapists(prev => new Set([...prev, therapist.id]));
    announce(`Saved ${therapist.name} to favorites`);
    
    // Move to next card
    if (currentIndex >= availableTherapists.length - 1) {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  }, [currentIndex, availableTherapists.length, announce]);

  const handleShowDetails = React.useCallback((therapist: TherapistData) => {
    setSelectedTherapist(therapist);
    setDetailsOpen(true);
  }, []);

  const handleShowVideo = React.useCallback((therapist: TherapistData) => {
    setSelectedTherapist(therapist);
    setVideoOpen(true);
  }, []);

  const handleReport = React.useCallback((therapist: TherapistData) => {
    console.log("Report therapist:", therapist.name);
    announce(`Reported ${therapist.name}`);
  }, [announce]);

  const swipeRef = useSwipeGestures({
    onSwipeLeft: () => currentTherapist && handlePass(currentTherapist),
    onSwipeRight: () => currentTherapist && handleSave(currentTherapist),
  }) as React.MutableRefObject<HTMLDivElement>;

  useKeyboardNavigation({
    therapists: availableTherapists,
    currentIndex,
    onNext: handleNext,
    onPrevious: handlePrevious,
    onPass: handlePass,
    onSave: handleSave,
    onShowDetails: currentTherapist?.video_url ? handleShowVideo : handleShowDetails,
    onOpenFilters: () => setFiltersOpen(true),
  });

  const handleResetFilters = () => {
    setViewedTherapists(new Set());
    setCurrentIndex(0);
    announce("Filters reset, showing all therapists");
  };

  return (
    <div className="h-screen bg-warm-white flex flex-col overflow-hidden">
      {/* Header - 8% height */}
      <header 
        role="banner" 
        aria-label="Mindfolk"
        className="sticky top-0 z-50 w-full border-b bg-surface/95 backdrop-blur"
        style={{ height: "8vh" }}
      >
        <div className="flex h-full items-center justify-between px-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-garden-green flex items-center justify-center">
              <span className="text-white font-primary font-bold text-lg">M</span>
            </div>
            <span className="font-primary font-bold text-xl text-text-primary">MindFolk</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setFiltersOpen(true)}
            aria-label="Open filters"
            aria-pressed={filtersOpen}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </header>

      {/* Main Content - 84% height */}
      <main 
        role="main" 
        aria-labelledby="discover-heading"
        className="flex-1 relative"
        style={{ height: "84vh" }}
      >
        <h1 id="discover-heading" className="sr-only">Discover therapists</h1>

        {/* Mobile: Single Card View */}
        <div className="block md:hidden h-full p-4">
          {currentTherapist ? (
            <section role="region" aria-label="Therapist card deck">
              <ul 
                role="listbox" 
                aria-orientation="horizontal" 
                aria-live="polite"
                className="h-full"
              >
                <li 
                  role="option" 
                  aria-selected="true"
                  className="h-full"
                >
                  <div ref={swipeRef} className="h-full overflow-hidden">
                    <TherapistCard
                      therapist={currentTherapist}
                      onPass={handlePass}
                      onSave={handleSave}
                      onShowDetails={handleShowDetails}
                      onShowVideo={handleShowVideo}
                      className="h-full"
                    />
                  </div>
                </li>
              </ul>
            </section>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <p className="font-secondary text-text-secondary text-lg">
                No more matches — Adjust filters or browse all
              </p>
              <Button 
                onClick={handleResetFilters}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset & Browse All
              </Button>
            </div>
          )}
        </div>

        {/* Tablet/Desktop: Split View */}
        <div className="hidden md:grid md:grid-cols-[60%_40%] lg:grid-cols-[40%_60%] h-full">
          {/* List Section */}
          <section 
            role="region" 
            aria-label="Therapist list" 
            aria-describedby="list-help"
            className="border-r border-border overflow-y-auto p-4"
          >
            <p id="list-help" className="sr-only">
              Use arrow keys to move; H to save, X to pass, Enter for details.
            </p>
            
            {availableTherapists.length > 0 ? (
              <ul role="listbox" aria-orientation="vertical" className="space-y-4">
                {availableTherapists.map((therapist, index) => (
                  <li 
                    key={therapist.id}
                    role="option" 
                    aria-selected={index === currentIndex}
                    className={`${index === currentIndex ? 'ring-2 ring-garden-green' : ''}`}
                  >
                    <div 
                      className={`cursor-pointer ${index === currentIndex ? 'ring-2 ring-garden-green' : ''}`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <TherapistCard
                        therapist={therapist}
                        onPass={handlePass}
                        onSave={handleSave}
                        onShowDetails={handleShowDetails}
                        onShowVideo={handleShowVideo}
                        showDetailsButton={false}
                        showActionButtons={false}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <p className="font-secondary text-text-secondary">
                  No more matches — Adjust filters or browse all
                </p>
                <Button 
                  onClick={handleResetFilters}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset & Browse All
                </Button>
              </div>
            )}
          </section>

          {/* Detail Section */}
          <aside 
            role="region" 
            aria-label="Therapist detail"
            className="p-6 overflow-y-auto"
          >
            {currentTherapist ? (
              <div className="space-y-6">
                {/* Video Section */}
                <div className="aspect-video rounded-lg overflow-hidden bg-surface-accent">
                  {currentTherapist.video_url ? (
                    <video
                      className="w-full h-full object-cover"
                      poster={currentTherapist.image}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <source src={currentTherapist.video_url} type="video/mp4" />
                      <track kind="captions" src="" label="English captions" default />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={currentTherapist.image}
                      alt={`${currentTherapist.name} profile`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-primary text-2xl font-semibold text-text-primary">
                        {currentTherapist.name}
                      </h2>
                      <p className="text-text-secondary font-secondary">{currentTherapist.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-text-primary">{currentTherapist.rate}</p>
                      <p className="text-sm text-text-secondary">per session</p>
                    </div>
                  </div>

                  <blockquote className="font-secondary text-text-secondary italic border-l-4 border-surface-accent pl-4">
                    "{currentTherapist.quote}"
                  </blockquote>

                  {/* Sticky Action Row */}
                  <div className="sticky bottom-0 bg-surface border-t border-border p-4 -mx-6 flex gap-3">
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        console.log("Book chemistry call for", currentTherapist.name);
                      }}
                    >
                      Book Chemistry Call
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleSave(currentTherapist)}
                      className="flex-1"
                    >
                      Save to Favorites
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <p className="font-secondary text-text-secondary">
                  Select a therapist from the list to view details
                </p>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* Bottom Navigation - 8% height */}
      <BottomNav />

      {/* Mobile Details Sheet */}
      <TherapistDetailsSheet
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        therapist={selectedTherapist}
        onSave={handleSave}
        onReport={handleReport}
      />

      {/* Video Overlay */}
      {selectedTherapist?.video_url && (
        <VideoOverlay
          open={videoOpen}
          onOpenChange={setVideoOpen}
          videoUrl={selectedTherapist.video_url}
          posterUrl={selectedTherapist.image}
          title={selectedTherapist.name}
        />
      )}

      {/* Filters Dialog */}
      <FiltersDialog
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
      />

      {/* ARIA Live Region */}
      <div {...ariaLiveProps} />
    </div>
  );
}