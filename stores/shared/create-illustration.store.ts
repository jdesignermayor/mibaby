import type { Illustration } from "@/models/illustration.model";
import { atom } from "jotai";

type CreateIllustrationStore = Illustration;

const initialValue: CreateIllustrationStore = {
  stepperSteps: [
    {
      title: "Paso 1: Crear selecciona las ecografias 3D.",
      description:
        "Selecciona unicamente las ecografias 3D que deseas convertir en ecografias hiperrealistas, selecciona las mejores ecografias para que el resultado sea lo mas realista posible.",
    },
    {
      title: "Paso 2: Selecciona el cliente.",
      description:
        "Selecciona el cliente que deseas convertir en ecografias hiperrealistas.",
    },
    {
      title: "Paso 3: Selecciona las ecografias 3D.",
      description:
        "Selecciona las ecografias 3D que deseas convertir en ecografias hiperrealistas.",
    },
  ],
  id: "",
  customerId: "",
  description: "",
  images: [],
  createdAt: "",
};

export const createIllustrationAtomState = atom(initialValue);
