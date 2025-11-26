"use client";

import { PaletteIcon } from "lucide-react";
import CreateIllustrationForm from "./CreateIllustrationForm";

export default function CreateIllustationLayer() {
  return (
    <div>
      <div className={`flex justify-center items-center p-5 px-[25%]`}>
        <div className={`grid w-full`}>
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
          <div className="pt-6 w-full">
            <CreateIllustrationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
