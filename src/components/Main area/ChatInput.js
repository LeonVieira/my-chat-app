import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
function ChatInput({ message, setMessage, onSend , setSelectedImage}) {



  return (
    <div className="input-area">
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