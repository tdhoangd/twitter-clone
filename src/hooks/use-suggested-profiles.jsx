"use client";

import { dbFetchSuggestedProfiles } from "@/lib/supabase/db";
import { useQuery } from "@tanstack/react-query";

export const useSuggestedProfiles = (limit) => {
  return useQuery({
    queryKey: ["suggested-profiles", { limit: limit ? limit : undefined }],
    queryFn: ({ queryKey }) =>
      dbFetchSuggestedProfiles({ limit: queryKey[1].limit }),
    staleTime: Infinity,
  });
};
