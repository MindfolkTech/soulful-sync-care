// Database taxonomy data - sourced from Supabase specialities and modalities tables
// Last updated: 2025-09-28 from MCP audit

export interface Speciality {
  id: string;
  name: string;
  description?: string;
}

export interface Modality {
  id: string;
  name: string;
  description?: string;
}

// Specialities from database (24 total)
export const SPECIALITIES: Speciality[] = [
  { id: "1", name: "Anger management" },
  { id: "2", name: "Anxiety" },
  { id: "3", name: "Autism" },
  { id: "4", name: "Bipolar disorder" },
  { id: "5", name: "Bullying" },
  { id: "6", name: "Career difficulties" },
  { id: "7", name: "Chronic illness" },
  { id: "8", name: "Concentration, memory and focus (ADHD)" },
  { id: "9", name: "Coping with addictions" },
  { id: "10", name: "Depression" },
  { id: "11", name: "Eating disorders" },
  { id: "12", name: "Executive and Professional coaching" },
  { id: "13", name: "Family conflict" },
  { id: "14", name: "Grief and loss" },
  { id: "15", name: "LGBT-related issues" },
  { id: "16", name: "Motivation and self-esteem" },
  { id: "17", name: "OCD" },
  { id: "18", name: "Parenting issues" },
  { id: "19", name: "Phobias" },
  { id: "20", name: "PTSD" },
  { id: "21", name: "Race and racial identity" },
  { id: "22", name: "Relationship and intimacy issues" },
  { id: "23", name: "Tourettes syndrome" },
  { id: "24", name: "Trauma and abuse" }
];

// Modalities from database (10 total)
export const MODALITIES: Modality[] = [
  { id: "1", name: "Cognitive Behavioural Therapy (CBT)" },
  { id: "2", name: "Compassion Focused Therapy (CFT)" },
  { id: "3", name: "EMDR Therapy" },
  { id: "4", name: "Family systems therapy" },
  { id: "5", name: "Integrative/eclectic approach" },
  { id: "6", name: "Interpersonal Therapy" },
  { id: "7", name: "Mindfulness-based Therapy (MBCT)" },
  { id: "8", name: "Person-centered Therapy" },
  { id: "9", name: "Psychodynamic therapy" },
  { id: "10", name: "Trauma-focused therapy" }
];

// Helper functions for components
export function getSpecialities(): Speciality[] {
  return SPECIALITIES;
}

export function getModalities(): Modality[] {
  return MODALITIES;
}

export function findSpecialityByName(name: string): Speciality | undefined {
  return SPECIALITIES.find(s => s.name === name);
}

export function findModalityByName(name: string): Modality | undefined {
  return MODALITIES.find(m => m.name === name);
}