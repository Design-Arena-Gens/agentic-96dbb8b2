'use client'

import { useRef } from 'react'
import { Text } from '@react-three/drei'

export default function OtherPlayers() {
  // In a real implementation, this would connect to a multiplayer server
  // For now, we'll show a demo player

  const demoPlayers = [
    { id: '1', name: 'Player1', position: [5, 1, 5], color: '#ff6b6b' },
    { id: '2', name: 'Player2', position: [-5, 1, -5], color: '#4ecdc4' },
  ]

  return (
    <>
      {demoPlayers.map((player) => (
        <group key={player.id} position={player.position as [number, number, number]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.5, 1.5]} />
            <meshStandardMaterial color={player.color} />
          </mesh>
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="black"
          >
            {player.name}
          </Text>
        </group>
      ))}
    </>
  )
}
