"use client";

import { ImgComparisonSlider } from '@img-comparison-slider/react';
import ImageSelectorCard from "./ImageSelectorCard";
import ViewModePanel from "./ViewModePanel";
import { Button } from "@/components/ui/button";
import { FolderDownIcon, SendIcon } from "lucide-react";
import Image from "next/image";

export default function CreateIllustrationDeliveryStep() {

  return (
    <div>
      <div className="flex w-full gap-6">
        <div className="grid gap-3 w-[calc(39dvw)] h-[calc(20dvh)]">
          <ViewModePanel />
          <div className=" w-full">
            <ImgComparisonSlider className=" rounded-xl">
              <img slot="first" className="w-full h-full object-cover" src="/images/demo-image-basic.jpg" />
              <img slot="second" className="w-full h-full object-cover" src="/images/demo-image-transformed.jpg" />
            </ImgComparisonSlider>
          </div>
        </div>
        <div className="flex gap-2">
          <ImageSelectorCard />
          <div className="flex flex-col gap-2 border p-4 rounded-md w-[250px] h-[81dvh]">
            <div className=" text-sm">
              <p>Acciones rápidas</p>
            </div>
            <div className="grid gap-2">
              <Button>
              <FolderDownIcon />
              Descargar imagenes en zip
              </Button>
              <Button variant="outline">
              <SendIcon />
                Enviar imagenes al correo</Button>
              <Button variant="outline">
                <Image src="/icons/whatsapp.svg" alt="Whatsapp" width={20} height={20} />
                Enviar imagenes Whatsapp</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
