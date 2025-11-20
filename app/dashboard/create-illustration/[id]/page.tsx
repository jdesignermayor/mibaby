"use client";

import CreateIllustrationDeliveryStep from "@/components/features/create-illustration/CreateIllustationDeliveryStep";
import { useIllustrationById } from "@/hooks/use-company";
import type { Illustration } from "@/models/illustration.model";
import { PaletteIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function CreateIllustrationPageGenerator() {
  const { id } = useParams();
  const { data, loading, error } = useIllustrationById(id as string);

  return (
    <div className="flex flex-col gap-6 px-28 py-10">
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
      <CreateIllustrationDeliveryStep illustrationData={data as Illustration} />
    </div>
  );
}
