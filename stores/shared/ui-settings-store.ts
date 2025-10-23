import type { UISettings } from "@/models/ui-settings.model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UISettingsActions = {
  onCreationalMode: () => void;
};

export type UISettingsStore = UISettings & UISettingsActions;

export const defaultState: UISettingsStore = {
  creationalMode: false,
  currentActivePage: "home",
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
      link: "/dashboard/create-illustration",
    },
    {
      isActive: false,
      label: "Settings",
      icon: "settings",
      link: "/dashboard/create-illustration",
    },
  ],
  onCreationalMode: () => {},
};

const usePersistentUISettingsStore = create<UISettingsStore>()(
  persist(
    (set) => ({
      ...defaultState,
      onCreationalMode: () =>
        set((state: UISettingsStore) => ({
          creationalMode: state.creationalMode,
        })),
    }),
    {
      name: "ui-settings-store",
    },
  ),
);

export default usePersistentUISettingsStore;
