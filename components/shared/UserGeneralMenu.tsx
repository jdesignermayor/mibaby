"use client";

import UserTeamToggleButton from "@/components/shared/UserTeamToggleButton";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { PaintbrushIcon, PlusIcon } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import Link from "next/link";

import type { MenuOption } from "@/models/ui-settings.model";
import {
  resetMenuOptionsAtom,
  uiSettingsAtomState,
} from "@/stores/shared/ui-settings-store";

export default function UserGeneralMenu() {
  const [uiSettings, setUISettings] = useAtom(uiSettingsAtomState);
  const { menuOptions } = uiSettings;
  const [, resetMenu] = useAtom(resetMenuOptionsAtom);

  const handleMenuOptionClick = (option: MenuOption) => {
    const computedOptions = menuOptions.map((currentOption) => {
      let isActivated = false;

      if (currentOption.label === option.label) {
        isActivated = true;
      }
      return {
        ...currentOption,
        isActive: isActivated,
      };
    });

    setUISettings({ ...uiSettings, menuOptions: computedOptions });
  };

  return (
    <div className="flex flex-col w-72 h-[calc(100vh)] border-r p-3 gap-56">
      <div className="flex flex-col gap-2">
        <div>
          <div className="font-bold flex gap-2  text-xl">
            <p>Mire</p>
            <pre className="text-[#974DFF]">BETA</pre>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <UserTeamToggleButton />
          <Link href="/dashboard/create-illustration" onClick={resetMenu}>
            <Button className="w-full cursor-pointer">
              <PaintbrushIcon />
              Crear ecografía hiperrealista
            </Button>
          </Link>
        </div>
        <div>
          <ul className="flex flex-col pt-3 gap-1">
            {menuOptions.map((option) => {
              return (
                <li key={option.label}>
                  <Link
                    href={option.link}
                    onClick={() => handleMenuOptionClick(option)}
                  >
                    <Button
                      variant={"ghost"}
                      size="lg"
                      aria-label="Submit"
                      className={
                        "w-full flex justify-start cursor-pointer" +
                        (option.isActive ? " bg-gray-100 font-bold" : "")
                      }
                    >
                      <DynamicIcon name={option.icon} />
                      {option.label}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <Button variant={"outline"} className="w-full cursor-pointer">
            <PlusIcon />
            Cerrar sesión
          </Button>
        </div>
      </div>
    </div>
  );
}
