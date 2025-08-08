'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Eye, 
  Users, 
  Zap, 
  MessageSquare, 
  Code, 
  Upload, 
  Settings, 
  ChevronDown, 
  Cloud,
  DollarSign
} from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  
  return (
    <div className="w-64 h-screen bg-[var(--card-bg)] border-r border-[var(--border)] fixed left-0 top-0 pt-16 flex flex-col glass-dark">
      <div className="p-4">
        <button className="border border-[var(--primary)] text-[var(--primary)] py-2 px-4 uppercase font-medium tracking-wider hover:bg-[var(--primary)]/10 transition-colors w-full flex items-center justify-center">
          <Zap size={16} className="mr-2" />
          GO TO MARKETPLACE
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <nav className="px-2 py-4">
          <Link 
            href="/dashboard" 
            className={`flex items-center px-4 py-2 rounded-sm mb-1 ${
              pathname === '/dashboard' 
                ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-l-2 border-[var(--primary)] glow-text' 
                : 'text-[var(--text-secondary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]'
            } transition-colors techno-font text-sm`}
          >
            <Eye size={16} className="mr-3" />
            MY DASHBOARD
          </Link>
          
          <Link 
            href="/agents" 
            className={`flex items-center px-4 py-2 rounded-sm mb-1 ${
              pathname === '/agents' 
                ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-l-2 border-[var(--primary)] glow-text' 
                : 'text-[var(--text-secondary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]'
            } transition-colors techno-font text-sm`}
          >
            <Users size={16} className="mr-3" />
            MY AGENTS
          </Link>
          
          <Link 
            href="/collaborator" 
            className={`flex items-center px-4 py-2 rounded-sm mb-1 ${
              pathname === '/collaborator' 
                ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-l-2 border-[var(--primary)] glow-text' 
                : 'text-[var(--text-secondary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]'
            } transition-colors techno-font text-sm`}
          >
            <Users size={16} className="mr-3" />
            AGENTS COLLABORATOR
          </Link>
          
          <Link 
            href="/sequencer" 
            className={`flex items-center px-4 py-2 rounded-sm mb-1 ${
              pathname === '/sequencer' 
                ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-l-2 border-[var(--primary)] glow-text' 
                : 'text-[var(--text-secondary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]'
            } transition-colors techno-font text-sm`}
          >
            <Zap size={16} className="mr-3" />
            AGENTS SEQUENCER
            <span className="ml-2 text-xs bg-[var(--primary)] px-1.5 py-0.5 rounded-sm text-black mono-font">BETA</span>
          </Link>
          
          <Link 
            href="/chatbot" 
            className={`flex items-center px-4 py-2 rounded-sm mb-1 ${
              pathname === '/chatbot' 
                ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-l-2 border-[var(--primary)] glow-text' 
                : 'text-[var(--text-secondary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]'
            } transition-colors techno-font text-sm`}
          >
            <MessageSquare size={16} className="mr-3" />
            WEB CHATBOT CREATOR
          </Link>
          
          <div className="circuit-line my-4"></div>
          
          <div className="mb-2">
            <div className="px-4 py-1 flex items-center justify-between cursor-pointer text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors techno-font text-sm">
              <div className="flex items-center">
                <Upload size={16} className="mr-3" />
                <span>BRING YOUR OWN</span>
              </div>
              <ChevronDown size={14} />
            </div>
          </div>
          
          <div className="mt-4 mb-2">
            <div className="px-4 py-1 flex items-center justify-between cursor-pointer text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors techno-font text-sm">
              <div className="flex items-center">
                <Code size={16} className="mr-3" />
                <span>AUTO DEPLOYMENT</span>
              </div>
              <ChevronDown size={14} />
            </div>
            
            <div className="ml-8 mt-1">
              <Link 
                href="/repository" 
                className={`flex items-center px-4 py-1.5 rounded-sm mb-1 text-xs mono-font ${
                  pathname === '/repository' ? 'text-[var(--primary)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                } transition-colors`}
              >
                REPOSITORY
              </Link>
              <Link 
                href="/configuration" 
                className={`flex items-center px-4 py-1.5 rounded-sm mb-1 text-xs mono-font ${
                  pathname === '/configuration' ? 'text-[var(--primary)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                } transition-colors`}
              >
                CONFIGURATION
              </Link>
              <Link 
                href="/endpoints" 
                className={`flex items-center px-4 py-1.5 rounded-sm mb-1 text-xs mono-font ${
                  pathname === '/endpoints' ? 'text-[var(--primary)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                } transition-colors`}
              >
                ENDPOINTS
              </Link>
            </div>
          </div>
          
          <div className="mt-4 mb-2">
            <div className="px-4 py-1 flex items-center justify-between cursor-pointer text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors techno-font text-sm">
              <div className="flex items-center">
                <Cloud size={16} className="mr-3" />
                <span>CLOUD SERVICES</span>
              </div>
              <ChevronDown size={14} />
            </div>
          </div>
          
          <div className="circuit-line my-4"></div>
          
          <Link 
            href="/earnings" 
            className={`flex items-center px-4 py-2 rounded-sm mb-1 ${
              pathname === '/earnings' 
                ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-l-2 border-[var(--primary)] glow-text' 
                : 'text-[var(--text-secondary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]'
            } transition-colors techno-font text-sm`}
          >
            <DollarSign size={16} className="mr-3" />
            EARNINGS
          </Link>
        </nav>
      </div>
      
      <div className="p-4 border-t border-[var(--border)]">
        <Link 
          href="/settings" 
          className="flex items-center px-4 py-2 rounded-sm text-[var(--text-secondary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)] transition-colors techno-font text-sm"
        >
          <Settings size={16} className="mr-3" />
          SETTINGS
        </Link>
      </div>
    </div>
  )
}