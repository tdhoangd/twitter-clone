import { dbFetchProfile } from "@/lib/supabase/db";
import { useQuery } from "@tanstack/react-query";

export const useProfileData = ({ username }) => {
  return useQuery({
    queryKey: ["profile", { username }],
    queryFn: ({ queryKey }) =>
      dbFetchProfile({ username: queryKey[1].username }),
    staleTime: Infinity,
  });
};
