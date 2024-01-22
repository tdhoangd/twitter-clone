"use client";

import { GifIcon, ImageIcon, PollIcon, SettingIcon } from "@/components/icons";
import { PageHeaderWrapper } from "@/components/layouts/page-header-wrapper";
import { NewPost } from "@/components/new-post/new-post";
import { PageNavItem } from "@/components/page-nav-item";
import { Loading } from "@/components/ui/loading";
import { UserAvatar } from "@/components/user/user-avatar";
import { useBoundStore } from "@/store/use-bound-store";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function HomeLayout({ children }) {
  const pathname = usePathname();
  const user = useBoundStore((state) => state.user);

  const navigations = (
    <>
      <PageHeaderWrapper
        withNavigationBack={false}
        className="px-0 border-b border-color-border"
      >
        <div className="flex justify-between items-center w-full">
          <PageNavItem
            title={"For you"}
            link={"/home"}
            active={pathname === "/home"}
          />
          <PageNavItem
            title={"Following"}
            link={"/home/following"}
            active={pathname === "/home/following"}
          />
          <div className="h-[53px] w-[53px] flex items-center justify-center px-2">
            <span className="text-xl flex justify-center items-center rounded-full transition-all duration-300 ease-in-out w-[34px] h-[34px] hover:bg-color-text-main/10">
              <SettingIcon />
            </span>
          </div>
        </div>
      </PageHeaderWrapper>
    </>
  );

  return (
    <Suspense fallback={<Loading />}>
      {navigations}

      <NewPost
        asModal="true"
        modalTriggerComponent={
          <div className="flex cursor-pointer px-4 py-3 border-b border-color-text-dimmed">
            <div className="h-full flex justify-center items-center">
              <UserAvatar
                name={user.name}
                username={user.username}
                imagePath={user.avatar_image_path}
              />
            </div>
            <div className="ml-3 flex flex-row flex-auto items-center">
              <div className="flex flex-auto py-2 px-3 border border-color-text-dimmed rounded-full">
                <span className="text-color-text-dimmed pl-1">
                  What is happening?!
                </span>
              </div>
              <ImageIcon size={24} className="ml-3 text-color-accent " />
              <GifIcon size={24} className="ml-3 text-color-accent" />
              <PollIcon size={24} className="ml-3 text-color-accent" />
            </div>
          </div>
        }
      />
      {children}
    </Suspense>
  );
}
