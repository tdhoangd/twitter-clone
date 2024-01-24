import Link from "next/link";
import FollowUserCard from "../follow-user-card";
import { UserCard } from "@/components/user/user-card";

export function ConnectingSuggestion() {
  return (
    <div>
      <div className={`fi rounded-2xl bg-color-bg-2 overflow-hidden`}>
        <div className={`fi px-5 py-3`}>
          <h2 className={`text-xl font-bold`}>Who to follow</h2>
        </div>

        {/* <FollowUserCard />
        <FollowUserCard />
        <FollowUserCard /> */}

        <UserCard
          variant="inlineShort"
          user={{
            name: "Test",
            username: "fjfgfh",
            bio: "grskdjsghd kjdhjdkgd",
          }}
        />
        <UserCard
          variant="inlineShort"
          user={{
            name: "Test2",
            username: "fjfgfh",
            bio: "gdjghd gjdhdfjgdghjdghdfkhj",
          }}
        />
        <UserCard
          variant="inlineShort"
          user={{
            name: "Test3",
            username: "fjfgrtertetrt3g3331231311ertetfh",
            bio: "gdfjghdf1r 45345",
          }}
        />

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
