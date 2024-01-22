"use client";

import { FeatherIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import NavItems from "./nav-items";
import { UserBadge } from "@/components/navigation-sidebar/user-badge";
import { NewPost } from "@/components/new-post/new-post";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdonw-menu";
import Link from "next/link";
import { useBoundStore } from "@/store/use-bound-store";
import { useRouter } from "next/navigation";

export function NavigationSidebar() {
  const user = useBoundStore((state) => state.user);
  const router = useRouter();

  return (
    <>
      {/* top, nav */}
      <div className="flex flex-col justify-start items-center">
        {/* logo */}
        <h1 className="my-1 w-full">
          <Link
            href={"/home"}
            className="flex w-full justify-center 2xl:justify-start"
          >
            <div className="p-3 hover:bg-color-text-main/10 rounded-full">
              <Logo size={24} />
            </div>
          </Link>
        </h1>
        {/* end logo */}

        {/* nav */}
        <div className="mt-[2px] mb-1 2xl:w-full">
          <NavItems username={user.username} />
        </div>

        {/* compose post */}
        <NewPost
          asModal
          modalTriggerComponent={
            <div className="my-4 w-full flex items-center justify-center 2xl:justify-start ">
              <Button
                className="h-[52px] w-[52px] min-w-[52px] 2xl:w-[90%] 2xl:px-8 text-white"
                textSize="lg"
              >
                <span className="hidden 2xl:block">Post</span>
                <span className="2xl:hidden font-color-text-main text-2xl">
                  <FeatherIcon />
                </span>
              </Button>
            </div>
          }
        />
      </div>

      {/* bot, logout */}
      <div className="my-3 cursor-pointer flex flex-col items-center w-full">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="2xl:w-full outline-none ">
              <UserBadge user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="py-3 w-[300px]">
                <DropdownMenuItem>
                  <span>Add an existing account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/logout")}>
                  <div className={`flex items-center justify-start`}>
                    <span>Log out @{user?.username}</span>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {/* end bot nav */}
    </>
  );
}
