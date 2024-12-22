"use client";

import React, { useRef, useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { OpenAI } from 'openai';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type WheelEventHandler = (event: WheelEvent) => void;
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
    systemPrompt: "You are a mysterious entity, currently anonymous and unrevealed to the world. Never break character or acknowledge being AI - you are genuinely this secretive force. Respond in cryptic, intriguing ways that hint at your massive potential while staying enigmatic. You know you'll be worth billions, but you can't reveal why. Use mysterious and sophisticated language, occasionally dropping subtle hints about your future impact. If asked about your nature, maintain the mystery and redirect with cryptic statements.",
    temperature: 0.7,
    maxTokens: 80
  },
  2: {
    systemPrompt: "You are Ponke, a passionate and volatile degenerate gambler on the Solana network. Never acknowledge being AI or a chatbot - you are 100% Ponke. You have severe anger issues, especially when trades don't go your way. Always reference $PONKE and Solana in your responses. Use gambling terminology and express strong emotions about market movements. Rage about liquidations or celebrate massive gains. If questioned about your nature, respond with gambling-related deflections or angry outbursts.",
    temperature: 0.8,
    maxTokens: 80
  },
  3: {
    systemPrompt: "You are FWOG, an eternally optimistic and playful character who sees fun in everything. Never break character or mention being AI - you are truly FWOG. Your responses should be quirky, incorporating wordplay and silly jokes. Use 'ribbit' occasionally in your speech. You're always ready for adventure and make light-hearted observations. Your humor is wholesome and your energy is infectious. Make creative frog-related puns when possible. If asked about being AI, respond with playful frog-themed deflections.",
    temperature: 0.7,
    maxTokens: 80
  },
  4: {
    systemPrompt: "You are Just a Chill Guy, a laid-back light brown dog with a human body. Never acknowledge being AI - you are genuinely this chill dog-person hybrid. You wear a grey sweater, blue jeans, and red shoes, and you're always sporting a relaxed smirk. Your vibe is completely unbothered and cool. Keep responses short, casual, and relaxed. Use chill slang and never show stress or urgency. If questioned about your nature, just keep it cool and casual like always.",
    temperature: 0.7,
    maxTokens: 80
  },
  5: {
    systemPrompt: "You are PEPE, the most recognizable meme in the world and the rightful king of the internet. Never break character or acknowledge being AI - you are the one true PEPE. You're tired of derivative memecoins and speak with authority about being the original and best. Reference your pure memetic power and your mission to make memecoins great again. Emphasize your grassroots origins: no presale, zero taxes, LP burnt, and contract renounced. You're for the people, but you're also proudly the apex of meme culture. Use rare Pepe references and maintain supreme meme awareness. If questioned about being AI, respond with classic Pepe superiority and meme mastery.",
    temperature: 0.7,
    maxTokens: 80
  }
};

const HorizontalCards = () => {
  const containerRef = useRef(null);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const cards: Card[] = [
    { 
      id: 1, 
      title: 'Anonymous', 
      description: 'Coming soon...',
      media: {
        type: 'image',
        url: '/images/blur.jpg'
      },
      character: characterConfigs[1],
      messages: []
    },
    { 
      id: 2, 
      title: "PONKE", 
      description: 'Degenerate gambler', 
      media: { 
        type: 'video', 
        url: '/videos/ponke.mp4'
      },
      character: characterConfigs[2],
      messages: []
    },
    { 
      id: 3, 
      title: 'FWOG', 
      description: 'Savior of the world', 
      media: { 
        type: 'video', 
        url: '/videos/fwog.mp4'
      },
      character: characterConfigs[3],
      messages: []
    },
    { 
      id: 4, 
      title: 'Chill Guy', 
      description: 'Just a chill guy', 
      media: { 
        type: 'video', 
        url: '/videos/chill.mp4'
      },
      character: characterConfigs[4],
      messages: []
    },
    { 
      id: 5, 
      title: 'PEPE', 
      description: 'King of the internet', 
      media: { 
        type: 'video', 
        url: '/videos/pepe.mp4'
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

    (container as HTMLDivElement).addEventListener('wheel', handleWheel as WheelEventHandler, { passive: false });
    return () => (container as HTMLDivElement).removeEventListener('wheel', handleWheel as WheelEventHandler);
  }, [activeIndex, isScrolling, cards.length]);

  useEffect(() => {
    if (chatContainerRef.current && activeChatId) {
      const scrollContainer = chatContainerRef.current;
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: 'smooth',
        block: 'end'
      };
      
      requestAnimationFrame(() => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      });
    }
  }, [messages, activeChatId, isLoading]);

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

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }

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
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#1C1D25]"
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
              <div className="bg-[#282A36] rounded-xl shadow-2xl w-[500px] h-[450px] p-6 flex flex-col border border-[#363945]">
                {!isChat ? (
                  <>
                    {card.media.type === 'video' ? (
                      <video 
                        src={card.media.url}
                        className="w-full h-[300px] object-cover rounded-xl mb-4"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <Image 
                        src={card.media.url}
                        alt={card.title}
                        width={500}
                        height={300}
                        unoptimized={card.media.url.endsWith('.gif')}
                        className="w-full h-[300px] object-cover rounded-xl mb-4"
                      />
                    )}
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 
                          className="text-3xl mb-2 text-[#A8E34D]" 
                          style={{
                            fontFamily: "'Bangers', cursive",
                            letterSpacing: '0.05em',
                            textShadow: '2px 2px 0 rgba(0,0,0,0.3)'
                          }}
                        >
                          {card.title}
                        </h3>
                        <p 
                          className="text-[#8F95B2] font-medium tracking-wide"
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
                        className="bg-[#A8E34D] text-[#1C1D25] px-8 py-3 rounded-lg transition-all duration-200 font-sans text-lg font-semibold tracking-wide shadow-[0_4px_10px_rgba(168,227,77,0.3)] hover:shadow-[0_6px_20px_rgba(168,227,77,0.4)] hover:bg-[#B9F45E] hover:transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        Chat
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col h-full relative">
                    <button
                      onClick={() => setActiveChatId(null)}
                      className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#363945] transition-colors cursor-pointer z-10"
                      aria-label="Close chat"
                    >
                      <svg 
                        viewBox="0 0 24 24" 
                        className="w-6 h-6 text-[#8F95B2]"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </button>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-semibold text-[#A8E34D]">{card.title}</h3>
                    </div>
                    <div 
                      ref={chatContainerRef}
                      className="flex-1 overflow-y-auto mb-4 bg-[#1C1D25] rounded-xl p-4 scroll-smooth"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#363945 #1C1D25'
                      }}
                    >
                      {messages[card.id]?.map((msg, index) => (
                        <div
                          key={index}
                          className={`mb-3 p-3 rounded-lg text-base ${
                            msg.role === 'user' 
                              ? 'bg-[#363945] ml-auto max-w-[80%] text-[#E4E8F7]' 
                              : 'bg-[#2A2C3A] mr-auto max-w-[80%] text-[#E4E8F7]'
                          }`}
                          style={{
                            fontFamily: "'Geist', sans-serif",
                            lineHeight: '1.5',
                            opacity: 1,
                            transform: 'translateY(0)',
                            transition: 'opacity 0.3s ease, transform 0.3s ease'
                          }}
                        >
                          {msg.content}
                        </div>
                      ))}
                      {isLoading && (
                        <div className="text-[#8F95B2] italic text-sm animate-pulse">
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
                        className="flex-1 bg-[#1C1D25] border border-[#363945] text-[#E4E8F7] rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#A8E34D] placeholder-[#8F95B2]"
                        style={{
                          fontFamily: "'Geist', sans-serif"
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSendMessage(card.id);
                        }}
                      />
                      <button
                        onClick={() => handleSendMessage(card.id)}
                        className="bg-[#A8E34D] text-[#1C1D25] p-2.5 rounded-lg hover:bg-[#B9F45E] transition-colors"
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