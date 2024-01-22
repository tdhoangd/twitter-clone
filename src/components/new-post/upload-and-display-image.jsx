import Image from "next/image";
import React, { useState } from "react";

const UploadAndDisplayImage = () => {
  const [inputValue, setInputValue] = useState("");
  const [pastedContent, setPastedContent] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePaste = async (e) => {
    e.preventDefault();

    // Check if there are files in the clipboard
    const files = e.clipboardData.files;
    if (files.length > 0) {
      const fileUrls = [];
      for (const file of files) {
        if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
          const fileUrl = URL.createObjectURL(file);
          fileUrls.push({ url: fileUrl, type: file.type });
        }
      }
      setPastedContent(fileUrls);
    } else {
      // Handle pasted text
      const pastedText = e.clipboardData.getData("text");
      setInputValue(pastedText);
    }
  };

  const Media = ({ fileUrl, fileType }) => {
    if (fileType.startsWith("image/")) {
      return <Image src={fileUrl} alt="Pasted" width={300} height={300} />;
    } else if (fileType.startsWith("video/")) {
      return <video src={fileUrl} controls width={300} height={300} />;
    }
    return null;
  };

  return (
    <div>
      <input
        className="h-20 w-full"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onPaste={handlePaste}
        placeholder="Paste here"
      />
      <div>
        {pastedContent.map((content, index) => (
          <Media key={index} fileUrl={content.url} fileType={content.type} />
        ))}
      </div>
    </div>
  );
};

// const [selectedImages, setSelectedImages] = useState([]);

// const handleImageChange = (event) => {
//   const files = event.target.files;
//   const newSelectedImages = [];

//   for (let i = 0; i < files.length; i++) {
//     newSelectedImages.push(URL.createObjectURL(files[i]));
//   }

//   setSelectedImages([...selectedImages, ...newSelectedImages]);
// };

// const removeImage = (index) => {
//   const updatedImages = [...selectedImages];
//   updatedImages.splice(index, 1);
//   setSelectedImages(updatedImages);
// };

// return (
//   <div>
//     <h1>Upload and Display Images using React Hooks</h1>

//     {selectedImages.map((imageUrl, index) => (
//       <div key={index}>
//         <Image alt="not found" width={250} height={250} src={imageUrl} />
//         <br />
//         <button onClick={() => removeImage(index)}>Remove</button>
//       </div>
//     ))}

//     <br />
//     <br />

//     <input
//       type="file"
//       name="myImage"
//       onChange={handleImageChange}
//       accept="image/*"
//       multiple
//     />
//   </div>
// );

export default UploadAndDisplayImage;
