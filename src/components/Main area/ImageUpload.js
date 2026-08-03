import { useRef } from "react";

function ImageUpload({ onImageSelected }) {
  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleFileSelected = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    onImageSelected(file);
  };

  return (
    <>
      <button onClick={openFilePicker}>
        +
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileSelected}
      />
    </>
  );
}

export default ImageUpload;