import ImageSelectorCard from "./ImageSelectorCard";
import ViewModePanel from "./ViewModePanel";

export default function CreateIllustrationDeliveryStep() {
  return (
    <div>
      <div className="flex w-full max-w-sm gap-6">
        <div>
          <ImageSelectorCard />
        </div>
        <div>
          <ViewModePanel />
        </div>
      </div>
    </div>
  );
}
