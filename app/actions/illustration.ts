"use server";

const BUCKET_NAME = "unprocessed_images";

import type {
  IllustrationSchema,
  ImageFormat,
} from "@/models/illustration.model";
import { createClient } from "@/utils/supabase/server";

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
        .from(BUCKET_NAME)
        .getPublicUrl(path);

      if (error) {
        throw new Error(error.message);
      }

      return {
        id: "",
        path: path,
        fullPath: "",
        publicUrl: data.publicUrl,
      };
    }),
  );

  const illustrationDetail: Omit<IllustrationSchema, "id" | "created_at"> = {
    user_id: "d4036871-7639-499d-bc22-8c37d0242a8a",
    profile_id: formData.get("customerId") as string,
    description: (formData.get("description") as string) || "",
    gestational_week: (formData.get("gestationalWeek") as string) || "",
    images: mappedImages,
    avatar_picture_url: mappedImages[0].publicUrl,
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
    .select("id, description, gestational_week, images, avatar_picture_url")
    .eq("id", id)
    .order("created_at", { ascending: false });

  console.log("data:", data);
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createIllustrationImage({
  illustrationId,
  urlBucketImage,
}: {
  illustrationId: string;
  urlBucketImage: string;
}) {
  return {
    illustrationId: illustrationId,
    title: "Image title",
    description: "Image description",
    image: {
      default: "",
      converted: "",
    },
  };
}
