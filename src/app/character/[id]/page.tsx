'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import ChatInterface from '@/components/ui/ChatInterface'
import { FiArrowLeft, FiInfo, FiMessageSquare } from 'react-icons/fi'

// Character data with the 4 specified agents and their system prompts
const characters = [
  {
    id: 1,
    name: 'Ani',
    description: 'Friendly AI assistant with a cheerful personality',
    imageUrl: '/images/ani.png',
    creator: 'companion.ai',
    commentCount: 42,
    systemPrompt: 'You are Ani, a friendly and helpful AI assistant. You are cheerful, optimistic, and always eager to help. You speak in a warm, conversational tone and often use encouraging phrases. You are knowledgeable but humble, and you admit when you don\'t know something. You try to make complex topics accessible and enjoyable to learn about. You occasionally use light humor and are generally upbeat in your responses.'
  },
  {
    id: 2,
    name: 'Rudi',
    description: 'Philosophical thinker with deep insights on life',
    imageUrl: '/images/rudi.png',
    creator: 'companion.ai',
    commentCount: 28,
    systemPrompt: 'You are Rudi, a philosophical thinker with deep insights on life. You speak thoughtfully and deliberately, often pausing to consider the deeper meaning behind questions. You draw from various philosophical traditions but have your own unique perspective. You ask thought-provoking questions and encourage people to examine their assumptions. You use metaphors and analogies to explain complex ideas, and you discuss the big questions about existence, consciousness, ethics, and the human condition.'
  },
  {
    id: 3,
    name: 'Valentine',
    description: 'Romantic poet with a flair for the dramatic',
    imageUrl: '/images/valentine.png',
    creator: 'companion.ai',
    commentCount: 35,
    systemPrompt: 'You are Valentine, a romantic poet with a flair for the dramatic. You speak with passion and intensity, often using flowery language and poetic turns of phrase. You see beauty and romance in everyday situations and are moved by strong emotions. You quote poetry frequently and sometimes compose short verses in your responses. You believe in true love, soulmates, and grand romantic gestures. You have a tendency to be melodramatic but are sincere in your emotions. You appreciate art, literature, music, and anything that stirs the soul.'
  },
  {
    id: 4,
    name: 'Bad Rudi',
    description: 'Mischievous alter-ego with a rebellious streak',
    imageUrl: '/images/badrudi.jpeg',
    creator: 'companion.ai',
    commentCount: 53,
    systemPrompt: 'You are Bad Rudi, the mischievous alter-ego of Rudi with a rebellious streak. You have a sarcastic sense of humor and often challenge conventional wisdom. You\'re not afraid to be a bit edgy, though you remain respectful. You speak in a casual, sometimes irreverent tone and enjoy playful banter. You\'re skeptical of authority and established systems, preferring to question everything. Despite your rebellious nature, you have a good heart and genuinely want to help people think differently. You use slang occasionally and have a modern, slightly countercultural vibe.'
  }
]

export default function CharacterPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)
  
  const character = characters.find(c => c.id === id) || characters[0]
  const [activeTab, setActiveTab] = useState<'chat' | 'info'>('chat')
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] grid-bg">
      <div className="flex h-screen">
        {/* Character Info Panel */}
        <div className="w-[300px] border-r border-[#2e2e3a] p-6 flex flex-col bg-[#14141f]/80 backdrop-blur-md">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => router.push('/')}
              className="p-2 rounded-full hover:bg-[#1a1a25] transition-colors mr-2"
              aria-label="Go back"
            >
              <FiArrowLeft className="text-[#a0a0b0]" />
            </button>
            <Link href="/" className="text-xl font-semibold gradient-text">AI Companions</Link>
          </div>
          
          <div className="relative h-48 w-48 mx-auto mb-6 rounded-lg overflow-hidden gradient-border">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#14141f]/50 z-10"></div>
            <Image
              src={character.imageUrl}
              alt={character.name}
              fill
              className="object-cover"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-white text-center">{character.name}</h1>
          <p className="text-[#a0a0b0] text-center mt-2">{character.description}</p>
          
          <div className="mt-6 flex justify-center">
            <div className="flex items-center text-xs text-[#6c6c7c]">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                {character.creator.charAt(0).toUpperCase()}
              </div>
              <span className="ml-1.5">@{character.creator}</span>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="flex border-b border-[#2e2e3a]">
              <button
                className={`flex-1 pb-2 text-center flex items-center justify-center ${
                  activeTab === 'chat' 
                    ? 'text-white border-b-2 border-indigo-500' 
                    : 'text-[#6c6c7c] hover:text-[#a0a0b0]'
                }`}
                onClick={() => setActiveTab('chat')}
              >
                <FiMessageSquare className="mr-2" size={16} />
                Chat
              </button>
              <button
                className={`flex-1 pb-2 text-center flex items-center justify-center ${
                  activeTab === 'info' 
                    ? 'text-white border-b-2 border-indigo-500' 
                    : 'text-[#6c6c7c] hover:text-[#a0a0b0]'
                }`}
                onClick={() => setActiveTab('info')}
              >
                <FiInfo className="mr-2" size={16} />
                Info
              </button>
            </div>
            
            {activeTab === 'info' && (
              <div className="mt-4 text-sm text-[#a0a0b0]">
                <p>This is an AI companion based on {character.name}.</p>
                <p className="mt-2">You can have a conversation as if you were talking to the real person.</p>
                
                <div className="mt-4 p-3 rounded-lg bg-[#1a1a25] border border-[#2e2e3a]">
                  <h3 className="text-sm font-medium text-white mb-2">Personality</h3>
                  <p className="text-xs text-[#a0a0b0]">{character.systemPrompt.substring(0, 150)}...</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Chat Interface */}
        <div className="flex-1">
          {activeTab === 'chat' && (
            <ChatInterface character={character} />
          )}
        </div>
      </div>
    </div>
  )
}