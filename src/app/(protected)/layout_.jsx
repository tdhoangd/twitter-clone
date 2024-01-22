import supabaseServer from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }) {
  const {
    data: { session },
  } = await supabaseServer().auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
