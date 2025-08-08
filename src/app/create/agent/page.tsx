'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Info, Upload, Zap, Code, Save, Play, Sparkles, AlertTriangle } from 'lucide-react'
import Sidebar from '@/components/custom/Sidebar'

export default function AgentCreator() {
  const [activeTab, setActiveTab] = useState('basics')
  
  return (
    <div className="min-h-screen bg-[var(--background)] text-white">
      {/* Header */}
      <header className="glass fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-[var(--primary)] rounded-md flex items-center justify-center mr-3 glow">
                <Zap size={18} className="text-black" />
              </div>
              <span className="font-bold text-lg techno-font tracking-wider">COMPANION FORGE</span>
            </Link>
            
            <div className="h-6 border-l border-[var(--border)] mx-4"></div>
            
            <div className="flex items-center text-sm mono-font">
              <Link href="/dashboard" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                <ChevronLeft size={16} className="inline mr-1" />
                MY DASHBOARD
              </Link>
              <span className="mx-2 text-[var(--text-tertiary)]">/</span>
              <span className="text-[var(--primary)]">AGENT CREATOR</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="border border-[var(--primary)] text-[var(--primary)] py-2 px-4 uppercase font-medium tracking-wider hover:bg-[var(--primary)]/10 transition-colors flex items-center">
              <Save size={16} className="mr-2" />
              Save Draft
            </button>
            <button className="bg-[var(--primary)] text-black py-2 px-4 uppercase font-medium tracking-wider hover:opacity-90 transition-colors flex items-center">
              <Play size={16} className="mr-2" />
              Deploy Agent
            </button>
          </div>
        </div>
      </header>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="pl-64 pt-24 pb-12 pr-4 grid-bg">
        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Blur Overlay */}
          <div className="blur-overlay blur-overlay-light rounded-md">
            <div className="coming-soon" style={{textShadow: "0 0 10px rgba(0,0,0,0.5)"}}>COMING SOON</div>
            <div className="terminal-text mb-8" style={{textShadow: "0 0 5px rgba(0,0,0,0.5)"}}>Agent creation module: initializing...</div>
            <button className="border border-[var(--primary)] bg-[rgba(0,0,0,0.5)] text-[var(--primary)] py-2 px-8 uppercase font-medium tracking-wider hover:bg-[var(--primary)]/10 transition-colors">
              JOIN WAITLIST
            </button>
          </div>
          
          {/* Left column - Form */}
          <div className="w-full md:w-2/3">
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-md p-6 mb-6">
              <h1 className="text-2xl font-bold mb-1 techno-font tracking-wider text-white">CREATE NEW COMPANION</h1>
              <p className="text-white">Configure your AI companion&apos;s identity, capabilities and behavior</p>
              
              {/* Tabs */}
              <div className="flex border-b border-[var(--border)] mt-6 relative">
                <button 
                  className={`px-4 py-2 text-sm font-medium techno-font ${activeTab === 'basics' ? 'text-[var(--primary)] relative' : 'text-[var(--text-secondary)] hover:text-white'}`}
                  onClick={() => setActiveTab('basics')}
                >
                  BASICS
                  {activeTab === 'basics' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)] glow"></div>}
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium techno-font ${activeTab === 'personality' ? 'text-[var(--primary)] relative' : 'text-[var(--text-secondary)] hover:text-white'}`}
                  onClick={() => setActiveTab('personality')}
                >
                  PERSONALITY
                  {activeTab === 'personality' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)] glow"></div>}
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium techno-font ${activeTab === 'knowledge' ? 'text-[var(--primary)] relative' : 'text-[var(--text-secondary)] hover:text-white'}`}
                  onClick={() => setActiveTab('knowledge')}
                >
                  KNOWLEDGE
                  {activeTab === 'knowledge' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)] glow"></div>}
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium techno-font ${activeTab === 'advanced' ? 'text-[var(--primary)] relative' : 'text-[var(--text-secondary)] hover:text-white'}`}
                  onClick={() => setActiveTab('advanced')}
                >
                  ADVANCED
                  {activeTab === 'advanced' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)] glow"></div>}
                </button>
              </div>
              
              {/* Form content */}
              <div className="mt-6">
                {activeTab === 'basics' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 techno-font text-white">COMPANION NAME</label>
                      <input 
                        type="text" 
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] text-white font-mono"
                        placeholder="Enter a name for your companion"
                        disabled
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1.5 techno-font text-white">DESCRIPTION</label>
                      <textarea 
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] h-24 resize-none text-white font-mono"
                        placeholder="Describe your companion&apos;s purpose and capabilities"
                        disabled
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1.5 techno-font text-white">CATEGORY</label>
                      <select 
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] appearance-none text-white font-mono"
                        disabled
                      >
                        <option>Select a category</option>
                        <option>Productivity</option>
                        <option>Creative</option>
                        <option>Entertainment</option>
                        <option>Education</option>
                        <option>Business</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1.5 techno-font text-white">BASE MODEL</label>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="border border-[var(--primary)] bg-[rgba(0,0,0,0.3)] rounded-sm p-3 relative hover-card">
                          <div className="absolute top-2 right-2">
                            <div className="w-3 h-3 bg-[var(--primary)] rounded-full"></div>
                          </div>
                          <h3 className="font-medium techno-font text-white">GPT-4o</h3>
                          <p className="text-xs text-white mt-1 mono-font">Most capable model for complex tasks</p>
                        </div>
                        <div className="border border-[var(--border)] bg-[rgba(0,0,0,0.3)] rounded-sm p-3 hover-card">
                          <h3 className="font-medium techno-font text-white">Claude 3.5</h3>
                          <p className="text-xs text-white mt-1 mono-font">Balanced performance and speed</p>
                        </div>
                        <div className="border border-[var(--border)] bg-[rgba(0,0,0,0.3)] rounded-sm p-3 hover-card">
                          <h3 className="font-medium techno-font text-white">Llama 3</h3>
                          <p className="text-xs text-white mt-1 mono-font">Open source, highly customizable</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'personality' && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium">Personality Profile</label>
                        <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center">
                          <Sparkles size={12} className="mr-1" />
                          Generate from description
                        </button>
                      </div>
                      <textarea 
                        className="w-full bg-[#1a1a24] border border-[#2e2e3a] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 h-32 resize-none"
                        placeholder="Describe your companion&apos;s personality traits, tone, and speaking style"
                        disabled
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Personality Traits</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-[#a0a0b0]">Formal</span>
                            <span className="text-xs text-[#a0a0b0]">Casual</span>
                          </div>
                          <input type="range" className="w-full accent-indigo-500" disabled />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-[#a0a0b0]">Serious</span>
                            <span className="text-xs text-[#a0a0b0]">Playful</span>
                          </div>
                          <input type="range" className="w-full accent-indigo-500" disabled />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-[#a0a0b0]">Direct</span>
                            <span className="text-xs text-[#a0a0b0]">Elaborate</span>
                          </div>
                          <input type="range" className="w-full accent-indigo-500" disabled />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-[#a0a0b0]">Logical</span>
                            <span className="text-xs text-[#a0a0b0]">Creative</span>
                          </div>
                          <input type="range" className="w-full accent-indigo-500" disabled />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Voice & Tone Examples</label>
                      <textarea 
                        className="w-full bg-[#1a1a24] border border-[#2e2e3a] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 h-24 resize-none"
                        placeholder="Provide example responses that showcase your companion&apos;s voice and tone"
                        disabled
                      ></textarea>
                    </div>
                  </div>
                )}
                
                {activeTab === 'knowledge' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Knowledge Base</label>
                      <div className="border border-dashed border-[#2e2e3a] rounded-md p-6 bg-[#1a1a24] flex flex-col items-center justify-center">
                        <Upload size={24} className="text-[#6c6c7c] mb-2" />
                        <p className="text-[#a0a0b0] text-sm">Drag & drop files or <span className="text-indigo-400">browse</span></p>
                        <p className="text-[#6c6c7c] text-xs mt-1">PDF, TXT, DOCX, MD (max 10MB)</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium">Web Sources</label>
                        <button className="text-xs text-indigo-400 hover:text-indigo-300">+ Add source</button>
                      </div>
                      <div className="bg-[#1a1a24] border border-[#2e2e3a] rounded-md p-4">
                        <div className="flex items-center justify-between p-2 border-b border-[#2e2e3a]">
                          <span className="text-sm text-[#a0a0b0]">No web sources added</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#6c6c7c] mt-1.5">Add websites that your agent can reference for information</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Domain Expertise</label>
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-[#1a1a24] border border-[#2e2e3a] rounded-full px-3 py-1 text-sm flex items-center">
                          <span>Technology</span>
                          <button className="ml-2 text-[#6c6c7c] hover:text-white">×</button>
                        </div>
                        <div className="bg-[#1a1a24] border border-[#2e2e3a] rounded-full px-3 py-1 text-sm flex items-center">
                          <span>AI</span>
                          <button className="ml-2 text-[#6c6c7c] hover:text-white">×</button>
                        </div>
                        <button className="bg-[#1a1a24] border border-dashed border-[#2e2e3a] rounded-full px-3 py-1 text-sm text-[#a0a0b0] hover:border-indigo-400 hover:text-indigo-400 transition-colors">
                          + Add domain
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'advanced' && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium">System Instructions</label>
                        <div className="flex items-center">
                          <Info size={14} className="text-[#6c6c7c] mr-1" />
                          <span className="text-xs text-[#6c6c7c]">Hidden from users</span>
                        </div>
                      </div>
                      <div className="relative">
                        <textarea 
                          className="w-full bg-[#1a1a24] border border-[#2e2e3a] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 h-40 resize-none font-mono text-sm"
                          placeholder="Enter system instructions that define how your agent should behave"
                          disabled
                        ></textarea>
                        <div className="absolute top-2 right-2">
                          <button className="p-1 text-[#6c6c7c] hover:text-white">
                            <Code size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Model Parameters</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-[#a0a0b0] mb-1">Temperature</label>
                          <input 
                            type="number" 
                            className="w-full bg-[#1a1a24] border border-[#2e2e3a] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="0.7"
                            disabled
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#a0a0b0] mb-1">Top P</label>
                          <input 
                            type="number" 
                            className="w-full bg-[#1a1a24] border border-[#2e2e3a] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="0.95"
                            disabled
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#a0a0b0] mb-1">Max Tokens</label>
                          <input 
                            type="number" 
                            className="w-full bg-[#1a1a24] border border-[#2e2e3a] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="4000"
                            disabled
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#a0a0b0] mb-1">Frequency Penalty</label>
                          <input 
                            type="number" 
                            className="w-full bg-[#1a1a24] border border-[#2e2e3a] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="0.0"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium">Tools & Integrations</label>
                        <button className="text-xs text-indigo-400 hover:text-indigo-300">+ Add tool</button>
                      </div>
                      <div className="bg-[#1a1a24] border border-[#2e2e3a] rounded-md p-4">
                        <div className="flex items-center justify-between p-2 border-b border-[#2e2e3a]">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-[#2e2e3a] rounded flex items-center justify-center mr-2">
                              <Code size={14} />
                            </div>
                            <span className="text-sm">Code Interpreter</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Enabled</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-[#2e2e3a] rounded flex items-center justify-center mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            </div>
                            <span className="text-sm">Web Browsing</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs bg-[#2e2e3a] text-[#a0a0b0] px-2 py-0.5 rounded-full">Disabled</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-[rgba(0,0,0,0.3)] border border-[var(--primary)] rounded-sm p-4 flex items-start">
              <AlertTriangle size={20} className="text-[var(--primary)] mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-[var(--primary)] techno-font">SYSTEM STATUS</h3>
                <p className="text-sm text-white mt-1 mono-font">COMPANION CREATION MODULE: <span className="text-[var(--primary)]">INITIALIZING</span>. AUTHORIZATION LEVEL REQUIRED: <span className="text-[var(--primary)]">ADMIN</span>. CURRENT STATUS: <span className="text-[var(--primary)]">RESTRICTED</span>.</p>
              </div>
            </div>
          </div>
          
          {/* Right column - Preview */}
          <div className="w-full md:w-1/3">
            <div className="bg-[rgba(0,0,0,0.3)] border border-[var(--border)] rounded-sm p-6 sticky top-24">
              <h2 className="text-lg font-medium mb-4 techno-font text-white">COMPANION PREVIEW</h2>
              
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-sm bg-[var(--primary)] flex items-center justify-center mb-4 glow">
                  <Upload size={24} className="text-black" />
                </div>
                
                <div className="w-full">
                  <div className="h-6 skeleton rounded-sm mb-2" />
                  <div className="h-4 skeleton rounded-sm w-3/4 mb-6" />
                  
                  <div className="bg-[var(--background)] border border-[var(--border)] rounded-sm p-3 mb-4">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-sm bg-[var(--border)] mr-2"></div>
                      <div className="h-3 skeleton rounded-sm w-20"></div>
                    </div>
                    <div className="h-3 skeleton rounded-sm w-full mb-1.5"></div>
                    <div className="h-3 skeleton rounded-sm w-5/6 mb-1.5"></div>
                    <div className="h-3 skeleton rounded-sm w-4/5"></div>
                  </div>
                  
                  <div className="bg-[var(--background)] border border-[var(--border)] rounded-sm p-3">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-sm bg-[var(--primary)] mr-2"></div>
                      <div className="h-3 skeleton rounded-sm w-24"></div>
                    </div>
                    <div className="h-3 skeleton rounded-sm w-full mb-1.5"></div>
                    <div className="h-3 skeleton rounded-sm w-5/6 mb-1.5"></div>
                    <div className="h-3 skeleton rounded-sm w-11/12"></div>
                  </div>
                </div>
                
                <div className="neon-divider w-full"></div>
                
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium techno-font text-white">SYSTEM STATS</span>
                    <span className="text-xs text-white mono-font">ESTIMATED</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[rgba(0,0,0,0.3)] border border-[var(--border)] rounded-sm p-2 hover-card">
                      <div className="text-xs text-white mono-font">RESPONSE TIME</div>
                      <div className="font-medium text-[var(--primary)]">~2.1s</div>
                    </div>
                    <div className="bg-[rgba(0,0,0,0.3)] border border-[var(--border)] rounded-sm p-2 hover-card">
                      <div className="text-xs text-white mono-font">MEMORY</div>
                      <div className="font-medium text-[var(--primary)]">16K TOKENS</div>
                    </div>
                    <div className="bg-[rgba(0,0,0,0.3)] border border-[var(--border)] rounded-sm p-2 hover-card">
                      <div className="text-xs text-white mono-font">COST / CALL</div>
                      <div className="font-medium text-[var(--primary)]">~$0.03</div>
                    </div>
                    <div className="bg-[rgba(0,0,0,0.3)] border border-[var(--border)] rounded-sm p-2 hover-card">
                      <div className="text-xs text-white mono-font">CAPABILITIES</div>
                      <div className="font-medium text-[var(--primary)]">ADVANCED</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}