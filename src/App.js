import "./App.css";
import { useEffect, useState } from "react";
import { sendMessageToOllama } from "./services/ollamaService";
import ChatInput from "./components/chat/ChatInput";


function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages([...messages, message]);
    setMessage("");
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
      <header className="header">
        <h2>LocalChat</h2>

        <select>
          <option>Qwen3-VL 8B</option>
        </select>
      </header>

      <main className="chat">
        {messages.length === 0 ? (
          <div className="welcome">
            <h1>LocalChat</h1>
            <p>Chat with AI models running locally on your computer.</p>
          </div>
        ) : (
          <div className="messages">
            {messages.map((msg, index) => (
              <div className="user-message" key={index}>
                {msg}
              </div>
            ))}
          </div>
        )}
      </main>

      <div className="input-area">
  

      <ChatInput
        message={message}
        setMessage={setMessage}
        onSend={sendMessage}
      />

      </div>
    </div>
  );
}

export default App;
