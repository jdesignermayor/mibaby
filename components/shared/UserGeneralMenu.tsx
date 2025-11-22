"use client";

import UserTeamToggleButton from "@/components/shared/UserTeamToggleButton";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { PaintbrushIcon, PlusIcon } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import Link from "next/link";

import { uiSettingsAtomState } from "@/stores/shared/ui-settings-store";

export default function UserGeneralMenu() {
  const [uiSettings, setUISettings] = useAtom(uiSettingsAtomState);
  const { menuOptions } = uiSettings;

  const chats = [
    {
      id: 1,
      name: "Customer name 1",
      lastMessage: "Hello, how are you?",
      lastMessageDate: "2023-03-01",
    },
    {
      id: 2,
      name: "Customer name 2",
      lastMessage: "Hello, how are you?",
      lastMessageDate: "2023-03-01",
    },
  ];

  return (
    <div className="flex flex-col w-72 h-[calc(100vh)] border-r p-3 gap-56">
      <div className="flex flex-col gap-8">
        <div>
          <div className="font-bold flex gap-2  text-xl">
            <p>Mire</p>
            <pre className="text-[#974DFF]">BETA</pre>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <UserTeamToggleButton />
          <Link href="/dashboard/create-illustration">
            <Button className="w-full cursor-pointer">
              <PaintbrushIcon />
              Create illustration
            </Button>
          </Link>
        </div>
        <div>
          <div>
            <p>Dashboard</p>
          </div>
          <ul className="flex flex-col pt-3">
            {menuOptions.map((option) => {
              return (
                <li key={option.label}>
                  <Link href={option.link} onClick={() => setUISettings({ ...uiSettings, menuOptions: menuOptions.map((option) => ({ ...option, isActive: false })) })}>
                    <Button
                      variant={"ghost"}   size="lg"
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
        {/* <div>
          <div>
            <p>Chats</p>
          </div>
          <ul className="flex flex-col pt-3">
            {chats.map((chat) => {
              return (
                <li key={chat.id}>
                  <Link href={""}>
                    <Button
                      variant={"ghost"}
                      size="lg"
                      aria-label="Submit"
                      className={"w-full flex justify-start cursor-pointer"}
                    >
                      {chat.name}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div> */}
        <div>
          <Button variant={"outline"} className="w-full cursor-pointer">
            <PlusIcon />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
