import { ImageIcon } from "@/components/icons";
import { useRef } from "react";
import { Button } from "../ui/button";

export function ImageInput({ handleImageSelect, children }) {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <div onClick={handleClick}>
        {children ? children : <ImageIcon />}
        <input
          type={"file"}
          accept={"image/*"}
          onChange={handleImageSelect}
          ref={hiddenFileInput}
          style={{ display: "none" }}
          multiple
        />
      </div>
    </>
  );
}
