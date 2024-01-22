"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

export default function Likes({ tweet, addOptimisticTweet }) {
  const router = useRouter();

  const handleLikes = async () => {
    const supabase = createClientComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (tweet.user_has_liked_tweet) {
        // addOptimisticTweet({
        //   ...post,
        //   likes: post.likes - 1,
        //   user_has_liked_tweet: !post.user_has_liked_tweet,
        // });
        await supabase
          .from("likes")
          .delete()
          .match({ user_id: user.id, tweet_id: tweet.id });

        // await deleteLike([
        //   {
        //     user_id: user.id,
        //     tweet_id: post.id,
        //   },
        // ]);
      } else {
        // addOptimisticTweet({
        //   ...post,
        //   likes: post.likes + 1,
        //   user_has_liked_tweet: !post.user_has_liked_tweet,
        // });
        await supabase
          .from("likes")
          .insert({ user_id: user.id, tweet_id: tweet.id });

        // await insertLike([
        //   {
        //     user_id: user.id,
        //     tweet_id: post.id,
        //   },
        // ]);
      }
      router.refresh();
    }
  };

  return (
    <button className="p-1 m-2 bg-slate-500 rounded-xl" onClick={handleLikes}>
      {tweet.likes} Likes
    </button>
  );
}

// export default function Likes({ post, addOptimisticTweet }) {
//   const router = useRouter();
//   const handleLikes = async () => {
//     const supabase = createClientComponentClient();
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     if (user) {
//       if (post.user_has_liked_tweet) {
//         addOptimisticTweet({
//           ...post,
//           likes: post.likes - 1,
//           user_has_liked_tweet: !post.user_has_liked_tweet,
//         });
//         await supabase
//           .from("likes")
//           .delete()
//           .match({ user_id: user.id, tweet_id: post.id });
//       } else {
//         addOptimisticTweet({
//           ...post,
//           likes: post.likes + 1,
//           user_has_liked_tweet: !post.user_has_liked_tweet,
//         });
//         await supabase
//           .from("likes")
//           .insert({ user_id: user.id, tweet_id: post.id });
//       }
//       router.refresh();
//     }
//   };

//   return (
//     <button className="p-1 m-2 bg-slate-500 rounded-xl" onClick={handleLikes}>
//       {post.likes} Likes
//     </button>
//   );
// }
