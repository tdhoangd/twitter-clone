"use client";
import * as Avatar from "@radix-ui/react-avatar";

export function UserAvatar({ user, ...props }) {
  return (
    <Avatar.Root
      className={`bg-slate-900 inline-flex h-[40px] w-[40px] select-none items-center justify-center overflow-hidden rounded-full align-middle`}
    >
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={user.image}
        alt={user.name}
      />
      <Avatar.Fallback
        className="text-white leading-1 flex h-full w-full items-center justify-center bg-yellow-800 text-lg font-medium"
        delayMs={600}
      >
        {user.name.charAt(0).toUpperCase()}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}

// function UserAvatar() {
//   return (
//     <button
//       className={`flex justify-center xl:justify-between items-center w-full p-3 rounded-full hover:bg-th-hover`}
//     >
//       <div className={`flex gap-3 truncate`}>
//         {/* <AvatarDemo /> */}

//         <div className={`w-[40px] h-[40px]`}>
//           <div
//             className={`rounded-full h-full w-full flex items-center justify-center bg-cyan-600`}
//           >
//             <span className={`text-white text-xl`}>K</span>
//           </div>
//         </div>
//         <div
//           className={`hidden truncate text-start leading-5 xl:flex xl:flex-col`}
//         >
//           <span>name user</span>
//           <span>@user123</span>
//         </div>
//       </div>
//       <div className={`hidden xl:block`}>
//         <BsThreeDots />
//       </div>
//     </button>
//   );
// }
