import type { IconName } from "lucide-react/dynamic";

type Pages = "home" | "profiles" | "settings" | "create-illustration";

export type MenuOption = {
  isActive: boolean;
  label: string;
  icon: IconName;
  link: string;
};

export interface UISettings {
  currentActivePage: Pages;
  creationalMode: boolean;
  menuOptions: MenuOption[];
}
