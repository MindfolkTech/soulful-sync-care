import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Heart, X, ChevronLeft, ChevronRight, SlidersHorizontal, Loader2, RotateCcw, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/ui/bottom-nav";
import { 
  Dialog,
} from "@/components/ui/dialog";
import { TherapistCard, TherapistData } from "@/components/discovery/therapist-card";
import { TherapistDetailsSheet } from "@/components/discovery/therapist-details-sheet";
import { FiltersDialog, FilterPreferences } from "@/components/discovery/filters-dialog-v2";
import { VideoOverlay } from "@/components/discovery/video-overlay";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useAriaLive } from "@/hooks/use-aria-live";
import { findMatches, ClientAssessment, TherapistProfile, MatchResult } from "@/lib/matching";
import { supabase } from "@/integrations/supabase/client";
import { useImpersonation } from "@/contexts/impersonation-context";
import { useAuth } from "@/contexts/AuthContext";
import { DesktopTherapistCard } from "@/components/discovery/desktop-therapist-card";
import { DecisionButtons } from "@/components/discovery/decision-buttons";
import { ReadyToConnectModal } from "@/components/discovery/ready-to-connect-modal";
import ErrorBoundary from "@/components/shared/error-boundary";

// Helper function to convert Supabase therapist profile to TherapistProfile format
function convertSupabaseToTherapistProfile(supabaseProfile: any): TherapistProfile {
  return {
    id: supabaseProfile.id,
    personality_tags: supabaseProfile.personality_tags || [],
    languages: supabaseProfile.languages || [],
    identity_tags: supabaseProfile.identity_tags || [],
    specialties: supabaseProfile.specialties || [],
    modalities: supabaseProfile.modalities || [],
    communication_style: supabaseProfile.communication_style || '',
    session_format: supabaseProfile.session_format || '',
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
    is_active: supabaseProfile.is_active !== false || supabaseProfile.is_active === undefined, // Default to active if not specified
    
    // UI fields for backward compatibility
    title: supabaseProfile.professional_title || supabaseProfile.title || "Licensed Therapist",
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
    cultural_identity: supabaseAssessment.cultural_identity || [],
    therapist_gender_preference: supabaseAssessment.gender_preferences?.[0],
    prefers_similar_age: supabaseAssessment.prefers_similar_age || false,
    prefers_cultural_background_match: supabaseAssessment.prefers_cultural_background_match || false,
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

  // Add video if available in the therapist profile
  if (supabaseProfile.video_url) {
    media.push({ type: 'video', url: supabaseProfile.video_url, poster: media[0].url });
  }

  // Parse communication style to extract key words
  const communicationStyleTags = [];
  if (supabaseProfile.communication_style) {
    const styleText = supabaseProfile.communication_style.toLowerCase();
    // Extract the main style type (before parentheses)
    const mainStyle = supabaseProfile.communication_style.split('(')[0].replace(/&/g, ',').split(',')[0].trim();
    if (mainStyle) {
      communicationStyleTags.push(mainStyle);
    }
  }

  return {
    id: profile.id,
    name: supabaseProfile.name || `Dr. ${profile.id}`,
    title: profile.title || "Licensed Therapist",
    specialties: profile.specialties,
    personality: profile.personality_tags,
    communication_style: communicationStyleTags,
    languages: profile.languages,
    rate: `£${profile.session_rates?.["60min"] || 100}/session`,
    rating: 4.8 + Math.random() * 0.2,
    quote: supabaseProfile.quote ||
      (profile.bio ?
        profile.bio.length > 80 ? `${profile.bio.substring(0, 77)}...` : profile.bio
        : "I believe in creating a safe space where you can explore your authentic self."),
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
  const [lastPassedTherapist, setLastPassedTherapist] = React.useState<TherapistData | null>(null);
  const [activeFilters, setActiveFilters] = React.useState<FilterPreferences>({
    specialties: [],
    modalities: [],
    budget_range: [20, 150],
    therapist_gender: "No preference",
    experience_level: "No preference",
    preferred_times: []
  });
  
  // Get current user (real user or impersonated user)
  const { user } = useAuth();
  const { isImpersonating, impersonatedUser } = useImpersonation();
  const { announce, ariaLiveProps } = useAriaLive();
  const { toast } = useToast();
  
  // Determine the current effective user ID
  const currentUserId = isImpersonating && impersonatedUser ? impersonatedUser.id : user?.id;

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

        // Fetch assessment data for the current user (real or impersonated)
        let supabaseAssessment = null;
        let assessmentError = null;
        
        if (currentUserId) {
          // Use the current user's specific assessment data
          const { data, error } = await supabase
            .from('client_assessments')
            .select('*')
            .eq('user_id', currentUserId)
            .maybeSingle();
          supabaseAssessment = data;
          assessmentError = error;
        } else {
          // Only fallback to any assessment if no user is available at all
          const { data, error } = await supabase
            .from('client_assessments')
            .select('*')
            .limit(1)
            .maybeSingle();
          supabaseAssessment = data;
          assessmentError = error;
        }

        if (assessmentError) {
          console.error('Error fetching assessment:', assessmentError);
        }

        // Convert Supabase data to matching algorithm format
        const therapistProfiles = (supabaseProfiles || []).map(convertSupabaseToTherapistProfile);
        
        if (supabaseAssessment && therapistProfiles.length > 0) {
          // Use real assessment data merged with active filters
          const assessment = convertSupabaseToClientAssessment(supabaseAssessment);
          
          // Merge filter preferences into assessment
          if (activeFilters.specialties.length > 0) {
            // Add filter specialties to therapy_goals for matching
            // This allows users to refine their search beyond initial assessment
            const existingGoals = assessment.therapy_goals || [];
            const combinedGoals = [...new Set([...existingGoals, ...activeFilters.specialties])];
            assessment.therapy_goals = combinedGoals;
          }
          if (activeFilters.modalities.length > 0) {
            assessment.therapy_modalities = activeFilters.modalities;
          }
          if (activeFilters.budget_range) {
            assessment.budget_range = activeFilters.budget_range;
          }
          if (activeFilters.therapist_gender !== "No preference") {
            // Map "Same gender as me" to client's own gender, or use the specific preference
            if (activeFilters.therapist_gender === "Same gender as me") {
              // Use client's gender from assessment if available
              assessment.therapist_gender_preference = supabaseAssessment.gender_identity || "no preference";
            } else {
              assessment.therapist_gender_preference = activeFilters.therapist_gender;
            }
          }
          if (activeFilters.preferred_times.length > 0) {
            assessment.preferred_times = activeFilters.preferred_times;
          }
          
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
  }, [currentUserId, activeFilters]); // Re-run when the effective user or filters change

  // Handler for applying filters
  const handleApplyFilters = (filters: FilterPreferences) => {
    setActiveFilters(filters);
    setCurrentIndex(0); // Reset to first therapist when filters change
    announce("Filters applied. Showing updated matches.");
  };

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
    // Store the passed therapist for potential undo
    setLastPassedTherapist(therapist);
    setViewedTherapists(prev => new Set([...prev, therapist.id]));
    announce(`Removed ${therapist.name}`);
    
    // Show toast with undo option
    toast({
      title: `Passed on ${therapist.name}`,
      description: "You can undo this action",
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleUndo()}
          className="gap-2"
        >
          <Undo2 className="h-4 w-4" />
          Undo
        </Button>
      ),
      duration: 5000, // 5 seconds to undo
    });
    
    handleNext();
  }, [announce, handleNext, toast]);
  
  const handleUndo = React.useCallback(() => {
    if (lastPassedTherapist) {
      // Remove from viewed therapists to show again
      setViewedTherapists(prev => {
        const newSet = new Set(prev);
        newSet.delete(lastPassedTherapist.id);
        return newSet;
      });
      
      // Reset to show the therapist again
      setCurrentIndex(0);
      
      // Clear the last passed therapist
      setLastPassedTherapist(null);
      
      announce(`Restored ${lastPassedTherapist.name}`);
      toast({
        title: `Restored ${lastPassedTherapist.name}`,
        description: "Therapist is back in your matches",
      });
    }
  }, [lastPassedTherapist, announce, toast]);

  const handleSave = React.useCallback(async (therapist: TherapistData) => {
    if (!user) {
      // Handle case when user is not authenticated
      announce("Please sign in to save favorites");
      return;
    }

    // Add to local state
    setFavorites(prev => new Set([...prev, therapist.id]));
    setViewedTherapists(prev => new Set([...prev, therapist.id]));
    setSelectedTherapist(therapist);
    setConnectModalOpen(true);
    
    try {
      // Actually save to the database
      const { data, error } = await supabase
        .from('favorites')
        .insert([
          { 
            user_id: currentUserId, 
            therapist_id: therapist.id 
          }
        ]);
      
      if (error) {
        console.error("Error saving favorite:", error);
        announce(`Error saving ${therapist.name} to favorites`);
      } else {
        announce(`Saved ${therapist.name} to favorites`);
      }
    } catch (error) {
      console.error("Error in saving favorite:", error);
      announce(`Error saving ${therapist.name} to favorites`);
    }
  }, [announce, user, currentUserId]);

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
        if (currentTherapist.media?.find(m => m.type === 'video')) {
          handleShowVideo(currentTherapist);
        } else {
          handleShowDetails(currentTherapist);
        }
        break;
      case ' ':
        e.preventDefault();
        if (currentTherapist.media?.find(m => m.type === 'video')) {
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
    onShowDetails: currentTherapist?.media?.find(m => m.type === 'video') ? handleShowVideo : handleShowDetails,
    onOpenFilters: () => setFiltersOpen(true),
  });

  const handleResetFilters = () => {
    setViewedTherapists(new Set());
    setCurrentIndex(0);
    announce("Filters reset, showing all therapists");
  };

  return (
    <ErrorBoundary>
        <div className="h-dvh bg-warm-white grid grid-rows-[auto_1fr] overflow-hidden">
            <header 
                role="banner" 
                aria-label="Mindfolk"
                className="bg-surface px-4 pt-4 pb-2 flex justify-between items-center"
            >
                <h1 className="text-2xl font-bold text-[hsl(var(--jovial-jade))] font-primary">MINDFOLK</h1>
                <Button 
                  variant="outline"
                  onClick={() => setFiltersOpen(true)}
                  aria-label="Open filters"
                  className="w-10 h-10 rounded-full bg-surface-accent flex items-center justify-center"
                >
                  <SlidersHorizontal className="w-5 h-5 text-[hsl(var(--garden-green))]" />
                </Button>
            </header>

            <main 
                role="main" 
                className="relative min-h-0"
            >
                <h2 id="discover-heading" className="sr-only">Discover therapists</h2>

                {/* Mobile: Full viewport card with dedicated action bar */}
                <div className="block md:hidden h-full grid grid-rows-[1fr_auto]">
                  {currentTherapist ? (
                    <>
                        {/* Main Card Area */}
                        <div className="p-2.5 pb-0 min-h-0">
                            <TherapistCard
                                therapist={currentTherapist}
                                onPass={handlePass}
                                onSave={handleSave}
                                onShowDetails={handleShowDetails}
                                onShowVideo={handleShowVideo}
                                className="w-full h-full"
                            />
                        </div>
                        
                        {/* Dedicated Action Bar */}
                        <div className="px-4 pt-4 pb-6 pb-[env(safe-area-inset-bottom)]">
                            <div className="flex justify-evenly items-center">
                                <Button
                                    size="icon"
                                    onClick={() => {
                                        setCurrentIndex(prev => prev > 0 ? prev - 1 : availableTherapists.length - 1);
                                    }}
                                    disabled={availableTherapists.length <= 1}
                                    className="w-14 h-14 rounded-full bg-surface shadow-md border border-border disabled:opacity-50"
                                    aria-label="Go back to previous therapist"
                                >
                                    <ChevronLeft className="h-6 w-6 text-text-muted" />
                                </Button>
                                <Button
                                    size="icon"
                                    onClick={() => handlePass(currentTherapist)}
                                    className="w-16 h-16 rounded-full bg-surface shadow-md border border-border"
                                    aria-label="Pass on this therapist"
                                >
                                    <X className="h-8 w-8 text-[hsl(var(--tag-personality-text))]" />
                                </Button>
                                <Button
                                    size="icon"
                                    onClick={() => handleSave(currentTherapist)}
                                    className="w-20 h-20 rounded-full bg-[hsl(var(--jovial-jade))] shadow-lg"
                                    aria-label="Save to favorites"
                                >
                                    <Heart className="h-10 w-10 text-white fill-white" />
                                </Button>
                            </div>
                        </div>
                    </>
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
            <FiltersDialog 
              open={filtersOpen} 
              onOpenChange={setFiltersOpen}
              currentFilters={activeFilters}
              onApplyFilters={handleApplyFilters}
            />
            
            <div {...ariaLiveProps} />
        </div>
    </ErrorBoundary>
  );
}
