import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ImageSetItem } from "@/models/illustration.model";
import Image from "next/image";

export default function ImageSelectorToggleCard({
  details,
  isSelected,
}: {
  details: ImageSetItem;
  isSelected: boolean;
}) {
  return (
    <div
      className={cn(
        "hover:opacity-30 cursor-pointer flex p-2 border gap-2.5 items-center rounded-md",
        isSelected && "opacity-30",
      )}
    >
        <div>
          <div className="relative w-20 h-14 shrink-0 rounded bg-black overflow-hidden border border-slate-300 dark:border-slate-700">
            <div className="absolute inset-0 w-1/2">
              <Image
                alt="3D"
                fill={true}
                className="object-cover"
                src={details.images.base}
              />
            </div>
            <div className="absolute inset-0 left-1/2">
              <Image
                alt="AI"
                fill={true}
                className="object-cover"
                src={details.images.converted}
              />
            </div>
            <div className="absolute inset-y-0 left-1/2 w-px bg-white/60"></div>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold">{details.description}</p>
          <p className="text-sm text-muted-foreground">{details.gestationalWeek}</p>
        </div>
     </div>
  );
}
