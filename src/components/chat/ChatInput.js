function ChatInput({ message, setMessage, onSend }) {
  return (
    <div className="input-area">
      <div className="input-box">
        <button className="attach-button">
          +
        </button>

        <input
          type="text"
          placeholder="Message Qwen..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
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