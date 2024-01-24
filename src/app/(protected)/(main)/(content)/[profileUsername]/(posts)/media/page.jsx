"use client";
import { EmptyCard } from "@/components/empty-card";
import { EMPTY_MESSAGES } from "@/utils/empty-page-messages";
import { useBoundStore } from "@/store/use-bound-store";
import React from "react";

export default function ProfileMediaPage({ params: { profileUsername } }) {
  const user = useBoundStore((state) => state.user);

  return (
    <EmptyCard
      title={
        profileUsername === user.username
          ? EMPTY_MESSAGES.media.owner.title
          : EMPTY_MESSAGES.media.other.title(profileUsername)
      }
      description={
        profileUsername === user.username
          ? EMPTY_MESSAGES.media.owner.description
          : EMPTY_MESSAGES.media.other.description
      }
    />
  );
}
