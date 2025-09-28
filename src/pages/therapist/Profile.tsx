import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Stack, HStack, Cluster } from "@/components/layout/layout-atoms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tag } from "@/components/ui/tag";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCoachHint } from "@/hooks/use-coach-hint";
import { Edit, Upload, Eye, Play } from "lucide-react";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";

export default function TherapistProfile() {
  const headshotHint = useCoachHint({ stepId: "profile" });
  useScrollToHash();
  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            <div data-onboarding="profile-intro">
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">Your Profile</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Manage how clients see you</p>
            </div>
      <Stack className="space-y-8">
        {/* Profile Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Profile Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-5 lg:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="focus-profile">
              {/* Profile Photo Section */}
              <div className="space-y-4" data-onboarding="profile-photo">
                <Avatar className="w-32 h-32 mx-auto lg:mx-0">
                  <AvatarImage 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face" 
                    alt="Profile photo" 
                  />
                  <AvatarFallback className="bg-surface-accent text-[hsl(var(--jovial-jade))] font-primary text-2xl">
                    CT
                  </AvatarFallback>
                </Avatar>
                <div className="text-center lg:text-left space-y-2">
                  <TooltipProvider>
                    <Tooltip open={headshotHint.open} onOpenChange={headshotHint.setOpen}>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="min-h-[--touch-target-min]" aria-label="Upload or change profile photo" onClick={headshotHint.dismiss}>
                          <Upload className="w-4 h-4 mr-2" />
                          Change Photo
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-secondary text-sm">Add a clear, friendly headshot to boost profile views.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs">
                    JPG or PNG, max 5MB
                  </p>
                </div>
              </div>

              {/* Basic Info */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="font-secondary text-[hsl(var(--text-primary))]">First Name</Label>
                    <Input 
                      id="firstName" 
                      defaultValue="Dr. Charlotte" 
                      className="min-h-[--touch-target-min]"
                      aria-describedby="firstName-help"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="font-secondary text-[hsl(var(--text-primary))]">Last Name</Label>
                    <Input 
                      id="lastName" 
                      defaultValue="Thompson" 
                      className="min-h-[--touch-target-min]"
                      aria-describedby="lastName-help"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="title" className="font-secondary text-[hsl(var(--text-primary))]">Professional Title</Label>
                  <Input 
                    id="title" 
                    defaultValue="Licensed Clinical Psychologist" 
                    className="min-h-[--touch-target-min]"
                    aria-describedby="title-help"
                  />
                </div>

                <div>
                  <Label htmlFor="bio" className="font-secondary text-[hsl(var(--text-primary))]">Bio</Label>
                  <Textarea 
                    id="bio" 
                    defaultValue="I specialize in anxiety, depression, and relationship counseling with over 10 years of experience helping clients achieve their mental health goals."
                    rows={3}
                    className="resize-none min-h-[--touch-target-min]"
                    aria-describedby="bio-help"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Specializations</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-5 lg:p-6">
              <div className="space-y-4">
                <Cluster>
                  <Tag variant="specialty">Anxiety Disorders</Tag>
                  <Tag variant="specialty">Depression</Tag>
                  <Tag variant="specialty">Relationship Counseling</Tag>
                  <Tag variant="specialty">Trauma Therapy</Tag>
                  <Tag variant="specialty">CBT</Tag>
                  <Button variant="ghost" size="sm" className="min-h-[--touch-target-min] text-[hsl(var(--garden-green))]" aria-label="Edit your therapy specializations">
                    <Edit className="w-3 h-3" />
                  </Button>
                </Cluster>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Languages</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-5 lg:p-6">
              <div className="space-y-4">
                <Cluster>
                  <Tag variant="language">English</Tag>
                  <Tag variant="language">Spanish</Tag>
                  <Tag variant="language">French</Tag>
                  <Button variant="ghost" size="sm" className="min-h-[--touch-target-min] text-[hsl(var(--garden-green))]" aria-label="Edit languages you speak">
                    <Edit className="w-3 h-3" />
                  </Button>
                </Cluster>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Video Introduction */}
        <Card data-onboarding="intro-video">
          <CardHeader>
            <HStack className="justify-between">
              <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Video Introduction</CardTitle>
              <Badge variant="outline" className="bg-tag-personality text-tag-personality-foreground">
                Recommended
              </Badge>
            </HStack>
          </CardHeader>
          <CardContent className="p-4 md:p-5 lg:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center">
                  <Play className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="font-secondary text-muted-foreground">No video uploaded</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">
                    Why add a video?
                  </h3>
                  <ul className="space-y-2 text-sm text-[hsl(var(--text-secondary))]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[hsl(var(--garden-green))] rounded-full mt-2 flex-shrink-0"></span>
                      Profiles with videos get 3x more bookings
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[hsl(var(--garden-green))] rounded-full mt-2 flex-shrink-0"></span>
                      Help clients feel more comfortable
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[hsl(var(--garden-green))] rounded-full mt-2 flex-shrink-0"></span>
                      Show your personality and approach
                    </li>
                  </ul>
                </div>
                <Button variant="primary" className="min-h-[--touch-target-min]" aria-label="Upload introduction video to attract more clients">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Video
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Session Settings */}
        <Card id="focus-rates" data-onboarding="session-rates">
          <CardHeader>
            <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Session Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-5 lg:p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="sessionPrice" className="font-secondary text-[hsl(var(--text-primary))]">
                    Session Price (per hour)
                  </Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--text-secondary))]">£</span>
                    <Input 
                      id="sessionPrice" 
                      type="number" 
                      defaultValue="75" 
                      className="pl-8 min-h-[--touch-target-min]"
                      aria-describedby="sessionPrice-help"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="sessionDuration" className="font-secondary text-[hsl(var(--text-primary))]">
                    Default Session Duration
                  </Label>
                  <select 
                    id="sessionDuration" 
                    defaultValue="60 minutes"
                    className="w-full px-3 py-2 border rounded-md bg-background font-secondary text-[hsl(var(--text-primary))] min-h-[--touch-target-min] mt-1"
                    aria-label="Select default session duration"
                  >
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option>60 minutes</option>
                    <option>90 minutes</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <HStack className="justify-between">
                  <div>
                    <Label className="font-secondary text-[hsl(var(--text-primary))]">Accept new clients</Label>
                    <p className="text-sm text-[hsl(var(--text-secondary))]">Allow new clients to book sessions</p>
                  </div>
                  <Switch defaultChecked aria-label="Toggle accepting new clients" />
                </HStack>

                <HStack className="justify-between">
                  <div>
                    <Label className="font-secondary text-[hsl(var(--text-primary))]">Instant booking</Label>
                    <p className="text-sm text-[hsl(var(--text-secondary))]">Clients can book without approval</p>
                  </div>
                  <Switch defaultChecked aria-label="Toggle instant booking for clients" />
                </HStack>

                <HStack className="justify-between">
                  <div>
                    <Label className="font-secondary text-[hsl(var(--text-primary))]">Weekend availability</Label>
                    <p className="text-sm text-[hsl(var(--text-secondary))]">Available for weekend sessions</p>
                  </div>
                  <Switch aria-label="Toggle weekend availability" />
                </HStack>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cancellation Policies */}
        <Card data-onboarding="cancellation-policies">
          <CardHeader>
            <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Cancellation Policies</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-5 lg:p-6">
            <div className="space-y-4">
              <div>
                <Label className="font-secondary text-[hsl(var(--text-primary))]">Cancellation Notice</Label>
                <p className="text-sm text-[hsl(var(--text-secondary))] mb-2">How much notice do you require for cancellations?</p>
                <select className="w-full px-3 py-2 border rounded-md bg-background font-secondary text-[hsl(var(--text-primary))] min-h-[--touch-target-min]">
                  <option>24 hours</option>
                  <option>48 hours</option>
                  <option>72 hours</option>
                  <option>1 week</option>
                </select>
              </div>
              <div>
                <Label className="font-secondary text-[hsl(var(--text-primary))]">Cancellation Fee</Label>
                <p className="text-sm text-[hsl(var(--text-secondary))] mb-2">Fee for late cancellations (optional)</p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--text-secondary))]">£</span>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    className="pl-8 min-h-[--touch-target-min]"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Visibility */}
        <Card>
          <CardHeader>
            <HStack className="justify-between">
              <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Profile Visibility</CardTitle>
              <Button variant="outline" size="sm" className="min-h-[--touch-target-min]" aria-label="Preview how your profile appears to clients">
                <Eye className="w-4 h-4 mr-2" />
                Preview Profile
              </Button>
            </HStack>
          </CardHeader>
          <CardContent className="p-4 md:p-5 lg:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">127</div>
                <div className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Profile Views</div>
                <div className="text-xs text-[hsl(var(--success-text))]">+12% this month</div>
              </div>
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">28</div>
                <div className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Favorites</div>
                <div className="text-xs text-[hsl(var(--success-text))]">+15% this month</div>
              </div>
              <div className="text-center">
                <div className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">4.9</div>
                <div className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Average Rating</div>
                <div className="text-xs text-[hsl(var(--text-secondary))]">27 reviews</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Changes */}
        <HStack className="justify-end pt-4">
          <Button variant="outline" className="min-h-[--touch-target-min]" aria-label="Cancel profile changes without saving">
            Cancel
          </Button>
          <Button variant="primary" className="min-h-[--touch-target-min]" aria-label="Save all profile changes">
            Save Changes
          </Button>
        </HStack>
        </Stack>
          </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}
