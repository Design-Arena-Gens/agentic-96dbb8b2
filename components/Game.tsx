'use client'

import { Canvas } from '@react-three/fiber'
import { Sky, PointerLockControls } from '@react-three/drei'
import { Suspense, useState } from 'react'
import Player from './Player'
import World from './World'
import OtherPlayers from './OtherPlayers'
import UI from './UI'

export default function Game({ playerName }: { playerName: string }) {
  return (
    <>
      <Canvas
        shadows
        camera={{ fov: 75, position: [0, 5, 10] }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[50, 50, 25]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        <Suspense fallback={null}>
          <Player playerName={playerName} />
          <World />
          <OtherPlayers />
        </Suspense>

        <PointerLockControls />
      </Canvas>

      <UI playerName={playerName} />
    </>
  )
}
