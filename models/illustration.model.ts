export const SEMANTIC_STEP_PHASE = {
  CREATIONAL: 1,
  DELIVERING: 2,
};

export interface ImageFormat {
  name: string;
  base64: string;
  path?: string;
  isUploaded: boolean;
}

export interface IllustrationImage {
  id: string;
  url: string;
  createdAt: string;
}

export interface Illustration {
  id: string;
  userId: string;
  profileId: string;
  modelId: string;
  processStatus: ILLUSTRATION_STATUS;
  description: string;
  images: ImageUploaded[];
  gestationalWeek?: string;
  avatarPictureUrl?: string;
  createdAt: string;
}

export interface IllustrationSchema {
  id: string;
  created_at: string;
  user_id: string;
  model_id: string;
  profile_id: string;
  description: string;
  gestational_week: string;
  images: ImageUploaded[];
  avatar_picture_url: string;
  process_status: ILLUSTRATION_STATUS;
}

export interface ResponsePostIllustrationSchema {
  id: string;
}

export interface ImageSetItem {
  id: string;
  isReady: boolean;
  images: {
    base: string;
    converted: string;
  };
}

export interface ImageUploaded {
  id: string;
  path: string;
  fullPath: string;
  publicUrl: string;
}

export enum ILLUSTRATION_STATUS {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
