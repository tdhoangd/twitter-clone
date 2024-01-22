"use client";

import Link from "next/link";

function NavItem({ title, icon, link }) {
  return (
    <Link href={link} role="link" className="pt-1 w-full flex">
      <div className="p-3 flex justify-start items-center rounded-full text-color-text-main hover:bg-color-text-main/10">
        <div className="text-3xl">{icon}</div>
        <div className="mx-4 text-xl hidden 2xl:block">{title}</div>
      </div>
    </Link>
  );
}

export default NavItem;
