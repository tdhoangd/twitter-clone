import Link from "next/link";
import FollowUserCard from "../follow-user-card";

export function ConnectingSuggestion() {
  return (
    <div>
      <div className={`fi rounded-2xl bg-color-bg overflow-hidden`}>
        <div className={`fi px-5 py-3`}>
          <h2 className={`text-xl font-bold`}>Who to follow</h2>
        </div>

        <FollowUserCard />
        <FollowUserCard />
        <FollowUserCard />

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

// SuggestedUsersSection
// - UserSuggestion
//   - UserAvatar
//   - Username
//   - UserFullName ...
