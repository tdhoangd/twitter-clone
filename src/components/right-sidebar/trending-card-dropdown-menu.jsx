"use client";
import * as DropdownMenu from "@radix-ui/react-Dropdown-menu";
import TrendingCardDropdownIcon from "./trending-card-dropdown-icon";
import { FaRegFaceFrown } from "react-icons/fa6";
import {
  DropdownContentLayout,
  DropdownItemLayout,
} from "../layouts/dropdown-layouts";

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
          <DropdownContentLayout side="bottom" align="end" sideOffset={-20}>
            <DropdownItemLayout onSelect={onNotInterested}>
              <div className={`flex items-center justify-start`}>
                <FaRegFaceFrown />
                <div className={`pl-4`}>Not interested in this</div>
              </div>
            </DropdownItemLayout>
            <DropdownItemLayout onSelect={onReport}>
              <div className={`flex items-center justify-start`}>
                <FaRegFaceFrown />
                <div className={`pl-4`}>This trend is harmful or spammy</div>
              </div>
            </DropdownItemLayout>
          </DropdownContentLayout>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default TrendingCardDropdownMenu;
