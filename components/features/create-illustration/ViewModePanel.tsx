"use client";

import { Button } from "@/components/ui/button";
import { LayoutPanelLeftIcon, Rotate3dIcon, SparklesIcon } from "lucide-react";
import { useState } from "react";

export default function ViewModePanel() {
  const [viewMode, setViewMode] = useState<"split" | "original" | "hyper">(
    "split",
  );

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        onClick={() => setViewMode("split")}
        className={`flex text-md items-center gap-2 px-4 py-2 font-medium transition-all rounded-md ${
          viewMode === "split"
            ? "text-primary bg-primary/10"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        }`}
      >
        <LayoutPanelLeftIcon className="size-7" />
        Vista dividida
      </Button>

      <Button
        variant="ghost"
        onClick={() => setViewMode("original")}
        className={`flex  text-md items-center gap-2 px-4 py-2 font-medium transition-all ${
          viewMode === "original"
            ? "text-primary bg-primary/10"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        }`}
      >
        <Rotate3dIcon className="size-7" />
        3D original
      </Button>

      <Button
        variant="ghost"
        onClick={() => setViewMode("hyper")}
        className={`flex  text-md items-center gap-2 px-4 py-2 font-medium transition-all ${
          viewMode === "hyper"
            ? "text-primary bg-primary/10"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        }`}
      >
        <SparklesIcon className="size-7" />
        Hiperrealista
      </Button>
    </div>
  );
}
