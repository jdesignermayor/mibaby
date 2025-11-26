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
      label: "Inicio",
      icon: "home",
      link: "/dashboard/",
    },
    {
      isActive: false,
      label: "Clientes",
      icon: "user-round",
      link: "/dashboard/profiles",
    },
    {
      isActive: false,
      label: "Configuración",
      icon: "settings",
      link: "/dashboard/create-illustration",
    },
  ],
};

export const resetMenuOptionsAtom = atom(
  null, // read
  (get, set) => {
    const current = get(uiSettingsAtomState);

    const newOptions = current.menuOptions.map((opt) => ({
      ...opt,
      isActive: false,
    }));

    set(uiSettingsAtomState, {
      ...current,
      menuOptions: newOptions,
    });
  },
);

export const uiSettingsAtomState = atom(initialValue);
