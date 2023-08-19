import { BiBell, BiBookmark, BiHomeCircle, BiUser } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { HiOutlineDotsCircleHorizontal, HiOutlineMail } from "react-icons/hi";
import NavItem from "./nav-item";

const NAVIGATION_ITEMS = [
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "Explore",
    icon: BsSearch,
  },
  {
    title: "Notifications",
    icon: BiBell,
  },
  {
    title: "Messages",
    icon: HiOutlineMail,
  },
  {
    title: "Bookmarks",
    icon: BiBookmark,
  },
  {
    title: "Profile",
    icon: BiUser,
  },
  {
    title: "More",
    icon: HiOutlineDotsCircleHorizontal,
  },
];

function NavItems() {
  return (
    <nav className="fi items-start">
      {NAVIGATION_ITEMS.map((item, index) => (
        <NavItem
          key={index}
          title={item.title}
          icon={<item.icon className={`text-3xl`} />}
        />
      ))}
    </nav>
  );
}

export default NavItems;
