"use client";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-Dropdown-menu";

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

export default function Footer() {
  return (
    <div className={`fi mb-5 overflow-hidden`}>
      <nav className={`px-5 text-th-primary-light flex flex-wrap text-sm`}>
        {FOOTER_LINKS.map(
          (item, index) =>
            !item.isDropDown && (
              <Link
                key={index}
                href={item.url}
                className={`break-words my-[2px] pr-3 `}
              >
                <button className={`break-words `}>{item.name}</button>
              </Link>
            )
        )}
        <div className={`break-words my-[2px] pr-3`}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <span className={`break-words hover:cursor-pointer`}>
                More ...
              </span>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                sideOffset={-15}
                className={`rounded-xl bg-th-background  shadow-uniform shadow-th-primary-light `}
              >
                {FOOTER_LINKS.map(
                  (item, index) =>
                    item.isDropDown && (
                      <DropdownMenu.Item
                        key={index}
                        className={`
                        group flex items-center relative data-[highlighted] data-[disabled]:pointer-events-none
                        hover:bg-th-background-secondary outline-none px-5 py-3 font-bold
                        `}
                      >
                        <span className={`break-words text-lg`}>
                          {item.name}
                        </span>
                      </DropdownMenu.Item>
                    )
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <div className={`break-words my-[2px] pr-3`}>
          <span className={`break-words`}>© 2023 Fake X.</span>
        </div>
      </nav>
    </div>
  );
}
