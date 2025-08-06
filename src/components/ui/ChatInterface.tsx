'use client'

import { useState, useRef, useEffect } from 'react'
import { IoSend } from 'react-icons/io5'
import { FiZap } from 'react-icons/fi'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Character {
  id: number
  name: string
  systemPrompt: string
}

interface ChatInterfaceProps {
  character: Character
}

export default function ChatInterface({ character }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return
    
    const userMessage: Message = { role: 'user', content: inputMessage }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    
    try {
      // Prepare conversation history
      const conversationHistory = [
        { role: 'system' as const, content: character.systemPrompt },
        ...messages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        })),
        userMessage
      ]
      
      // Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationHistory,
          temperature: 0.7,
          maxTokens: 250
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to get response')
      }
      
      const data = await response.json()
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I am unable to respond at this moment. Please try again later.'
      }])
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-[#0a0a0f] scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 rounded-full bg-[#14141f] border border-[#2e2e3a] flex items-center justify-center mb-4">
              <FiZap className="text-indigo-500" size={24} />
            </div>
            <p className="text-lg text-white mb-2">Start a conversation with {character.name}</p>
            <p className="text-sm text-[#6c6c7c] max-w-md text-center">Ask a question or share something to begin your conversation.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-indigo-500/10 border border-indigo-500/20 text-white' 
                      : 'bg-[#14141f] border border-[#2e2e3a] text-[#e0e0e0]'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#14141f] border border-[#2e2e3a] rounded-lg p-3 max-w-[70%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-indigo-500/50 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-indigo-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-indigo-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Input area */}
      <div className="border-t border-[#2e2e3a] p-4 bg-[#14141f]">
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Message ${character.name}...`}
            className="flex-1 bg-[#1a1a25] border border-[#2e2e3a] rounded-l-lg py-3 px-4 text-white placeholder-[#6c6c7c] focus:outline-none focus:border-indigo-500 transition-all"
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage()
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-[#2e2e3a] rounded-r-lg px-4 text-white transition-colors"
          >
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  )
}