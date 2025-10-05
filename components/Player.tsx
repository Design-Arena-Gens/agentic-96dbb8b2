'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import * as THREE from 'three'

const MOVE_SPEED = 5
const JUMP_FORCE = 8
const GRAVITY = -20

export default function Player({ playerName }: { playerName: string }) {
  const { camera } = useThree()

  const movement = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  })

  const velocity = useRef(new Vector3(0, 0, 0))
  const isOnGround = useRef(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
          movement.current.forward = true
          break
        case 'KeyS':
          movement.current.backward = true
          break
        case 'KeyA':
          movement.current.left = true
          break
        case 'KeyD':
          movement.current.right = true
          break
        case 'Space':
          movement.current.jump = true
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
          movement.current.forward = false
          break
        case 'KeyS':
          movement.current.backward = false
          break
        case 'KeyA':
          movement.current.left = false
          break
        case 'KeyD':
          movement.current.right = false
          break
        case 'Space':
          movement.current.jump = false
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    // Set initial camera position
    camera.position.set(0, 5, 10)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [camera])

  useFrame((state, delta) => {
    // Movement direction based on camera orientation
    const frontVector = new Vector3(0, 0, Number(movement.current.backward) - Number(movement.current.forward))
    const sideVector = new Vector3(Number(movement.current.left) - Number(movement.current.right), 0, 0)

    const direction = new Vector3()
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(MOVE_SPEED * delta).applyEuler(camera.rotation)

    // Apply gravity
    velocity.current.y += GRAVITY * delta

    // Check ground collision (simple ground at y = 0)
    if (camera.position.y <= 1.5) {
      camera.position.y = 1.5
      velocity.current.y = 0
      isOnGround.current = true
    } else {
      isOnGround.current = false
    }

    // Jump
    if (movement.current.jump && isOnGround.current) {
      velocity.current.y = JUMP_FORCE
    }

    // Apply movement
    camera.position.x += direction.x
    camera.position.z += direction.z
    camera.position.y += velocity.current.y * delta

    // Simple boundary limits
    camera.position.x = Math.max(-24, Math.min(24, camera.position.x))
    camera.position.z = Math.max(-24, Math.min(24, camera.position.z))
  })

  return null
}
