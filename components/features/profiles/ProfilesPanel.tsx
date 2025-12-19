"use client";

import { useProfiles } from "@/hooks/user-profile";
import { useState } from "react";
import ListProfilesTable from "./ListProfilesTable";

export default function ProfilesPanel() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: response,
    isLoading,
    error,
  } = useProfiles({ page, limit: 10, search: "" });

  const profiles = response?.data || [];
  const total = response?.count || 0;

  console.log("total:", total);

  return (
    <div>
      <div>
        <ListProfilesTable
          profiles={profiles}
          total={total}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
}
