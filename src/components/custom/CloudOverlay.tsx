'use client'

export default function CloudOverlay() {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[60vh] pointer-events-none" style={{ zIndex: 10 }}>
      {/* Bright base layer */}
      <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-white/80 via-white/50 to-transparent" />
      
      {/* Golden glow layer */}
      <div className="absolute bottom-0 w-full h-[80%] animate-cloud-drift-1">
        <div className="w-full h-full bg-gradient-to-t from-[#FFD700]/40 via-[#FFD700]/20 to-transparent blur-2xl" />
      </div>

      {/* Bright clouds */}
      <div className="absolute bottom-0 w-full h-[70%] overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-[140%] h-full animate-cloud-wave"
            style={{
              left: `${i * 20 - 20}%`,
              animationDelay: `${i * 1.2}s`,
              background: 'radial-gradient(ellipse at center, white 0%, rgba(255,255,255,0.5) 30%, transparent 70%)',
              opacity: 0.7,
              filter: 'blur(20px)',
            }}
          />
        ))}
      </div>

      {/* Glowing mist effect */}
      <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-white/90 via-white/60 to-transparent blur-3xl" />
      
      {/* Additional golden glow */}
      <div className="absolute bottom-0 w-full h-[20%] bg-[#FFD700]/30 blur-2xl" />
    </div>
  )
} 