'use client';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

export function UserAvatar({user, size = 40, className}) {

  return (
    <Avatar size={size} className={className}>
      <AvatarImage
        src={user.image}
        alt={user.alt}
        // onLoad={() => setImageLoaded((true))}
      />
      <AvatarFallback>
        <span>{user.name.charAt(0).toUpperCase()}</span>
      </AvatarFallback>
    </Avatar>
  );
}
