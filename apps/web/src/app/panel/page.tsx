'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const AGENTS = [
  {
    city: 'Bali/Indonesia',
    desc: [
      'Affordable living',
      'Strong community',
      'Beautiful nature',
    ],
  },
  {
    city: 'Bangkok/Thailand',
    desc: [
      'Low cost',
      'Great co-working',
      'Relaxed vibe',
    ],
  },
  {
    city: 'Ho Chi Minh City/Vietnam',
    desc: [
      'Vibrant culture',
      'Affordable',
      'Great transport',
    ],
  },
];

export default function PanelPage() {
  const [messages, setMessages] = useState([
    { from: 'system', text: 'These cities fit your profile! Any specific preferences you\'d like to add?' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left: Chat */}
      <div className="flex flex-col flex-1 border-r bg-white max-w-[50vw] min-w-[350px]">
        <div className="flex items-center px-6 py-4 border-b bg-gray-100">
          <span className="font-bold text-lg">New User</span>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.from === 'user'
                  ? 'ml-auto bg-blue-100 text-right'
                  : 'bg-gray-100'
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form
          className="flex items-center gap-2 p-4 border-t bg-white"
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Send
          </button>
        </form>
      </div>

      {/* Right: Agents */}
      <div className="flex-1 flex flex-col bg-gray-50 p-8 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">Recommended Cities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AGENTS.map((agent, idx) => (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              key={agent.city}
              className="w-full text-left bg-white rounded-xl shadow-md border hover:shadow-lg transition p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => alert(`Selected: ${agent.city}`)}
            >
              <div className="font-semibold text-lg mb-2">{agent.city}</div>
              <ul className="text-gray-600 space-y-1 text-sm">
                {agent.desc.map((line, i) => (
                  <li key={i}>• {line}</li>
                ))}
              </ul>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
} 