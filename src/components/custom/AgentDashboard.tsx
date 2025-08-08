'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import { Info } from 'lucide-react'
import Sidebar from './Sidebar'

const activityData = [
  { hour: '1', calls: 0 },
  { hour: '3', calls: 0 },
  { hour: '5', calls: 0 },
  { hour: '7', calls: 0 },
  { hour: '9', calls: 0 },
  { hour: '11', calls: 0 },
  { hour: '13', calls: 0 },
  { hour: '15', calls: 0 },
  { hour: '17', calls: 0 },
  { hour: '19', calls: 0 },
  { hour: '21', calls: 0 },
  { hour: '23', calls: 0 },
]

const tokenData = [
  { hour: '1', tokens: 0 },
  { hour: '3', tokens: 0 },
  { hour: '5', tokens: 0 },
  { hour: '7', tokens: 0 },
  { hour: '9', tokens: 0 },
  { hour: '11', tokens: 0 },
  { hour: '13', tokens: 0 },
  { hour: '15', tokens: 0 },
  { hour: '17', tokens: 0 },
  { hour: '19', tokens: 0 },
  { hour: '21', tokens: 0 },
  { hour: '23', tokens: 0 },
]

export default function AgentDashboard() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-white">
      {/* Header */}
      <header className="glass fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[var(--primary)] rounded-md flex items-center justify-center mr-3 glow">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <span className="techno-font font-bold text-lg tracking-wider">COMPANION FORGE</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="btn-secondary">
              How to Use
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="pl-64 pt-24 pb-12 pr-4 grid-bg">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold techno-font tracking-wider">MY DASHBOARD</h1>
          <button className="border border-[var(--primary)] text-[var(--primary)] py-2 px-8 uppercase font-medium tracking-wider hover:bg-[var(--primary)]/10 transition-colors">
            GO TO AGENT MARKETPLACE
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Blur Overlay */}
          <div className="blur-overlay">
            <div className="coming-soon">COMING SOON</div>
            <div className="terminal-text mb-8">System initialization: 37%</div>
            <button className="border border-[var(--primary)] text-[var(--primary)] py-2 px-8 uppercase font-medium tracking-wider hover:bg-[var(--primary)]/10 transition-colors">
              JOIN WAITLIST
            </button>
          </div>
          
          {/* Credits */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-md p-5 hover-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium techno-font">Credits</h2>
              <span className="text-xs text-[var(--text-tertiary)] mono-font">PLAN USAGE</span>
            </div>
            <div className="text-3xl font-bold text-[var(--primary)] glow-text">0%</div>
          </div>
          
          {/* Storage */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-md p-5 hover-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium techno-font">Storage</h2>
              <span className="text-xs text-[var(--text-tertiary)] mono-font">PLAN USAGE</span>
            </div>
            <div className="text-3xl font-bold text-[var(--primary)] glow-text">0.00 MB</div>
          </div>
          
          {/* Agent Calls */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-md p-5 hover-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium techno-font">Agent Calls</h2>
              <span className="text-xs text-[var(--text-tertiary)] mono-font">PLAN USAGE</span>
            </div>
            <div className="text-3xl font-bold text-[var(--primary)] glow-text">0</div>
          </div>
          
          {/* Tokens */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-md p-5 hover-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium techno-font">Tokens</h2>
              <span className="text-xs text-[var(--text-tertiary)] mono-font">PLAN USAGE</span>
            </div>
            <div className="text-3xl font-bold text-[var(--primary)] glow-text">0</div>
          </div>
          
          {/* Vectors */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-md p-5 hover-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium techno-font">Vectors</h2>
              <span className="text-xs text-[var(--text-tertiary)] mono-font">PLAN USAGE</span>
            </div>
            <div className="text-3xl font-bold text-[var(--primary)] glow-text">0</div>
          </div>
          
          {/* Transcription Hours */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-md p-5 hover-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium techno-font">Transcription Hours</h2>
              <span className="text-xs text-[var(--text-tertiary)] mono-font">PLAN USAGE</span>
            </div>
            <div className="text-3xl font-bold text-[var(--primary)] glow-text">0.000</div>
          </div>
          
          {/* Agent Activity Chart */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-md p-5 md:col-span-2 hover-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium techno-font">Agent Activity (Today)</h2>
              <span className="text-xs text-[var(--text-tertiary)] mono-font">UTC</span>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 157, 0.2)" vertical={false} />
                  <XAxis dataKey="hour" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)', borderRadius: '0.25rem', boxShadow: 'var(--glow-neon)' }}
                    itemStyle={{ color: 'var(--primary)' }}
                    labelStyle={{ color: 'var(--text-secondary)' }}
                  />
                  <Bar dataKey="calls" fill="var(--primary)" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-center text-[var(--text-tertiary)] mt-2 mono-font">TIME (HOURS)</div>
          </div>
          
          {/* Tokens Generated Chart */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-md p-5 md:col-span-2 hover-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium techno-font">Tokens Generated (Today)</h2>
              <span className="text-xs text-[var(--text-tertiary)] mono-font">UTC</span>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tokenData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 157, 0.2)" vertical={false} />
                  <XAxis dataKey="hour" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)', borderRadius: '0.25rem', boxShadow: 'var(--glow-neon)' }}
                    itemStyle={{ color: 'var(--primary)' }}
                    labelStyle={{ color: 'var(--text-secondary)' }}
                  />
                  <Bar dataKey="tokens" fill="var(--secondary)" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-center text-[var(--text-tertiary)] mt-2 mono-font">TIME (HOURS)</div>
          </div>
        </div>
        
        {/* Credit Grants Section */}
        <div className="mt-8 relative">
          {/* Blur Overlay */}
          <div className="blur-overlay rounded-md">
            <div className="coming-soon">ACCESS REQUIRED</div>
            <div className="terminal-text">Authorization level insufficient</div>
          </div>
          
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-md p-5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium techno-font">Credit Grants USD</h2>
              <div className="flex gap-3">
                <button className="border border-[var(--primary)] text-[var(--primary)] py-2 px-4 uppercase font-medium tracking-wider hover:bg-[var(--primary)]/10 transition-colors flex items-center">
                  Buy Credits With $AITECH
                </button>
                <button className="border border-[var(--primary)] text-[var(--primary)] py-2 px-4 uppercase font-medium tracking-wider hover:bg-[var(--primary)]/10 transition-colors">
                  Get Credits
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[var(--text-secondary)]">
                    <th className="pb-3 font-medium text-sm mono-font">RECEIVED</th>
                    <th className="pb-3 font-medium text-sm mono-font">STATE</th>
                    <th className="pb-3 font-medium text-sm mono-font">BALANCE/TOTAL</th>
                    <th className="pb-3 font-medium text-sm mono-font">EXPIRES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 border-t border-[var(--border)]">Aug 08, 2025</td>
                    <td className="py-3 border-t border-[var(--border)]">
                      <span className="inline-block px-2 py-1 bg-[var(--primary)]/20 text-[var(--primary)] rounded-sm text-xs mono-font">AVAILABLE</span>
                    </td>
                    <td className="py-3 border-t border-[var(--border)]">$0/$65</td>
                    <td className="py-3 border-t border-[var(--border)]">Aug 08, 2026</td>
                  </tr>
                  <tr>
                    <td className="py-3 border-t border-[var(--border)] font-medium">Total</td>
                    <td className="py-3 border-t border-[var(--border)]"></td>
                    <td className="py-3 border-t border-[var(--border)]">$0/$65</td>
                    <td className="py-3 border-t border-[var(--border)]"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Help Section */}
        <div className="fixed bottom-6 right-6">
          <button className="w-10 h-10 bg-[var(--card-bg)] border border-[var(--primary)] rounded-full flex items-center justify-center hover:bg-[var(--primary)]/10 transition-colors">
            <Info size={18} className="text-[var(--primary)]" />
          </button>
        </div>
      </main>
    </div>
  )
}