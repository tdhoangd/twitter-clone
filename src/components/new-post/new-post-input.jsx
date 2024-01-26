"use client";

import React, { useState, useEffect } from "react";
import { EarthIcon } from "../icons";
import { NewPostToolbar } from "./new-post-toolbar";
import { CircularProgress } from "../ui/circular-progress";
import { Button } from "../ui/button";
import { UserAvatar } from "../user/user-avatar";
import TextArea from "react-textarea-autosize";
import { cn } from "@/utils/helpers";
import { ImagesPreview } from "@/components/post-list/post/images-preview";
import { useBoundStore } from "@/store/use-bound-store";
import { MAX_TWEET_LENGTH } from "@/utils/config";

export function NewPostInput({
  asModal,
  isReply,
  sendPost,
  content,
  setContent,
  images,
  handleImagePaste,
  handleImageSelect,
  removeImage,
}) {
  const [textAreaMinRow, setTextAreaMinRow] = useState(1);
  const user = useBoundStore((state) => state.user);

  useEffect(() => {
    if (asModal && images.length < 1) {
      setTextAreaMinRow(3);
    } else {
      setTextAreaMinRow(1);
    }
  }, [images.length, asModal]);

  const handleTextChange = (event) => {
    setContent(event.target.value);
  };

  const handlePaste = (event) => {
    if (event.clipboardData && event.clipboardData.files.length > 0) {
      handleImagePaste(event);
    } else {
      const pastedText = (event.clipboardData || window.clipboardData).getData(
        "text"
      );
      setContent(text + pastedText);
    }
  };

  return (
    <>
      <div className={`px-4 flex flex-col`}>
        <div className={`flex flex-row `}>
          <div className={`pt-3 mr-3 h-full flex justify-center items-start`}>
            <UserAvatar
              name={user ? user.name : "Anon"}
              username={user ? user.username : undefined}
              imagePath={user ? user.avatar_image_path : undefined}
            />
          </div>
          <div className={"flex flex-col w-full"}>
            {/*input area*/}
            <div className={`flex-auto w-full py-3`}>
              <TextArea
                style={{
                  outline: "none",
                }}
                // ref={inputRef}
                minRows={textAreaMinRow}
                autoFocus
                className={cn(
                  "w-full bg-color-bg text-lg placeholder:text-color-text-dimmed",
                  "pt-2",
                  "resize-none"
                )}
                placeholder={
                  isReply ? "Post your reply" : "What is happening?!"
                }
                value={content}
                onChange={handleTextChange}
                onPaste={handlePaste}
              />
            </div>

            <ImagesPreview
              images={images}
              removeImage={removeImage ? removeImage : undefined}
            />
          </div>
        </div>

        {/* 3  */}
        <div
          className={"flex flex-col pb-2  w-full sticky bottom-0 bg-color-bg"}
        >
          <div
            className={
              "-ml-2 border-b-[0.5px] border-color-border flex items-center justify-start "
            }
          >
            <div className={"pb-3 flex justify-center items-start"}>
              <div
                className={
                  "cursor-pointer px-3  text-color-accent text-sm font-bold rounded-2xl hover:bg-color-accent/30 flex justify-center items-center "
                }
              >
                <EarthIcon className={"mr-1"} />
                <span>Everyone can reply</span>
              </div>
            </div>
          </div>

          <div className="mt-2 -ml-2 text-xl flex flex-row justify-center items-center h-full ">
            <NewPostToolbar handleImageSelect={handleImageSelect} />
            <div className="flex flex-row h-full">
              {content.length > 0 && (
                <CircularProgress value={content.length} />
              )}
              <div className="hidden 2sm:block">
                <Button
                  disabled={
                    (content.length === 0 && images.length === 0) ||
                    images.length > 4 ||
                    content.length > MAX_TWEET_LENGTH
                  }
                  className="ml-3"
                  type="submit"
                  onClick={() => sendPost(content, images)}
                >
                  <span>{isReply ? "Reply" : "Post"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
