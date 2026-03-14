import { create } from "zustand"

export type OnboardingStep =
  | "welcome"
  | "focus"
  | "account"
  | "natal"
  | "privacy"
  | "first-relationship"
  | "first-event"
  | "first-insight"
  | "guided-tour"

export interface OnboardingState {
  step: OnboardingStep
  focus: "personal" | "family" | "team" | null
  fullName: string
  email: string
  password: string
  birthDate: string
  birthTime: string
  birthPlace: string
  timeConfidence: "exact" | "approximate" | "unknown"
  privacyAccepted: boolean
  firstRelationshipName: string
  firstRelationshipType: string
  firstRelationshipBirthDate: string
  firstEventDescription: string
  insightResult: string | null
  setStep: (step: OnboardingStep) => void
  setField: <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => void
}

const STEPS: OnboardingStep[] = [
  "welcome",
  "focus",
  "account",
  "natal",
  "privacy",
  "first-relationship",
  "first-event",
  "first-insight",
  "guided-tour",
]

export function nextStep(current: OnboardingStep): OnboardingStep | null {
  const idx = STEPS.indexOf(current)
  return idx < STEPS.length - 1 ? STEPS[idx + 1] : null
}

export function stepIndex(step: OnboardingStep): number {
  return STEPS.indexOf(step)
}

export const TOTAL_STEPS = STEPS.length

export const useOnboarding = create<OnboardingState>((set) => ({
  step: "welcome",
  focus: null,
  fullName: "",
  email: "",
  password: "",
  birthDate: "",
  birthTime: "",
  birthPlace: "",
  timeConfidence: "unknown",
  privacyAccepted: false,
  firstRelationshipName: "",
  firstRelationshipType: "personal",
  firstRelationshipBirthDate: "",
  firstEventDescription: "",
  insightResult: null,
  setStep: (step) => set({ step }),
  setField: (key, value) => set({ [key]: value } as Partial<OnboardingState>),
}))
