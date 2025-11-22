import { getProfiles } from "@/app/actions/illustration";
import { Profile } from "@/models/profile.model";
import { useQuery } from "@tanstack/react-query";


interface UseProfilesOptions {
    page?: number;
    limit?: number;
    search?: string;
  }
  
  export const useProfiles = ({ page = 1, limit = 10, search = "" }: UseProfilesOptions) => {
    return useQuery<Profile[], Error>({
      queryKey: ["profiles", page, limit, search],
      queryFn: () => getProfiles({ page, limit, query: search }),
      placeholderData: (previousData) => previousData,
      staleTime: 1000 * 60,
    });
  };