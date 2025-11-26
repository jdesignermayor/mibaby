"use server";

import {
  type Illustration,
  ILLUSTRATION_STATUS,
  type IllustrationSchema,
  type ImageFormat,
} from "@/models/illustration.model";
import type { Profile } from "@/models/profile.model";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

const BUCKET_NAME = "unprocessed_images";

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
        id: Math.random().toString(36).substring(2, 15),
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

export async function getProfiles({
  limit = 10,
  page = 1,
  query = "",
  order = "created_at",
  ascending = false,
}: {
  limit?: number;
  page?: number;
  query?: string;
  order?: string;
  ascending?: boolean;
}): Promise<Profile[]> {
  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit;

  try {
    const req = supabase
      .from("tbl_profiles")
      .select("*", { count: "exact" })
      .range(from, to)
      .order(order, { ascending: ascending });

    if (query !== "" && query) {
      console.log("query:", query);
      req.ilike("name", `%${query}%`);
    }

    const { data, error } = await req;

    if (error) {
      throw new Error(error.message);
    }

    return data as Profile[];
  } catch (error: Error) {
    console.log("error:", error);
    throw new Error(error.message);
  }
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
        return NextResponse.json({ error: error.message, data: null }, { status: 500 });
      }

      console.log("data:", data);
      const computedIllustration: Illustration = {
        id: data.id,
        userId: data.user_id,
        profileId: data.profile_id,
        modelId: data.model_id,
        processStatus: data.process_status,
        description: data.description,
        images: data.images,
        createdAt: data.created_at,
      }

      return NextResponse.json({ data: computedIllustration }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: {}, data: null }, { status: 500 });
    }
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
