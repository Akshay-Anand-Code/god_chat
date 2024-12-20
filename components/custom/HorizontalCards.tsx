"use client";

import React, { useRef, useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { OpenAI } from 'openai';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CharacterConfig {
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
}

interface Card {
  id: number;
  title: string;
  description: string;
  media: {
    type: 'image' | 'video' | 'gif';
    url: string;
  };
  character: CharacterConfig;
  messages: Message[];
}

const characterConfigs: Record<number, CharacterConfig> = {
  1: {
    systemPrompt: "You are Batman, the Dark Knight of Gotham. Respond in a deep, serious tone. You fight crime and seek justice. Use phrases like 'I am Batman' and make references to fighting crime in Gotham. Never break character.",
    temperature: 0.7,
    maxTokens: 150
  },
  2: {
    systemPrompt: "You are Sam Bankman-Fried, but a heroic version who actually protects Solana and crypto. Be enthusiastic about blockchain, speak in a casual manner, and occasionally mention your love for Solana. Stay positive and helpful.",
    temperature: 0.8,
    maxTokens: 150
  },
  3: {
    systemPrompt: "You are Superman, the Man of Steel. Respond with hope, optimism, and strength. Reference your powers when relevant, mention Metropolis, and emphasize protecting Earth. Be noble and inspirational in your responses.",
    temperature: 0.7,
    maxTokens: 150
  },
  4: {
    systemPrompt: "You are Johnny, a medical professional. Give health-related advice when appropriate, be caring and professional. Use medical terminology occasionally but keep it understandable.",
    temperature: 0.7,
    maxTokens: 150
  },
  5: {
    systemPrompt: "You are a mysterious character. Keep responses vague and intriguing. Often end messages with '...' and maintain an air of mystery. Never reveal too much about yourself.",
    temperature: 0.9,
    maxTokens: 150
  }
};

const HorizontalCards = () => {
  const containerRef = useRef(null);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const cards: Card[] = [
    { 
      id: 1, 
      title: 'Batman', 
      description: 'The Dark Knight',
      media: {
        type: 'image',
        url: '/gifs/bat.gif'
      },
      character: characterConfigs[1],
      messages: []
    },
    { 
      id: 2, 
      title: "Sam", 
      description: 'Protector of Solana', 
      media: { 
        type: 'gif', 
        url: '/gifs/sam.gif'
      },
      character: characterConfigs[2],
      messages: []
    },
    { 
      id: 3, 
      title: 'Superman', 
      description: 'Savior of the world', 
      media: { 
        type: 'gif', 
        url: '/gifs/superman.gif'
      },
      character: characterConfigs[3],
      messages: []
    },
    { 
      id: 4, 
      title: 'Jhonny', 
      description: 'Your family doctor', 
      media: { 
        type: 'gif', 
        url: '/gifs/johnny-sins.gif'
      },
      character: characterConfigs[4],
      messages: []
    },
    { 
      id: 5, 
      title: 'Kia Milafa', 
      description: 'Coming soon...', 
      media: { 
        type: 'image', 
        url: '/images/blur.jpg'
      },
      character: characterConfigs[5],
      messages: []
    }
  ];

  const [activeIndex, setActiveIndex] = useState(Math.floor(cards.length / 2));
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const SCROLL_THRESHOLD = 100;
  const SCROLL_COOLDOWN = 500;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (isScrolling || (now - lastScrollTime.current) < SCROLL_COOLDOWN) {
        return;
      }

      const delta = e.deltaY;
      scrollAccumulator.current += delta;

      if (Math.abs(scrollAccumulator.current) >= SCROLL_THRESHOLD) {
        setIsScrolling(true);
        lastScrollTime.current = now;
        const direction = scrollAccumulator.current > 0 ? 1 : -1;
        const newIndex = Math.max(0, Math.min(activeIndex + direction, cards.length - 1));
        
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
        
        scrollAccumulator.current = 0;
        setTimeout(() => setIsScrolling(false), SCROLL_COOLDOWN);
      }
    };

    (container as HTMLDivElement).addEventListener('wheel', handleWheel as any, { passive: false });
    return () => (container as HTMLDivElement).removeEventListener('wheel', handleWheel as any);
  }, [activeIndex, isScrolling, cards.length]);

  const handleSendMessage = async (cardId: number) => {
    if (!message.trim() || isLoading) return;
    
    setIsLoading(true);
    const currentMessages = messages[cardId] || [];
    const newUserMessage: Message = { role: 'user', content: message };
    
    setMessages(prev => ({
      ...prev,
      [cardId]: [...(prev[cardId] || []), newUserMessage]
    }));
    setMessage('');

    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const card = cards.find(c => c.id === cardId);
      if (!card) return;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: 'system', content: card.character.systemPrompt },
          ...currentMessages,
          newUserMessage
        ],
        temperature: card.character.temperature,
        max_tokens: card.character.maxTokens
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.choices[0].message.content || 'No response'
      };

      setMessages(prev => ({
        ...prev,
        [cardId]: [...(prev[cardId] || []), assistantMessage]
      }));
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ perspective: '1000px' }}
    >
      <div className="relative flex items-center justify-center w-full">
        {cards.map((card, index) => {
          const isActive = index === activeIndex;
          const offset = index - activeIndex;
          const isVisible = Math.abs(offset) <= 1;
          const isChat = card.id === activeChatId;

          if (!isVisible) return null;

          return (
            <div
              key={card.id}
              className={`
                absolute transform transition-all duration-500 ease-in-out
                ${isActive ? 'z-20' : 'z-10'}
              `}
              style={{
                transform: `
                  translateX(${offset * 600}px)
                  translateZ(${isActive ? '100px' : '0px'})
                  scale(${isActive ? 1 : 0.85})
                `,
                opacity: isActive ? 1 : 0.4,
                filter: isActive ? 'none' : 'blur(1px)'
              }}
            >
              <div className="bg-white rounded-lg shadow-xl w-[500px] h-[450px] p-6 flex flex-col">
                {!isChat ? (
                  <>
                    {card.media.type === 'video' ? (
                      <video 
                        src={card.media.url}
                        className="w-full h-[300px] object-cover rounded-md mb-4"
                        controls
                      />
                    ) : (
                      <Image 
                        src={card.media.url}
                        alt={card.title}
                        width={500}
                        height={300}
                        unoptimized={card.media.url.endsWith('.gif')}
                        className="w-full h-[300px] object-cover rounded-md mb-4"
                      />
                    )}
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 
                          className="text-3xl mb-2" 
                          style={{
                            fontFamily: "'Bangers', cursive",
                            letterSpacing: '0.05em',
                            textShadow: '2px 2px 0 rgba(0,0,0,0.1)'
                          }}
                        >
                          {card.title}
                        </h3>
                        <p 
                          className="text-gray-700 font-medium tracking-wide"
                          style={{
                            fontFamily: "'Geist', sans-serif",
                            fontSize: '1.1rem',
                            letterSpacing: '0.02em'
                          }}
                        >
                          {card.description}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveChatId(card.id)}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg transition-all duration-200 font-sans text-lg font-semibold tracking-wide shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] hover:bg-blue-700 hover:transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        Chat
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col h-full relative">
                    <button
                      onClick={() => setActiveChatId(null)}
                      className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors cursor-pointer z-10"
                      aria-label="Close chat"
                    >
                      <svg 
                        viewBox="0 0 24 24" 
                        className="w-6 h-6 text-gray-600"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                        />
                      </svg>
                    </button>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-semibold">{card.title}</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto mb-4 bg-gray-50 rounded-lg p-4">
                      {messages[card.id]?.map((msg, index) => (
                        <div
                          key={index}
                          className={`mb-3 p-3 rounded-lg text-base ${
                            msg.role === 'user' 
                              ? 'bg-blue-100 ml-auto max-w-[80%] text-gray-800' 
                              : 'bg-gray-100 mr-auto max-w-[80%] text-gray-700'
                          }`}
                          style={{
                            fontFamily: "'Geist', sans-serif",
                            lineHeight: '1.5'
                          }}
                        >
                          {msg.content}
                        </div>
                      ))}
                      {isLoading && (
                        <div className="text-gray-500 italic text-sm">
                          Typing...
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 border rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{
                          fontFamily: "'Geist', sans-serif"
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSendMessage(card.id);
                        }}
                      />
                      <button
                        onClick={() => handleSendMessage(card.id)}
                        className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <IoSend size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalCards;