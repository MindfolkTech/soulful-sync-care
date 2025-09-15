import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, X, Play, Pause } from "lucide-react";

// Specialties and Tags from PRD
const SPECIALTIES = {
  "mental-health": ["Anxiety disorders", "Depression", "PTSD", "OCD", "Bipolar disorder", "Eating disorders"],
  "life-stage": ["Young adults", "Career transitions", "Relationship issues", "Parenting", "Midlife challenges", "Senior care"],
  "therapeutic-approach": ["CBT", "DBT", "Psychodynamic", "Humanistic", "EMDR", "Mindfulness-based"],
  "communication-style": ["Empathetic", "Direct", "Collaborative", "Structured", "Flexible"],
  "cultural-identity": ["LGBTQ+ affirmative", "Cultural competency", "Religious/spiritual", "Multilingual"]
};

interface TherapistProfile {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  languages: string[];
  location: string;
  rate: number;
  availability: string[];
  education: string[];
  experience: string[];
  certifications: string[];
}

interface BasicInfoSectionProps {
  profile: TherapistProfile;
  onUpdate: (updates: Partial<TherapistProfile>) => void;
}

export function BasicInfoSection({ profile, onUpdate }: BasicInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-primary">Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName"
              value={profile.firstName || ""}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName"
              value={profile.lastName || ""}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input 
            id="title"
            placeholder="e.g. Clinical Psychologist, Licensed Therapist"
            value={profile.title || ""}
            onChange={(e) => onUpdate({ title: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Professional Bio</Label>
          <Textarea 
            id="bio"
            placeholder="Tell clients about your approach, experience, and what makes you unique..."
            rows={4}
            value={profile.bio || ""}
            onChange={(e) => onUpdate({ bio: e.target.value })}
          />
          <p className="text-xs text-text-muted font-secondary">
            {(profile.bio || "").length}/500 characters
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="yearsExperience">Years of Experience</Label>
            <Select value={profile.yearsExperience} onValueChange={(value) => onUpdate({ yearsExperience: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2">1-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="11-15">11-15 years</SelectItem>
                <SelectItem value="15+">15+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location"
              placeholder="City, Country"
              value={profile.location || ""}
              onChange={(e) => onUpdate({ location: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface SpecialtiesSectionProps {
  profile: TherapistProfile;
  onUpdate: (updates: Partial<TherapistProfile>) => void;
}

export function SpecialtiesSection({ profile, onUpdate }: SpecialtiesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof SPECIALTIES>("mental-health");
  
  const handleSpecialtyToggle = (specialty: string) => {
    const current = profile.specialties || [];
    const updated = current.includes(specialty) 
      ? current.filter((s: string) => s !== specialty)
      : [...current, specialty];
    onUpdate({ specialties: updated });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-primary">Specialties & Areas of Focus</CardTitle>
        <p className="text-sm text-text-secondary font-secondary">
          Select up to 8 specialties that best describe your expertise
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {Object.keys(SPECIALTIES).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category as keyof typeof SPECIALTIES)}
            >
              {category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </Button>
          ))}
        </div>
        
        <div className="space-y-3">
          {SPECIALTIES[selectedCategory].map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={specialty}
                checked={(profile.specialties || []).includes(specialty)}
                onCheckedChange={() => handleSpecialtyToggle(specialty)}
                disabled={(profile.specialties || []).length >= 8 && !(profile.specialties || []).includes(specialty)}
              />
              <label htmlFor={specialty} className="font-secondary text-sm cursor-pointer flex-1">
                {specialty}
              </label>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {(profile.specialties || []).map((specialty: string) => (
            <Badge key={specialty} variant="secondary" className="text-xs">
              {specialty}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0 text-text-muted hover:text-text-primary"
                onClick={() => handleSpecialtyToggle(specialty)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface RatesAndPoliciesSectionProps {
  profile: TherapistProfile;
  onUpdate: (updates: Partial<TherapistProfile>) => void;
}

export function RatesAndPoliciesSection({ profile, onUpdate }: RatesAndPoliciesSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-primary">Rates & Policies</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rate45min">45-minute session</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">£</span>
              <Input 
                id="rate45min"
                type="number"
                placeholder="80"
                className="pl-8"
                value={profile.rate45min || ""}
                onChange={(e) => onUpdate({ rate45min: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate60min">60-minute session</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">£</span>
              <Input 
                id="rate60min"
                type="number"
                placeholder="100"
                className="pl-8"
                value={profile.rate60min || ""}
                onChange={(e) => onUpdate({ rate60min: e.target.value })}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cancellationPolicy">Cancellation Policy</Label>
          <Textarea 
            id="cancellationPolicy"
            placeholder="e.g. 24 hours notice required for cancellations..."
            rows={3}
            value={profile.cancellationPolicy || ""}
            onChange={(e) => onUpdate({ cancellationPolicy: e.target.value })}
          />
        </div>
        
        <div className="space-y-3">
          <Label>Session Format</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="videoSessions"
                checked={profile.offersVideo || false}
                onCheckedChange={(checked) => onUpdate({ offersVideo: checked })}
              />
              <label htmlFor="videoSessions" className="font-secondary text-sm">
                Video sessions
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="phoneSessions"
                checked={profile.offersPhone || false}
                onCheckedChange={(checked) => onUpdate({ offersPhone: checked })}
              />
              <label htmlFor="phoneSessions" className="font-secondary text-sm">
                Phone sessions
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface VideoUploadSectionProps {
  profile: TherapistProfile;
  onUpdate: (updates: Partial<TherapistProfile>) => void;
}

export function VideoUploadSection({ profile, onUpdate }: VideoUploadSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-primary">Introduction Video</CardTitle>
        <p className="text-sm text-text-secondary font-secondary">
          Upload a 30-60 second video introducing yourself to potential clients
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {profile.videoUrl ? (
          <div className="space-y-4">
            <div className="relative bg-surface-secondary rounded-lg overflow-hidden">
              <video
                src={profile.videoUrl}
                className="w-full h-48 object-cover"
                controls={false}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[--hover-overlay]">
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full w-16 h-16"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                Replace Video
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => onUpdate({ videoUrl: null })}
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 mx-auto text-text-muted mb-4" />
            <div className="space-y-2">
              <p className="font-secondary text-sm text-text-primary">
                Click to upload your introduction video
              </p>
              <p className="font-secondary text-xs text-text-muted">
                MP4, MOV up to 50MB • 30-60 seconds recommended
              </p>
            </div>
            <Button className="mt-4">
              Choose File
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}