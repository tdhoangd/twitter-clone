"use client";

import { PageNavItem } from "@/components/page-nav-item";
import React from "react";

export function ProfileNavs({ activePath, profileUsername }) {
  const links = [
    { title: "Posts", link: `/${profileUsername}` },
    { title: "Replies", link: `/${profileUsername}/with_replies` },
    { title: "Media", link: `/${profileUsername}/media` },
    { title: "Likes", link: `/${profileUsername}/likes` },
  ];

  return (
    <nav
      className="flex items-center border-b border-color-border "
      role="navigation"
    >
      <div className="flex outline-none items-center grow justify-between ">
        {links.map(({ title, link }) => (
          <PageNavItem
            key={title}
            title={title}
            link={link}
            active={link === activePath ? true : undefined}
          />
        ))}
      </div>
    </nav>
  );
}
