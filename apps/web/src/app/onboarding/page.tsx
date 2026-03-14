"use client"

import { useOnboarding, stepIndex, TOTAL_STEPS } from "@/lib/store/onboarding"
import BrandMesh from "@/components/brand/BrandMesh"
import StepWelcome from "@/components/onboarding/StepWelcome"
import StepFocus from "@/components/onboarding/StepFocus"
import StepAccount from "@/components/onboarding/StepAccount"
import StepNatal from "@/components/onboarding/StepNatal"
import StepPrivacy from "@/components/onboarding/StepPrivacy"
import StepFirstRelationship from "@/components/onboarding/StepFirstRelationship"
import StepFirstEvent from "@/components/onboarding/StepFirstEvent"
import StepFirstInsight from "@/components/onboarding/StepFirstInsight"
import StepGuidedTour from "@/components/onboarding/StepGuidedTour"

const STEP_COMPONENTS = {
  welcome: StepWelcome,
  focus: StepFocus,
  account: StepAccount,
  natal: StepNatal,
  privacy: StepPrivacy,
  "first-relationship": StepFirstRelationship,
  "first-event": StepFirstEvent,
  "first-insight": StepFirstInsight,
  "guided-tour": StepGuidedTour,
}

export default function OnboardingPage() {
  const step = useOnboarding((s) => s.step)
  const StepComponent = STEP_COMPONENTS[step]
  const current = stepIndex(step) + 1

  return (
    <main className="canvas-base relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 text-[var(--text-primary)]">
      <BrandMesh />
      <div className="relative w-full max-w-lg space-y-8">
        {step !== "welcome" && (
          <div className="flex items-center gap-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-white/50 transition-all duration-500"
                style={{ width: `${(current / TOTAL_STEPS) * 100}%` }}
              />
            </div>
            <span className="text-xs tabular-nums text-[var(--text-muted)]">
              {current}/{TOTAL_STEPS}
            </span>
          </div>
        )}
        <StepComponent />
      </div>
    </main>
  )
}
