"use client";

import {
  BellIcon,
  BookmarkIcon,
  GroupIcon,
  HomeIcon,
  ListIcon,
  MailIcon,
  OutlineThreedotIcon,
  SearchIcon,
  SettingIcon,
  UserIcon,
} from "@/components/icons";
import NavItem from "./nav-item";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdonw-menu";
import { ChangeTheme } from "@/components/change-theme";

function NavItems({ username }) {
  const NAVIGATION_ITEMS = [
    {
      title: "Home",
      icon: HomeIcon,
      link: "/home",
    },
    {
      title: "Explore",
      icon: SearchIcon,
      link: "#",
    },
    {
      title: "Notifications",
      icon: BellIcon,
      link: "#",
    },
    {
      title: "Messages",
      icon: MailIcon,
      link: "#",
    },
    {
      title: "Lists",
      icon: ListIcon,
      link: "#",
    },
    {
      title: "Bookmarks",
      icon: BookmarkIcon,
      link: "/bookmarks",
    },
    {
      title: "Communities",
      icon: GroupIcon,
      link: "#",
    },
    {
      title: "Profile",
      icon: UserIcon,
      link: `/${username}`,
    },
  ];

  return (
    <nav className="flex flex-col mt-[2px] mb-1 items-start">
      {NAVIGATION_ITEMS.map((item, index) => (
        <NavItem
          key={index}
          title={item.title}
          link={item.link}
          icon={<item.icon className={``} />}
        />
      ))}

      <ChangeTheme />
    </nav>
  );
}

export default NavItems;
