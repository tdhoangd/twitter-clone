import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Hero from "./hero";

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
          <DropdownMenu.Content
            sideOffset={10}
            className={`!rounded-xl bg-th-background shadow-uniform shadow-th-primary-light overflow-hidden w-[300px] py-3`}
          >
            <DropdownMenu.Item
              className={`group flex items-center data-[highlighted] font-semibold text-lg
            data-[disabled]:pointer-events-none hover:bg-th-background-secondary outline-none px-5 py-3`}
            >
              <button className={`flex items-center justify-start`}>
                <span>Add an existing account</span>
              </button>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              className={` group flex items-center relative data-[highlighted] font-semibold text-lg
            data-[disabled]:pointer-events-none hover:bg-th-background-secondary outline-none px-5 py-3`}
            >
              <button className={`flex items-center justify-start`}>
                <span>Log out @username</span>
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

export { LogoutDropdownMenu };
