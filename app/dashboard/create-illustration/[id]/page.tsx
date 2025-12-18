import { getIllustrationById } from "@/app/actions/illustration";
import CreateIllustrationView from "@/components/features/illustrations/CreateIllustationView";
import { EyeIcon } from "lucide-react";
import { notFound } from "next/navigation";

export default async function IllustrationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const { data, error } = await getIllustrationById(id);

    if (error || !data) {
      console.error("Error fetching data:", error);
      return notFound();
    }

    return (
      <div>
        <div className={`flex justify-center items-center py-5 px-[10%]`}>
          <div className={`grid w-full`}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <p className="font-bold text-lg">
                  <EyeIcon className="size-6" />
                  Revelar ecografía hiperrealista
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                Revela tu ecografía hiperrealista creada, una ves finalizada la
                generación, puedes verla y compartirla con tus amigos y
                familiares.
              </p>
            </div>
            <div className="pt-6 w-full">
              <CreateIllustrationView illustration={data} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return notFound();
  }
}
