import { dbFetchProfile } from "@/lib/supabase/db";
import { useQuery } from "@tanstack/react-query";

export const useProfileData = ({ username }) => {
  const { status, data, error } = useQuery({
    queryKey: ["profile", { username }],
    queryFn: ({ queryKey }) =>
      dbFetchProfile({ username: queryKey[1].username }),
    staleTime: Infinity,
  });

  return { status, data, error };
};
