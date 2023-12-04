import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Hero from "./hero";
import {
  DropdownContentLayout,
  DropdownItemLayout,
} from "../layouts/dropdown-layouts";

function LogoutDropdownMenu() {
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={`w-full border-none outline-none`}>
            <Hero />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownContentLayout sideOffset={10} className={`py-3 w-[300px]`}>
            <DropdownItemLayout>
              <div className={`flex items-center justify-start`}>
                <span>Add an existing account</span>
              </div>
            </DropdownItemLayout>
            <DropdownItemLayout>
              <div className={`flex items-center justify-start`}>
                <span>Log out @username</span>
              </div>
            </DropdownItemLayout>
          </DropdownContentLayout>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

export { LogoutDropdownMenu };
