export const SEMANTIC_STEP_PHASE = {
  CREATIONAL: 1,
  DELIVERING: 2,
};

export interface ImageFormat {
  name: string;
  base64: string;
}

interface StepperStep {
  title: string;
  description: string;
}

export interface Illustration {
  id: string;
  customerId: string;
  description: string;
  images: ImageFormat[];
  gestational_week?: string;
  avatar_picture?: {
    name: string;
    base64: string;
  };
  createdAt: string;
  stepperSteps?: StepperStep[];
}

export interface ImageSetItem {
  id: string;
  description: string;
  gestationalWeek: string;
  isReady: boolean;
  images: {
    base: string;
    converted: string;
  };
}
