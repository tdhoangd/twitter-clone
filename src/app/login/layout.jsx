import { Logo } from "@/components/logo";
import AppLoading from "@/components/ui/app-loading";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import supabaseServer from "@/lib/supabase/supabase-server";

export const metadata = {
  title: "Login into X",
  description: "Login",
};

export default async function LoginLayout({ children }) {
  const {
    data: { session },
  } = await supabaseServer().auth.getSession();

  if (session) {
    return redirect("/home");
  }

  return (
    <Suspense fallback={<AppLoading />}>
      <div className="w-full h-full min-h-screen text-color-text-main bg-color-bg">
        <div className="flex flex-row-reverse justify-center items-center min-h-screen p-4">
          <div className="min-w-[45vh] max-w-[600px] p-4 flex flex-col justify-center">
            <div className="h-full block md:hidden">
              <Logo className="h-11 pb-3" size={44} />
            </div>

            <h1 className="p-t my-12 text-[64px] font-bold break-words">
              Happening now
            </h1>
            <div className="mb-8 leading-9 break-words font-bold text-3xl">
              <span>Join today.</span>
            </div>

            <div className="flex flex-col justify-start">{children}</div>
          </div>

          <div className="min-h-[45vh] flex-col justify-center w-full grow hidden md:flex">
            <div className="max-h-[380px] w-full">
              <Logo
                className="h-[380px] p-8 flex justify-center w-full"
                size={380}
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
