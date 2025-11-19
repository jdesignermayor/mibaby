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
  profile_id: string;
  description: string;
  gestational_week: string;
  images: ImageUploaded[];
  avatar_picture_url: string;
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
