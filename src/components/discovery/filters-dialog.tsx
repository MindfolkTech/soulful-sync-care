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
  budget_range: [number, number];
  therapist_gender: string;
  experience_level: string;
  preferred_times: string[];
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
  <div className="space-y-3">
    <h3 className="font-primary font-semibold text-text-primary">{title}</h3>
    {children}
  </div>
);

const CheckboxGroup = ({ options, selected, onToggle }: { options: string[], selected: string[], onToggle: (option: string) => void }) => (
    <div className="grid grid-cols-2 gap-3">
        {options.map(option => (
            <div key={option} className="flex items-center space-x-2">
                <Checkbox id={option} checked={selected.includes(option)} onCheckedChange={() => onToggle(option)} />
                <Label htmlFor={option} className="font-secondary">{option}</Label>
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
    const [preferredTimes, setPreferredTimes] = React.useState<string[]>(currentFilters?.preferred_times || []);
    const [isSaving, setIsSaving] = React.useState(false);

    const handleSpecialtyToggle = (specialty: string) => {
        setSpecialties(prev => prev.includes(specialty) ? prev.filter(s => s !== specialty) : [...prev, specialty]);
    };
    
    const handleModalityToggle = (modality: string) => {
        setModalities(prev => prev.includes(modality) ? prev.filter(m => m !== modality) : [...prev, modality]);
    };

    const handleTimeToggle = (time: string) => {
        setPreferredTimes(prev => prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]);
    };

    const handleSaveFilters = async () => {
        setIsSaving(true);
        const filters: FilterPreferences = {
            specialties,
            modalities,
            budget_range: priceRange,
            therapist_gender: therapistGender,
            experience_level: experience,
            preferred_times: preferredTimes
        };

        // Save to database if user is logged in
        if (user) {
            try {
                // Update or create client assessment with filter preferences
                const { error } = await supabase
                    .from('client_assessments')
                    .upsert({
                        user_id: user.id,
                        therapy_goals: specialties, // Map to existing field
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-primary text-2xl">Filter Preferences</DialogTitle>
          <DialogDescription>
            Adjust your preferences to find the right therapist for you.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-4">
            <FilterSection title="Therapy Goals (Specialties)">
                <CheckboxGroup options={specialtyOptions} selected={specialties} onToggle={handleSpecialtyToggle} />
            </FilterSection>

            <FilterSection title="Therapy Type (Modalities)">
                <CheckboxGroup options={modalityOptions} selected={modalities} onToggle={handleModalityToggle} />
            </FilterSection>
            
            <FilterSection title="Preferred Session Times">
                <CheckboxGroup options={timePreferenceOptions} selected={preferredTimes} onToggle={handleTimeToggle} />
            </FilterSection>
            
            <FilterSection title="Price Range per Session">
                <Slider
                    value={priceRange}
                    max={250}
                    step={10}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                />
                <div className="flex justify-between font-secondary text-sm text-text-muted">
                    <span>£{priceRange[0]}</span>
                    <span>£{priceRange[1]}</span>
                </div>
            </FilterSection>

            <FilterSection title="Therapist Gender">
                <RadioGroup value={therapistGender} onValueChange={setTherapistGender}>
                    <div className="grid grid-cols-2 gap-3">
                        {genderOptions.map(option => (
                             <div key={option} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={option} />
                                <Label htmlFor={option} className="font-secondary">{option}</Label>
                            </div>
                        ))}
                    </div>
                </RadioGroup>
            </FilterSection>

            <FilterSection title="Experience Level">
                 <RadioGroup value={experience} onValueChange={setExperience}>
                    <div className="space-y-2">
                        {experienceOptions.map(option => (
                             <div key={option} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={option} />
                                <Label htmlFor={option} className="font-secondary">{option}</Label>
                            </div>
                        ))}
                    </div>
                </RadioGroup>
            </FilterSection>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSaveFilters} disabled={isSaving}>
            {isSaving ? "Saving..." : "Apply Filters"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
