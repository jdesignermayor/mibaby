"use client";

import type { ImageDataFormat } from "@/models/illustration.model";
import { ImgComparisonSlider } from "@img-comparison-slider/react";
import Image from "next/image";

export default function ComparisonSlider({
  image,
}: {
  image: ImageDataFormat;
}) {
  return (
    <div className="w-full max-w-6xl rounded-xl overflow-hidden">
      <ImgComparisonSlider className="rounded-xl">
        <Image
          alt="first"
          slot="first"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
          src={image.images.unprocessed.publicUrl}
        />
        <Image
          alt="second"
          slot="second"
          className="w-full h-full object-cover"
          src={image.images.processed.publicUrl}
          width={1000}
          height={1000}
        />
      </ImgComparisonSlider>
    </div>
  );
}
