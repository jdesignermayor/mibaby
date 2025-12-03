import type { Illustration } from "@/models/illustration.model";
import ComparisonSlider from "./ComparisonSlider";
import ImageSelectorPanel from "./ImageSelectorPanel";
import ViewModePanel from "./ViewModePanel";

export default function CreateIllustrationView({
  illustration,
}: {
  illustration: Illustration;
}) {
  return (
    <div>
      <div className="flex w-full gap-6">
        <div className="grid gap-3 w-[calc(39dvw)] h-[calc(20dvh)]">
          <ViewModePanel />
          <div className=" w-full">
            <ComparisonSlider illustration={illustration} />
          </div>
        </div>
        <div className="flex gap-2">
          <ImageSelectorPanel illustration={illustration} />
        </div>
      </div>
    </div>
  );
}
