import { cn } from "@/utils/helpers";
import HintTooltip from "../../ui/hint-tooltip";

export default function ActionButton({
  onClick,
  hexColor,
  icon,
  count,
  tooltipContent,
}) {
  return (
    <HintTooltip content={tooltipContent}>
      <button onClick={onClick}>
        <div
          className={cn(
            "flex flex-row flex-shrink-0 flex-grow-0 justify-center items-center",
            `text-th-primary-light`,
            `hover:text-[${hexColor}]` // Define your hover color classes in your Tailwind CSS configuration
          )}
        >
          <div
            className={cn(
              "p-2",
              `hover:bg-[${hexColor}]/10 hover:rounded-full`
            )}
          >
            {icon}
          </div>
          {icon && <span>{count}</span>}
        </div>
      </button>
    </HintTooltip>
  );
}
