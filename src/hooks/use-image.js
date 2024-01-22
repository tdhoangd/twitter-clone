import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useImage() {
  const [images, setImages] = useState([]);

  const updateImageStates = useCallback((file) => {
    const imagePreviewUrl = URL.createObjectURL(file);

    setImages((prevImages) => [
      ...prevImages,
      {
        id: uuidv4(),
        image: file,
        image_url: imagePreviewUrl,
      },
    ]);
  }, []);

  const handleImageSelect = useCallback(
    (event) => {
      const selectedFiles = Array.from(event.target.files);
      const remainingSlots = 4 - images.length;

      selectedFiles.slice(0, remainingSlots).forEach((file) => {
        if (file.type.startsWith("image/")) {
          updateImageStates(file);
        }
      });
    },
    [images.length, updateImageStates]
  );

  const handleImagePaste = useCallback(
    (event) => {
      const items = (event.clipboardData || window.clipboardData).items;

      for (const item of items) {
        if (images.length >= 4) break;
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          updateImageStates(file);
          event.preventDefault();
        }
      }
    },
    [images.length, updateImageStates]
  );

  const removeImage = useCallback((id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  }, []);

  const resetImageStates = useCallback(() => {
    setImages([]);
  }, []);

  return {
    images,
    handleImageSelect,
    handleImagePaste,
    resetImageStates,
    removeImage,
  };
}

// export function useImage() {
//   const [images, setImages] = useState([]);
//   const [imagesPreview, setImagesPreview] = useState([]);

//   const updateImageStates = useCallback((file) => {
//     const imagePreviewUrl = URL.createObjectURL(file);

//     setImages((prevImages) => [...prevImages, file]);
//     setImagesPreview((prevImagesPreview) => [
//       ...prevImagesPreview,
//       imagePreviewUrl,
//     ]);
//   }, []);

//   const handleImageSelect = useCallback(
//     (event) => {
//       const selectedFiles = Array.from(event.target.files);
//       const remainingSlots = 4 - images.length;

//       selectedFiles.slice(0, remainingSlots).forEach((file) => {
//         if (file.type.startsWith("image/")) {
//           updateImageStates(file);
//         }
//       });
//     },
//     [images.length, updateImageStates]
//   );

//   const handleImagePaste = useCallback(
//     (event) => {
//       const items = (event.clipboardData || window.clipboardData).items;

//       for (const item of items) {
//         if (images.length >= 4) break;
//         if (item.type.startsWith("image/")) {
//           const file = item.getAsFile();
//           updateImageStates(file);
//           event.preventDefault();
//         }
//       }
//     },
//     [images.length, updateImageStates]
//   );

//   const removeImage = useCallback((index) => {
//     setImages((prevImages) => prevImages.filter((_, idx) => idx !== index));
//     setImagesPreview((prevImagesPreview) =>
//       prevImagesPreview.filter((_, idx) => idx !== index)
//     );
//   }, []);

//   const resetImageStates = useCallback(() => {
//     setImages([]);
//     setImagesPreview([]);
//   }, []);

//   return {
//     images,
//     imagesPreview,
//     handleImageSelect,
//     handleImagePaste,
//     resetImageStates,
//     removeImage,
//   };
// }
