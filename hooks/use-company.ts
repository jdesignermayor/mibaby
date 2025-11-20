import type { Illustration } from "@/models/illustration.model";
import type { Profile } from "@/models/profile.model";
import { supabase } from "@/utils/supabase/supabaseClient"; // Adjust path as needed
import { useEffect, useState } from "react";

type ProfileResponse = {
  data: Profile[];
  error: Error | null;
  loading: boolean;
};

export const useCompany: () => ProfileResponse = () => {
  const [data, setData] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data: fetchedData, error: fetchError } = await supabase
          .from("tbl_profiles")
          .select("*");

        if (fetchError) {
          throw fetchError;
        }
        setData(fetchedData as Profile[]);
      } catch (err) {
        setError(err as Error);
        setData([]); // Clear data on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Re-run effect if table name or query function changes

  return { data, loading, error };
};

export const useIllustrationById = (id: string) => {
  const [data, setData] = useState<Illustration>({} as Illustration);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data: fetchedData, error: fetchError } = await supabase
          .from("tbl_illustrations")
          .select(
            "id, description, gestational_week, images, avatar_picture_url, created_at",
          )
          .eq("id", id)
          .single();

        if (fetchError) {
          throw fetchError;
        }
        setData(fetchedData as unknown as Illustration);
      } catch (err) {
        setError(err as Error);
        setData({} as Illustration);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};
