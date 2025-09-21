import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Heart, Calendar, Filter, RotateCcw } from "lucide-react";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/ui/bottom-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TherapistCard, TherapistData } from "@/components/molecules/therapist-card";
import { TherapistDetailsSheet } from "@/components/discovery/therapist-details-sheet";
import { VideoOverlay } from "@/components/discovery/video-overlay";
import { useAriaLive } from "@/hooks/use-aria-live";

// Mock favorites data
const mockFavorites: TherapistData[] = [
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
    media: [
      { 
        type: 'image' as const, 
        url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face" 
      },
      { 
        type: 'video' as const, 
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
      }
    ],
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
    media: [
      { 
        type: 'image' as const, 
        url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face" 
      }
    ],
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
    media: [
      { 
        type: 'image' as const, 
        url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face" 
      }
    ],
    location: "Birmingham, UK"
  }
];

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = React.useState<TherapistData[]>(mockFavorites);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("compatibility");
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [videoOpen, setVideoOpen] = React.useState(false);
  const [selectedTherapist, setSelectedTherapist] = React.useState<TherapistData | null>(null);
  
  const { announce, ariaLiveProps } = useAriaLive();

  // Filter and sort favorites
  const filteredFavorites = React.useMemo(() => {
    let filtered = favorites.filter(therapist =>
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    // Sort by selected criteria
    switch (sortBy) {
      case "compatibility":
        // Mock compatibility score (in real app, this would come from matching algorithm)
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "availability":
        // Mock availability (in real app, this would check actual availability)
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price":
        filtered.sort((a, b) => {
          const priceA = parseInt(a.rate.replace(/[^\d]/g, ''));
          const priceB = parseInt(b.rate.replace(/[^\d]/g, ''));
          return priceA - priceB;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [favorites, searchQuery, sortBy]);

  const handleRemoveFavorite = (therapist: TherapistData) => {
    setFavorites(prev => prev.filter(fav => fav.id !== therapist.id));
    announce(`Removed ${therapist.name} from favorites`);
  };

  const handleShowDetails = (therapist: TherapistData) => {
    setSelectedTherapist(therapist);
    setDetailsOpen(true);
  };

  const handleShowVideo = (therapist: TherapistData) => {
    setSelectedTherapist(therapist);
    setVideoOpen(true);
  };

  const handleBookSession = (therapist: TherapistData) => {
    // Navigate to booking page
    navigate(`/book/${therapist.id}`);
  };

  return (
    <div className="h-screen bg-warm-white flex flex-col overflow-hidden">
      {/* Header - 8% height */}
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
            className="min-h-[--touch-target-min]"
          >
            <Filter className="w-4 h-4 mr-2" />
            Discover More
          </Button>
        </div>
      </header>

      {/* Main Content - 84% height */}
      <main 
        role="main" 
        aria-labelledby="favorites-heading"
        className="flex-1 relative"
        style={{ height: "84vh" }}
      >
        <h1 id="favorites-heading" className="sr-only">Your favorite therapists</h1>

        {/* Search and Filter Bar */}
        <div className="p-4 border-b bg-surface">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(var(--text-secondary))]" />
              <Input
                placeholder="Search favorites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 min-h-[--touch-target-min]"
                aria-label="Search favorites"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48 min-h-[--touch-target-min]" aria-label="Sort favorites by criteria">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compatibility">Compatibility</SelectItem>
                <SelectItem value="availability">Availability</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Upcoming Appointments Indicator */}
        <div className="p-4 bg-surface-accent border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[hsl(var(--garden-green))]" />
              <span className="font-secondary font-medium text-[hsl(var(--text-primary))]">
                Upcoming Appointments
              </span>
            </div>
            <Badge variant="secondary" className="bg-[hsl(var(--garden-green))] text-[hsl(var(--on-dark))]">
              2 scheduled
            </Badge>
          </div>
        </div>

        {/* Favorites List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredFavorites.length > 0 ? (
            <div className="space-y-4" role="list" aria-label="Your favorite therapists">
              {filteredFavorites.map((therapist) => (
                <Card key={therapist.id} className="overflow-hidden" role="listitem">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Therapist Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-accent flex-shrink-0">
                        <img
                          src={therapist.media.find(m => m.type === 'image')?.url || ''}
                          alt={`${therapist.name} profile`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Therapist Info */}
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
                            onClick={() => handleRemoveFavorite(therapist)}
                            className="text-[hsl(var(--text-secondary))] hover:text-error min-h-[--touch-target-min] min-w-[--touch-target-min]"
                            aria-label={`Remove ${therapist.name} from favorites`}
                          >
                            <Heart className="h-5 w-5 fill-current" />
                          </Button>
                        </div>

                        {/* Specialties */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {therapist.specialties.slice(0, 3).map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        {/* Quote */}
                        <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm mt-2 line-clamp-2">
                          "{therapist.quote}"
                        </p>

                        {/* Actions */}
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            onClick={() => handleBookSession(therapist)}
                            className="flex-1 min-h-[--touch-target-min]"
                            aria-label={`Book therapy session with ${therapist.name}`}
                          >
                            Book Session
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => therapist.media?.find(m => m.type === 'video') ? handleShowVideo(therapist) : handleShowDetails(therapist)}
                            className="min-h-[--touch-target-min] text-[hsl(var(--garden-green))]"
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
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <Heart className="h-16 w-16 text-[hsl(var(--text-secondary))]" />
              <div>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-2">
                  No favorites yet
                </h2>
                <p className="font-secondary text-[hsl(var(--text-secondary))] mb-4">
                  Start discovering therapists and add them to your favorites
                </p>
                <Button onClick={() => navigate('/discover')} className="min-h-[--touch-target-min]" aria-label="Go to therapist discovery page">
                  Discover Therapists
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation - 8% height */}
      <BottomNav />

      {/* Details Sheet */}
      <TherapistDetailsSheet
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        therapist={selectedTherapist}
        onSave={() => {}}
        onReport={() => {}}
      />

      {/* Video Overlay */}
      {selectedTherapist?.media?.find(m => m.type === 'video') && (
        <VideoOverlay
          open={videoOpen}
          onOpenChange={setVideoOpen}
          videoUrl={selectedTherapist.media.find(m => m.type === 'video')?.url || ''}
          posterUrl={selectedTherapist.media.find(m => m.type === 'image')?.url}
          title={selectedTherapist.name}
        />
      )}

      {/* ARIA Live Region */}
      <div {...ariaLiveProps} />
    </div>
  );
}
