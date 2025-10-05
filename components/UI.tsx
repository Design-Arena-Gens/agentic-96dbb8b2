'use client'

import { useState } from 'react'

export default function UI({ playerName }: { playerName: string }) {
  const [messages, setMessages] = useState<Array<{ name: string, text: string }>>([
    { name: 'System', text: 'Welcome to BlockWorld!' },
    { name: 'System', text: 'Use WASD to move, Space to jump' },
  ])
  const [chatInput, setChatInput] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatInput.trim()) {
      setMessages([...messages, { name: playerName, text: chatInput }])
      setChatInput('')
    }
  }

  return (
    <div className="ui-overlay">
      <div className="player-count game-ui">
        👥 Players Online: 3
      </div>

      <div className="controls-info game-ui">
        <h3>Controls</h3>
        <p><strong>W/A/S/D</strong> - Move</p>
        <p><strong>Space</strong> - Jump</p>
        <p><strong>Mouse</strong> - Look Around</p>
        <p><strong>ESC</strong> - Release Mouse</p>
      </div>

      <div className="chat-box game-ui">
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className="chat-message">
              <strong>{msg.name}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            maxLength={100}
          />
        </form>
      </div>

      <div className="crosshair"></div>
    </div>
  )
}
