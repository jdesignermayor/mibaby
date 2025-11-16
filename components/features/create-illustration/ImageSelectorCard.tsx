import { Card, CardContent } from "@/components/ui/card";
import type { ImageSetItem } from "@/models/illustration.model";
import ImageSelectorToggleCard from "./ImageSelectorToggleCard";

const mockedImages: ImageSetItem[] = [
  {
    id: "1",
    description: "Image description",
    gestationalWeek: "semanas 36",
    images: {
      base: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/3d-ultrasound-technical-scan-orange-tones-technica-wRPVVAFMg8Er73Bzfl1U0nL9fcfXOs.jpg",
      converted:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/hyperrealistic-fetal-face-render-realistic-skin-to-0zw6ROSBcoi7KJX9zDbwhEUAw2t1H8.jpg",
    },
  },
  {
    id: "2",
    description: "Image description",
    gestationalWeek: "semanas 36",
    images: {
      base: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/3d-ultrasound-technical-scan-orange-tones-technica-wRPVVAFMg8Er73Bzfl1U0nL9fcfXOs.jpg",
      converted:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/hyperrealistic-fetal-face-render-realistic-skin-to-0zw6ROSBcoi7KJX9zDbwhEUAw2t1H8.jpg",
    },
  },
  {
    id: "3",
    description: "Image description",
    gestationalWeek: "semanas 36",
    images: {
      base: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/3d-ultrasound-technical-scan-orange-tones-technica-wRPVVAFMg8Er73Bzfl1U0nL9fcfXOs.jpg",
      converted:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/hyperrealistic-fetal-face-render-realistic-skin-to-0zw6ROSBcoi7KJX9zDbwhEUAw2t1H8.jpg",
    },
  },
  {
    id: "4",
    description: "Image description",
    gestationalWeek: "semanas 36",
    images: {
      base: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/3d-ultrasound-technical-scan-orange-tones-technica-wRPVVAFMg8Er73Bzfl1U0nL9fcfXOs.jpg",
      converted:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/hyperrealistic-fetal-face-render-realistic-skin-to-0zw6ROSBcoi7KJX9zDbwhEUAw2t1H8.jpg",
    },
  },
  {
    id: "5",
    description: "Image description",
    gestationalWeek: "semanas 36",
    images: {
      base: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/3d-ultrasound-technical-scan-orange-tones-technica-wRPVVAFMg8Er73Bzfl1U0nL9fcfXOs.jpg",
      converted:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/hyperrealistic-fetal-face-render-realistic-skin-to-0zw6ROSBcoi7KJX9zDbwhEUAw2t1H8.jpg",
    },
  },
  {
    id: "6",
    description: "Image description",
    gestationalWeek: "semanas 36",
    images: {
      base: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/3d-ultrasound-technical-scan-orange-tones-technica-wRPVVAFMg8Er73Bzfl1U0nL9fcfXOs.jpg",
      converted:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/hyperrealistic-fetal-face-render-realistic-skin-to-0zw6ROSBcoi7KJX9zDbwhEUAw2t1H8.jpg",
    },
  },
];
export default function ImageSelectorCard() {
  return (
    <Card className="  w-80">
      <CardContent>
        <div>
          <p>Imagenes procesadas</p>
          <p>10 escaneos</p>
        </div>
        <div className="grid grid-col gap-3">
          {mockedImages.map((image) => (
            <ImageSelectorToggleCard
              key={image.id}
              image={image}
              isSelected={false}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
