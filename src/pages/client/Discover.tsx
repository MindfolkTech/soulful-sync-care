import * as React from "react";
import { Filter, RotateCcw, ChevronLeft, ChevronRight, X, Heart } from "lucide-react";
import { BottomNav } from "@/components/ui/bottom-nav";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
} from "@/components/ui/dialog";
import { TherapistCard, TherapistData } from "@/components/molecules/therapist-card";
import { TherapistDetailsSheet } from "@/components/discovery/therapist-details-sheet";
import { FiltersDialog } from "@/components/discovery/filters-dialog";
import { VideoOverlay } from "@/components/discovery/video-overlay";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useAriaLive } from "@/hooks/use-aria-live";
import { findMatches, ClientAssessment, TherapistProfile, MatchResult } from "@/lib/matching";
import { supabase } from "@/integrations/supabase/client";
import { DesktopTherapistCard } from "@/components/discovery/desktop-therapist-card";
import { DecisionButtons } from "@/components/discovery/decision-buttons";
import { ReadyToConnectModal } from "@/components/discovery/ready-to-connect-modal";
import ErrorBoundary from "@/components/util/error-boundary";

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
  const media = [];
  if (supabaseProfile.avatar_url) {
    media.push({ type: 'image', url: supabaseProfile.avatar_url });
  } else {
    // Fallback image
    media.push({ type: 'image', url: '/images/therapist-white-female-40s.png' });
  }
  
  // Add a mock video and a second image for demonstration purposes
  media.push({ type: 'video', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', poster: media[0].url });
  media.push({ type: 'image', url: '/images/therapist-asian-male-40s.png' });

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
    media: media,
    location: profile.location || "London, UK",
    compatibility_score: Math.round(matchResult.compatibility_score),
    years_experience: profile.years_experience,
    modalities: profile.modalities,
  };
}

export default function Discover() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [viewedTherapists, setViewedTherapists] = React.useState<Set<string>>(new Set());
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [videoOpen, setVideoOpen] = React.useState(false);
  const [connectModalOpen, setConnectModalOpen] = React.useState(false);
  const [selectedTherapist, setSelectedTherapist] = React.useState<TherapistData | null>(null);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [matchedTherapists, setMatchedTherapists] = React.useState<TherapistData[]>([]);
  
  const { announce, ariaLiveProps } = useAriaLive();

  // Load assessment data and run matching algorithm
  React.useEffect(() => {
    const loadTherapistData = async () => {
      try {
        // Fetch verified therapist profiles from Supabase (using secure public view)
        const { data: supabaseProfiles, error: profilesError } = await supabase
          .from('therapist_profiles_public')
          .select('*');

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
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < availableTherapists.length - 1;

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
    handleNext();
  }, [announce, handleNext]);

  const handleSave = React.useCallback((therapist: TherapistData) => {
    setFavorites(prev => new Set([...prev, therapist.id]));
    setViewedTherapists(prev => new Set([...prev, therapist.id]));
    setSelectedTherapist(therapist);
    setConnectModalOpen(true);
    announce(`Saved ${therapist.name} to favorites`);
  }, [announce]);

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
  
  const handleConnectModalClose = (open: boolean) => {
    setConnectModalOpen(open);
    if (!open) {
        handleNext();
    }
  }

  const swipeRef = React.useRef<HTMLDivElement>(null);

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
    <ErrorBoundary>
        <div className="h-screen bg-warm-white flex flex-col overflow-hidden">
            <header 
                role="banner" 
                aria-label="Mindfolk"
                className="bg-surface px-6 xl:px-8 flex justify-between items-center"
                style={{ height: '10vh' }}
            >
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-garden-green flex items-center justify-center">
                      <span className="text-on-dark font-primary font-bold text-lg">M</span>
                    </div>
                    <span className="font-primary font-bold text-xl text-text-primary">MindFolk</span>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => setFiltersOpen(true)}
                  aria-label="Open filters"
                  className="bg-surface border-2 border-border text-text-secondary rounded-lg px-4 py-2.5 font-semibold hover:bg-surface-accent"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
            </header>

            <main 
                role="main" 
                className="flex-grow flex items-center justify-center relative"
                style={{ height: 'calc(100vh - 10vh - 10vh)' }}
            >
                <h1 id="discover-heading" className="sr-only">Discover therapists</h1>

                {/* Mobile: Swipeable Card View */}
                <div className="block md:hidden h-full p-4 flex flex-col items-center justify-center">
                  {currentTherapist ? (
                    <div className="w-full h-full flex flex-col gap-4">
                        <div className="flex-grow">
                            <TherapistCard
                                therapist={currentTherapist}
                                onPass={handlePass}
                                onSave={handleSave}
                                onShowDetails={handleShowDetails}
                                onShowVideo={handleShowVideo}
                            />
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <Button
                                size="icon"
                                onClick={() => handlePass(currentTherapist)}
                                className="h-16 w-16 rounded-full bg-[hsl(var(--btn-accent-bg))] text-[hsl(var(--btn-accent-text))] shadow-md"
                                aria-label="Pass"
                            >
                                <X className="h-7 w-7" />
                            </Button>
                            <Button
                                size="icon"
                                onClick={() => handleSave(currentTherapist)}
                                className="h-16 w-16 rounded-full bg-[hsl(var(--btn-primary-bg))] text-[hsl(var(--btn-primary-text))] shadow-md"
                                aria-label="Save to favorites"
                            >
                                <Heart className="h-7 w-7" />
                            </Button>
                        </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                      <p>No more matches.</p>
                      <Button onClick={handleResetFilters} variant="outline">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset & Browse All
                      </Button>
                    </div>
                  )}
                </div>

                {/* Tablet View */}
                <div className="hidden md:flex lg:hidden h-full w-full items-center justify-center relative p-8">
                    {currentTherapist ? (
                        <div className="relative w-full max-w-md">
                            <TherapistCard 
                                therapist={currentTherapist}
                                onPass={handlePass}
                                onSave={handleSave}
                                onShowDetails={handleShowDetails}
                                onShowVideo={handleShowVideo}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <p>No more matches.</p>
                        </div>
                    )}
                </div>

                {/* Desktop View */}
                <div className="hidden lg:flex h-full w-full items-center justify-center relative px-8 py-12">
                   {currentTherapist ? (
                    <div className="relative w-full max-w-5xl">
                        <DesktopTherapistCard 
                            therapist={currentTherapist} 
                            onShowVideo={handleShowVideo}
                        />
                        <DecisionButtons 
                            therapist={currentTherapist}
                            onPass={handlePass}
                            onSave={handleSave}
                        />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                      <p>No more matches.</p>
                      <Button onClick={handleResetFilters} variant="outline">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset & Browse All
                      </Button>
                    </div>
                  )}

                  {hasPrevious && (
                    <Button size="icon" variant="ghost" onClick={handlePrevious} className="absolute left-8 h-14 w-14 rounded-full bg-surface/80 hover:bg-surface border" aria-label="Previous therapist">
                      <ChevronLeft className="h-7 w-7" />
                    </Button>
                  )}

                  {hasNext && (
                    <Button size="icon" variant="ghost" onClick={handleNext} className="absolute right-8 h-14 w-14 rounded-full bg-surface/80 hover:bg-surface border" aria-label="Next therapist">
                      <ChevronRight className="h-7 w-7" />
                    </Button>
                  )}
                </div>
            </main>

            <BottomNav />

            {/* Modals and Sheets */}
            <TherapistDetailsSheet open={detailsOpen} onOpenChange={setDetailsOpen} therapist={selectedTherapist} onSave={handleSave} onReport={handleReport} />
            {selectedTherapist && videoOpen && (
              <VideoOverlay 
                  open={videoOpen} 
                  onOpenChange={setVideoOpen} 
                  videoUrl={selectedTherapist.media.find(m => m.type === 'video')?.url || ""} 
                  posterUrl={selectedTherapist.media.find(m => m.type === 'video')?.poster}
                  title={selectedTherapist.name} 
              />
            )}
            <ReadyToConnectModal open={connectModalOpen} onOpenChange={handleConnectModalClose} therapist={selectedTherapist} />
            <FiltersDialog open={filtersOpen} onOpenChange={setFiltersOpen} />
            
            <div {...ariaLiveProps} />
        </div>
    </ErrorBoundary>
  );
}
