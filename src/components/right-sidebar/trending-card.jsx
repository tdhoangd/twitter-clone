import TrendingCardDropdownMenu from "./trending-card-dropdown-menu";

export const TrendingCard = ({ trending, onNotInterested, onReport }) => {
  return (
    <div className={`block outline-none hover:bg-th-hover-secondary`}>
      <div className={`px-5 py-3`}>
        <div className={`relative fi grow cursor-pointer`}>
          <div className={`text-sm text-th-primary-light`}>{trending.src}</div>
          <div className={`font-bold`}>{trending.keyword}</div>
          <div className={`text-sm text-th-primary-light`}>4331 posts</div>

          {/* three dots */}
          <div className={`top-1 absolute right-0`}>
            <TrendingCardDropdownMenu
              onNotInterested={onNotInterested}
              onReport={onReport}
            />
          </div>
          {/* end three dots */}
        </div>
      </div>
    </div>
  );
};
