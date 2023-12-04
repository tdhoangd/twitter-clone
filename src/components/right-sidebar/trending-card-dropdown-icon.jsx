import { BsThreeDots } from "react-icons/bs";

function TrendingCardDropdownIcon() {
  return (
    // <div className={`top-1 absolute right-0`}>
    <div className={`ml-6`}>
      <div
        className={`group inline-flex items-stretch shrink-0 grow-0 relative `}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 -m-2 inline-flex rounded-full
                             w-8 h-8 group-hover:bg-th-accent-light group-hover:opacity-30`}
        ></div>
        <BsThreeDots
          className={`relative text-th-primary-light group-hover:text-th-accent-dark`}
        />
      </div>
    </div>
    //{/* </div> */}
  );
}

export default TrendingCardDropdownIcon;
