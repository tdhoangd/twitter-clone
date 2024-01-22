"use client";

import { ArrowBackIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/helpers";
import { useState } from "react";
import { ProgressBar } from "./progress-bar";
import { NewPostInput } from "./new-post-input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Post } from "@/components/post-list/post/post";
import { usePostInteractions } from "@/hooks/use-post-interactions";

export function NewPost({
  asModal,
  modalTriggerComponent,
  isReply,
  parent,
  asChild = true,
}) {
  const [isSending, setIsSending] = useState(false);
  const [open, setOpen] = useState(false);

  if (asModal && !modalTriggerComponent) {
    throw new Error("modalTriggerComponent is required when asModal is true");
  }

  if (isReply && !parent) {
    throw new Error("parent post is required for reply");
  }

  const { handleCreatePost } = usePostInteractions();

  const sendTweet = async (content, images, resetStates) => {
    setIsSending(true);
    handleCreatePost(
      {
        content,
        images,
        replyToId: parent ? parent.id : undefined,
        originalId: parent
          ? parent.original_id
            ? parent.original_id
            : parent.id
          : undefined,
      },
      () => {
        setIsSending(false);
        resetStates();
        if (asModal) {
          setOpen(false);
        }
      },
      () => {
        setIsSending(false);
      }
    );
  };

  const renderedInput = (
    <div
      className={cn({
        "opacity-50": isSending,
      })}
    >
      {asModal && isReply && <Post post={parent} variant="short" hasChildren />}
      <NewPostInput
        asModal={asModal}
        isReply={isReply}
        onTweetSubmit={sendTweet}
      />
    </div>
  );

  const renderedProgressBar = (
    <div className="w-full">{isSending && <ProgressBar />}</div>
  );

  if (!asModal) {
    return (
      <>
        {renderedProgressBar}
        {renderedInput}
      </>
    );
  } else {
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild={asChild}>
            {modalTriggerComponent}
          </DialogTrigger>

          <DialogContent scrollable={isReply && !asModal ? false : true}>
            {renderedProgressBar}

            <div className="flex flex-row flex-shrink-0 h-[53px] items-center px-4 ">
              <DialogClose asChild>
                <div className="min-w-[56px] min-h-[32px] flex flex-col items-start flex-shrink basis-0">
                  <div className="border border-transparent -ml-2">
                    <button className="rounded-full text-xl hover:bg-color-text-main/10 w-[34px] h-[34px] flex justify-center items-center">
                      <ArrowBackIcon />
                    </button>
                  </div>
                </div>
              </DialogClose>

              <div className="flex-auto"></div>

              {/* button grp */}
              {/* <div className="flex 2sm:hidden  min-w-[56px] flex-col justify-center items-end self-stretch">
                <div className="flex flex-row gap-3 items-center ">
                  <Button disabled variant={"inverse"}>
                    <span>Drafts</span>
                  </Button>
                  <Button disabled className="ml-3">
                    <span>Post</span>
                  </Button>
                </div>
              </div> */}
              <div className="flex  min-w-[56px] flex-col justify-center items-end self-stretch">
                <div className="flex flex-row gap-3 items-center ">
                  <Button disabled variant={"inverse"}>
                    <span>Drafts</span>
                  </Button>
                  <Button disabled className="ml-3">
                    <span>Post</span>
                  </Button>
                </div>
              </div>
            </div>

            {renderedInput}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
