import Link from "next/link";

function NavItem({ title, icon }) {
  return (
    <Link
      href={title.toLocaleLowerCase()}
      role="link"
      className={`pt-1 w-full flex`}
    >
      <div
        className={`p-3 flex justify-start items-center rounded-full hover:bg-th-hover`}
      >
        <div>{icon}</div>
        <div className={`mx-4 text-lg hidden xl:block`}>{title}</div>
      </div>
    </Link>
  );
}

export default NavItem;
