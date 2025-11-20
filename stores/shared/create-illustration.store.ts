import type { Illustration } from "@/models/illustration.model";
import { atom } from "jotai";

type CreateIllustrationStore = Illustration;

const initialValue: CreateIllustrationStore = {
  id: "",
  profileId: "",
  userId: "",
  description: "",
  images: [],
  createdAt: "",
};

export const createIllustrationAtomState = atom(initialValue);
