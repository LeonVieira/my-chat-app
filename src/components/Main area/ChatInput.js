import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import "./ChatInput.css";


function ChatInput({
    message,
    setMessage,
    selectedImage,
    setSelectedImage,
    onSend
}) {

const handlePaste = (event) => {
  const items = event.clipboardData.items;

  for (const item of items) {

    if (item.type.startsWith("image/")) {

      const file = item.getAsFile();

      setSelectedImage(file);

      console.log("Screenshot pasted!");

      event.preventDefault();

      return;
    }
  }
};

  return (
    <div className="input-area">
   

<ImagePreview
    image={selectedImage}
    onRemove={() => setSelectedImage(null)}
/>

<div className="input-box">
  <ImageUpload
    onImageSelected={setSelectedImage}
/>
  
  <input
  type="text"
  placeholder="Message Qwen..."
  value={message}
  onChange={(event) => setMessage(event.target.value)}
  onKeyDown={(event) => {
    if (event.key === "Enter") {
      onSend();
    }
  }}
  onPaste={handlePaste}
/>

        <button
          className="send-button"
          onClick={onSend}
        >
          Send
        </button>
      </div>

      <p className="status">
        Local model • Qwen3-VL 8B
      </p>
    </div>
  );
}

export default ChatInput;