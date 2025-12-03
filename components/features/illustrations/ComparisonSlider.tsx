"use client";

import {
  ILLUSTRATION_STATUS,
  type Illustration,
} from "@/models/illustration.model";
import { illustrationAtomState } from "@/stores/features/illustration.store";
import { ImgComparisonSlider } from "@img-comparison-slider/react";
import { useAtom } from "jotai";
import Image from "next/image";

export default function ComparisonSlider({
  illustration,
}: {
  illustration: Illustration;
}) {
  const [illustrationState, _] = useAtom(illustrationAtomState);
  const status = illustrationState.updatedStatus || ILLUSTRATION_STATUS.PENDING;

  return (
    <div>
      <ImgComparisonSlider className="rounded-xl">
        <Image
          alt="first"
          slot="first"
          width={500}
          height={500}
          className="w-full h-full object-cover"
          src="/images/demo-image-basic.jpg"
        />
        <Image
          alt="second"
          slot="second"
          className="w-full h-full object-cover"
          src="/images/demo-image-transformed.jpg"
          width={500}
          height={500}
        />
      </ImgComparisonSlider>
    </div>
  );
}
