import * as React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tag } from "@/components/ui/tag";

interface FiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}

const modalityOptions = ["CBT", "Psychodynamic", "Humanistic", "EMDR", "DBT"];
const personalityOptions = ["Empathetic", "Structured", "Flexible", "Calm", "Direct", "Exploratory"];
const specialtyOptions = ["Anxiety", "Depression", "Trauma", "Relationships", "Work Stress", "Identity"];

export function FiltersDialog({ open, onOpenChange, trigger }: FiltersDialogProps) {
  const [selectedModality, setSelectedModality] = React.useState<string | null>(null);
  const [selectedPersonality, setSelectedPersonality] = React.useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = React.useState<string[]>([]);

  const handlePersonalityToggle = (personality: string) => {
    if (selectedPersonality.includes(personality)) {
      setSelectedPersonality(selectedPersonality.filter(p => p !== personality));
    } else if (selectedPersonality.length < 3) {
      setSelectedPersonality([...selectedPersonality, personality]);
    }
  };

  const handleSpecialtyToggle = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else if (selectedSpecialties.length < 3) {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-primary">Filter Therapists</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Modality - Single Selection */}
          <div>
            <h3 className="font-secondary font-semibold mb-2">Modality (select one)</h3>
            <div className="flex flex-wrap gap-2">
              {modalityOptions.map((modality) => (
                <button
                  key={modality}
                  onClick={() => setSelectedModality(
                    selectedModality === modality ? null : modality
                  )}
                  className={`${
                    selectedModality === modality 
                      ? "bg-tag-modality text-tag-modality-foreground" 
                      : "bg-surface-accent text-text-primary hover:bg-tag-modality hover:text-tag-modality-foreground"
                  } px-3 py-1 text-sm rounded-pill transition-colors`}
                >
                  {modality}
                </button>
              ))}
            </div>
          </div>

          {/* Personality - Max 3 */}
          <div>
            <h3 className="font-secondary font-semibold mb-2">
              Personality (max 3) 
              <span className="text-sm text-text-secondary ml-2">
                {selectedPersonality.length}/3
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {personalityOptions.map((personality) => {
                const isSelected = selectedPersonality.includes(personality);
                const isDisabled = !isSelected && selectedPersonality.length >= 3;
                
                return (
                  <button
                    key={personality}
                    onClick={() => handlePersonalityToggle(personality)}
                    disabled={isDisabled}
                    className={`${
                      isSelected 
                        ? "bg-tag-personality text-tag-personality-foreground" 
                        : isDisabled
                          ? "bg-surface text-text-secondary cursor-not-allowed"
                          : "bg-surface-accent text-text-primary hover:bg-tag-personality hover:text-tag-personality-foreground"
                    } px-3 py-1 text-sm rounded-pill transition-colors`}
                  >
                    {personality}
                  </button>
                );
              })}
            </div>
            {selectedPersonality.length >= 3 && (
              <p className="text-sm text-text-secondary mt-2">
                Maximum selections reached. Deselect to choose different options.
              </p>
            )}
          </div>

          {/* Specialties - Max 3 */}
          <div>
            <h3 className="font-secondary font-semibold mb-2">
              Specialties (max 3)
              <span className="text-sm text-text-secondary ml-2">
                {selectedSpecialties.length}/3
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {specialtyOptions.map((specialty) => {
                const isSelected = selectedSpecialties.includes(specialty);
                const isDisabled = !isSelected && selectedSpecialties.length >= 3;
                
                return (
                  <button
                    key={specialty}
                    onClick={() => handleSpecialtyToggle(specialty)}
                    disabled={isDisabled}
                    className={`${
                      isSelected 
                        ? "bg-tag-specialty text-tag-specialty-foreground" 
                        : isDisabled
                          ? "bg-surface text-text-secondary cursor-not-allowed"
                          : "bg-surface-accent text-text-primary hover:bg-tag-specialty hover:text-tag-specialty-foreground"
                    } px-3 py-1 text-sm rounded-pill transition-colors`}
                  >
                    {specialty}
                  </button>
                );
              })}
            </div>
            {selectedSpecialties.length >= 3 && (
              <p className="text-sm text-text-secondary mt-2">
                Maximum selections reached. Deselect to choose different options.
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              // Apply filters logic here
              console.log("Applying filters:", {
                modality: selectedModality,
                personality: selectedPersonality,
                specialties: selectedSpecialties
              });
              onOpenChange(false);
            }}
            className="flex-1"
          >
            Save Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}