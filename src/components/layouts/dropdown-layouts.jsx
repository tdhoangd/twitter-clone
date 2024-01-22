import { cn } from "@/utils/helpers";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";

// TODO: delete this!
function DropdownContentLayout(props, ref) {
  const { children, className, ...otherProps } = props;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <DropdownMenu.Content
          ref={ref}
          {...otherProps}
          className={cn(
            `rounded-xl bg-cc-bg-primary shadow-uniform shadow-cc-text-primary`,
            `ease-out duration-500 `,
            className ? className : null
          )}
        >
          {children}
        </DropdownMenu.Content>
      </motion.div>
    </AnimatePresence>
  );
}

DropdownContentLayout = forwardRef(DropdownContentLayout);

function DropdownItemLayout(props, ref) {
  const { children, onSelect, ...otherProps } = props;
  return (
    <DropdownMenu.Item
      ref={ref}
      {...otherProps}
      onSelect={onSelect}
      className={` group flex items-center relative data-[highlighted] font-semibold
          data-[disabled]:pointer-events-none hover:bg-cc-bg-secondary outline-none px-5 py-3`}
    >
      {children}
    </DropdownMenu.Item>
  );
}

DropdownItemLayout = forwardRef(DropdownItemLayout);

export { DropdownContentLayout, DropdownItemLayout };
