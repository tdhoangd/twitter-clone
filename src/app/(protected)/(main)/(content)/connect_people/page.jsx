"use client";

import FollowUserCard from "@/components/follow-user-card";
import { useRouter } from "next/navigation";

function ConnectPeoplePage() {
  const router = useRouter();

  return (
    <>
      <div
        className={`fi z-10 bg-th-background/60 px-4 py-2 backdrop-blur-md sticky top-0`}
      >
        <div className={`flex flex-row justify-start items-center`}>
          <button
            onClick={() => router.back()}
            className={`bg-th-accent-dark rounded-full w-8 h-8 items-center text-center`}
          >
            x
          </button>
          <div className={`ml-4`}>Connect</div>
        </div>
      </div>

      <FollowUserCard withBio />
      <FollowUserCard withBio />
      <FollowUserCard withBio />
      <FollowUserCard withBio />
      <FollowUserCard withBio />
    </>
  );
}

export default ConnectPeoplePage;
