"use server";

import {
  type Illustration,
  ILLUSTRATION_STATUS,
  type IllustrationSchema,
  type ImageDataFormat,
  type ImageFormat,
  type ImageUploaded,
} from "@/models/illustration.model";
import { createClient } from "@/utils/supabase/server";

const UNPROCESSED_IMAGES_BUCKET = "unprocessed_images";
export async function createIllustration(formData: FormData) {
  const supabase = await createClient();

  const imagesString = formData.get("images");
  const images: ImageFormat[] = JSON.parse(imagesString as string);

  const mappedImages = await Promise.all(
    images.map(async (imageDetails: ImageFormat) => {
      const { path } = imageDetails;
      if (!path) {
        throw new Error("Path is required");
      }

      const { data, error } = await supabase.storage
        .from(UNPROCESSED_IMAGES_BUCKET)
        .getPublicUrl(path);

      if (error) {
        throw new Error(error.message);
      }

      return {
        path: path,
        fullPath: "",
        publicUrl: data.publicUrl,
      };
    }),
  );

  const imageData: ImageDataFormat[] = mappedImages.map(
    (image: ImageUploaded): ImageDataFormat => {
      return {
        id: Math.random().toString(36).substring(2, 15),
        isFinished: false,
        isFailed: false,
        isPending: true,
        images: {
          unprocessed: image,
          processed: {
            path: "",
            fullPath: "",
            publicUrl: "",
          },
        },
      };
    },
  );

  const illustrationDetail: Omit<IllustrationSchema, "id" | "created_at"> = {
    user_id: "d4036871-7639-499d-bc22-8c37d0242a8a",
    profile_id: formData.get("customerId") as string,
    description: (formData.get("description") as string) || "",
    gestational_week: (formData.get("gestationalWeek") as string) || "",
    images: imageData,
    avatar_picture_url: mappedImages[0].publicUrl,
    model_id: formData.get("modelId") as string,
    process_status: ILLUSTRATION_STATUS.PENDING,
  };

  const { data, error } = await supabase
    .from("tbl_illustrations")
    .insert(illustrationDetail)
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    ...illustrationDetail,
  };
}

export async function getIllustrationById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tbl_illustrations")
    .select("*")
    .eq("id", id)
    .single();

  try {
    if (error) {
      return { error: error.message, data: null };
    }

    const computedIllustration: Illustration = {
      id: data.id,
      userId: data.user_id,
      profileId: data.profile_id,
      modelId: data.model_id,
      processStatus: data.process_status,
      description: data.description,
      images: data.images,
      createdAt: data.created_at,
    };

    return { data: computedIllustration, error: null };
  } catch (error) {
    return { error: error, data: null };
  }
}

export async function generateAIimage({
  imageBlob,
}: {
  illustrationId: string;
}) {}
