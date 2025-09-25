import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Heart, Calendar, Filter, Loader2, AlertCircle } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/database.types";
import { useAuth } from "@/context/AuthContext";
import { BottomNav } from "@/components/ui/bottom-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TherapistData } from "@/components/molecules/therapist-card";
import { TherapistDetailsSheet } from "@/components/discovery/therapist-details-sheet";
import { VideoOverlay } from "@/components/discovery/video-overlay";
import { useAriaLive } from "@/hooks/use-aria-live";
import { format } from 'date-fns';

// Database types
type Appointment = Database['public']['Tables']['appointments']['Row'];

// Define types for our data

// Use the database types directly now that they've been updated to match the SQL schema
type TherapistProfilePublic = Database['public']['Views']['therapist_profiles_public']['Row'];

interface FavoriteTherapist extends TherapistData {
  appointments: Appointment[];
  favorite_id: string;
}

// Custom hook to fetch favorites and their upcoming appointments
const useFavoritesWithAppointments = () => {
  const { user } = useAuth();

  return useQuery<FavoriteTherapist[], Error>({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user || !supabase) {
        throw new Error("User or Supabase client not available");
      }

      // Step 1: Fetch all favorite records
      const { data: favorites, error: favoritesError } = await supabase
        .from('favorites')
        .select('id, therapist_id')
        .eq('user_id', user.id);

      if (favoritesError) throw new Error(`Favorites Error: ${favoritesError.message}`);
      if (!favorites || favorites.length === 0) return [];

      const therapistIds = favorites.map(f => f.therapist_id);

      // Step 2: Fetch all therapist profiles for those favorites
      const { data: profiles, error: profilesError } = await supabase
        .from('therapist_profiles_public')
        .select('*')
        .in('id', therapistIds);

      // Cast to the TherapistProfilePublic type from database.types.ts
      // The database.types.ts file has been updated to include all fields from the SQL view
      const therapistProfiles = profiles as TherapistProfilePublic[] | null;

      if (profilesError) throw new Error(`Profiles Error: ${profilesError.message}`);

      // Step 3: Fetch upcoming appointments for the user
      // Using session_date and session_time (no single appointment_time column)
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const { data: appointments, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*')
        .eq('client_id', user.id)
        .gte('session_date', today);

      if (appointmentsError) throw new Error(`Appointments Error: ${appointmentsError.message}`);

      // Helper to build a Date from session_date and session_time
      const apptToDate = (appt: Appointment) => new Date(`${appt.session_date}T${appt.session_time}`);

      // Step 4: Combine the data in JavaScript
      const combinedData = therapistProfiles?.map(profile => {
        const favoriteRecord = favorites.find(f => f.therapist_id === profile.id);
        const therapistAppointments = (appointments?.filter(a => a.therapist_id === profile.id) || [])
          .sort((a, b) => apptToDate(a).getTime() - apptToDate(b).getTime());
        
        const typedProfile = profile as { session_rates: { standard?: number } };

        const mappedProfile: TherapistData = {
            id: profile.id,
            name: profile.name || 'No Name',
            title: profile.tagline || 'Therapist',
            specialties: profile.specialties || [],
            personality: profile.personality_tags || [],
            languages: profile.languages || [],
            rate: profile.session_rates?.['60min'] ? `£${profile.session_rates['60min']}/session` : 'N/A',
            rating: 4.8, // TODO: Calculate from real reviews
            quote: profile.quote || profile.bio?.substring(0, 100) + '...' || '',
            media: [
              { type: 'image', url: profile.avatar_url || '' },
              ...(profile.video_url ? [{ type: 'video' as const, url: profile.video_url }] : [])
            ],
            location: 'Online'
        };

        return {
          ...mappedProfile,
          appointments: therapistAppointments as Appointment[],
          favorite_id: favoriteRecord?.id || '',
        };
      });

      return combinedData || [];
    },
    enabled: !!user && !!supabase,
  });
};

export default function Favorites() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: favorites = [], isLoading, isError, error } = useFavoritesWithAppointments();

  // Helper to compute a Date for sorting and display
  const getAppointmentDateTime = React.useCallback((appt: Appointment) => {
    return new Date(`${appt.session_date}T${appt.session_time}`);
  }, []);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("next_appointment");
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [videoOpen, setVideoOpen] = React.useState(false);
  const [selectedTherapist, setSelectedTherapist] = React.useState<FavoriteTherapist | null>(null);
  
  const { announce, ariaLiveProps } = useAriaLive();

  const removeFavoriteMutation = useMutation({
    mutationFn: async (favoriteId: string) => {
      if (!supabase) throw new Error("Supabase client not available");
      const { error } = await supabase.from('favorites').delete().eq('id', favoriteId);
      if (error) throw error;
    },
    onSuccess: (_, favoriteId) => {
      queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] });
      const removedTherapist = favorites.find(f => f.favorite_id === favoriteId);
      if(removedTherapist) {
        announce(`Removed ${removedTherapist.name} from favorites`);
      }
    },
    onError: (err: Error) => {
      announce(`Error removing favorite: ${err.message}`);
    }
  });

  const filteredFavorites = React.useMemo(() => {
    const filtered = favorites.filter(therapist =>
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    switch (sortBy) {
      case "next_appointment":
        filtered.sort((a, b) => {
          const aNext = a.appointments[0] ? getAppointmentDateTime(a.appointments[0]) : null;
          const bNext = b.appointments[0] ? getAppointmentDateTime(b.appointments[0]) : null;
          if (aNext && bNext) return aNext.getTime() - bNext.getTime();
          if (aNext) return -1;
          if (bNext) return 1;
          return 0;
        });
        break;
      case "price_asc":
        filtered.sort((a, b) => {
          const priceA = a.rate === 'N/A' ? Infinity : parseInt(a.rate.replace(/[^\d]/g, '')) || 0;
          const priceB = b.rate === 'N/A' ? Infinity : parseInt(b.rate.replace(/[^\d]/g, '')) || 0;
          return priceA - priceB;
        });
        break;
      case "price_desc":
         filtered.sort((a, b) => {
          const priceA = a.rate === 'N/A' ? -1 : parseInt(a.rate.replace(/[^\d]/g, '')) || 0;
          const priceB = b.rate === 'N/A' ? -1 : parseInt(b.rate.replace(/[^\d]/g, '')) || 0;
          return priceB - priceA;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [favorites, searchQuery, sortBy, getAppointmentDateTime]);

  const totalUpcomingAppointments = React.useMemo(() => 
    favorites.reduce((acc, curr) => acc + curr.appointments.length, 0)
  , [favorites]);

  const handleShowDetails = (therapist: FavoriteTherapist) => {
    setSelectedTherapist(therapist);
    setDetailsOpen(true);
  };

  const handleShowVideo = (therapist: FavoriteTherapist) => {
    setSelectedTherapist(therapist);
    setVideoOpen(true);
  };

  const handleBookSession = (therapist: FavoriteTherapist) => {
    navigate(`/book/${therapist.id}`);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <Loader2 className="h-16 w-16 animate-spin text-[hsl(var(--text-secondary))]" />
          <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-2">
            Loading your favorites...
          </h2>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-error">
          <AlertCircle className="h-16 w-16" />
          <h2 className="font-primary text-xl font-semibold mb-2">
            Could not load favorites
          </h2>
          <p className="font-secondary mb-4">{error?.message}</p>
        </div>
      );
    }

    if (favorites.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <Heart className="h-16 w-16 text-[hsl(var(--text-secondary))]" />
          <div>
            <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-2">
              No favorites yet
            </h2>
            <p className="font-secondary text-[hsl(var(--text-secondary))] mb-4">
              Start discovering therapists and add them to your favorites
            </p>
            <Button onClick={() => navigate('/discover')} className="min-h-touch-target" aria-label="Go to therapist discovery page">
              Discover Therapists
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4" role="list" aria-label="Your favorite therapists">
        {filteredFavorites.map((therapist) => (
          <Card key={therapist.id} className="overflow-hidden" role="listitem">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-accent flex-shrink-0">
                  <img
                    src={therapist.media.find(m => m.type === 'image')?.url || ''}
                    alt={`${therapist.name} profile`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] text-lg">
                        {therapist.name}
                      </h3>
                      <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">
                        {therapist.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-[hsl(var(--text-secondary))]">⭐ {therapist.rating}</span>
                        <span className="text-sm font-medium text-[hsl(var(--text-primary))]">
                          {therapist.rate}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFavoriteMutation.mutate(therapist.favorite_id)}
                      className="text-[hsl(var(--text-secondary))] hover:text-error min-h-touch-target min-w-touch-target"
                      aria-label={`Remove ${therapist.name} from favorites`}
                      disabled={removeFavoriteMutation.isPending}
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </Button>
                  </div>

                  {/* Upcoming Appointment Info */}
                  {therapist.appointments.length > 0 && (
                    <div className="mt-3 p-3 bg-surface-accent rounded-md border border-dashed">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[hsl(var(--garden-green))]" />
                        <p className="font-secondary text-sm font-medium text-[hsl(var(--text-primary))]">
                          Next session: {format(getAppointmentDateTime(therapist.appointments[0]), "EEE, MMM d 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      onClick={() => handleBookSession(therapist)}
                      className="flex-1 min-h-touch-target"
                      aria-label={`Book therapy session with ${therapist.name}`}
                    >
                      Book Session
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => therapist.media?.find(m => m.type === 'video') ? handleShowVideo(therapist) : handleShowDetails(therapist)}
                      className="min-h-touch-target text-[hsl(var(--garden-green))]"
                      aria-label={therapist.media?.find(m => m.type === 'video') ? `Watch introduction video from ${therapist.name}` : `View ${therapist.name}'s full profile`}
                    >
                      {therapist.media?.find(m => m.type === 'video') ? "📹" : "👁️"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen bg-warm-white flex flex-col overflow-hidden">
      <header 
        role="banner" 
        aria-label="Favorites"
        className="sticky top-0 z-50 w-full border-b bg-surface/95 backdrop-blur"
        style={{ height: "8vh" }}
      >
        <div className="flex h-full items-center justify-between px-6">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-[hsl(var(--garden-green))]" />
            <span className="font-primary font-bold text-xl text-[hsl(var(--text-primary))]">Favorites</span>
            <Badge variant="secondary" className="ml-2">
              {favorites.length}
            </Badge>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/discover')}
            aria-label="Back to discovery"
            className="min-h-touch-target"
          >
            <Filter className="w-4 h-4 mr-2" />
            Discover More
          </Button>
        </div>
      </header>

      <main 
        role="main" 
        aria-labelledby="favorites-heading"
        className="flex-1 relative"
        style={{ height: "84vh" }}
      >
        <h1 id="favorites-heading" className="sr-only">Your favorite therapists</h1>

        <div className="p-4 border-b bg-surface">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(var(--text-secondary))]" />
              <Input
                placeholder="Search favorites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 min-h-touch-target"
                aria-label="Search favorites"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48 min-h-touch-target" aria-label="Sort favorites by criteria">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next_appointment">Next Appointment</SelectItem>
                <SelectItem value="price_asc">Price (Low-High)</SelectItem>
                <SelectItem value="price_desc">Price (High-Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-4 bg-surface-accent border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[hsl(var(--garden-green))]" />
              <span className="font-secondary font-medium text-[hsl(var(--text-primary))]">
                Upcoming Appointments
              </span>
            </div>
            <Badge variant="secondary" className="bg-[hsl(var(--garden-green))] text-[hsl(var(--on-dark))]">
              {totalUpcomingAppointments} scheduled
            </Badge>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {renderContent()}
        </div>
      </main>

      <BottomNav />

      <TherapistDetailsSheet
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        therapist={selectedTherapist}
        onSave={() => {}}
        onReport={() => {}}
      />

      {selectedTherapist?.media?.find(m => m.type === 'video') && (
        <VideoOverlay
          open={videoOpen}
          onOpenChange={setVideoOpen}
          videoUrl={selectedTherapist.media.find(m => m.type === 'video')?.url || ''}
          posterUrl={selectedTherapist.media.find(m => m.type === 'image')?.url}
          title={selectedTherapist.name}
        />
      )}

      <div {...ariaLiveProps} />
    </div>
  );
}
