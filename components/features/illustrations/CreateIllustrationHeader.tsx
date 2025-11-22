"use client";

import { createIllustrationAtomState } from "@/stores/shared/create-illustration.store";
import { uiSettingsAtomState } from "@/stores/shared/ui-settings-store";
import { useAtom } from "jotai";

export default function CreateIllustrationHeader() {
  const [createIllustrationState] = useAtom(createIllustrationAtomState);
  const [uiSettings] = useAtom(uiSettingsAtomState);
  const { stepperSteps } = createIllustrationState;

  const { currentStep } = uiSettings.stepper;

  const stepperProps = {
    title: stepperSteps[currentStep - 1].title,
    description: stepperSteps[currentStep - 1].description,
  };

  return (
    <div className="flex flex-col border-b-2 w-full bg-gray-100 px-4 py-2">
      <p className="text-sm">3D Ultrasound → Hyperrealistic Rendering</p>
      <p className="font-bold text-sm">{stepperProps.title}</p>
    </div>
  );
}
