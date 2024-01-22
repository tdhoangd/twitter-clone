"use client";

import { ThemeProvider } from "@/features/theme";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function Providers({ children, initialSession }) {
  const supabase = createClientComponentClient();
  const queryClient = new QueryClient();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data);
    };
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <SessionContextProvider
        supabaseClient={supabase}
        initialSession={session}
      > */}
      <ThemeProvider>{children}</ThemeProvider>
      {/* </SessionContextProvider> */}
    </QueryClientProvider>
  );
}
