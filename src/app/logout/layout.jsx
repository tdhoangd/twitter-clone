import { Loading } from "@/components/ui/loading";
import supabaseServer from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export default async function LogoutLayout({ children }) {
  const {
    data: { session },
  } = await supabaseServer().auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="w-full h-full min-h-screen min-w-screen flex flex-col justify-center items-center bg-color-backdrop relative">
        <div className="top-0 w-80 fixed max-w-[80vw] flex items-center justify-center h-full min-h-[196px] ">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </>
  );
}
