import './App.css';
import { useState } from 'react';

function App() {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages([...messages, message]);
    setMessage('');
  };


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
        <div className="input-box">
          <button className="attach-button">+</button>

 <input
  type="text"
  placeholder="Message Qwen..."
  value={message}
  onChange={(event) => setMessage(event.target.value)}
/>

<button
  className="send-button"
  onClick={sendMessage}
>
  Send
</button>


        </div>

        <p className="status">
          Local model • Qwen3-VL 8B
        </p>
      </div>

    </div>
  );
}

export default App;