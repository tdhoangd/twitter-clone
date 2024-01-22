"use client";

import { CloseIcon } from "@/components/icons";
import { PageHeaderWrapper } from "@/components/layouts/page-header-wrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EditProfileInput } from "@/components/user/edit-profile-input";
import { useUserInteractions } from "@/hooks/use-user-interactions";
import { useBoundStore } from "@/store/use-bound-store";
import React, { useState } from "react";

export function EditProfile({}) {
  const user = useBoundStore((state) => state.user);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const [website, setWebsite] = useState("");

  const [coverImage, setCoverImage] = useState({
    url: user.cover_image_path,
    image: null,
  });
  const [avatarImage, setAvatarImage] = useState({
    url: user.avatar_image_path,
    image: null,
  });

  const { handleEditProfile } = useUserInteractions();

  const handleCoverImageSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setCoverImage({
        image: file,
        url: fileUrl,
        isLocalUrl: true,
      });
    }
  };

  const handleAvatarImageSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setAvatarImage({
        image: file,
        url: fileUrl,
        isLocalUrl: true,
      });
    }
  };

  const handleSave = async () => {
    handleEditProfile({
      name,
      bio,
      location,
      website,
      avatarImage,
      coverImage,
    });
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <div className="">
              <span>Edit profile</span>
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent scrollable={true}>
          <PageHeaderWrapper withNavigationBack={false}>
            <div className="flex flex-row w-full items-center">
              <div className="min-w-[56px]">
                <Button
                  size="icon"
                  variant="primary"
                  className="text-2xl"
                  onClick={() => setOpen(false)}
                >
                  <CloseIcon />
                </Button>
              </div>

              <div className="grow text-lg font-bold">
                <span>Edit Profile</span>
              </div>

              <Button variant="primaryInverse" size="sm" onClick={handleSave}>
                <span>Save</span>
              </Button>
            </div>
          </PageHeaderWrapper>

          <div className="">
            <EditProfileInput
              name={name}
              onNameChange={(text) => setName(text)}
              bio={bio}
              onBioChange={(text) => setBio(text)}
              location={location}
              onLocationChange={(text) => setLocation(text)}
              website={website}
              onWebsiteChange={(text) => setWebsite(text)}
              avatarImagePath={avatarImage.url}
              handleAvatarImageSelect={handleAvatarImageSelect}
              coverImagePath={coverImage.url}
              handleCoverImageSelect={handleCoverImageSelect}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
