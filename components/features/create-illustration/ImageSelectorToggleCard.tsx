import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ImageSetItem } from "@/models/illustration.model";
import Image from "next/image";

export default function ImageSelectorToggleCard({
  image,
  isSelected,
}: {
  image: ImageSetItem;
  isSelected: boolean;
}) {
  return (
    <Card
      className={cn(
        "hover:opacity-30 cursor-pointer",
        isSelected && "opacity-30",
      )}
    >
      <CardContent className="flex flex-row gap-2">
        <div>
          <div className="relative w-12 h-12 shrink-0 rounded bg-black overflow-hidden border border-slate-300 dark:border-slate-700">
            <div className="absolute inset-0 w-1/2">
              <Image
                alt="3D"
                fill={true}
                className="object-cover"
                src={image.images.base}
              />
            </div>
            <div className="absolute inset-0 left-1/2">
              <Image
                alt="AI"
                fill={true}
                className="object-cover"
                src={image.images.converted}
              />
            </div>
            <div className="absolute inset-y-0 left-1/2 w-px bg-white/60"></div>
          </div>
        </div>
        <div>
          <p>{image.description}</p>
          <p>{image.gestationalWeek}</p>
        </div>
      </CardContent>
    </Card>
  );
}
