import React, { useEffect, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useWindow } from "@/hooks/use-window";
import { cn } from "@/utils/helpers";
import { UserCard } from "@/components/user/user-card";
import { AnimatePresence, motion } from "framer-motion";
import { TRANSITION_VARIANTS } from "@/utils/transition-utils";
import { Loading } from "@/components/ui/loading";
import { useBoundStore } from "@/store/use-bound-store";
import { dbFetchProfile } from "@/lib/supabase/db";

export function UserTooltip({ username, children }) {
  const { isMobile } = useWindow();
  const { addProfileToUserProfiles, userProfiles } = useBoundStore((state) => ({
    addProfileToUserProfiles: state.addProfileToUserProfiles,
    userProfiles: state.userProfiles,
  }));
  const [targetUser, setTargetUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTargetProfile = async () => {
      let profile =
        userProfiles.find((user) => user.username === username) || null;

      if (!profile) {
        try {
          profile = await dbFetchProfile({ username });
          if (profile) {
            addProfileToUserProfiles(profile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }

      setTargetUser(profile);
    };

    fetchTargetProfile();
  }, [userProfiles, username, addProfileToUserProfiles]);

  // const { status, data } = useProfileData({ username });

  if (isMobile) return <>{children}</>;

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="bottom" sideOffset="1" className="z-50">
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
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <UserCard user={targetUser} variant="modal" />
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
