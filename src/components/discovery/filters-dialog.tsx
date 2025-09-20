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

interface FiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // TODO: Add props for current filters and an onApplyFilters callback
}

// These options should eventually come from a central source or API
const specialtyOptions = ["Anxiety", "Depression", "Trauma", "Relationships", "Work Stress", "Identity", "Grief", "ADHD"];
const modalityOptions = ["CBT", "Psychodynamic", "Humanistic", "EMDR", "DBT", "Mindfulness-based"];
const personalityOptions = ["Empathetic", "Structured", "Flexible", "Calm", "Direct", "Exploratory"];
const genderOptions = ["Male", "Female", "Non-binary", "No preference"];
const experienceOptions = ["No preference", "Under 5 years", "5-10 years", "10+ years"];

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


export function FiltersDialog({ open, onOpenChange }: FiltersDialogProps) {
    const [priceRange, setPriceRange] = React.useState([20, 150]);
    const [therapistGender, setTherapistGender] = React.useState("No preference");
    const [experience, setExperience] = React.useState("No preference");
    const [specialties, setSpecialties] = React.useState<string[]>([]);
    const [modalities, setModalities] = React.useState<string[]>([]);

    const handleSpecialtyToggle = (specialty: string) => {
        setSpecialties(prev => prev.includes(specialty) ? prev.filter(s => s !== specialty) : [...prev, specialty]);
    };
    
    const handleModalityToggle = (modality: string) => {
        setModalities(prev => prev.includes(modality) ? prev.filter(m => m !== modality) : [...prev, modality]);
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
            
            <FilterSection title="Price Range per Session">
                <Slider
                    defaultValue={priceRange}
                    max={250}
                    step={10}
                    onValueChange={setPriceRange}
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
          <Button onClick={() => onOpenChange(false)}>Save Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
