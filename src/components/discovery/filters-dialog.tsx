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
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

export interface FilterPreferences {
  specialties: string[];
  modalities: string[];
  communication_preferences?: string[];  // 40% weight - CRITICAL!
  identity_filters?: string[];  
  language_preferences?: string[];  // Hard filter
  budget_range: [number, number];
  therapist_gender: string;
  experience_level: string;
  preferred_times: string[];
  prefers_similar_age?: boolean;
  prefers_cultural_match?: boolean;
}

interface FiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentFilters?: FilterPreferences;
  onApplyFilters: (filters: FilterPreferences) => void;
}

// These options should eventually come from a central source or API
const specialtyOptions = ["Anxiety", "Depression", "Trauma", "Relationships", "Work Stress", "Identity", "Grief", "ADHD"];
const modalityOptions = ["CBT", "Psychodynamic", "Humanistic", "EMDR", "DBT", "Mindfulness-based"];
const personalityOptions = ["Empathetic", "Structured", "Flexible", "Calm", "Direct", "Exploratory"];
const genderOptions = ["Male", "Female", "Non-binary", "No preference"];
const experienceOptions = ["No preference", "Under 5 years", "5-10 years", "10+ years"];
const timePreferenceOptions = [
  "Morning (9am-12pm)",
  "Afternoon (12pm-5pm)", 
  "Evening (5pm-9pm)",
  "Weekends"
];

const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-[var(--space-lg)]">
    <h3 
      className="responsive-text-lg font-semibold text-[hsl(var(--text-primary))] mb-[var(--space-sm)]"
      style={{ fontFamily: 'var(--font-secondary)' }}
    >
      {title}
    </h3>
    {children}
  </div>
);

const CheckboxGroup = ({ options, selected, onToggle }: { options: string[], selected: string[], onToggle: (option: string) => void }) => (
    <div className="grid grid-cols-2 gap-[var(--space-sm)]">
        {options.map(option => (
            <div key={option} className="flex items-center space-x-2">
                <Checkbox id={option} checked={selected.includes(option)} onCheckedChange={() => onToggle(option)} />
                <Label htmlFor={option} style={{ fontFamily: 'var(--font-secondary)' }} className="responsive-text-sm text-[hsl(var(--text-secondary))]">{option}</Label>
            </div>
        ))}
    </div>
);


export function FiltersDialog({ open, onOpenChange, currentFilters, onApplyFilters }: FiltersDialogProps) {
    const { user } = useAuth();
    const [priceRange, setPriceRange] = React.useState<[number, number]>(currentFilters?.budget_range || [20, 150]);
    const [therapistGender, setTherapistGender] = React.useState(currentFilters?.therapist_gender || "No preference");
    const [experience, setExperience] = React.useState(currentFilters?.experience_level || "No preference");
    const [specialties, setSpecialties] = React.useState<string[]>(currentFilters?.specialties || []);
    const [modalities, setModalities] = React.useState<string[]>(currentFilters?.modalities || []);
    const [communicationPrefs, setCommunicationPrefs] = React.useState<string[]>(currentFilters?.communication_preferences || []);
    const [identityFilters, setIdentityFilters] = React.useState<string[]>(currentFilters?.identity_filters || []);
    const [languages, setLanguages] = React.useState<string[]>(currentFilters?.language_preferences || []);
    const [preferredTimes, setPreferredTimes] = React.useState<string[]>(currentFilters?.preferred_times || []);
    const [prefersSimilarAge, setPrefersSimilarAge] = React.useState(currentFilters?.prefers_similar_age || false);
    const [prefersCulturalMatch, setPrefersCulturalMatch] = React.useState(currentFilters?.prefers_cultural_match || false);
    const [isSaving, setIsSaving] = React.useState(false);

    const handleSpecialtyToggle = (specialty: string) => {
        setSpecialties(prev => prev.includes(specialty) ? prev.filter(s => s !== specialty) : [...prev, specialty]);
    };
    
    const handleModalityToggle = (modality: string) => {
        setModalities(prev => prev.includes(modality) ? prev.filter(m => m !== modality) : [...prev, modality]);
    };
    
    const handleCommunicationToggle = (pref: string) => {
        setCommunicationPrefs(prev => prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]);
    };
    
    const handleIdentityToggle = (identity: string) => {
        setIdentityFilters(prev => prev.includes(identity) ? prev.filter(i => i !== identity) : [...prev, identity]);
    };
    
    const handleLanguageToggle = (lang: string) => {
        setLanguages(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
    };

    const handleTimeToggle = (time: string) => {
        setPreferredTimes(prev => prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]);
    };

    const handleSaveFilters = async () => {
        setIsSaving(true);
        const filters: FilterPreferences = {
            specialties,
            modalities,
            communication_preferences: communicationPrefs,
            identity_filters: identityFilters,
            language_preferences: languages,
            budget_range: priceRange,
            therapist_gender: therapistGender,
            experience_level: experience,
            preferred_times: preferredTimes,
            prefers_similar_age: prefersSimilarAge,
            prefers_cultural_match: prefersCulturalMatch
        };

        // Save to database if user is logged in
        if (user) {
            try {
                // Save filter preferences WITHOUT overwriting therapy_goals
                // therapy_goals should only be set from the assessment, not filters
                const { error } = await supabase
                    .from('client_assessments')
                    .upsert({
                        user_id: user.id,
                        // DO NOT SET therapy_goals here - those come from assessment
                        // TODO: Add a separate filter_specialties field if needed
                        therapy_modalities: modalities,
                        budget_range: priceRange,
                        gender_preferences: therapistGender === "No preference" ? [] : [therapistGender],
                        preferred_times: preferredTimes,
                        therapist_age_preference: experience, // Map experience to age preference temporarily
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
      <DialogContent className="w-full max-w-[90vw] sm:max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[90vh] bg-[hsl(var(--surface))]">
        <DialogHeader>
          <DialogTitle 
            className="font-[var(--font-primary)] responsive-text-2xl text-[hsl(var(--text-primary))]"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Refine Your Preferences
          </DialogTitle>
          <DialogDescription 
            className="responsive-text-sm text-[hsl(var(--text-secondary))] mt-[var(--space-xs)]"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Fine-tune your search to find therapists that match your needs
          </DialogDescription>
        </DialogHeader>
        
        <div className="responsive-space-md max-h-[calc(90vh-200px)] overflow-y-auto custom-scrollbar" 
             style={{ paddingRight: 'var(--space-sm)' }}>
            {/* CRITICAL: 40% of matching weight! - From 02-CLIENT-SELECTIONS.md */}
            <FilterSection title="I want my therapist to be...">
                <p className="responsive-text-sm text-[hsl(var(--text-muted))] mb-[var(--space-sm)]" style={{ fontFamily: 'var(--font-secondary)' }}>
                    Choose up to 3 qualities (40% match weight)
                </p>
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
                        <div key={pref} className="flex items-center gap-[var(--space-xs)] p-[var(--space-xs)] rounded-[var(--radius-sm)] hover:bg-[hsl(var(--surface-accent))] transition-colors min-h-[var(--touch-target-min)]">
                            <Checkbox
                                id={`comm-${pref}`}
                                checked={communicationPrefs.includes(pref)}
                                onCheckedChange={() => handleCommunicationToggle(pref)}
                                disabled={!communicationPrefs.includes(pref) && communicationPrefs.length >= 3}
                                className="data-[state=checked]:bg-[hsl(var(--btn-primary-bg))]"
                            />
                            <Label 
                                htmlFor={`comm-${pref}`} 
                                className="responsive-text-sm cursor-pointer flex-1 text-[hsl(var(--text-secondary))]"
                                style={{ fontFamily: 'var(--font-secondary)' }}
                            >
                                {pref}
                            </Label>
                        </div>
                    ))}
                </div>
                {communicationPrefs.length >= 3 && (
                    <p className="text-xs text-amber-600 mt-2">Maximum 3 selections reached</p>
                )}
            </FilterSection>
            
            {/* From 02-CLIENT-SELECTIONS.md - 20% weight */}
            <FilterSection title="What brings you here?">
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Select therapy goals (20% match weight)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                        <div key={goal} className="flex items-center space-x-2 p-1 sm:p-2">
                            <Checkbox
                                id={`goal-${goal}`}
                                checked={specialties.includes(goal)}
                                onCheckedChange={() => handleSpecialtyToggle(goal)}
                                className="data-[state=checked]:bg-primary"
                            />
                            <Label 
                                htmlFor={`goal-${goal}`} 
                                className="font-secondary text-xs sm:text-sm cursor-pointer"
                            >
                                {goal}
                            </Label>
                        </div>
                    ))}
                </div>
            </FilterSection>

            {/* From 02-CLIENT-SELECTIONS.md - 15% weight */}
            <FilterSection title="Therapy Approaches">
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Select preferred modalities (15% match weight)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {modalityOptions.map(modality => (
                        <div key={modality} className="flex items-center space-x-1 sm:space-x-2 p-1">
                            <Checkbox
                                id={`mod-${modality}`}
                                checked={modalities.includes(modality)}
                                onCheckedChange={() => handleModalityToggle(modality)}
                                className="h-4 w-4 data-[state=checked]:bg-primary"
                            />
                            <Label 
                                htmlFor={`mod-${modality}`} 
                                className="font-secondary text-xs sm:text-sm cursor-pointer"
                            >
                                {modality}
                            </Label>
                        </div>
                    ))}
                </div>
            </FilterSection>
            
            {/* From 02-CLIENT-SELECTIONS.md - 20% weight for identity preferences */}
            <FilterSection title="It's important to me that my therapist is...">
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Select identity preferences (20% match weight)
                </p>
                <div className="space-y-2">
                    {[
                        { value: "LGBTQ+ friendly and affirming", label: "LGBTQ+ friendly and affirming" },
                        { value: "Neurodiversity affirming", label: "Neurodiversity affirming" },
                        { value: "Trauma-informed and gentle", label: "Trauma-informed and gentle" },
                        { value: "Culturally sensitive and aware", label: "Culturally sensitive and aware" }
                    ].map(opt => (
                        <div key={opt.value} className="flex items-center space-x-2 p-2 rounded hover:bg-accent/50 transition-colors">
                            <Checkbox
                                id={`identity-${opt.value}`}
                                checked={identityFilters.includes(opt.value)}
                                onCheckedChange={() => handleIdentityToggle(opt.value)}
                                className="data-[state=checked]:bg-primary"
                            />
                            <Label htmlFor={`identity-${opt.value}`} className="font-secondary text-sm cursor-pointer">
                                {opt.label}
                            </Label>
                        </div>
                    ))}
                </div>
            </FilterSection>
            
            {/* Language is a HARD FILTER - blocks matches if not met */}
            <FilterSection title="Language Requirements">
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground mb-2">Select languages the therapist must speak</p>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                        {["English", "Spanish", "French", "Mandarin", "Arabic", "Hindi", "Portuguese", "Bengali", "Urdu", "Polish"].map(lang => (
                            <div key={lang} className="flex items-center space-x-2">
                                <Checkbox
                                    id={lang}
                                    checked={languages.includes(lang)}
                                    onCheckedChange={() => handleLanguageToggle(lang)}
                                />
                                <Label htmlFor={lang} className="font-secondary cursor-pointer text-sm">
                                    {lang}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </FilterSection>
            
            {/* From 02-CLIENT-SELECTIONS.md - 5% weight */}
            <FilterSection title="Preferred Session Times">
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    When would you prefer sessions? (5% match weight)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {timePreferenceOptions.map(time => (
                        <div key={time} className="flex items-center space-x-2 p-1">
                            <Checkbox
                                id={`time-${time}`}
                                checked={preferredTimes.includes(time)}
                                onCheckedChange={() => handleTimeToggle(time)}
                                className="data-[state=checked]:bg-primary"
                            />
                            <Label htmlFor={`time-${time}`} className="font-secondary text-xs sm:text-sm cursor-pointer">
                                {time}
                            </Label>
                        </div>
                    ))}
                </div>
            </FilterSection>
            
            {/* From 02-CLIENT-SELECTIONS.md - Hard Filter */}
            <FilterSection title="Budget per Session">
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Maximum you're willing to pay (Hard filter)
                </p>
                <Slider
                    value={priceRange}
                    max={250}
                    step={10}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-3"
                />
                <div className="flex justify-between font-secondary text-sm text-muted-foreground">
                    <span>£{priceRange[0]}</span>
                    <span>£{priceRange[1]}</span>
                </div>
            </FilterSection>

            {/* From 02-CLIENT-SELECTIONS.md - Conditional Filter */}
            <FilterSection title="Therapist Gender Preference">
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Select your preference (Conditional filter)
                </p>
                <RadioGroup value={therapistGender} onValueChange={setTherapistGender}>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {genderOptions.map(option => (
                            <div key={option} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-accent/50">
                                <RadioGroupItem value={option} id={`gender-${option}`} className="text-primary" />
                                <Label htmlFor={`gender-${option}`} className="font-secondary text-xs sm:text-sm cursor-pointer">
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </div>
                </RadioGroup>
            </FilterSection>

            {/* From 02-CLIENT-SELECTIONS.md - Preference Boost */}
            <FilterSection title="Years of Experience">
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Select your preference (Affects ranking)
                </p>
                <RadioGroup value={experience} onValueChange={setExperience}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {experienceOptions.map(option => (
                            <div key={option} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-accent/50">
                                <RadioGroupItem value={option} id={`exp-${option}`} className="text-primary" />
                                <Label htmlFor={`exp-${option}`} className="font-secondary text-xs sm:text-sm cursor-pointer">
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </div>
                </RadioGroup>
            </FilterSection>
            {/* Additional Preferences */}
            <FilterSection title="Additional Preferences">
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="similar-age"
                            checked={prefersSimilarAge}
                            onCheckedChange={(checked) => setPrefersSimilarAge(!!checked)}
                        />
                        <Label htmlFor="similar-age" className="font-secondary cursor-pointer">
                            Prefer a therapist of similar age to me
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="cultural-match"
                            checked={prefersCulturalMatch}
                            onCheckedChange={(checked) => setPrefersCulturalMatch(!!checked)}
                        />
                        <Label htmlFor="cultural-match" className="font-secondary cursor-pointer">
                            Prefer a therapist who shares my cultural background
                        </Label>
                    </div>
                </div>
            </FilterSection>
        </div>

        <DialogFooter className="gap-[var(--space-sm)] p-[var(--space-md)]">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="min-h-[var(--touch-target-min)] responsive-text-base"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveFilters} 
            disabled={isSaving}
            className="min-h-[var(--touch-target-min)] responsive-text-base bg-[hsl(var(--btn-primary-bg))] text-[hsl(var(--btn-primary-text))]"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            {isSaving ? "Saving..." : "Apply Filters"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
