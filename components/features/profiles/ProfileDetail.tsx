"use client";

import { profileAtomState } from "@/stores/features/profile.store";
import { useAtom } from "jotai";

export default function ProfileDetail() {
  const [profile] = useAtom(profileAtomState);

  return (
    <div>
      <h1>Profile Detail</h1>
      {JSON.stringify(profile)}
    </div>
  );
}
