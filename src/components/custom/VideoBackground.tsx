'use client'

export default function VideoBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed top-0 left-0 w-full h-full object-cover"
      style={{ zIndex: 0 }}
    >
      <source src="/videos/back.mp4" type="video/mp4" />
    </video>
  )
} 