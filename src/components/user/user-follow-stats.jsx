"use client";

import Link from "next/link";
import React from "react";

export default function UserFollowStats({
  followingCount,
  followersCount,
  username,
}) {
  const stats = [
    { text: "Following", stat: followingCount, link: `/${username}/following` },
    { text: "Follower", stat: followersCount, link: `/${username}/followers` },
  ];

  return (
    <div className="flex gap-5 justify-start items-center text-color-text-main">
      {stats.map(({ text, stat, link }) => (
        <Link href={link} key={text} className="flex gap-1 hover:underline">
          <span>{stat}</span>
          <span className="text-color-text-dimmed">{text}</span>
        </Link>
      ))}
    </div>
  );
}
