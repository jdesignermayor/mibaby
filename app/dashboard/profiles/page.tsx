"use client";

import CreateCustomerDialog from "@/components/features/profiles/CreateCustomerDialog";
import dynamic from "next/dynamic";

const DynamicProfilesPanel = dynamic(
  () => import("@/components/features/profiles/ProfilesPanel"),
  {
    ssr: false,
  },
);

export default function ProfilesPage() {
  return (
    <div className="p-5 h-[calc(100dvh)] flex flex-col">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Profiles</h1>
        <div>
          <CreateCustomerDialog />
        </div>
        <DynamicProfilesPanel />
      </div>
    </div>
  );
}
