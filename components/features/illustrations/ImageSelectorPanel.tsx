"use client";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
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
import { AlertCircleIcon, CheckIcon, RefreshCcwIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState, useTransition } from "react";
import "react-photo-album/rows.css";

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
}: {
  data: ImageDataFormat;
  onRetry: (image: ImageDataFormat) => void;
}) => {
  const [heightClass, setHeightClass] = useState("h-80");

  useEffect(() => {
    const random =
      verticalHeights[Math.floor(Math.random() * verticalHeights.length)];
    setHeightClass(random);
  }, []);

  return (
    <div className="break-inside-avoid mb-4">
      {/* Usamos la clase calculada en el estado */}
      <div
        className={`relative group w-full ${heightClass} overflow-hidden rounded-lg transition-all duration-500 ${data.isFinished && " ring-offset-2 ring-offset-background ring-3 ring-primary cursor-pointer hover:opacity-40"} ${data.isFailed && " ring-offset-2 ring-offset-background ring-3 ring-red-500 "}`}
      >
        {data.isFinished && !data.isPending && !data.isFailed ? (
          <p className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 text-lg rounded z-10 flex items-center gap-2">
            <CheckIcon className="size-4" /> Generado, Click para ver
          </p>
        ) : data.isFailed ? (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-2">
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
    </div>
  );
};

export default function ImageSelectorPanel({
  illustration,
}: {
  illustration: Illustration;
}) {
  const [images, setImages] = useState<ImageDataFormat[]>([]);
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

  const runSequential = useCallback(async () => {
    if (illustration.processStatus === ILLUSTRATION_STATUS.COMPLETED) return;

    for (const img of illustration.images) {
      if (img.isFinished || img.isFailed) continue;
      try {
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
      } catch (e) {
        alert("error promise fail:" + e);
        console.error("error promise fail:", e);
      }
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

  useEffect(() => {
    queueMicrotask(() => {
      runSequential();
      refreshImages();
    });
  }, [runSequential, refreshImages]);

  return (
    <div className="max-w-5xl">
      <p>state: {illustrationState.updatedStatus}</p>
      <div>
        {(illustrationState.updatedStatus &&
          illustrationState.updatedStatus === ILLUSTRATION_STATUS.PROCESSING) ||
          (illustrationState.updatedStatus === ILLUSTRATION_STATUS.PENDING && (
            <AnimatedShinyText className="inline-flex text-lg items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Generando imagenes, espera un momento...</span>
            </AnimatedShinyText>
          ))}
      </div>
      {images.length > 0 && (
        <div className="h-[88dvh] overflow-y-auto p-8 rounded-xl shadow-inner">
          <div className="columns-2 gap-6">
            {images.length > 0 &&
              images.map((data, idx) => (
                <BlurFade key={data.id} delay={0.25 + idx * 0.05} inView={true}>
                  <MasonryCard
                    key={data.id}
                    data={data}
                    onRetry={() => retryImageHandler(data)}
                  />
                </BlurFade>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
