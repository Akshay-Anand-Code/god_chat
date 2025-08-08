'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center animate-fade-in-up">
            <div className="w-8 h-8 mr-2 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 blur-sm opacity-70"></div>
              <Image 
                src="/images/companion.jpg" 
                alt="AI Companions" 
                fill
                className="object-contain rounded-full"
              />
            </div>
            <span className="text-xl font-semibold gradient-text">AI Companions</span>
          </Link>
          
          <nav className="hidden sm:flex items-center gap-4">
            <Link href="/" className="text-[#a0a0b0] hover:text-white transition-colors animate-fade-in-up animate-delay-100">Home</Link>
            <Link href="/dashboard" className="text-[#a0a0b0] hover:text-white transition-colors animate-fade-in-up animate-delay-200">Dashboard</Link>
            <Link href="/create/agent" className="text-[#a0a0b0] hover:text-white transition-colors animate-fade-in-up animate-delay-300">
              Agent Creator
            </Link>
          </nav>

          <div className="flex items-center space-x-3 animate-fade-in-up animate-delay-200">
            <a 
              href="https://x.com/LifeAsCompanion" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-[#14141f] transition-colors text-[#a0a0b0] hover:text-[var(--primary)]"
              aria-label="Twitter"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}