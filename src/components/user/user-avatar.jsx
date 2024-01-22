"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import supabaseLoader from "@/lib/supabase/image-loader";
import { cn } from "@/utils/helpers";
import Link from "next/link";

export function UserAvatar({
  name,
  imagePath,
  username,
  size = 40,
  asLink,
  className,
}) {
  const renderedAvatar = (
    <Avatar className={className}>
      {imagePath && (
        <AvatarImage
          src={supabaseLoader({ src: imagePath, width: size })}
          alt={name}
        ></AvatarImage>
      )}

      <AvatarFallback>
        <span>{name?.charAt(0).toUpperCase()}</span>
      </AvatarFallback>
    </Avatar>
  );

  if (!asLink) return renderedAvatar;
  else {
    return (
      <Link
        className={cn({ "hover:opacity-70 cursor-pointer": asLink })}
        href={username ? `/${username}` : "#"}
      >
        {renderedAvatar}
      </Link>
    );
  }
}
