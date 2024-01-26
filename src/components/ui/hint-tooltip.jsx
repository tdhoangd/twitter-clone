import { cn } from "@/utils/helpers";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function HintTooltip({ content, sideOffset, children }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            sideOffset={sideOffset ? sideOffset : "1"}
            className={cn(
              "text-xs text-white font-light",
              "bg-[#666666] dark:bg-[#495A69]",
              "px-1 py-0.5 rounded-sm",
              "z-50"
            )}
          >
            <span>{content}</span>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
