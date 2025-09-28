import * as React from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  CircleDot,
  TrendingUp,
  User,
  MessageSquare,
  FileText,
  Camera,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
export interface ProfileStrengthIndicatorProps {
  userId: string;
  className?: string;
  showLabel?: boolean;
  onImprove?: () => void;
}

interface ProfileStrength {
  overall: number;
  breakdown: {
    basicInfo: number;
    specialties: number;
    communication: number;
    policies: number;
    media: number;
  };
  missingItems: string[];
}

interface TherapistProfile {
  name: string | null;
  license_number: string | null;
  bio: string | null;
  specialties: string[] | null;
  modalities: string[] | null;
  communication_style: string | null;
  session_format: string | null;
  cancellation_policy: string | null;
  rescheduling_policy: string | null;
  avatar_url: string | null;
  video_url: string | null;
  quote: string | null;
  profile_strength: number | null;
}

// Helper function to calculate profile strength breakdown
const calculateProfileBreakdown = (profile: TherapistProfile): ProfileStrength => {
  const breakdown = {
    basicInfo: 0,
    specialties: 0,
    communication: 0,
    policies: 0,
    media: 0,
  };
  const missingItems: string[] = [];

  // Basic info (20%): name, license_number, bio
  if (profile.name && profile.name.trim() !== '') {
    breakdown.basicInfo += 7;
  } else {
    missingItems.push('Full name');
  }

  if (profile.license_number &&
      profile.license_number.trim() !== '' &&
      profile.license_number !== 'PENDING_SETUP') {
    breakdown.basicInfo += 7;
  } else {
    missingItems.push('License number');
  }

  if (profile.bio && profile.bio.trim() !== '') {
    breakdown.basicInfo += 6;
  } else {
    missingItems.push('Professional bio');
  }

  // Specialties/modalities (20%): at least 2 of each
  if (profile.specialties && profile.specialties.length >= 2) {
    breakdown.specialties += 10;
  } else {
    missingItems.push('At least 2 specialties');
  }

  if (profile.modalities && profile.modalities.length >= 2) {
    breakdown.specialties += 10;
  } else {
    missingItems.push('At least 2 therapy modalities');
  }

  // Communication preferences (20%): communication_style, session_format
  if (profile.communication_style && profile.communication_style.trim() !== '') {
    breakdown.communication += 10;
  } else {
    missingItems.push('Communication style');
  }

  if (profile.session_format && profile.session_format.trim() !== '') {
    breakdown.communication += 10;
  } else {
    missingItems.push('Session format preference');
  }

  // Policies (20%): cancellation_policy, rescheduling_policy
  if (profile.cancellation_policy && profile.cancellation_policy.trim() !== '') {
    breakdown.policies += 10;
  } else {
    missingItems.push('Cancellation policy');
  }

  if (profile.rescheduling_policy && profile.rescheduling_policy.trim() !== '') {
    breakdown.policies += 10;
  } else {
    missingItems.push('Rescheduling policy');
  }

  // Media (20%): avatar_url, video_url or quote
  if (profile.avatar_url && profile.avatar_url.trim() !== '') {
    breakdown.media += 10;
  } else {
    missingItems.push('Profile photo');
  }

  if ((profile.video_url && profile.video_url.trim() !== '') ||
      (profile.quote && profile.quote.trim() !== '')) {
    breakdown.media += 10;
  } else {
    missingItems.push('Introduction video or quote');
  }

  const overall = Math.min(100, Object.values(breakdown).reduce((sum, val) => sum + val, 0));

  return {
    overall,
    breakdown,
    missingItems,
  };
};

// Helper function to get color based on percentage
const getStrengthColor = (percentage: number): string => {
  if (percentage < 40) return "hsl(var(--error-text))";
  if (percentage < 60) return "hsl(var(--warning-text))";
  if (percentage < 80) return "hsl(var(--warning-text))";
  return "hsl(var(--success-text))";
};

// Helper function to get status text
const getStatusText = (percentage: number): string => {
  if (percentage < 40) return "Incomplete";
  if (percentage < 60) return "Getting Started";
  if (percentage < 80) return "Nearly Complete";
  return "Complete";
};

// Main component
export const ProfileStrengthIndicator: React.FC<ProfileStrengthIndicatorProps> = ({
  userId,
  className,
  showLabel = true,
  onImprove,
}) => {
  const { user } = useAuth();
  const [profile, setProfile] = React.useState<TherapistProfile | null>(null);
  const [strength, setStrength] = React.useState<ProfileStrength | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Fetch profile data
  React.useEffect(() => {
    const fetchProfileStrength = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('therapist_profiles')
          .select(`
            name,
            license_number,
            bio,
            specialties,
            modalities,
            communication_style,
            session_format,
            cancellation_policy,
            rescheduling_policy,
            avatar_url,
            video_url,
            quote,
            profile_strength
          `)
          .eq('user_id', user.id)
          .single();

        if (fetchError) {
          console.error('Error fetching profile strength:', fetchError);
          setError('Failed to load profile data');
          return;
        }

        if (data) {
          setProfile(data);
          const breakdown = calculateProfileBreakdown(data);
          setStrength(breakdown);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileStrength();

    // Set up real-time subscription for profile changes
    const subscription = supabase
      .channel('profile_strength_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'therapist_profiles',
          filter: `user_id=eq.${user?.id}`,
        },
        (payload) => {
          if (payload.new && typeof payload.new === 'object') {
            const newProfile = payload.new as TherapistProfile;
            setProfile(newProfile);
            const breakdown = calculateProfileBreakdown(newProfile);
            setStrength(breakdown);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id]);

  const handleImprove = () => {
    if (onImprove) {
      onImprove();
    } else {
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className={cn(
        "fixed top-4 right-4 z-50",
        className
      )}>
        <Card className="p-3 shadow-lg animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded-full" />
            {showLabel && <div className="w-16 h-4 bg-muted rounded" />}
          </div>
        </Card>
      </div>
    );
  }

  if (error || !strength) {
    return (
      <div className={cn(
        "fixed top-4 right-4 z-50",
        className
      )}>
        <Card className="p-3 shadow-lg border-destructive">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-secondary">Error loading profile</span>
          </div>
        </Card>
      </div>
    );
  }

  const progressPercentage = strength.overall;
  const strengthColor = getStrengthColor(progressPercentage);
  const statusText = getStatusText(progressPercentage);

  return (
    <div className={cn(
      "fixed top-4 right-4 z-50",
      className
    )}>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <HoverCard openDelay={300} closeDelay={100}>
          <HoverCardTrigger asChild>
            <DialogTrigger asChild>
              <div className="cursor-pointer transform transition-all duration-200 hover:scale-105 active:scale-95 animate-in fade-in-0 zoom-in-95 duration-300">
                <Card className="shadow-lg border-2 hover:shadow-xl transition-all duration-200 bg-background/95 backdrop-blur-sm">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      {/* Progress Ring */}
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                        <svg
                          className="w-full h-full transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            className="text-muted-foreground/30"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="transition-all duration-300 ease-in-out"
                            fill="none"
                            stroke={strengthColor}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray={`${progressPercentage}, 100`}
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="text-xs font-bold font-secondary tabular-nums"
                            style={{ color: strengthColor }}
                          >
                            {progressPercentage}%
                          </span>
                        </div>
                      </div>

                      {/* Label */}
                      {showLabel && (
                        <div className="hidden sm:block min-w-0">
                          <div className="font-secondary text-sm font-semibold text-foreground">
                            Profile Strength
                          </div>
                          <div
                            className="font-secondary text-xs"
                            style={{ color: strengthColor }}
                          >
                            {statusText}
                          </div>
                        </div>
                      )}

                      {/* Mobile: Just show trending up icon */}
                      <div className="sm:hidden">
                        <TrendingUp
                          className="w-4 h-4"
                          style={{ color: strengthColor }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogTrigger>
          </HoverCardTrigger>

          {/* Hover Content - Breakdown */}
          <HoverCardContent
            side="bottom"
            align="end"
            className="w-80 p-4"
            sideOffset={8}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-secondary font-semibold text-sm">
                  Profile Completion Breakdown
                </h4>
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{
                    borderColor: strengthColor,
                    color: strengthColor,
                  }}
                >
                  {progressPercentage}% Complete
                </Badge>
              </div>

              <div className="space-y-3">
                {/* Basic Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-secondary text-sm">Basic Info</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(strength.breakdown.basicInfo / 20) * 100}
                      className="w-16 h-2"
                    />
                    <span className="font-secondary text-xs text-muted-foreground tabular-nums min-w-[3ch]">
                      {strength.breakdown.basicInfo}/20
                    </span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CircleDot className="w-4 h-4 text-muted-foreground" />
                    <span className="font-secondary text-sm">Specialties</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(strength.breakdown.specialties / 20) * 100}
                      className="w-16 h-2"
                    />
                    <span className="font-secondary text-xs text-muted-foreground tabular-nums min-w-[3ch]">
                      {strength.breakdown.specialties}/20
                    </span>
                  </div>
                </div>

                {/* Communication */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="font-secondary text-sm">Communication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(strength.breakdown.communication / 20) * 100}
                      className="w-16 h-2"
                    />
                    <span className="font-secondary text-xs text-muted-foreground tabular-nums min-w-[3ch]">
                      {strength.breakdown.communication}/20
                    </span>
                  </div>
                </div>

                {/* Policies */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="font-secondary text-sm">Policies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(strength.breakdown.policies / 20) * 100}
                      className="w-16 h-2"
                    />
                    <span className="font-secondary text-xs text-muted-foreground tabular-nums min-w-[3ch]">
                      {strength.breakdown.policies}/20
                    </span>
                  </div>
                </div>

                {/* Media */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-muted-foreground" />
                    <span className="font-secondary text-sm">Media</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(strength.breakdown.media / 20) * 100}
                      className="w-16 h-2"
                    />
                    <span className="font-secondary text-xs text-muted-foreground tabular-nums min-w-[3ch]">
                      {strength.breakdown.media}/20
                    </span>
                  </div>
                </div>
              </div>

              {strength.missingItems.length > 0 && (
                <div className="pt-2 border-t">
                  <h5 className="font-secondary font-medium text-xs text-muted-foreground mb-2">
                    Still needed:
                  </h5>
                  <div className="space-y-1">
                    {strength.missingItems.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                        <span className="font-secondary text-xs text-muted-foreground">
                          {item}
                        </span>
                      </div>
                    ))}
                    {strength.missingItems.length > 3 && (
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                        <span className="font-secondary text-xs text-muted-foreground">
                          ...and {strength.missingItems.length - 3} more
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>

        {/* Improvement Modal */}
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-primary">
              Improve Your Profile
            </DialogTitle>
            <DialogDescription className="font-secondary">
              Complete these items to strengthen your profile and attract more clients.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: `${strengthColor}20`,
                    color: strengthColor,
                  }}
                >
                  {progressPercentage}%
                </div>
                <div>
                  <div className="font-secondary font-semibold text-sm">
                    Current Strength
                  </div>
                  <div className="font-secondary text-xs text-muted-foreground">
                    {statusText}
                  </div>
                </div>
              </div>
            </div>

            {strength.missingItems.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-secondary font-semibold text-sm">
                  Complete these items:
                </h4>
                <div className="space-y-2">
                  {strength.missingItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded border">
                      <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                      <span className="font-secondary text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outline"
                className="flex-1 font-secondary"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  // Navigate to profile setup - this could be enhanced to go to specific sections
                  window.location.href = '/t/onboarding/profile';
                }}
                className="flex-1 font-secondary"
              >
                Complete Profile
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileStrengthIndicator;