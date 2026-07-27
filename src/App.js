import "./App.css";
import { useEffect, useState } from "react";
import { sendMessageToOllama } from "./services/ollamaService";
import ChatInput from "./components/Main area/ChatInput";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 
  const sendMessage = async () => {
  if (!message.trim()) return;

  const userMessage = message;

  setMessages([...messages, userMessage]);
  setMessage("");
  setIsLoading(true);

  try {
    console.log("Sending to Qwen:", userMessage);

    const data = await sendMessageToOllama(userMessage);

    console.log("Qwen response:", data.message.content);
  } catch (error) {
    console.error("Failed to get response from Qwen:", error);
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    sendMessageToOllama("What is 5+5?")
      .then((data) => {
        console.log("Connected to Qwen!");
        console.log(data.message.content);
      })
      .catch((error) => {
        console.error("Failed to connect to Ollama:", error);
      });
  }, []);

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
          onSend={sendMessage}
        />

      </div>
    </main>
  ) : (
    <>
      <main className="chat">
        <div className="messages">
          {messages.map((msg, index) => (
            <div className="user-message" key={index}>
              {msg}
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
        onSend={sendMessage}
      />
    </>
  )}

</div>

  </div>
);
}

export default App;
