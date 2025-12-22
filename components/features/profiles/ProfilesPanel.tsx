"use client";

import { useProfiles } from "@/hooks/user-profile";
import { useEffect, useState } from "react";
import ListProfilesTable from "./ListProfilesTable";

export default function ProfilesPanel() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  // const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      // Set a timeout to update the debounced value after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cleanup function to clear the timeout if the value changes before the delay
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]); // Only re-run if value or delay changes

    return debouncedValue;
  }

  const {
    data: response,
    isLoading,
    error,
  } = useProfiles({ page, limit, search: debouncedSearch });

  const profiles = response?.data || [];
  const count = response?.count || 0;

  return (
    <div>
      <div>
        <ListProfilesTable
          profiles={profiles}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          setSearch={setSearch}
          count={count}
        />
      </div>
    </div>
  );
}
