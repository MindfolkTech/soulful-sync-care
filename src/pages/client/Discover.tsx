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
import { findMatches, ClientAssessment, TherapistProfile, MatchResult } from "@/lib/matching";
import { supabase } from "@/integrations/supabase/client";

// Helper function to convert Supabase therapist profile to TherapistProfile format
function convertSupabaseToTherapistProfile(supabaseProfile: any): TherapistProfile {
  return {
    id: supabaseProfile.id,
    personality_tags: supabaseProfile.personality_tags || [],
    languages: supabaseProfile.languages || [],
    identity_tags: supabaseProfile.identity_tags || [],
    specialties: supabaseProfile.specialties || [],
    modalities: supabaseProfile.modalities || [],
    gender_identity: supabaseProfile.gender_identity || '',
    session_rates: typeof supabaseProfile.session_rates === 'object' 
      ? supabaseProfile.session_rates 
      : { "60min": 100 },
    years_experience: supabaseProfile.years_experience || `${supabaseProfile.experience_years || 0}+ years`,
    availability: typeof supabaseProfile.availability === 'object'
      ? supabaseProfile.availability
      : {},
    age_group: supabaseProfile.age_group || '',
    cultural_background: supabaseProfile.cultural_background || [],
    is_verified: supabaseProfile.verified === true,
    is_active: supabaseProfile.is_active !== false,
    
    // UI fields for backward compatibility
    title: supabaseProfile.tagline || "Licensed Therapist",
    bio: supabaseProfile.bio,
    location: `${supabaseProfile.location_city || 'London'}, ${supabaseProfile.location_country || 'UK'}`,
  };
}

// Helper function to convert Supabase assessment to ClientAssessment format  
function convertSupabaseToClientAssessment(supabaseAssessment: any): ClientAssessment {
  return {
    communication_preferences: supabaseAssessment.communication_preferences || [],
    language_preferences: supabaseAssessment.language_preferences || [],
    identity_preferences: supabaseAssessment.identity_preferences || [],
    therapy_goals: supabaseAssessment.therapy_goals || [],
    therapy_modalities: supabaseAssessment.therapy_modalities || [],
    budget_range: supabaseAssessment.budget_range || [0, 200],
    age_group: supabaseAssessment.age_group || "25–34",
    preferred_times: supabaseAssessment.preferred_times || [],
    experience_preference: supabaseAssessment.experience_preference || "no preference",
    cultural_identity: supabaseAssessment.cultural_considerations || [],
    therapist_gender_preference: supabaseAssessment.gender_preferences?.[0],
    prefers_similar_age: false,
    prefers_cultural_background_match: false,
  };
}

// Convert match result to TherapistData for UI display
function convertTherapistProfile(profile: TherapistProfile, matchResult: MatchResult, supabaseProfile: any): TherapistData {
  return {
    id: profile.id,
    name: supabaseProfile.name || `Dr. ${profile.id}`,
    title: profile.title || "Licensed Therapist",
    specialties: profile.specialties,
    personality: profile.personality_tags,
    languages: profile.languages,
    rate: `£${profile.session_rates?.["60min"] || 100}/session`,
    rating: 4.8 + Math.random() * 0.2,
    quote: profile.bio?.substring(0, 120) + "..." || "I believe in creating a safe space where you can explore your authentic self.",
    image: supabaseProfile.avatar_url || "/images/therapist-white-female-40s.png",
    video_url: undefined, // Add video_url field if available in future
    location: profile.location || "London, UK",
    compatibility_score: Math.round(matchResult.compatibility_score)
  };
}

export default function Discover() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [viewedTherapists, setViewedTherapists] = React.useState<Set<string>>(new Set());
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [videoOpen, setVideoOpen] = React.useState(false);
  const [selectedTherapist, setSelectedTherapist] = React.useState<TherapistData | null>(null);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [matchedTherapists, setMatchedTherapists] = React.useState<TherapistData[]>([]);
  
  const { announce, ariaLiveProps } = useAriaLive();

  // Load assessment data and run matching algorithm
  React.useEffect(() => {
    const loadTherapistData = async () => {
      try {
        // Fetch verified therapist profiles from Supabase
        const { data: supabaseProfiles, error: profilesError } = await supabase
          .from('therapist_profiles')
          .select('*')
          .eq('verified', true)
          .eq('accepts_new_clients', true)
          .eq('is_active', true);

        if (profilesError) {
          console.error('Error fetching therapist profiles:', profilesError);
          return;
        }

        // Fetch mock assessment data from Supabase
        const { data: supabaseAssessment, error: assessmentError } = await supabase
          .from('client_assessments')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (assessmentError) {
          console.error('Error fetching assessment:', assessmentError);
        }

        // Convert Supabase data to matching algorithm format
        const therapistProfiles = (supabaseProfiles || []).map(convertSupabaseToTherapistProfile);
        
        if (supabaseAssessment && therapistProfiles.length > 0) {
          // Use real assessment data
          const assessment = convertSupabaseToClientAssessment(supabaseAssessment);
          const matches = findMatches(assessment, therapistProfiles);
          const therapistData = matches.map(match => {
            const supabaseProfile = supabaseProfiles.find(p => p.id === match.therapist_id);
            const profile = therapistProfiles.find(p => p.id === match.therapist_id);
            return convertTherapistProfile(profile!, match, supabaseProfile);
          });
          setMatchedTherapists(therapistData);
        } else if (therapistProfiles.length > 0) {
          // Show all therapists without matching when no assessment data
          const therapistData = therapistProfiles.map(profile => {
            const supabaseProfile = supabaseProfiles.find(p => p.id === profile.id);
            const mockMatchResult: MatchResult = {
              therapist_id: profile.id,
              compatibility_score: 80,
              breakdown: {
                personality_compatibility: 80,
                identity_affirming: 80,
                specialty_match: 80,
                modality_preferences: 80,
                availability_fit: 80
              },
              hard_filter_passed: true,
              conditional_filters_passed: true
            };
            return convertTherapistProfile(profile, mockMatchResult, supabaseProfile);
          });
          setMatchedTherapists(therapistData);
        }
      } catch (error) {
        console.error('Error loading therapist data:', error);
      }
    };

    loadTherapistData();
  }, []);

  const availableTherapists = matchedTherapists.filter(t => !viewedTherapists.has(t.id));
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

  const handleCardKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (!currentTherapist) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        handlePass(currentTherapist);
        break;
      case 'ArrowRight':
        e.preventDefault();
        handleSave(currentTherapist);
        break;
      case 'Enter':
        e.preventDefault();
        if (currentTherapist.video_url) {
          handleShowVideo(currentTherapist);
        } else {
          handleShowDetails(currentTherapist);
        }
        break;
      case ' ':
        e.preventDefault();
        if (currentTherapist.video_url) {
          handleShowVideo(currentTherapist);
        } else {
          handleShowDetails(currentTherapist);
        }
        break;
    }
  }, [currentTherapist, handlePass, handleSave, handleShowVideo, handleShowDetails]);

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
      {/* Live region for announcements */}
      <div aria-live="polite" className="sr-only" {...ariaLiveProps} />
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
              <span className="text-[hsl(var(--on-dark))] font-primary font-bold text-lg">M</span>
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
                      onKeyDown={handleCardKeyDown}
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
