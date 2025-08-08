'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiMoon, FiSun, FiCommand } from 'react-icons/fi'

export default function Header() {
  const [darkMode, setDarkMode] = useState(true)
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 mr-2 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 blur-sm opacity-70"></div>
              <Image 
                src="/images/ani.png" 
                alt="AI Companions" 
                fill
                className="object-contain rounded-full"
              />
            </div>
            <span className="text-xl font-semibold gradient-text">AI Companions</span>
          </Link>
          
          <nav className="hidden sm:flex items-center gap-4">
            <Link href="/" className="text-[#a0a0b0] hover:text-white transition-colors">Home</Link>
            <Link href="/dashboard" className="text-[#a0a0b0] hover:text-white transition-colors">Dashboard</Link>
            <Link href="/create/agent" className="text-[#a0a0b0] hover:text-white transition-colors">
              Agent Creator
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center bg-[#14141f]/60 border border-[#2e2e3a] rounded-lg px-3 py-1.5">
              <FiCommand className="text-[#6c6c7c] mr-2" />
              <span className="text-sm text-[#6c6c7c]">Press / to search</span>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-[#14141f] transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun className="text-[#a0a0b0]" /> : <FiMoon className="text-[#a0a0b0]" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}