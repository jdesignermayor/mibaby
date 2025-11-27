import { getProcessedImage } from "@/app/actions/illustration";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { ImageItem } from "@/models/illustration.model";
import { Suspense } from "react";
import ImageSelectorToggleCard from "./ImageSelectorToggleCard";

const SkeletonImageSelector = () => {
  return (
    <div className="flex gap-2">
      <Skeleton className="w-full h-18 flex items-center p-2">
        <p className="text-sm">Generando imagen...</p>
      </Skeleton>
    </div>
  );
};

async function ImageProcessor({ image }: { image: ImageItem }) {
  const getImageInformation = async () => {
    const processedImage = await getProcessedImage(image);
    console.log("processedImage:", processedImage);
    return processedImage;
  };

  const onRetry = async () => {
    console.log("onRetry:", image.id);
    const processedImage = await getImageInformation();
    return processedImage;
  };

  try {
    // 20% probabilidad de fallo
    if (Math.random() < 0.3) throw new Error("falló");
    const processedImage = await getImageInformation();

    return (
      <ImageSelectorToggleCard details={processedImage} isSelected={false} />
    );
  } catch {
    return (
      <p>
        Error cargando {image.id}{" "}
        <Button variant="outline" onClick={() => {}}>
          Retry
        </Button>
      </p>
    );
  }
}

export default function ImageSelectorPanel({
  images,
}: {
  images: ImageItem[];
}) {
  console.log("images:", images);

  return (
    <div className="flex flex-col gap-2 border p-4 rounded-md w-72 h-[81dvh]">
      <div className=" text-sm">
        <p className="font-bold">Imagenes de escaneo</p>
        <p className="text-gray-500">{images?.length} escaneos</p>
      </div>
      <div className="grid gap-2">
        {images.map((item) => (
          <Suspense fallback={<SkeletonImageSelector />} key={item.id}>
            <ImageProcessor image={item} />
          </Suspense>
        ))}
      </div>
      {/* <div className="flex flex-col gap-3">
        {images.map((item) =>
          item.isReady ? (
            <ImageSelectorToggleCard
              key={item.id}
              details={item}
              isSelected={false}
            />
          ) : (
            
          ),
        )}
      </div> */}
    </div>
  );
}
