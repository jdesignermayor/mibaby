import type { Illustration } from "@/models/illustration.model";
import ImageSelectorPanel from "./ImageSelectorPanel";

export default function CreateIllustrationView({
  illustration,
}: {
  illustration: Illustration;
}) {
  return (
    <div>
      <div>
        <ImageSelectorPanel illustration={illustration} />
      </div>
    </div>
  );
}
