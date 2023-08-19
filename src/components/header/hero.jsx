import { BsThreeDots } from "react-icons/bs";
import { UserAvatar } from "../user-avatar";

function Hero({ className, ...props }, ref) {
  return (
    <div
      className={`flex justify-center xl:justify-between items-center w-full p-3 rounded-full hover:bg-th-hover`}
    >
      <div className={`flex gap-3 truncate`}>
        {/* <AvatarDemo /> */}
        <UserAvatar user={{ name: "Thanh Hoang", image: "images/cat1.png" }} />

        <div
          className={`hidden truncate text-start leading-5 xl:flex xl:flex-col`}
        >
          <span>name user</span>
          <span>@user123</span>
        </div>
      </div>
      <div className={`hidden xl:block`}>
        <BsThreeDots />
      </div>
    </div>
  );
}

export default Hero;
