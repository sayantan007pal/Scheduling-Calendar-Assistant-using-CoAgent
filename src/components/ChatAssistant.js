import React, { useState } from 'react';
import { MyCoAgent } from '../agents/MyCoAgent';

const coAgent = new MyCoAgent();

export default function ChatAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    const response = await coAgent.handleUserMessage(input);
    setMessages([...messages, { user: input, bot: response }]);
    setInput('');
  };

  return (
    <div>
      <h2>AI Scheduling Assistant</h2>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>
            <strong>User:</strong> {msg.user}
            <br />
            <strong>Assistant:</strong> {msg.bot}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
