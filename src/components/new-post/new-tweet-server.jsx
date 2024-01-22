// // import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
// // import { cookies } from "next/headers";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";
// import Image from "next/image";
// import { useState } from "react";

// export default function NewTweet({ user }) {
//   const [newTweetValue, setNewTweetValue] = useState("");
//   const client = useSupabaseClient();

//   // const { trigger: insert } = useInsertMutation(
//   //   client.from("tweets"),
//   //   ["id"],
//   //   "title,user_id",
//   //   {
//   //     onSuccess: () => {
//   //       console.log("Succes");
//   //       setNewTweetValue("");
//   //     },
//   //   }
//   // );

//   const addTweet = async (event) => {
//     event.preventDefault();
//     console.log(newTweetValue);
//     await insert([{ title: newTweetValue, user_id: user.id }]);
//   };

//   return (
//     <form className="border border-gray-800 border-t-0" onSubmit={addTweet}>
//       <div className="flex py-8 px-4">
//         <div className="bg-red-200">
//           <Image
//             className="rounded-full"
//             alt="user image"
//             // src={user.user_metadata.avatar_url}
//             src={`/images/cat.png`}
//             width={48}
//             height={48}
//           />
//         </div>
//         <input
//           placeholder="What is happening?"
//           name="title"
//           value={newTweetValue}
//           onChange={(event) => setNewTweetValue(event.target.value)}
//           className="bg-inherit flex-1 ml-2 text-2xl  leading-loose placeholder-gray-500 px-2"
//         />
//       </div>
//     </form>
//   );
// }

//###################################################################
// SERVER SIDE
import { UserAvatar } from "@/components/user/user-avatar";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

//TODO: 1) on focus, expand and add <everyone> <location> ...
// TODO: 2) on submit new, hide those things, hide submit button, hide utils icons (photos, media,...), add loading bar.
//
export default function NewTweetServer({ user }) {
  const addTweet = async (formData) => {
    "use server";
    console.log("NewTweet:formData:", formData);
    const content = String(formData.get("content"));
    console.log(content);
    const supabase = createServerActionClient({ cookies });

    if (user) {
      await supabase.from("tweets").insert({
        content: content,
        user_id: user.id,
      });
    }
  };

  return (
    <form className="border border-gray-800 border-t-0" action={addTweet}>
      <div className="flex py-8 px-4">
        {/*<div className="bg-red-200">*/}
        {/*  <Image*/}
        {/*    className="rounded-full"*/}
        {/*    alt="user image"*/}
        {/*    // src={user.user_metadata.avatar_url}*/}
        {/*    src={`/images/cat.png`}*/}
        {/*    width={48}*/}
        {/*    height={48}*/}
        {/*  />*/}
        {/*</div>*/}
        <UserAvatar user={{ name: "user image", image: "images/cat1.png" }} />

        <input
          placeholder="What is happening?"
          name="content"
          className="bg-inherit flex-1 ml-2 text-2xl  leading-loose placeholder-gray-500 px-2"
        />
      </div>
    </form>
  );
}

// on new post top bar to indicate progress,
//
