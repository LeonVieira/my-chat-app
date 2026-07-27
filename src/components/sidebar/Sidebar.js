import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <h2 className="sidebar-logo">LocalChat</h2>

        <button className="new-chat-button">
          <span>+</span>
          New chat
        </button>
      </div>

      <div className="sidebar-content">
        <section className="sidebar-section">
          <p className="sidebar-heading">Projects</p>

          <button className="sidebar-item">
            <span>◆</span>
            React Project
          </button>

          <button className="sidebar-item">
            <span>◆</span>
            Development
          </button>
        </section>

        <section className="sidebar-section">
          <p className="sidebar-heading">Recent</p>

          <button className="sidebar-item">
            React component help
          </button>

          <button className="sidebar-item">
            Ollama API setup
          </button>

          <button className="sidebar-item">
            Testing Qwen
          </button>
        </section>
      </div>

      <div className="sidebar-bottom">
        <button className="sidebar-item">
          ⚙ Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;