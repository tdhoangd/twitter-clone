"use client";

import { cn } from "@/utils/helpers";
import Link from "next/link";

function NavItem({ title, icon, link, className }) {
  const renderContent = (
    <div className="p-3 flex justify-start items-center rounded-full text-color-text-main hover:bg-color-text-main/10">
      <div className="text-3xl">{icon}</div>
      <div className="mx-4 text-xl hidden 2xl:block">{title}</div>
    </div>
  );

  return (
    <>
      {link ? (
        <Link
          href={link}
          role="link"
          className={cn("pt-1 w-full flex", className)}
        >
          {renderContent}
        </Link>
      ) : (
        <>
          <div className={cn("pt-1 w-full flex cursor-pointer", className)}>
            {renderContent}
          </div>
        </>
      )}
    </>
  );
}

export default NavItem;
