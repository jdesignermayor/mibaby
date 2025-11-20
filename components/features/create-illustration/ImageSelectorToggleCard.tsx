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
    <Card
      className={cn(
        "hover:opacity-30 cursor-pointer flex p-2 border gap-2.5 rounded-md",
        isSelected && "opacity-30",
      )}
    >
      <CardContent>
        <div className="w-[70px] h-[70px] flex rounded">
          <Image
            alt="3D"
            width={70}
            height={70}
            className="object-cover"
            src={details.images.base}
          />

          <Image
            alt="AI"
            width={70}
            height={70}
            className="object-cover"
            src={details.images.converted}
          />
        </div>
      </CardContent>
    </Card>
  );
}
