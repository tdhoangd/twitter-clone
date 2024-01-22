import { UserAvatar } from "./user/user-avatar";

function FollowUserCard({ user, withBio }) {
  return (
    <div className={`fi outline-none transition py-3 px-4 `}>
      <div className={`fi flex-row `}>
        <div className={`fi basis-[40px] mr-3 grow-0 justify-center`}>
          <UserAvatar user={{ name: "Cat" }} />
        </div>

        <div className={`fi justify-center grow basis-0 `}>
          <div className={`flex flex-row justify-between items-center `}>
            <div
              className={`hidden truncate text-start leading-5 xl:flex xl:flex-col`}
            >
              <div className={``}>not cute & kinky m...ffff</div>
              <div className={`text-color-text-main text-sm`}>
                @user123dgfgd
              </div>
            </div>

            <div className={`fi ml-3 min-w-[78px] `}>
              <div
                className={`fi items-center justify-center rounded-full bg-color-text-main
                            text-color-bg text-sm font-bold
                              py-1 px-3`}
              >
                <span>Follow</span>
              </div>
            </div>
          </div>
          {withBio && (
            <div className={`pt-1`}>
              <span>
                Bio: the perfect accoutn to show to your parents when you want a
                cat
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowUserCard;
