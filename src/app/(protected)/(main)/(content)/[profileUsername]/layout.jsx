"use client";

import { Loading } from "@/components/ui/loading";
import { dbFetchProfile } from "@/lib/supabase/db";
import { useBoundStore } from "@/store/use-bound-store";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

export default function ProfileLayout({ params, children }) {
  const { profileUsername: username } = params;
  const addProfileToUserProfiles = useBoundStore(
    (state) => state.addProfileToUserProfiles
  );

  const { status, data, error } = useQuery({
    queryKey: ["profile", { username }],
    queryFn: ({ queryKey }) =>
      dbFetchProfile({ username: queryKey[1].username }),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (status === "success" && data) {
      addProfileToUserProfiles(data);
    }
  }, [addProfileToUserProfiles, data, status]);

  if (status === "pending") {
    return <Loading />;
  }

  return <>{children}</>;
}
