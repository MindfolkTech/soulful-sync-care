import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AssessmentState {
  communication_preferences: string[];
  language_preferences: string[];
  identity_preferences: string[];
  therapy_goals: string[];
  therapy_modalities: string[];
  therapist_gender_preference?: string;
  budget_range: [number, number];
  experience_preference: string;
  preferred_times: string[];
  age_group: string;
  prefers_similar_age?: boolean;
  cultural_identity: string[];
  prefers_cultural_background_match?: boolean;
  
  // Actions
  setCommunicationPreferences: (prefs: string[]) => void;
  setLanguagePreferences: (prefs: string[]) => void;
  setIdentityPreferences: (prefs: string[]) => void;
  setTherapyGoals: (goals: string[]) => void;
  setTherapyModalities: (modalities: string[]) => void;
  setTherapistGenderPreference: (preference?: string) => void;
  setBudgetRange: (range: [number, number]) => void;
  setExperiencePreference: (preference: string) => void;
  setPreferredTimes: (times: string[]) => void;
  setAgeGroup: (ageGroup: string) => void;
  setPrefersSimilarAge: (prefers?: boolean) => void;
  setCulturalIdentity: (identity: string[]) => void;
  setPrefersCulturalMatch: (prefers?: boolean) => void;
  reset: () => void;
}

const initialState = {
  communication_preferences: [],
  language_preferences: ['English'],
  identity_preferences: [],
  therapy_goals: [],
  therapy_modalities: [],
  therapist_gender_preference: undefined,
  budget_range: [50, 120] as [number, number],
  experience_preference: 'no_preference',
  preferred_times: [],
  age_group: '25–34',
  prefers_similar_age: false,
  cultural_identity: [],
  prefers_cultural_background_match: false,
};

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set) => ({
      ...initialState,

      setCommunicationPreferences: (prefs) => 
        set({ communication_preferences: prefs }),
      
      setLanguagePreferences: (prefs) => 
        set({ language_preferences: prefs }),
      
      setIdentityPreferences: (prefs) => 
        set({ identity_preferences: prefs }),
      
      setTherapyGoals: (goals) => 
        set({ therapy_goals: goals }),
      
      setTherapyModalities: (modalities) => 
        set({ therapy_modalities: modalities }),
      
      setTherapistGenderPreference: (preference) => 
        set({ therapist_gender_preference: preference }),
      
      setBudgetRange: (range) => 
        set({ budget_range: range }),
      
      setExperiencePreference: (preference) => 
        set({ experience_preference: preference }),
      
      setPreferredTimes: (times) => 
        set({ preferred_times: times }),
      
      setAgeGroup: (ageGroup) => 
        set({ age_group: ageGroup }),
      
      setPrefersSimilarAge: (prefers) => 
        set({ prefers_similar_age: prefers }),
      
      setCulturalIdentity: (identity) => 
        set({ cultural_identity: identity }),
      
      setPrefersCulturalMatch: (prefers) => 
        set({ prefers_cultural_background_match: prefers }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'mindfolk-assessment',
    }
  )
);