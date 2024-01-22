import {
  EmojiIcon,
  GifIcon,
  LocationIcon,
  PollIcon,
  ScheduleIcon,
} from "@/components/icons";
import { ImageInput } from "@/components/new-post/image-input";
import { cn } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export function NewPostToolbar({
  className,

  handleImageSelect,
}) {
  const [isLocationAvailable, setIsLocationAvailable] = useState(false);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => setIsLocationAvailable(true),
        () => setIsLocationAvailable(false)
      );
    } else {
      setIsLocationAvailable(false);
    }
  }, []);

  return (
    <div className={cn("flex flex-row p-[2px] flex-auto text-xl", className)}>
      {/* <ImageUploadButton handleImageSelect={handleImageSelect} /> */}

      <Button variant="inverse" size="icon" textSize="xl">
        <ImageInput handleImageSelect={handleImageSelect} />
      </Button>

      <Button variant="inverse" size="icon" textSize="xl" disabled>
        <GifIcon />
      </Button>

      <Button variant="inverse" size="icon" textSize="xl" disabled>
        <PollIcon />
      </Button>

      <Button variant="inverse" size="icon" textSize="xl" disabled>
        <EmojiIcon />
      </Button>

      <Button variant="inverse" size="icon" textSize="xl" disabled>
        <ScheduleIcon />
      </Button>

      <Button
        variant="inverse"
        size="icon"
        textSize="xl"
        disabled={!isLocationAvailable}
      >
        <LocationIcon />
      </Button>
    </div>
  );
}
