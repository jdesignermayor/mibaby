"use client";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AIGenerateImageModelRequest } from "@/models/ai.model";
import {
  ILLUSTRATION_STATUS,
  type Illustration,
  type ImageDataFormat,
} from "@/models/illustration.model";
import { illustrationAtomState } from "@/stores/features/illustration.store";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useAtom } from "jotai";
import {
  AlertCircleIcon,
  CheckIcon,
  RefreshCcwIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import "react-photo-album/rows.css";
import ComparisonSlider from "./ComparisonSlider";
import ViewModePanel, {
  DEFAULT_VIEW_MODE,
  type ViewMode,
} from "./ViewModePanel";

const verticalHeights = [
  "h-[620px]",
  "h-[584px]",
  "h-[500px]",
  "h-[600px]",
  "h-[480px]",
];

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPk5uSuBwAA5gCg3ColJwAAAABJRU5ErkJggg==";

const generateImageModelPromise = async (
  imageRequest: AIGenerateImageModelRequest,
) => {
  console.log("imageRequest:", imageRequest);

  //await new Promise((resolve) => setTimeout(resolve, 1000));
  return fetch(`/api/generate-image-model`, {
    method: "POST",
    body: JSON.stringify(imageRequest),
  });
};

const MasonryCard = ({
  data,
  onRetry,
  onClick,
}: {
  data: ImageDataFormat;
  onRetry: (image: ImageDataFormat) => void;
  onClick: () => void;
}) => {
  // const [heightClass, setHeightClass] = useState("h-80");

  // useEffect(() => {
  //   const random =
  //     verticalHeights[Math.floor(Math.random() * verticalHeights.length)];
  //   setHeightClass(random);
  // }, []);

  return (
    <Card
      className="break-inside-avoid mb-4 cursor-pointer border-none shadow-none p-0 hover:opacity-80"
      onClick={data.isFinished ? onClick : undefined}
    >
      {/* Usamos la clase calculada en el estado */}
      <div
        className={`relative group w-full overflow-hidden rounded-lg transition-all duration-500 ${data.isFinished && " ring-offset-2 ring-offset-background ring-3 ring-primary cursor-pointer hover:opacity-40"} ${data.isFailed && " ring-offset-3 ring-offset-background ring-2 ring-red-500 "}`}
      >
        {data.isFinished && !data.isPending && !data.isFailed ? (
          <p className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 text-lg rounded z-10 flex items-center gap-2">
            <CheckIcon className="size-4" /> Generado, Click para ver
          </p>
        ) : data.isFailed ? (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-2">
            <p className=" top-2 left-2 bg-black/50 text-white px-2 py-1 text-lg rounded z-10 flex items-center gap-2">
              <AlertCircleIcon className="size-4" />
              Error al generar la imagen
            </p>
            <Button
              variant="outline"
              className="cursor-pointer z-10"
              onClick={() => onRetry(data)}
            >
              <RefreshCcwIcon className="size-4" /> Reintentar
            </Button>
          </div>
        ) : (
          <div>
            <p className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 text-lg rounded z-10">
              Generando...
            </p>
          </div>
        )}

        <Image
          className={cn(
            "w-full h-full object-cover",
            data.isPending || data.isFailed
              ? "opacity-50 blur-lg"
              : "opacity-100 blur-0",
          )}
          priority={true}
          fetchPriority="high"
          loading="eager"
          blurDataURL={BLUR_DATA_URL}
          placeholder="blur"
          src={data.images.unprocessed.publicUrl}
          alt={data.id}
          width={600}
          height={800}
        />
      </div>
    </Card>
  );
};

const DisplayImageInfoPanel = ({
  image,
  onClose,
}: {
  image: ImageDataFormat | null;
  onClose: () => void;
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE);

  if (!image) return null;

  const handleViewModeChange = (viewMode: "split" | "original" | "hyper") => {
    setViewMode(viewMode);
  };

  return (
    <div className="absolute transition-all duration-300 top-0 left-0 w-full h-dvh text-white flex flex-col z-50 bg-black/95 overflow-hidden backdrop-blur-sm ">
      <div className="flex justify-end items-center p-4  ">
        <Button
          variant="ghost"
          className="cursor-pointer z-10"
          onClick={onClose}
        >
          <XIcon className="size-9" />
        </Button>
      </div>
      <div className="flex justify-center items-center p-4 ">
        <ViewModePanel onViewModeChange={handleViewModeChange} />
      </div>
      <div className="flex items-center justify-center w-full min-h-[60vh] px-4 py-6 rounded-xl">
        {viewMode === "hyper" && (
          <div className="w-full max-w-3xl lg:max-w-4xl 2xl:max-w-5xl flex justify-center items-center">
            <Image
              src={image.images.processed.publicUrl}
              alt={image.id}
              width={1000}
              height={1000}
              sizes="(max-width: 768px) 100vw, 90vw"
              priority={true}
              className="
            rounded-xl
            aspect-square
            object-cover
          "
            />
          </div>
        )}
        {viewMode === "split" && (
          <div className="w-full max-w-3xl lg:max-w-4xl 2xl:max-w-5xl flex justify-center items-center">
            <ComparisonSlider image={image} />
          </div>
        )}
        {viewMode === "original" && (
          <div className="w-full max-w-3xl lg:max-w-4xl 2xl:max-w-5xl flex justify-center items-center">
            <Image
              src={image.images.unprocessed.publicUrl}
              alt={image.id}
              width={1000}
              height={1000}
              sizes="(max-width: 768px) 100vw, 90vw"
              priority={true}
              className="
             rounded-xl
             aspect-square
             object-cover
           "
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default function ImageSelectorPanel({
  illustration,
}: {
  illustration: Illustration;
}) {
  const [images, setImages] = useState<ImageDataFormat[]>([]);
  const [showImageInfoPanel, setShowImageInfoPanel] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageDataFormat | null>(
    null,
  );

  const [illustrationState, setIllustrationState] = useAtom(
    illustrationAtomState,
  );
  const [, startTransition] = useTransition();

  const refreshImages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("tbl_illustrations")
        .select("images, process_status")
        .eq("id", illustration.id)
        .maybeSingle();

      if (!data) return;

      if (!error) setImages(data.images || []);

      setIllustrationState({
        updatedImages: data?.images || [],
        updatedStatus: data?.process_status || ILLUSTRATION_STATUS.PENDING,
      });
    } catch (error) {
      console.error("error:", error);
      setImages([]);
      setIllustrationState({
        updatedImages: [],
        updatedStatus: ILLUSTRATION_STATUS.FAILED,
      });
    }
  }, [illustration.id, setIllustrationState]);

  const isRunningRef = useRef(false);

  const runSequential = useCallback(async () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    console.log("runSequential was called");
    if (illustration.processStatus === ILLUSTRATION_STATUS.COMPLETED) return;

    try {
      for (const img of illustration.images) {
        if (img.isFinished || img.isFailed) continue;

        console.log("img to process:", img);
        const response = await generateImageModelPromise({
          illustrationId: illustration.id,
          imageId: img.id,
          modelId: illustration.modelId,
          description: illustration.description,
          gestationalWeek: illustration.gestationalWeek || "26",
        });

        if (!response.ok) {
          setImages((prev) =>
            prev.map((imgPrev) =>
              imgPrev.id === img.id ? { ...imgPrev, isFailed: true } : imgPrev,
            ),
          );
          continue;
        }

        await refreshImages();
      }
    } catch (e) {
      alert("error promise fail:" + e);
      console.error("error promise fail:", e);
    } finally {
      isRunningRef.current = false;
    }
  }, [
    illustration.id,
    illustration.processStatus,
    illustration.images,
    illustration.modelId,
    illustration.description,
    illustration.gestationalWeek,
    refreshImages,
  ]);

  const retryImageHandler = useCallback(
    async (image: ImageDataFormat) => {
      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id
            ? { ...img, isFailed: false, isPending: true }
            : img,
        ),
      );

      startTransition(async () => {
        const response = await generateImageModelPromise({
          illustrationId: illustration.id,
          imageId: image.id,
          modelId: illustration.modelId,
          description: illustration.description,
          gestationalWeek: illustration.gestationalWeek || "26",
        });

        if (!response.ok) {
          setImages((prev) =>
            prev.map((imgPrev) =>
              imgPrev.id === image.id
                ? { ...imgPrev, isFailed: true }
                : imgPrev,
            ),
          );
          return;
        }
        await refreshImages();
      });
    },
    [
      illustration.id,
      illustration.modelId,
      illustration.description,
      illustration.gestationalWeek,
      refreshImages,
    ],
  );

  const handleShowImageInfoPanel = useCallback((image: ImageDataFormat) => {
    setShowImageInfoPanel((prev) => !prev);
    setSelectedImage(image);
  }, []);

  const handleCloseImageInfoPanel = useCallback(() => {
    setShowImageInfoPanel(false);
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    if (!illustration.id) return;
    runSequential();
    refreshImages();
  }, [illustration.id, runSequential, refreshImages]);

  return (
    <>
      <div className="max-w-5xl">
        <p>state: {illustrationState.updatedStatus}</p>
        <div>
          {(illustrationState.updatedStatus &&
            illustrationState.updatedStatus ===
              ILLUSTRATION_STATUS.PROCESSING) ||
            (illustrationState.updatedStatus ===
              ILLUSTRATION_STATUS.PENDING && (
              <AnimatedShinyText className="inline-flex text-lg items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ Revelando imagenes, espera un momento...</span>
              </AnimatedShinyText>
            ))}
        </div>
        {images.length > 0 && (
          <div className="h-[85dvh] overflow-y-auto p-8">
            <div className="columns-1 gap-6">
              {images.length > 0 &&
                images.map((data, idx) => (
                  <BlurFade
                    key={data.id}
                    delay={0.25 + idx * 0.05}
                    inView={true}
                  >
                    <MasonryCard
                      key={data.id}
                      data={data}
                      onRetry={() => retryImageHandler(data)}
                      onClick={() => handleShowImageInfoPanel(data)}
                    />
                  </BlurFade>
                ))}
            </div>
          </div>
        )}
      </div>
      {showImageInfoPanel && (
        <DisplayImageInfoPanel
          image={selectedImage}
          onClose={handleCloseImageInfoPanel}
        />
      )}
    </>
  );
}
