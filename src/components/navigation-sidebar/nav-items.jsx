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
  UserIcon,
} from "@/components/icons";
import NavItem from "./nav-item";

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
      link: "/explore",
    },
    {
      title: "Notifications",
      icon: BellIcon,
      link: "/notifications",
    },
    {
      title: "Messages",
      icon: MailIcon,
      link: "/messages",
    },
    {
      title: "lists",
      icon: ListIcon,
      link: "/lists",
    },
    {
      title: "Bookmarks",
      icon: BookmarkIcon,
      link: "/bookmarks",
    },
    {
      title: "Communities",
      icon: GroupIcon,
      link: "/communities",
    },
    {
      title: "Profile",
      icon: UserIcon,
      link: `/${username}`,
    },
    {
      title: "More",
      icon: OutlineThreedotIcon,
      link: "/more",
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
    </nav>
  );
}

export default NavItems;
