'use client';
import Link from 'next/link';
import {GiFeather} from 'react-icons/gi';
import NavItems from './nav-items';
import {LogoutDropdownMenu} from './logout-dropdown-menu';
import {Logo} from '@/components/logo';

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
                      href={'/home'}
                      className={` flex hover:bg-th-hover rounded-full `}
                  >
                    <div
                        className={`p-3 flex justify-start items-center`}
                    >
                      <Logo size={30}/>
                    </div>
                  </Link>
                </div>
              </h1>
              {/* end logo */}

              {/* nav */}
              <div className={`fi my-1 xl:w-full text-3xl`}>
                <NavItems/>
              </div>

              {/* compose tweet */}
              <button className="xl:w-full min-h-[52px] min-w-[52px] flex flex-col basis-auto flex-shrink-0 border items-stretch">
                <div
                    className={`xl:w-11/12 bg-cc-accent hover:brightness-75 font-bold text-cc-text-primary rounded-full flex items-center justify-center flex-grow  `}
                >
                  <GiFeather className="xl:hidden" size={24}/>
                  <span className={`hidden xl:block`}>Post</span>
                </div>
              </button>
            </div>

            {/* bot nav */}
            <div className={`my-3`}>
              <LogoutDropdownMenu/>
            </div>
            {/* end bot nav */}
          </div>
        </div>
      </header>
  );
}

export default Header;
