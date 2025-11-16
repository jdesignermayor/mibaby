"use client";

import { useState } from "react";
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import ImageSelectorCard from "./ImageSelectorCard";
import ViewModePanel from "./ViewModePanel";


export default function CreateIllustrationDeliveryStep() {

  const [value, setValue] = useState('');

  return (
    <div>
      <div className="flex w-full max-w-sm gap-6">
        <div>
          <ImageSelectorCard />
        </div>
        <div>
          <ViewModePanel />
          <div className=" w-full h-full">
            <ImgComparisonSlider  className="w-full h-[400px]">
              <img slot="first" className="w-full h-full object-cover" src="/images/demo-image-basic.jpg" />
              <img slot="second" className="w-full h-full object-cover" src="/images/demo-image-transformed.jpg" />
            </ImgComparisonSlider>
          </div>
        </div>
      </div>
    </div>
  );
}
