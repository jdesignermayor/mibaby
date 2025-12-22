import {
  getIllustrationById,
  getIllustrations,
} from "@/app/actions/illustration";
import type { Illustration } from "@/models/illustration.model";
import { useQuery } from "@tanstack/react-query";

export const useIllustration = (id: string) => {
  return useQuery<{ data: Illustration }, Error>({
    queryKey: ["illustration", id],
    queryFn: () => getIllustrationById(id).then((res) => res.json()),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetIllustrations = () => {
  return useQuery<{ data: Illustration[]; error: Error | null }, Error>({
    queryKey: ["illustrations"],
    queryFn: () => getIllustrations(),
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });
};
