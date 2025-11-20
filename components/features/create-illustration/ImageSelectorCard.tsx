"use client";

import { Skeleton } from "@/components/ui/skeleton";
import type { ImageSetItem } from "@/models/illustration.model";
import ImageSelectorToggleCard from "./ImageSelectorToggleCard";

const mockedImages: ImageSetItem[] = [
  {
    id: "1",
    images: {
      base: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/3d-ultrasound-technical-scan-orange-tones-technica-wRPVVAFMg8Er73Bzfl1U0nL9fcfXOs.jpg",
      converted:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/hyperrealistic-fetal-face-render-realistic-skin-to-0zw6ROSBcoi7KJX9zDbwhEUAw2t1H8.jpg",
    },
    isReady: true,
  },
  {
    id: "2",
    images: {
      base: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/3d-ultrasound-technical-scan-orange-tones-technica-wRPVVAFMg8Er73Bzfl1U0nL9fcfXOs.jpg",
      converted:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/hyperrealistic-fetal-face-render-realistic-skin-to-0zw6ROSBcoi7KJX9zDbwhEUAw2t1H8.jpg",
    },
    isReady: true,
  },
  {
    id: "3",
    images: {
      base: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/3d-ultrasound-technical-scan-orange-tones-technica-wRPVVAFMg8Er73Bzfl1U0nL9fcfXOs.jpg",
      converted:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/hyperrealistic-fetal-face-render-realistic-skin-to-0zw6ROSBcoi7KJX9zDbwhEUAw2t1H8.jpg",
    },
    isReady: true,
  },
  {
    id: "4",
    images: {
      base: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/3d-ultrasound-technical-scan-orange-tones-technica-wRPVVAFMg8Er73Bzfl1U0nL9fcfXOs.jpg",
      converted:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/hyperrealistic-fetal-face-render-realistic-skin-to-0zw6ROSBcoi7KJX9zDbwhEUAw2t1H8.jpg",
    },
    isReady: true,
  },
  {
    id: "5",
    images: {
      base: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/3d-ultrasound-technical-scan-orange-tones-technica-wRPVVAFMg8Er73Bzfl1U0nL9fcfXOs.jpg",
      converted:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/hyperrealistic-fetal-face-render-realistic-skin-to-0zw6ROSBcoi7KJX9zDbwhEUAw2t1H8.jpg",
    },
    isReady: false,
  },
  {
    id: "6",
    images: {
      base: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/3d-ultrasound-technical-scan-orange-tones-technica-wRPVVAFMg8Er73Bzfl1U0nL9fcfXOs.jpg",
      converted:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/hyperrealistic-fetal-face-render-realistic-skin-to-0zw6ROSBcoi7KJX9zDbwhEUAw2t1H8.jpg",
    },
    isReady: false,
  },
];
export default function ImageSelectorCard({
  uploadedImages,
}: {
  uploadedImages: ImageSetItem[];
}) {
  return (
    <div className="flex flex-col gap-2 border p-4 rounded-md w-[250px] h-[81dvh]">
      <div className=" text-sm">
        <p>Imagenes procesadas</p>
        <p>10 escaneos</p>
      </div>
      <div className="grid grid-col gap-3 overflow-y-scroll">
        {uploadedImages.map((item) =>
          item.isReady ? (
            <ImageSelectorToggleCard
              key={item.id}
              details={item}
              isSelected={false}
            />
          ) : (
            <div className="flex gap-2" key={item.id}>
              <Skeleton className="w-20 h-14" />
              <Skeleton className="w-full h-14 flex items-center p-2">
                <p className="text-sm">Generando imagen...</p>
              </Skeleton>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
