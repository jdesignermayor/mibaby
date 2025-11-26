import type { AIModel, AIProvider } from "@/models/ai.model";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BUCKET_NAME = "unprocessed_images";

export const MODEL_PROVIDERS: AIProvider[] = [
  { id: "gemini", name: "GEMINI", description: "Google Gemini" },
  { id: "claude", name: "CLAUDE", description: "Anthropic Claude" },
  { id: "o1-mini", name: "O1-MINI", description: "OpenAI O1 Mini" },
];

export const MODELS: AIModel[] = [
  {
    id: "1",
    name: "NanoBanana 2.0",
    iconUrl:
      "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/gemini-color.png",
    model: "gemini-2.5-flash-image",
    provider: MODEL_PROVIDERS[0],
    description: "",
    isDefault: true,
    isPremium: true,
  },
];
