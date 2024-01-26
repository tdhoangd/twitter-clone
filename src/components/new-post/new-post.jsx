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
import { useImage } from "@/hooks/use-image";
import { MAX_TWEET_LENGTH } from "@/utils/config";

export function NewPost({
  asModal,
  modalTriggerComponent,
  isReply,
  parent,
  asChild = true,
}) {
  const [isSending, setIsSending] = useState(false);
  const [open, setOpen] = useState(false);

  const [content, setContent] = useState("");
  const {
    images,
    handleImagePaste,
    handleImageSelect,
    resetImageStates,
    removeImage,
  } = useImage();

  if (asModal && !modalTriggerComponent) {
    throw new Error("modalTriggerComponent is required when asModal is true");
  }

  if (isReply && !parent) {
    throw new Error("parent post is required for reply");
  }

  const { handleCreatePost } = usePostInteractions();

  const sendPost = async (content, images) => {
    if (content.lenght > MAX_TWEET_LENGTH) return;

    setIsSending(true);
    handleCreatePost(
      {
        content,
        images,
        replyToId: parent ? parent.id : undefined,
        replyToUsername: parent ? parent.author.username : undefined,
        originalId: parent
          ? parent.original_id
            ? parent.original_id
            : parent.id
          : undefined,
      },
      () => {
        setIsSending(false);
        setContent("");
        resetImageStates();
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
        sendPost={sendPost}
        content={content}
        setContent={setContent}
        images={images}
        handleImagePaste={handleImagePaste}
        handleImageSelect={handleImageSelect}
        removeImage={removeImage}
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

              <div className="flex min-w-14 flex-row gap-3 items-center sm:hidden">
                {/* <Button disabled variant={"inverse"}>
                    <span>Drafts</span>
                  </Button> */}
                <Button
                  className="ml-3"
                  disabled={
                    (content.length === 0 && images.length === 0) ||
                    images.length > 4 ||
                    content.length > MAX_TWEET_LENGTH
                  }
                  type="submit"
                  onClick={() => sendPost(content, images)}
                >
                  <span>{isReply ? "Reply" : "Post"}</span>
                </Button>
              </div>
            </div>

            {renderedInput}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
