import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useWindow } from "@/hooks/use-window";
import { cn } from "@/utils/helpers";
import { UserCard } from "@/components/user/user-card";
import { AnimatePresence, motion } from "framer-motion";
import { TRANSITION_VARIANTS } from "@/utils/transition-utils";
import { useProfileData } from "@/app/(protected)/(main)/(content)/[profileUsername]/query-hooks";
import { Loading } from "@/components/ui/loading";

export function UserTooltip({ username, children }) {
  const { isMobile } = useWindow();

  // TODO: change this behavior!!
  const { status, data } = useProfileData({ username });

  if (isMobile) return <>{children}</>;

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="bottom" sideOffset="1" className="z-[700]">
            <AnimatePresence>
              <motion.div
                animate="enter"
                exit="exit"
                initial="exit"
                variants={TRANSITION_VARIANTS.fade}
              >
                <div
                  className={cn(
                    "rounded-3xl bg-color-bg  overflow-hidden shadow-xl",
                    "shadow-[0px_0px_6px_3px] shadow-color-text-dimmed"
                  )}
                >
                  {status === "success" ? (
                    <UserCard user={data} />
                  ) : (
                    <Loading />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
