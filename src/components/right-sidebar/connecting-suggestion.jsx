"use client";
import Link from "next/link";
import { UserCard } from "@/components/user/user-card";
import { useSuggestedProfiles } from "@/hooks/use-suggested-profiles";
import Error from "@/components/error";
import { Loading } from "@/components/ui/loading";

export function ConnectingSuggestion() {
  const { status, data, error } = useSuggestedProfiles(3);

  return (
    <div>
      <div className={`fi rounded-2xl bg-color-bg-2 overflow-hidden`}>
        <div className={`fi px-5 py-3`}>
          <h2 className={`text-xl font-bold`}>Who to follow</h2>
        </div>

        {status === "error" ? (
          <Error message={"Unable to load."} />
        ) : status === "pending" ? (
          <Loading />
        ) : (
          data.map((profile) => (
            <UserCard key={profile.id} user={profile} variant="inlineShort" />
          ))
        )}

        <Link
          href={"/connect_people"}
          className={`px-5 py-3 outline-none text-color-accent hover:bg-color-dark/30`}
        >
          <span className="w-full">Show more</span>
        </Link>
      </div>
    </div>
  );
}
