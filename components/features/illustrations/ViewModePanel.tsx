"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutPanelLeftIcon, Rotate3dIcon, SparklesIcon } from "lucide-react";
import { useState } from "react";

export type ViewMode = "hyper" | "original" | "split";

export const DEFAULT_VIEW_MODE: ViewMode = "hyper";

export default function ViewModePanel({
  onViewModeChange,
}: {
  onViewModeChange: (viewMode: ViewMode) => void;
}) {
  const [_, setViewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE);
  const [modeTabs, setModeTabs] = useState<
    {
      label: string;
      icon: React.ReactNode;
      value: ViewMode;
      isActive: boolean;
    }[]
  >([
    {
      label: "Hiperrealista",
      icon: <SparklesIcon className="size-5" />,
      value: "hyper",
      isActive: true,
    },
    {
      label: "Dividida",
      icon: <LayoutPanelLeftIcon className="size-5" />,
      value: "split",
      isActive: false,
    },
    {
      label: "Original",
      icon: <Rotate3dIcon className="size-5" />,
      value: "original",
      isActive: false,
    },
  ] as const);

  const handleViewModeChange = (viewMode: ViewMode) => {
    setViewMode(viewMode);
    setModeTabs((prev) =>
      prev.map((tab) => ({ ...tab, isActive: tab.value === viewMode })),
    );
    onViewModeChange(viewMode);
  };

  return (
    <div className="flex gap-2">
      {modeTabs.map((tab) => (
        <Button
          variant="ghost"
          key={tab.label}
          className={cn(tab.isActive && "bg-white text-black")}
          onClick={() => handleViewModeChange(tab.value)}
        >
          {tab.icon}
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
