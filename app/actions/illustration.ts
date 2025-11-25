"use server";

import type { Profile } from "@/models/profile.model";
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

    const { data, count, error } = await req;

    if (error) {
      throw new Error(error.message);
    }

    return data as Profile[];
  } catch (error: any | Error) {
    console.log("error:", error);
    throw new Error(error.message);
  }
}

export async function getIllustrations() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tbl_illustrations")
    .select("*")
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
