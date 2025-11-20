"use client";

import { PaletteIcon } from "lucide-react";
import CreateIllustrationForm from "./CreateIllustrationFormStep";

export default function CreateIllustationLayer() {
  return (
    <div>
      <div
        className={`flex items-center w-full overflow-hidden justify-center py-28`}
      >
        <div className={`grid w-[50dvw] xl:w-[40dvw] overflow-hidden`}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <p className="font-bold text-lg">
                <PaletteIcon className="size-6" />
                Crear ilustración
              </p>
            </div>
            <p className="text-muted-foreground text-sm">
              Selecciona el cliente y las ecografias 3D que deseas convertir en
              ecografias hiperrealistas.
            </p>
          </div>
          <div className="w-full">
            <CreateIllustrationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
