import { getProfiles } from "@/app/actions/profiles";
import type { ProfileSchema } from "@/models/profile.model";
import { useQuery } from "@tanstack/react-query";

interface UseProfilesOptions {
  page?: number;
  limit?: number;
  search?: string;
}

export const useProfiles = ({
  page = 1,
  limit = 10,
  search = "",
}: UseProfilesOptions) => {
  return useQuery<{ data: ProfileSchema[]; count: number }, Error>({
    queryKey: ["profiles", page, limit, search],
    queryFn: () => getProfiles({ page, limit, query: search }),
    placeholderData: (previousData) => previousData,
    enabled: true,
  });
};
