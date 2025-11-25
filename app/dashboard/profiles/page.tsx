"use client";

import CreateCustomerDialog from "@/components/features/profiles/CreateCustomerDialog";
import ListProfilesTable from "@/components/features/profiles/ListProfilesTable";
import { useProfiles } from "@/hooks/user-profile";
import { useState } from "react";

export default function ProfilesPage() {
 const { data: profiles, isLoading: isLoadingProfiles, error: errorProfiles } = useProfiles({ page: 1, limit: 10, search: "" });

 const [page, setPage] = useState(1);
 const [limit, setLimit] = useState(10);

  return <div className="p-5 h-[calc(100dvh)] flex flex-col">
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Profiles</h1>
      <div>
        <CreateCustomerDialog />
      </div>
      <ListProfilesTable 
        profiles={profiles || []}
        total={profiles?.length ?? 0}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  </div>;
}