import CreateIllustationLayer from "@/components/features/create-illustration/CreateIllustationLayer";
import CreateIllustrationHeader from "@/components/features/create-illustration/CreateIllustrationHeader";

export default function CreateIllustration() {
  return (
    <div className="flex flex-col w-full h-[calc(100dvh)]">
      <CreateIllustationLayer />
    </div>
  );
}
