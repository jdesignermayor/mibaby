"use server";

import type { ProfileSchema } from "@/models/profile.model";
import { createClient } from "@/utils/supabase/server";

export async function createProfile(
  profile: Omit<ProfileSchema, "id" | "created_at">,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tbl_profiles")
    .insert(profile)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
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
}): Promise<{ data: ProfileSchema[]; count: number }> {
  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit;

  try {
    let req = supabase.from("tbl_profiles").select("*", { count: "exact" });

    if (query !== "" && query) {
      console.log("query:", query);
      req = req.ilike("name", `%${query}%`);
    }

    await req.order(order, {
      ascending: ascending,
    });

    if (limit > 0) {
      console.log("limit is increasing:", limit);
      req = req.limit(limit);
    }

    if (page > 1) {
      console.log("from:", from);
      req = req.range(from, to);
    }

    const { data, error, count } = await req;

    if (error) {
      throw new Error(error.message);
    }

    const computedData = { data: data as ProfileSchema[], count: count ?? 0 };
    console.log("computedData:", computedData);

    return computedData;
  } catch (error) {
    console.log("error:", error);
    return { data: [], count: 0 };
  }
}
