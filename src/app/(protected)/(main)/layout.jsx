"use client";

import AppLoading from "../../../components/ui/app-loading";
import { NavigationSidebar } from "@/components/navigation-sidebar/navigation-sidebar";
import { WindowContextProvider } from "@/hooks/use-window";
import { dbFetchUserData } from "@/lib/supabase/db";
import { useBoundStore } from "@/store/use-bound-store";
import { cn } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUserData } = useBoundStore((state) => ({
    user: state.user,
    setUserData: state.setUserData,
  }));

  useEffect(() => {
    const initializeData = async () => {
      try {
        const { user, following, followers } = await dbFetchUserData();
        setUserData(user, following, followers);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [setUserData]);

  if (isLoading || !user) return <AppLoading />;

  const headerWidthClasses =
    "w-0 xs:w-[68px] sm:w-[88px] md:w-[68px] lg:w-[88px] 2xl:w-[275px]";

  return (
    <>
      <WindowContextProvider>
        <div className="flex min-h-screen w-full flex-auto flex-row">
          <header className="z-10 flex shrink-0 grow basis-auto flex-col items-end">
            <div
              className={cn(
                "flex shrink-0 basis-auto flex-col relative 3xl:ml-[60px]",
                headerWidthClasses
              )}
            >
              <div className="fixed top-0 flex h-full shrink-0 flex-col">
                <div
                  className={cn(
                    "flex h-full shrink-0 basis-auto flex-col justify-between overflow-y-auto no-scrollbar",
                    "px-0 xs:px-1 sm:px-2 md:px-1 lg:px-2",
                    headerWidthClasses
                  )}
                >
                  <NavigationSidebar user={user} />
                </div>
              </div>
            </div>
          </header>

          <main className=" flex shrink grow basis-auto flex-col items-start w-full 2sm:w-fit ">
            <div className="h-screen w-full  2sm:w-[600px] md:w-[920px] xl:w-[990px] 3xl:w-[1050px]">
              <div className="relative flex shrink-0 grow basis-auto flex-col items-stretch ">
                {children}
              </div>
            </div>
          </main>
        </div>
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: "!bg-color-accent !text-color-text-main",

            success: {
              duration: 3000,
              className: "!bg-color-accent !text-color-text-main",
            },
          }}
        />
      </WindowContextProvider>
    </>
  );
}
