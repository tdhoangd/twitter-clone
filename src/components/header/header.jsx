"use client";
import Link from "next/link";
import Logo from "../icons/logo";
import { GiFeather } from "react-icons/gi";
import NavItems from "./nav-items";
import { BsThreeDots } from "react-icons/bs";
import { UserAvatar } from "../user-avatar";
import Hero from "./hero";
import { LogoutDropdownMenu } from "./logout-dropdown-menu";

function Header() {
  return (
    <header
      id="default-header"
      role="Default Header"
      className={`hidden xs:block xs:w-[68px] sm:w-[88px] xl:w-[275px] shrink-0`}
    >
      <div className={`h-full fixed`}>
        <div
          className={`fi justify-between overflow-y-auto h-full w-[68px] sm:w-[88px] xl:w-[275px] px-[10px] shrink-0`}
        >
          {/* top nav */}
          <div className={`fi items-center`}>
            {/* logo */}
            <h1 className={`fi my-1 xl:w-full`}>
              <div className={`fi items-start`}>
                <Link
                  href={"/"}
                  className={` flex hover:bg-th-hover rounded-full `}
                >
                  <div
                    className={`p-3 flex justify-start items-center text-3xl`}
                  >
                    <Logo />
                  </div>
                </Link>
              </div>
            </h1>
            {/* end logo */}

            {/* nav */}
            <div className={`fi my-1 xl:w-full text-3xl`}>
              <NavItems />
            </div>

            {/* compose tweet */}
            <div className={`xl:w-full `}>
              <button
                className={`xl:w-11/12 bg-th-accent-dark font-bold text-white p-4  rounded-full`}
              >
                <GiFeather className={`w-6 h-6 xl:hidden`} />
                <span className={`hidden xl:block`}>Post</span>
              </button>
            </div>
          </div>

          {/* bot nav */}
          <div className={`my-3`}>
            <LogoutDropdownMenu />
          </div>
          {/* end bot nav */}
        </div>
      </div>
    </header>
  );
}

export default Header;
