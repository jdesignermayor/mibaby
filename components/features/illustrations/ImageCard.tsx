import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { ImageDataFormat } from "@/models/illustration.model";
import { RefreshCcwIcon } from "lucide-react";
import ImageSelectorToggleCard from "./ImageSelectorToggleCard";

const SkeletonImageSelector = () => (
  <div className="flex gap-2">
    <Skeleton className="w-full h-18 flex items-center p-2">
      <p className="text-sm">Generando imagen...</p>
    </Skeleton>
  </div>
);

const FailedImageSelector = ({
  details,
  onRetry,
}: {
  details: ImageDataFormat;
  onRetry: () => void;
}) => (
  <div className="w-full h-18 flex items-center p-2 bg-red-100 rounded">
    <p className="text-sm">Error al generar imagen</p>
    <Button variant="outline" className="cursor-pointer" onClick={onRetry}>
      <RefreshCcwIcon className="size-4" /> Reintentar
    </Button>
  </div>
);

export default function ImageCard({
  imageData,
  onRetry,
}: {
  imageData: ImageDataFormat;
  onRetry: () => void;
}) {
  if (imageData.isFinished)
    return <ImageSelectorToggleCard details={imageData} isSelected={false} />;
  if (imageData.isFailed)
    return <FailedImageSelector details={imageData} onRetry={onRetry} />;

  return <SkeletonImageSelector />;
}
