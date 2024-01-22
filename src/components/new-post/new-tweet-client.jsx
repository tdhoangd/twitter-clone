"use client";

import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/old/use-user";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useSession, useUser } from "@/providers/supabase-provider";
import { useState } from "react";

export function NewTweetClient() {
  const [content, setContent] = useState("");
  // const user = useUser();
  // const session = useSession();
  const { profile, isLoading } = useProfile();
  const supabase = createClientComponentClient();

  const addTweet = async (contentParam) => {
    console.log("new post submitted", contentParam);
    // console.log("user: ", user);
    // console.log("session: ", session);
    const data = { content: contentParam, user_id: profile.id };

    if (profile) {
      await supabase.from("tweets").insert(data);
    }
  };

  return (
    <div>
      <h1 className="text-3xl">NEW TWEET CLIENT</h1>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          addTweet(content);
        }}
      >
        <input
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="What is happening?!"
          name="tweet-content"
          className="w-full h-16 border-[5px] border-red-500 bg-cc-bg-primary text-cc-text-primary p-4"
        />
        <Button type="submit">
          <span>Submit</span>
        </Button>
      </form>
    </div>
  );
}

// import {createServerActionClient} from '@supabase/auth-helpers-nextjs';
// import {cookies} from 'next/headers';
// import {UserAvatar} from '@/components/user-avatar';

// //TODO: 1) on focus, expand and add <everyone> <location> ...
// // TODO: 2) on submit new, hide those things, hide submit button, hide utils icons (photos, media,...), add loading bar.
// //
// export default function NewTweet({user}) {
//   const addTweet = async (formData) => {
//     'use server';
//     console.log('NewTweet:formData:', formData);
//     const content = String(formData.get('content'));
//     console.log(content);
//     const supabase = createServerActionClient({cookies});

//     if (user) {
//       await supabase.from('tweets').insert({
//         content: content,
//         user_id: user.id,
//       });
//     }
//   };

//   return (
//       <form className="border border-gray-800 border-t-0" action={addTweet}>
//         <div className="flex py-8 px-4">
//           {/*<div className="bg-red-200">*/}
//           {/*  <Image*/}
//           {/*    className="rounded-full"*/}
//           {/*    alt="user image"*/}
//           {/*    // src={user.user_metadata.avatar_url}*/}
//           {/*    src={`/images/cat.png`}*/}
//           {/*    width={48}*/}
//           {/*    height={48}*/}
//           {/*  />*/}
//           {/*</div>*/}
//           <UserAvatar user={{name: 'user image', image: 'images/cat1.png'}} />

//           <input
//               placeholder="What is happening?"
//               name="content"
//               className="bg-inherit flex-1 ml-2 text-2xl  leading-loose placeholder-gray-500 px-2"
//           />
//         </div>
//       </form>
//   );
// }
