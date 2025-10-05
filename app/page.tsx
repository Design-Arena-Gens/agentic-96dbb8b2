'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const Game = dynamic(() => import('@/components/Game'), { ssr: false })

export default function Home() {
  const [playerName, setPlayerName] = useState('')
  const [gameStarted, setGameStarted] = useState(false)

  const handleStart = () => {
    if (playerName.trim()) {
      setGameStarted(true)
    }
  }

  return (
    <>
      {!gameStarted && (
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1>🎮 BlockWorld</h1>
            <p>Enter the multiplayer 3D adventure!</p>
            <input
              type="text"
              placeholder="Enter your name..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStart()}
              maxLength={20}
            />
            <button onClick={handleStart}>Start Game</button>
          </div>
        </div>
      )}
      {gameStarted && <Game playerName={playerName} />}
    </>
  )
}
