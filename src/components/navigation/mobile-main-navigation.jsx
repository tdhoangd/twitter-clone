"use client";

import { BellIcon, HomeIcon, MailIcon, SearchIcon } from "@/components/icons";
import NavItem from "@/components/navigation/nav-item";
import React from "react";

export function MobileMainNavigation() {
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
  ];

  return (
    <nav className="flex justify-evenly items-center w-full" role="navigation">
      {NAVIGATION_ITEMS.map((item, index) => (
        <NavItem
          key={index}
          title={item.title}
          link={item.link}
          icon={<item.icon className="text-4xl" />}
          className={"flex justify-center items-center"}
        />
      ))}
    </nav>
  );
}
