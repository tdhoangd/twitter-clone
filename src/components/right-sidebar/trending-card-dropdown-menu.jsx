"use client";
import * as DropdownMenu from "@radix-ui/react-Dropdown-menu";
import TrendingCardDropdownIcon from "./trending-card-dropdown-icon";
import { FaRegFaceFrown } from "react-icons/fa6";

const TrendingCardDropdownMenu = ({ onNotInterested, onReport }) => {
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={`border-none outline-none`}>
            <TrendingCardDropdownIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side="bottom"
            align="end"
            sideOffset={-20}
            className={`!rounded-xl bg-th-background shadow-uniform shadow-th-primary-light overflow-hidden`}
          >
            <DropdownMenu.Item
              className={`group flex items-center data-[highlighted] font-bold text-lg
            data-[disabled]:pointer-events-none hover:bg-th-background-secondary outline-none px-5 py-3`}
            >
              <button
                onClick={onNotInterested}
                className={`flex items-center justify-start`}
              >
                <FaRegFaceFrown />
                <div className={`pl-4`}>Not interested in this</div>
              </button>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              className={` group flex items-center relative data-[highlighted] font-bold text-lg
            data-[disabled]:pointer-events-none hover:bg-th-background-secondary outline-none px-5 py-3`}
            >
              <button
                onClick={onReport}
                className={`flex items-center justify-start`}
              >
                <FaRegFaceFrown />
                <div className={`pl-4`}>This trend is harmful or spammy</div>
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default TrendingCardDropdownMenu;
