export { ProfileStrengthIndicator } from "./ProfileStrengthIndicator";
export type { ProfileStrengthIndicatorProps } from "./ProfileStrengthIndicator";

// Quick Action Cards for Dashboard
export { QuickActionCards } from "./QuickActionCards";
export type { QuickActionCardsProps, QuickAction } from "./QuickActionCards";

// Contextual Onboarding System V2
export { ContextualOnboarding } from "./ContextualOnboarding";
export { OnboardingTooltip } from "./OnboardingTooltip";
export { OnboardingOverlay } from "./OnboardingOverlay";
export {
  useContextualOnboarding,
  OnboardingProvider,
  useOnboardingContext,
  useOnboardingStep
} from "./useContextualOnboarding";
export {
  ONBOARDING_STEPS,
  getStepById,
  getStepsForPage,
  calculateProfileStrengthIncrease,
  getNextIncompleteStep,
  isOnboardingComplete
} from "./steps";
export type { OnboardingStep } from "./steps";