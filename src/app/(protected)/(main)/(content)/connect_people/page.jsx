"use client";

import Error from "@/components/error";
import FollowUserCard from "@/components/follow-user-card";
import { Loading } from "@/components/ui/loading";
import { UserCard } from "@/components/user/user-card";
import { useSuggestedProfiles } from "@/hooks/use-suggested-profiles";
import { useRouter } from "next/navigation";

function ConnectPeoplePage() {
  const router = useRouter();

  const { status, data, error } = useSuggestedProfiles();

  return (
    <>
      <div className="w-full">
        <div
          className={`z-10 bg-th-background/60 px-4 py-2 backdrop-blur-md sticky top-0`}
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

        {status === "error" ? (
          <Error message={"Unable to load."} />
        ) : status === "pending" ? (
          <Loading />
        ) : (
          data.map((profile) => (
            <UserCard key={profile.id} user={profile} variant="inline" />
          ))
        )}
      </div>
    </>
  );
}

export default ConnectPeoplePage;
