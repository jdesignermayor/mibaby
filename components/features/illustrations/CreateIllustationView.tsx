"use client";

import type { Illustration } from "@/models/illustration.model";
import dynamic from "next/dynamic";

const DynamicImageSelectorPanel = dynamic(
  () => import("@/components/features/illustrations/ImageSelectorPanel"),
  {
    ssr: false,
  },
);

export default function CreateIllustrationView({
  illustration,
}: {
  illustration: Illustration;
}) {
  return (
    <div>
      <div>
        <DynamicImageSelectorPanel illustration={illustration} />
      </div>
    </div>
  );
}
