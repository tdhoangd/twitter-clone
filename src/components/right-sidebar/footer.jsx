"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdonw-menu";

const FOOTER_LINKS = [
  { name: "Terms of Service", url: "/", isDropDown: false },
  {
    name: "Privacy Policy",
    url: "/",
    isDropDown: false,
  },
  {
    name: "Cookie Policy",
    url: "/",
    isDropDown: false,
  },
  {
    name: "Accessibility",
    url: "/",
    isDropDown: false,
  },
  {
    name: "Ads Info",
    url: "/",
    isDropDown: false,
  },
  {
    name: "About",
    url: "/",
    isDropDown: true,
  },
  {
    name: "Status",
    url: "/",
    isDropDown: true,
  },
  {
    name: "X for Business",
    url: "/",
    isDropDown: true,
  },
  {
    name: "Developers",
    url: "/",
    isDropDown: true,
  },
];

export function Footer() {
  return (
    <div className="fi mb-5 overflow-hidden">
      <nav className="px-5 text-color-text-dimmed flex flex-wrap text-xs">
        {FOOTER_LINKS.map(
          (item, index) =>
            !item.isDropDown && (
              <Link
                key={index}
                href={item.url}
                className="break-words my-[2px] pr-3"
              >
                <button className="break-words">{item.name}</button>
              </Link>
            )
        )}
        <div className="break-words my-[2px] pr-3">
          {/*<DropdownMenu.Root>*/}
          {/*  <DropdownMenu.Trigger asChild>*/}
          {/*    <span className="break-words hover:cursor-pointer">*/}
          {/*      More ...*/}
          {/*    </span>*/}
          {/*  </DropdownMenu.Trigger>*/}
          {/*  <DropdownMenu.Portal>*/}
          {/*    <DropdownContentLayout>*/}
          {/*      {FOOTER_LINKS.map(*/}
          {/*        (item, index) =>*/}
          {/*          item.isDropDown && (*/}
          {/*            <DropdownItemLayout key={index}>*/}
          {/*              <span className="break-words">{item.name}</span>*/}
          {/*            </DropdownItemLayout>*/}
          {/*          )*/}
          {/*      )}*/}
          {/*    </DropdownContentLayout>*/}
          {/*  </DropdownMenu.Portal>*/}
          {/*</DropdownMenu.Root>*/}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="break-words">More...</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
              {FOOTER_LINKS.map(
                (item, index) =>
                  item.isDropDown && (
                    <DropdownMenuItem key={index}>
                      <span className="break-words">{item.name}</span>
                    </DropdownMenuItem>
                  )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="break-words my-[2px] pr-3">
          <span className="break-words">© 2023 Fake X.</span>
        </div>
      </nav>
    </div>
  );
}
