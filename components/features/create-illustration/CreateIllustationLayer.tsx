"use client";

import { SEMANTIC_STEP_PHASE } from "@/models/illustration.model";
import { uiSettingsAtomState } from "@/stores/shared/ui-settings-store";
import { useAtom } from "jotai";
import { GiftIcon, PaletteIcon } from "lucide-react";
import CreateIllustrationDeliveryStep from "./CreateIllustationDeliveryStep";
import CreateIllustrationForm from "./CreateIllustrationFormStep";

export default function CreateIllustationLayer() {
  const [getUIsetting] = useAtom(uiSettingsAtomState);
  const {
    stepper: { currentStep },
  } = getUIsetting;
  const isDelivering = currentStep === SEMANTIC_STEP_PHASE.DELIVERING;

  return (
    <div>
      <div
        className={`flex ${isDelivering ? "" : "justify-center items-center "}p-5`}
      >
        <div className={`grid ${!isDelivering ? "lg:w-2/4 h-full xl:w-2/5" : "w-full"}`}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <p className="font-bold text-lg">
                {currentStep === SEMANTIC_STEP_PHASE.CREATIONAL ? (
                  <>
                    <PaletteIcon className="size-6" />
                    Crear ilustración
                  </>
                ) : (
                  <>
                    <GiftIcon className="size-6" />
                    Egenera el exportable
                  </>
                )}
              </p>
            </div>
            <p className="text-muted-foreground text-sm">
              {currentStep === SEMANTIC_STEP_PHASE.CREATIONAL
                ? "Selecciona el cliente y las ecografias 3D que deseas convertir en ecografias hiperrealistas."
                : "Exporta las ecografias hiperrealistas en diferentes tamanos para compartir."}
            </p>
          </div>
          <div className="pt-6 w-full">
            {isDelivering ? (
              <CreateIllustrationDeliveryStep />
            ) : (
              <CreateIllustrationForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
