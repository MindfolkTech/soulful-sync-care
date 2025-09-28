import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LucideIcon, Camera, Calendar, DollarSign, Video, User, MapPin, Clock, Palette } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getTherapistProfile } from "@/lib/therapist-profile";
import { useAuth } from "@/context/AuthContext";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  progress: { current: number; total: number };
  profileBoost: number; // % increase in profile strength
  ctaText: string;
  ctaLink: string;
  priority: number; // 1-5, lower is higher priority
  isComplete: boolean;
  estimatedTime?: string; // "2 minutes", "5 minutes"
  condition?: (profile: any) => boolean; // Function to determine if action should show
}

interface QuickActionCardsProps {
  userId: string;
  maxCards?: number; // default 4
  className?: string;
  onActionClick?: (actionId: string) => void;
}

// Define the quick actions based on profile completion
const createQuickActions = (profile: any): QuickAction[] => [
  {
    id: "profile-photo",
    title: "Add Profile Photo",
    description: "Help clients connect with a professional photo",
    icon: Camera,
    progress: { current: profile?.avatar_url ? 1 : 0, total: 1 },
    profileBoost: 15,
    ctaText: "Upload Photo",
    ctaLink: "/t/profile#photo",
    priority: 1,
    isComplete: !!profile?.avatar_url,
    estimatedTime: "2 minutes",
    condition: (p) => !p?.avatar_url
  },
  {
    id: "availability",
    title: "Set Your Availability",
    description: "Let clients know when you're available to meet",
    icon: Calendar,
    progress: { current: profile?.availability && Object.keys(profile.availability).length > 0 ? 5 : 0, total: 5 },
    profileBoost: 20,
    ctaText: "Add Hours",
    ctaLink: "/t/schedule",
    priority: 2,
    isComplete: profile?.availability && Object.keys(profile.availability).length > 0,
    estimatedTime: "5 minutes",
    condition: (p) => !p?.availability || Object.keys(p.availability).length === 0
  },
  {
    id: "session-rates",
    title: "Configure Session Rates",
    description: "Set your pricing to start accepting bookings",
    icon: DollarSign,
    progress: { current: profile?.session_rates && Object.keys(profile.session_rates).length > 0 ? 1 : 0, total: 1 },
    profileBoost: 15,
    ctaText: "Set Rates",
    ctaLink: "/t/profile#rates",
    priority: 1,
    isComplete: profile?.session_rates && Object.keys(profile.session_rates).length > 0,
    estimatedTime: "3 minutes",
    condition: (p) => !p?.session_rates || Object.keys(p.session_rates).length === 0
  },
  {
    id: "intro-video",
    title: "Record Introduction Video",
    description: "Stand out with a personal introduction",
    icon: Video,
    progress: { current: profile?.video_url ? 1 : 0, total: 1 },
    profileBoost: 10,
    ctaText: "Add Video",
    ctaLink: "/t/profile#video",
    priority: 3,
    isComplete: !!profile?.video_url,
    estimatedTime: "10 minutes",
    condition: (p) => !p?.video_url
  },
  {
    id: "complete-bio",
    title: "Write Your Bio",
    description: "Tell clients about your approach and experience",
    icon: User,
    progress: { current: profile?.bio && profile.bio.length > 100 ? 1 : 0, total: 1 },
    profileBoost: 12,
    ctaText: "Write Bio",
    ctaLink: "/t/profile#bio",
    priority: 2,
    isComplete: profile?.bio && profile.bio.length > 100,
    estimatedTime: "5 minutes",
    condition: (p) => !p?.bio || p.bio.length < 100
  },
  {
    id: "location-setup",
    title: "Add Your Location",
    description: "Help clients find you for in-person sessions",
    icon: MapPin,
    progress: { current: profile?.location_city && profile?.location_state ? 1 : 0, total: 1 },
    profileBoost: 8,
    ctaText: "Set Location",
    ctaLink: "/t/profile#location",
    priority: 4,
    isComplete: !!(profile?.location_city && profile?.location_state),
    estimatedTime: "2 minutes",
    condition: (p) => !p?.location_city || !p?.location_state
  },
  {
    id: "specialties",
    title: "Define Your Specialties",
    description: "Help clients find the right expertise",
    icon: Palette,
    progress: { current: profile?.specialties?.length || 0, total: 3 },
    profileBoost: 18,
    ctaText: "Add Specialties",
    ctaLink: "/t/profile#specialties",
    priority: 1,
    isComplete: profile?.specialties?.length >= 3,
    estimatedTime: "4 minutes",
    condition: (p) => !p?.specialties || p.specialties.length < 3
  },
  {
    id: "timezone",
    title: "Set Your Timezone",
    description: "Ensure accurate scheduling for all clients",
    icon: Clock,
    progress: { current: profile?.timezone ? 1 : 0, total: 1 },
    profileBoost: 5,
    ctaText: "Set Timezone",
    ctaLink: "/t/profile#timezone",
    priority: 5,
    isComplete: !!profile?.timezone,
    estimatedTime: "1 minute",
    condition: (p) => !p?.timezone
  }
];

function QuickActionCard({ action, onActionClick }: { action: QuickAction; onActionClick?: (actionId: string) => void }) {
  const progressPercentage = (action.progress.current / action.progress.total) * 100;

  const handleClick = () => {
    onActionClick?.(action.id);
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-md border border-[hsl(var(--border))]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[hsl(var(--surface-accent))] flex items-center justify-center flex-shrink-0">
              <action.icon className="w-5 h-5 text-[hsl(var(--garden-green))]" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="font-secondary text-base font-semibold text-[hsl(var(--text-primary))] leading-tight">
                {action.title}
              </CardTitle>
              {action.estimatedTime && (
                <p className="font-secondary text-xs text-[hsl(var(--text-muted))] mt-1">
                  {action.estimatedTime}
                </p>
              )}
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-[hsl(var(--tag-personality-bg))] text-[hsl(var(--tag-personality-text))] text-xs font-medium flex-shrink-0"
          >
            +{action.profileBoost}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <CardDescription className="font-secondary text-sm text-[hsl(var(--text-secondary))] mb-4 leading-relaxed">
          {action.description}
        </CardDescription>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-secondary text-xs text-[hsl(var(--text-muted))]">
                Progress
              </span>
              <span className="font-secondary text-xs text-[hsl(var(--text-muted))] tabular-nums">
                {action.progress.current}/{action.progress.total}
              </span>
            </div>
            <Progress
              value={progressPercentage}
              className="h-2"
              aria-label={`${action.title} progress: ${action.progress.current} of ${action.progress.total} completed`}
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            className="w-full min-h-[var(--touch-target-min)] font-secondary font-semibold"
            asChild
            onClick={handleClick}
            aria-label={`${action.ctaText} for ${action.title}`}
          >
            <Link to={action.ctaLink}>
              {action.ctaText}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function QuickActionCards({ userId, maxCards = 4, className, onActionClick }: QuickActionCardsProps) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId && !user?.id) return;

      try {
        setLoading(true);
        const profileData = await getTherapistProfile(userId || user!.id);
        setProfile(profileData);
      } catch (err) {
        console.error('Error fetching therapist profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, user?.id]);

  if (loading) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", className)}>
        {Array.from({ length: maxCards }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[hsl(var(--surface-accent))]" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-[hsl(var(--surface-accent))] rounded" />
                  <div className="h-3 bg-[hsl(var(--surface-accent))] rounded w-16" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-3 bg-[hsl(var(--surface-accent))] rounded" />
                <div className="h-2 bg-[hsl(var(--surface-accent))] rounded" />
                <div className="h-8 bg-[hsl(var(--surface-accent))] rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="text-center">
          <p className="font-secondary text-sm text-[hsl(var(--error-text))]">
            Unable to load quick actions: {error}
          </p>
        </div>
      </Card>
    );
  }

  // Get all possible actions and filter by completion status and conditions
  const allActions = createQuickActions(profile);
  const incompleteActions = allActions
    .filter(action => !action.isComplete && (!action.condition || action.condition(profile)))
    .sort((a, b) => a.priority - b.priority) // Sort by priority (lower number = higher priority)
    .slice(0, maxCards); // Limit to maxCards

  if (incompleteActions.length === 0) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-[hsl(var(--success-bg))] flex items-center justify-center">
            <Camera className="w-8 h-8 text-[hsl(var(--success-text))]" />
          </div>
          <h3 className="font-primary text-lg font-semibold text-[hsl(var(--text-primary))]">
            Profile Complete!
          </h3>
          <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
            Great job! Your profile is looking strong and ready to attract clients.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", className)}>
      {incompleteActions.map((action) => (
        <QuickActionCard
          key={action.id}
          action={action}
          onActionClick={onActionClick}
        />
      ))}
    </div>
  );
}

export type { QuickActionCardsProps, QuickAction };