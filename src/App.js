// src/App.js
import React, { useState } from 'react';
import ChatLog from './ChatLog';
import InputForm from './InputForm';

const App = () => {
  const [messages, setMessages] = useState([
    // Initial messages if any
  ]);

  const sendMessageToServer = async (message) => {
    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setMessages([...messages, { sender: 'You', text: message }, { sender: 'AI', text: data.response }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app">
      <ChatLog messages={messages} />
      <InputForm sendMessage={sendMessageToServer} />
    </div>
  );
};

export default App;