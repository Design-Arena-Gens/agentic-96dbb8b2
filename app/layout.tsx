import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BlockWorld - Multiplayer 3D Game',
  description: 'A Roblox-inspired multiplayer 3D game platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
