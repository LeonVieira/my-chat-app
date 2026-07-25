import './App.css';

function App() {
  return (
    <div className="app">

      <header className="header">
        <h2>LocalChat</h2>

        <select>
          <option>Qwen3-VL 8B</option>
        </select>
      </header>

      <main className="chat">
        <div className="welcome">
          <h1>LocalChat</h1>
          <p>Chat with AI models running locally on your computer.</p>
        </div>
      </main>

      <div className="input-area">
        <div className="input-box">
          <button className="attach-button">+</button>

          <input
            type="text"
            placeholder="Message Qwen..."
          />

          <button className="send-button">Send</button>
        </div>

        <p className="status">
          Local model • Qwen3-VL 8B
        </p>
      </div>

    </div>
  );
}

export default App;