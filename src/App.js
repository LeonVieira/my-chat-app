import "./App.css";
import { useEffect, useState } from "react";
import { sendMessageToOllama } from "./services/ollamaService";
import { getMessages } from "./services/chatService";

import ChatInput from "./components/Main area/ChatInput";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

useEffect(() => {

    if (!selectedImage) return;

    console.log(selectedImage);

}, [selectedImage]);

   useEffect(() => {
    getMessages()
      .then((data) => {
        console.log("Messages from backend:");
        console.log(data);
      })
      .catch((error) => {
        console.error("Failed to load messages:", error);
      });
  }, []);

const sendMessage = async () => {
  if (!message.trim()) return;

  const newUserMessage = {
    role: "user",
    content: message,
  };

  const updatedMessages = [
    ...messages,
    newUserMessage,
  ];

  

  setMessages(updatedMessages);

  setMessage("");
  setIsLoading(true);

  try {
    const data = await sendMessageToOllama(updatedMessages);

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        role: "assistant",
        content: data.message.content,
      },
    ]);
  } catch (error) {
    console.error("Failed to get response from Qwen:", error);
  } finally {
    setIsLoading(false);
  }
};


 return (
  <div className="app">
    <Sidebar />
<div className="main-content">

  <header className="header">
    <h2>LocalChat</h2>

    <select>
      <option>Qwen3-VL 8B</option>
    </select>
  </header>

  {messages.length === 0 ? (
    <main className="new-chat">
      <div className="new-chat-content">

        <div className="welcome">
          <h1>LocalChat</h1>
          <p>Chat with AI models running locally on your computer.</p>
        </div>

<ChatInput
    message={message}
    setMessage={setMessage}
    selectedImage={selectedImage}
    setSelectedImage={setSelectedImage}
    onSend={sendMessage}
/>

      </div>
    </main>
  ) : (
    <>
      <main className="chat">
        <div className="messages">
{messages.map((msg, index) => (
  <div
    key={index}
    className={
      msg.role === "user"
        ? "user-message"
        : "assistant-message"
    }
  >
    {msg.content}
  </div>
))}

                    {isLoading && (
            <div className="assistant-loading">
              <span className="loading-dot"></span>
              Qwen is thinking...
            </div>
          )}
        </div>
      </main>

<ChatInput
    message={message}
    setMessage={setMessage}
    selectedImage={selectedImage}
    setSelectedImage={setSelectedImage}
    onSend={sendMessage}
/>
    </>
  )}

</div>

  </div>
);
}

export default App;
