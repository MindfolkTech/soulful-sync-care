import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface FilterPreferences {
  specialties: string[];
  modalities: string[];
  communication_preferences?: string[];
  identity_filters?: string[];
  language_preferences?: string[];
  budget_range: [number, number];
  therapist_gender: string;
  experience_level: string;
  preferred_times: string[];
  prefers_similar_age?: boolean;
  prefers_cultural_background_match?: boolean;
  prefers_same_gender?: boolean;
}

interface FiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentFilters?: FilterPreferences;
  onApplyFilters: (filters: FilterPreferences) => void;
}

// Complete list of 50 languages from database
const availableLanguages = [
  "Amharic", "Arabic", "Bengali / Sylheti", "British Sign Language (BSL)", 
  "Bulgarian", "Burmese", "Cantonese", "Croatian", "Czech", "Danish", 
  "Dutch", "English", "Farsi / Dari (Persian)", "Finnish", "French", 
  "German", "Greek", "Gujarati", "Haitian Creole", "Hebrew", "Hindi", 
  "Hungarian", "Igbo", "Italian", "Jamaican Patois (Creole)", "Kurdish", 
  "Latvian", "Lithuanian", "Malay (Bahasa Melayu)", "Mandarin", "Mongolian", 
  "Pashto", "Polish", "Portuguese", "Punjabi", "Romanian", "Russian", 
  "Serbian", "Slovak", "Somali", "Spanish", "Swahili", "Swedish", 
  "Tagalog / Filipino", "Tamil", "Thai", "Turkish", "Urdu", "Vietnamese", "Yoruba"
];

// Consistent filter section component
const FilterSection = ({ title, subtitle, children }: { 
  title: string, 
  subtitle?: string,
  children: React.ReactNode 
}) => (
  <div className="mb-[var(--space-lg)]">
    <h3 
      className="responsive-text-base font-semibold text-[hsl(var(--text-primary))] mb-[var(--space-xs)]"
      style={{ fontFamily: 'var(--font-secondary)' }}
    >
      {title}
    </h3>
    {subtitle && (
      <p 
        className="responsive-text-sm text-[hsl(var(--text-muted))] mb-[var(--space-sm)]"
        style={{ fontFamily: 'var(--font-secondary)' }}
      >
        {subtitle}
      </p>
    )}
    {children}
  </div>
);

export function FiltersDialog({ open, onOpenChange, currentFilters, onApplyFilters }: FiltersDialogProps) {
  const { user } = useAuth();
  
  // State management
  const [priceRange, setPriceRange] = React.useState<[number, number]>(
    currentFilters?.budget_range || [20, 150]
  );
  const [experience, setExperience] = React.useState(
    currentFilters?.experience_level || "No preference"
  );
  const [specialties, setSpecialties] = React.useState<string[]>(
    currentFilters?.specialties || []
  );
  const [modalities, setModalities] = React.useState<string[]>(
    currentFilters?.modalities || []
  );
  const [communicationPrefs, setCommunicationPrefs] = React.useState<string[]>(
    currentFilters?.communication_preferences || []
  );
  const [identityFilters, setIdentityFilters] = React.useState<string[]>(
    currentFilters?.identity_filters || []
  );
  const [languages, setLanguages] = React.useState<string[]>(
    currentFilters?.language_preferences || []
  );
  const [preferredTimes, setPreferredTimes] = React.useState<string[]>(
    currentFilters?.preferred_times || []
  );
  const [isSaving, setIsSaving] = React.useState(false);
  const [languageOpen, setLanguageOpen] = React.useState(false);
  const [languageSearch, setLanguageSearch] = React.useState("");

  // Handlers
  const handleSpecialtyToggle = (specialty: string) => {
    setSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty) 
        : [...prev, specialty]
    );
  };
  
  const handleModalityToggle = (modality: string) => {
    setModalities(prev => 
      prev.includes(modality) 
        ? prev.filter(m => m !== modality) 
        : [...prev, modality]
    );
  };
  
  const handleCommunicationToggle = (pref: string) => {
    setCommunicationPrefs(prev => {
      if (prev.includes(pref)) return prev.filter(p => p !== pref);
      if (prev.length >= 3) return prev; // Limit to 3
      return [...prev, pref];
    });
  };
  
  const handleIdentityToggle = (identity: string) => {
    setIdentityFilters(prev => 
      prev.includes(identity) 
        ? prev.filter(i => i !== identity) 
        : [...prev, identity]
    );
  };
  
  const handleLanguageToggle = (lang: string) => {
    setLanguages(prev => 
      prev.includes(lang) 
        ? prev.filter(l => l !== lang) 
        : [...prev, lang]
    );
  };

  const handleTimeToggle = (time: string) => {
    setPreferredTimes(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time) 
        : [...prev, time]
    );
  };

  const handleSaveFilters = async () => {
    setIsSaving(true);
    
    // Parse identity filters for special preferences
    const prefersSimilarAge = identityFilters.includes("Similar age to me");
    const prefersSameGender = identityFilters.includes("Same gender as me");
    const prefersCulturalMatch = identityFilters.includes("Shares my cultural background");
    
    // Filter out the special preferences from identity filters
    const coreIdentityFilters = identityFilters.filter(f => 
      !["Similar age to me", "Same gender as me", "Shares my cultural background"].includes(f)
    );
    
    const filters: FilterPreferences = {
      specialties,
      modalities,
      communication_preferences: communicationPrefs,
      identity_filters: coreIdentityFilters,
      language_preferences: languages,
      budget_range: priceRange,
      therapist_gender: prefersSameGender ? "Same gender as me" : "No preference",
      experience_level: experience,
      preferred_times: preferredTimes,
      prefers_similar_age: prefersSimilarAge,
      prefers_same_gender: prefersSameGender,
      prefers_cultural_background_match: prefersCulturalMatch
    };

    // Save to database if user is logged in
    if (user) {
      try {
        const { error } = await supabase
          .from('client_assessments')
          .upsert({
            user_id: user.id,
            communication_preferences: communicationPrefs,
            identity_preferences: coreIdentityFilters,
            therapy_modalities: modalities,
            language_preferences: languages,
            budget_range: priceRange,
            preferred_times: preferredTimes,
            experience_preference: experience,
            prefers_similar_age: prefersSimilarAge,
            prefers_same_gender: prefersSameGender,
            prefers_cultural_background_match: prefersCulturalMatch,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id'
          });

        if (error) {
          console.error('Error saving filter preferences:', error);
        }
      } catch (error) {
        console.error('Error saving filter preferences:', error);
      }
    }

    onApplyFilters(filters);
    setIsSaving(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[90vw] sm:max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0">
          <DialogTitle 
            className="responsive-text-2xl text-[hsl(var(--text-primary))]"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Refine Your Preferences
          </DialogTitle>
          <DialogDescription 
            className="responsive-text-sm text-[hsl(var(--text-muted))] mt-[var(--space-xs)]"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Personalize your search to find therapists that match your needs
          </DialogDescription>
        </DialogHeader>
        
        <div 
          className="flex-1 overflow-y-auto custom-scrollbar px-6" 
          style={{ 
            paddingBottom: 'var(--space-md)'
          }}
        >
          {/* Communication Style - Most important filter */}
          <FilterSection 
            title="I want my therapist to be..."
            subtitle="Select up to 3 qualities that resonate with you"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-xs)]">
              {[
                "Warm and empathetic",
                "Motivational and encouraging",
                "Solution-oriented and practical",
                "Pragmatic and action-focused",
                "Flexible and empathetic",
                "Structured and goal-oriented",
                "Exploratory and insight-based",
                "Calm and gentle",
                "Gently challenging"
              ].map(pref => (
                <label
                  key={pref}
                  className={cn(
                    "flex items-center gap-[var(--space-xs)] p-[var(--space-sm)]",
                    "rounded-[var(--radius-sm)] border border-[hsl(var(--border))]",
                    "hover:bg-[hsl(var(--surface-accent))] cursor-pointer transition-colors",
                    "min-h-[var(--touch-target-min)]",
                    communicationPrefs.includes(pref) && "bg-[hsl(var(--surface-accent))]"
                  )}
                >
                  <Checkbox
                    id={`comm-${pref}`}
                    checked={communicationPrefs.includes(pref)}
                    onCheckedChange={() => handleCommunicationToggle(pref)}
                    disabled={!communicationPrefs.includes(pref) && communicationPrefs.length >= 3}
                    className="data-[state=checked]:bg-[hsl(var(--btn-primary-bg))] data-[state=checked]:text-[hsl(var(--btn-primary-text))]"
                  />
                  <span 
                    className="responsive-text-sm text-[hsl(var(--text-secondary))] select-none"
                    style={{ fontFamily: 'var(--font-secondary)' }}
                  >
                    {pref}
                  </span>
                </label>
              ))}
            </div>
            {communicationPrefs.length >= 3 && (
              <p className="responsive-text-xs text-[hsl(var(--warning-text))] mt-[var(--space-xs)]">
                Maximum 3 selections reached
              </p>
            )}
          </FilterSection>

          {/* Focus Areas - Changed from "What brings you here?" */}
          <FilterSection 
            title="I want to focus on..."
            subtitle="Select the areas you'd like to work on"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-xs)]">
              {[
                "Anxiety and everyday worries",
                "Feeling low or depressed",
                "Relationship challenges",
                "Work and life stress",
                "Family and parenting",
                "Identity and self-discovery",
                "Past experiences and trauma",
                "Grief and loss"
              ].map(goal => (
                <label
                  key={goal}
                  className="flex items-center gap-[var(--space-xs)] p-[var(--space-sm)] rounded-[var(--radius-sm)] hover:bg-[hsl(var(--surface-accent))] cursor-pointer transition-colors"
                >
                  <Checkbox
                    checked={specialties.includes(goal)}
                    onCheckedChange={() => handleSpecialtyToggle(goal)}
                    className="data-[state=checked]:bg-[hsl(var(--btn-primary-bg))] data-[state=checked]:text-[hsl(var(--btn-primary-text))]"
                  />
                  <span 
                    className="responsive-text-sm text-[hsl(var(--text-secondary))]"
                    style={{ fontFamily: 'var(--font-secondary)' }}
                  >
                    {goal}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Identity and Matching Preferences - Combined section */}
          <FilterSection 
            title="It's important to me that my therapist is..."
            subtitle="Select any that apply"
          >
            <div className="space-y-[var(--space-xs)]">
              {[
                { value: "LGBTQ+ friendly and affirming", label: "LGBTQ+ friendly and affirming" },
                { value: "Neurodiversity affirming", label: "Neurodiversity affirming" },
                { value: "Trauma-informed and gentle", label: "Trauma-informed and gentle" },
                { value: "Culturally sensitive and aware", label: "Culturally sensitive and aware" },
                { value: "Similar age to me", label: "Similar age to me" },
                { value: "Same gender as me", label: "Same gender as me" },
                { value: "Shares my cultural background", label: "Shares my cultural background" }
              ].map(opt => (
                <label
                  key={opt.value}
                  className="flex items-center gap-[var(--space-xs)] p-[var(--space-sm)] rounded-[var(--radius-sm)] hover:bg-[hsl(var(--surface-accent))] cursor-pointer transition-colors"
                >
                  <Checkbox
                    checked={identityFilters.includes(opt.value)}
                    onCheckedChange={() => handleIdentityToggle(opt.value)}
                    className="data-[state=checked]:bg-[hsl(var(--btn-primary-bg))] data-[state=checked]:text-[hsl(var(--btn-primary-text))]"
                  />
                  <span 
                    className="responsive-text-sm text-[hsl(var(--text-secondary))]"
                    style={{ fontFamily: 'var(--font-secondary)' }}
                  >
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Language Requirements - Searchable dropdown */}
          <FilterSection 
            title="Language Requirements"
            subtitle="Select languages the therapist must speak"
          >
            <Popover open={languageOpen} onOpenChange={setLanguageOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={languageOpen}
                  className="w-full justify-between responsive-text-sm"
                  style={{ fontFamily: 'var(--font-secondary)' }}
                >
                  {languages.length > 0
                    ? `${languages.length} language${languages.length > 1 ? 's' : ''} selected`
                    : "Select languages..."}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput 
                    placeholder="Search languages..." 
                    value={languageSearch}
                    onValueChange={setLanguageSearch}
                  />
                  <CommandEmpty>No language found.</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-y-auto">
                    {availableLanguages
                      .filter(lang => 
                        lang.toLowerCase().includes(languageSearch.toLowerCase())
                      )
                      .map(lang => (
                        <CommandItem
                          key={lang}
                          onSelect={() => {
                            handleLanguageToggle(lang);
                            setLanguageSearch("");
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              languages.includes(lang) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {lang}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {languages.length > 0 && (
              <div className="flex flex-wrap gap-[var(--space-xs)] mt-[var(--space-sm)]">
                {languages.map(lang => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-[var(--space-xs)] px-[var(--space-sm)] py-1 rounded-[var(--radius-pill)] bg-[hsl(var(--tag-language-bg))] text-[hsl(var(--tag-language-text))] responsive-text-xs"
                    style={{ fontFamily: 'var(--font-secondary)' }}
                  >
                    {lang}
                    <button
                      onClick={() => handleLanguageToggle(lang)}
                      className="hover:opacity-70"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </FilterSection>

          {/* Therapy Approaches - Complete list from database */}
          <FilterSection 
            title="Therapy Approaches"
            subtitle="Select your preferred modalities"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--space-xs)]">
              {[
                "Cognitive Behavioural Therapy (CBT)",
                "Compassion Focused Therapy (CFT)",
                "EMDR Therapy",
                "Family systems therapy",
                "Integrative/eclectic approach",
                "Interpersonal Therapy",
                "Mindfulness-based Therapy (MBCT)",
                "Person-centered Therapy",
                "Psychodynamic therapy",
                "Trauma-focused therapy"
              ].map(modality => (
                <label
                  key={modality}
                  className="flex items-center gap-[var(--space-xs)] p-[var(--space-sm)] rounded-[var(--radius-sm)] hover:bg-[hsl(var(--surface-accent))] cursor-pointer"
                >
                  <Checkbox
                    checked={modalities.includes(modality)}
                    onCheckedChange={() => handleModalityToggle(modality)}
                    className="data-[state=checked]:bg-[hsl(var(--btn-primary-bg))] data-[state=checked]:text-[hsl(var(--btn-primary-text))]"
                  />
                  <span 
                    className="responsive-text-sm text-[hsl(var(--text-secondary))]"
                    style={{ fontFamily: 'var(--font-secondary)' }}
                  >
                    {modality}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Session Times */}
          <FilterSection 
            title="Preferred Session Times"
            subtitle="When would you prefer to have sessions?"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-xs)]">
              {[
                "Morning (9am-12pm)",
                "Afternoon (12pm-5pm)",
                "Evening (5pm-9pm)",
                "Weekends"
              ].map(time => (
                <label
                  key={time}
                  className="flex items-center gap-[var(--space-xs)] p-[var(--space-sm)] rounded-[var(--radius-sm)] hover:bg-[hsl(var(--surface-accent))] cursor-pointer"
                >
                  <Checkbox
                    checked={preferredTimes.includes(time)}
                    onCheckedChange={() => handleTimeToggle(time)}
                    className="data-[state=checked]:bg-[hsl(var(--btn-primary-bg))] data-[state=checked]:text-[hsl(var(--btn-primary-text))]"
                  />
                  <span 
                    className="responsive-text-sm text-[hsl(var(--text-secondary))]"
                    style={{ fontFamily: 'var(--font-secondary)' }}
                  >
                    {time}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Experience Level - Updated options */}
          <FilterSection 
            title="Years of Experience"
            subtitle="Select your preference"
          >
            <RadioGroup value={experience} onValueChange={setExperience}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-xs)]">
                {["No preference", "More than 2 years", "More than 5 years", "More than 10 years"].map(option => (
                  <label
                    key={option}
                    className="flex items-center gap-[var(--space-xs)] p-[var(--space-sm)] rounded-[var(--radius-sm)] border border-[hsl(var(--border))] hover:bg-[hsl(var(--surface-accent))] cursor-pointer"
                  >
                    <RadioGroupItem value={option} className="text-[hsl(var(--btn-primary-bg))]" />
                    <span 
                      className="responsive-text-sm text-[hsl(var(--text-secondary))]"
                      style={{ fontFamily: 'var(--font-secondary)' }}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </FilterSection>

          {/* Budget */}
          <FilterSection 
            title="Budget per Session"
            subtitle="Maximum you're willing to pay"
          >
            <Slider
              value={priceRange}
              max={250}
              step={10}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="mb-[var(--space-sm)]"
            />
            <div className="flex justify-between">
              <span 
                className="responsive-text-sm text-[hsl(var(--text-muted))]"
                style={{ fontFamily: 'var(--font-secondary)' }}
              >
                £{priceRange[0]}
              </span>
              <span 
                className="responsive-text-sm text-[hsl(var(--text-muted))]"
                style={{ fontFamily: 'var(--font-secondary)' }}
              >
                £{priceRange[1]}
              </span>
            </div>
          </FilterSection>
        </div>

        {/* Footer contained with proper padding */}
        <div className="flex gap-[var(--space-sm)] px-6 pb-6 pt-4 flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="flex-1 min-h-[var(--touch-target-min)] responsive-text-base"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveFilters} 
            disabled={isSaving}
            className="flex-1 min-h-[var(--touch-target-min)] responsive-text-base bg-[hsl(var(--btn-primary-bg))] text-[hsl(var(--btn-primary-text))] hover:opacity-90"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            {isSaving ? "Saving..." : "Apply Filters"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
