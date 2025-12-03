"use client";

import type { AIGenerateImageModelRequest } from "@/models/ai.model";
import {
  ILLUSTRATION_STATUS,
  type Illustration,
  type ImageDataFormat,
} from "@/models/illustration.model";
import { illustrationAtomState } from "@/stores/features/illustration.store";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import ImageCard from "./ImageCard";

const generateImageModelPromise = async (
  imageRequest: AIGenerateImageModelRequest,
) => {
  return fetch(`/api/generate-image-model`, {
    method: "POST",
    body: JSON.stringify(imageRequest),
  });
};

export default function ImageSelectorPanel({
  illustration,
}: {
  illustration: Illustration;
}) {
  const [images, setImages] = useState<ImageDataFormat[]>([]);
  const [, setIllustrationState] = useAtom(illustrationAtomState);

  const refreshImages = useCallback(async () => {
    const { data, error } = await supabase
      .from("tbl_illustrations")
      .select("images, process_status")
      .eq("id", illustration.id)
      .maybeSingle();

    setIllustrationState({
      updatedImages: data?.images || [],
      updatedStatus: data?.process_status || ILLUSTRATION_STATUS.PENDING,
    });

    if (!error) setImages(data?.images || []);
  }, [illustration.id, setIllustrationState]);

  const runSequential = useCallback(async () => {
    if (
      illustration.processStatus === ILLUSTRATION_STATUS.COMPLETED ||
      illustration.processStatus === ILLUSTRATION_STATUS.PROCESSING
    )
      return;

    for (const img of illustration.images || []) {
      try {
        if (img.isFinished) return;

        await generateImageModelPromise({
          illustrationId: illustration.id,
          imageId: img.id,
          modelId: illustration.modelId,
          description: illustration.description,
          gestationalWeek: illustration.gestationalWeek || "26",
        });
      } catch (e) {}

      await refreshImages();
    }
  }, [
    illustration.id,
    illustration.images,
    illustration.modelId,
    illustration.description,
    illustration.gestationalWeek,
    illustration.processStatus,
    refreshImages,
  ]);

  useEffect(() => {
    if (!illustration.images) return;
    refreshImages();
    runSequential();
  }, [illustration.images, refreshImages, runSequential]);

  const onRetry = async (data: ImageDataFormat) => {
    setImagePending(data.id);
    await generateImageModelPromise({
      illustrationId: illustration.id,
      imageId: data.id,
      modelId: illustration.modelId,
      description: illustration.description,
      gestationalWeek: illustration.gestationalWeek || "26",
    });
    await refreshImages();
  };

  const setImagePending = (imageId: string) => {
    setImages(
      images.map((img) =>
        img.id === imageId ? { ...img, isFailed: false, isPending: true } : img,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-2 border p-4 rounded-md w-72 h-[81dvh]">
      <div className="text-sm">
        <p className="font-bold">Imágenes de escaneo</p>
        <p className="text-gray-500">{images.length} escaneos</p>
      </div>

      <div className="grid gap-2">
        {images?.map((data) => (
          <ImageCard
            key={data.id}
            imageData={data}
            onRetry={() => onRetry(data)}
          />
        ))}
      </div>
    </div>
  );
}
