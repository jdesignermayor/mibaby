import type { UISettings } from "@/models/ui-settings.model";
import { atom } from "jotai";

const initialValue: UISettings = {
  isCreationalModeEnabled: false,
  stepper: {
    currentStep: 1,
    totalSteps: 3,
  },
  menuOptions: [
    {
      isActive: true,
      label: "Home",
      icon: "home",
      link: "/dashboard/",
    },
    {
      isActive: false,
      label: "Profiles",
      icon: "user-round",
      link: "/dashboard/profiles",
    },
    {
      isActive: false,
      label: "Settings",
      icon: "settings",
      link: "/dashboard/create-illustration",
    },
  ],
};

export const uiSettingsAtomState = atom(initialValue);
