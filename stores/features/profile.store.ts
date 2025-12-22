import type { ProfileSchema } from "@/models/profile.model";
import { atom } from "jotai";

type ProfileStore = {
  profile?: ProfileSchema | null;
  loading: boolean;
  error: Error | null;
};

const initialValue: ProfileStore = {
  profile: null,
  loading: false,
  error: null,
};

export const profileAtomState = atom(initialValue);
