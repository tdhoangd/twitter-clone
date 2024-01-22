"use client";

import { CloseIcon, PhotoIcon } from "@/components/icons";
import { ImageInput } from "@/components/new-post/image-input";
import { Button } from "@/components/ui/button";
import { EditProfileUseravatar } from "@/components/user/edit-profile-useravatar";
import { InputField } from "@/components/user/input-field";
import UserCover from "@/components/user/user-cover";

export function EditProfileInput({
  name,
  onNameChange,
  bio,
  onBioChange,
  location,
  onLocationChange,
  website,
  onWebsiteChange,
  avatarImagePath,
  handleAvatarImageSelect,
  coverImagePath,
  handleCoverImageSelect,
}) {
  return (
    <div className="flex flex-col">
      <div className="block">
        <div className="mt-0.5 h-32 xs:h-52 bg-color-bg-3 w-full relative">
          <UserCover imagePath={coverImagePath} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex">
            <ImageInput handleImageSelect={handleCoverImageSelect}>
              <Button
                size="bigIcon"
                className="bg-color-bg/30 hover:bg-color-bg/70 "
              >
                <PhotoIcon />
              </Button>
            </ImageInput>

            {coverImagePath && (
              <Button
                size="bigIcon"
                className="bg-color-bg/30 hover:bg-color-bg/70 ml-5"
                onClick={() => setCoverImage({ url: null, image: null })}
              >
                <CloseIcon />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="relative flex flex-col px-0">
        <div className="mb-16 px-4">
          <div
            className="custom-button main-tab accent-tab absolute  aspect-square w-24 -translate-y-1/2 overflow-hidden p-0  xs:w-24 sm:w-32  "
            type="button"
            disabled=""
          >
            <div className="h-full rounded-full bg-color-bg flex flex-col justify-center items-center relative">
              <EditProfileUseravatar imagePath={avatarImagePath} />

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                <ImageInput handleImageSelect={handleAvatarImageSelect}>
                  <Button
                    size="bigIcon"
                    className="bg-color-bg/30 hover:bg-color-bg/70 "
                  >
                    <PhotoIcon />
                  </Button>
                </ImageInput>
              </div>
            </div>
          </div>
        </div>

        <InputField
          label={"Name"}
          limit={50}
          required
          value={name}
          onChange={onNameChange}
        />
        <InputField
          label={"Bio"}
          textarea
          limit={160}
          value={bio}
          onChange={onBioChange}
        />
        <InputField
          label={"Location"}
          limit={30}
          value={location}
          onChange={onLocationChange}
        />
        <InputField
          label={"Website"}
          limit={100}
          value={website}
          onChange={onWebsiteChange}
        />

        <div className="h-20 px-4"></div>
      </div>
    </div>
  );
}
