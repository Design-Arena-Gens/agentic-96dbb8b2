'use client'

import * as THREE from 'three'

function Ground() {
  return (
    <mesh receiveShadow position={[0, -0.5, 0]}>
      <boxGeometry args={[100, 1, 100]} />
      <meshStandardMaterial color="#4a9d4e" />
    </mesh>
  )
}

function Block({ position, size, color }: { position: [number, number, number], size: [number, number, number], color: string }) {
  return (
    <mesh castShadow receiveShadow position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Platform({ position }: { position: [number, number, number] }) {
  return (
    <mesh castShadow receiveShadow position={position}>
      <boxGeometry args={[5, 0.5, 5]} />
      <meshStandardMaterial color="#8b4513" />
    </mesh>
  )
}

export default function World() {
  return (
    <>
      <Ground />

      {/* Obstacles and platforms */}
      <Block position={[5, 1, 5]} size={[2, 2, 2]} color="#e74c3c" />
      <Block position={[-5, 1, -5]} size={[2, 2, 2]} color="#3498db" />
      <Block position={[8, 1, -8]} size={[2, 2, 2]} color="#f39c12" />
      <Block position={[-8, 1, 8]} size={[2, 2, 2]} color="#9b59b6" />

      {/* Tall towers */}
      <Block position={[15, 3, 0]} size={[3, 6, 3]} color="#1abc9c" />
      <Block position={[-15, 3, 0]} size={[3, 6, 3]} color="#e67e22" />

      {/* Platforms at different heights */}
      <Platform position={[0, 2, -15]} />
      <Platform position={[0, 5, -20]} />
      <Platform position={[10, 3, -10]} />
      <Platform position={[-10, 4, 10]} />

      {/* Walls */}
      <Block position={[0, 2, 25]} size={[50, 4, 2]} color="#95a5a6" />
      <Block position={[0, 2, -25]} size={[50, 4, 2]} color="#95a5a6" />
      <Block position={[25, 2, 0]} size={[2, 4, 50]} color="#95a5a6" />
      <Block position={[-25, 2, 0]} size={[2, 4, 50]} color="#95a5a6" />

      {/* Pyramid structure */}
      <Block position={[-18, 0.5, -18]} size={[8, 1, 8]} color="#f1c40f" />
      <Block position={[-18, 1.5, -18]} size={[6, 1, 6]} color="#f39c12" />
      <Block position={[-18, 2.5, -18]} size={[4, 1, 4]} color="#e67e22" />
      <Block position={[-18, 3.5, -18]} size={[2, 1, 2]} color="#d35400" />
    </>
  )
}
