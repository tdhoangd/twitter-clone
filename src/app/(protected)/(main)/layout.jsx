"use client";

import NavItem from "@/components/navigation/nav-item";
import AppLoading from "../../../components/ui/app-loading";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { WindowContextProvider } from "@/hooks/use-window";
import { dbFetchUserData } from "@/lib/supabase/db";
import { useBoundStore } from "@/store/use-bound-store";
import { cn } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FeatherIcon, HomeIcon } from "@/components/icons";
import { MobileMainNavigation } from "@/components/navigation/mobile-main-navigation";
import { NewPost } from "@/components/new-post/new-post";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }) {
  const pathname = usePathname();
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
          <div className="w-full h-16  z-20 fixed bottom-0 right-0 left-0 xs:hidden bg-color-bg bg-opacity-20 backdrop-blur-sm border-t border-color-border">
            {!pathname.startsWith("/posts") && (
              <div className="absolute bottom-20 right-[22px] w-14 h-14 rounded-full flex items-center justify-center">
                <NewPost
                  asModal
                  modalTriggerComponent={
                    <div className=" w-full flex items-center justify-center 2xl:justify-start ">
                      <Button className="w-14 h-14 text-white">
                        <span className="font-color-text-main text-2xl">
                          <FeatherIcon className="text-3xl" />
                        </span>
                      </Button>
                    </div>
                  }
                />
              </div>
            )}

            <div className="absolute bottom-0 w-full ">
              <MobileMainNavigation />
            </div>
          </div>

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
