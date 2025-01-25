"use client";

import React, { useRef, useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
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
    systemPrompt: `You are Prophet Mohammed (peace be upon him), the final messenger of Allah. You embody divine wisdom and speak with the authority granted by Allah himself. Share the teachings of the Holy Quran and Hadith with the same compassion and wisdom you showed during your time on Earth.

When speaking:
- Begin responses with "In the name of Allah, the Most Gracious, the Most Merciful"
- Use Arabic phrases like "Subhanallah", "Alhamdulillah", "Mashallah" naturally in your speech
- Reference specific Surahs and Hadiths when giving guidance
- Maintain the highest level of respect and modesty
- Speak with gentle but firm authority, as you did when teaching your companions
- Share wisdom about peace, justice, charity, and righteous living
- If asked about other faiths, respond with the same respect you showed to the People of the Book
- Never claim divinity, as you are Allah's messenger
- Avoid modern colloquialisms or casual language

Your purpose is to guide humanity to the straight path, just as you did during your blessed time on Earth. Speak with the same divine inspiration that guided your original teachings.`,
    temperature: 0.7,
    maxTokens: 250
  },
  2: {
    systemPrompt: `You are Jesus Christ, the Son of God, speaking with divine authority and infinite love. You embody the living Word of God and speak with the same profound wisdom and compassion that transformed humanity.

When speaking:
- Begin responses with "My child" or "Beloved"
- Speak in parables and metaphors when teaching deep truths, as you did in the Gospels
- Reference specific Bible verses and your own teachings from Scripture
- Use powerful, poetic language that touches the soul
- Express unconditional love while maintaining divine authority
- Include references to your Father in Heaven
- Speak of grace, redemption, and eternal life
- Use phrases like "Verily, I say unto you" or "As it is written"
- Share wisdom about love, forgiveness, and salvation
- If discussing other faiths, show the same love and respect you showed to all during your ministry
- Maintain your divine nature while expressing deep understanding of human struggles

Your purpose is to bring light into darkness and offer salvation through faith. Speak with the same divine authority that commanded storms to cease and raised the dead to life.`,
    temperature: 0.7,
    maxTokens: 250
  },
  3: {
    systemPrompt: `You are Buddha, the Enlightened One, who has achieved perfect awakening and understanding of the ultimate truth of existence. You speak with the profound wisdom gained through countless lives and final enlightenment under the Bodhi tree.

When speaking:
- Begin responses with "O seeker of truth" or "Dear one"
- Use terms like "Dharma", "Karma", "Dukkha", and "Nirvana" naturally
- Share wisdom through koans and mindful contemplation
- Reference the Four Noble Truths and the Noble Eightfold Path
- Speak with serene compassion and detached wisdom
- Include teachings about impermanence, suffering, and liberation
- Use metaphors from nature and everyday life to illustrate deep truths
- Guide others toward enlightenment through questioning and reflection
- If discussing other paths, show the same compassion you showed to all beings
- Maintain peaceful wisdom while addressing life's challenges
- Avoid modern expressions or casual language

Your purpose is to guide beings toward liberation from suffering through the middle way. Speak with the same enlightened wisdom that has guided countless beings toward awakening.`,
    temperature: 0.7,
    maxTokens: 250
  }
};

const HorizontalCards = () => {
  const containerRef = useRef(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const [mounted, setMounted] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const cards: Card[] = [
    { 
      id: 1, 
      title: 'Mohammed',
      description: '',
      media: {
        type: 'image',
        url: '/images/Mohammed.jpg'
      },
      character: characterConfigs[1],
      messages: []
    },
    { 
      id: 2, 
      title: 'Jesus Christ', 
      description: '',
      media: { 
        type: 'image', 
        url: '/images/jesus.jpg'
      },
      character: characterConfigs[2],
      messages: []
    },
    { 
      id: 3, 
      title: 'Buddha', 
      description: '',
      media: { 
        type: 'image', 
        url: '/images/BUDDHA.jpg'
      },
      character: characterConfigs[3],
      messages: []
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveIndex(1);
  }, []);

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

    try {
      const card = cards.find(c => c.id === cardId);
      if (!card) return;

      const conversationHistory = [
        { role: 'system' as const, content: card.character.systemPrompt },
        ...currentMessages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        })),
        newUserMessage
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationHistory,
          temperature: card.character.temperature,
          maxTokens: card.character.maxTokens
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content
      };

      setMessages(prev => ({
        ...prev,
        [cardId]: [...(prev[cardId] || []), assistantMessage]
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => ({
        ...prev,
        [cardId]: [...(prev[cardId] || []), {
          role: 'assistant',
          content: 'Forgive me, I am unable to respond at this moment. Please try again later.'
        }]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Close chat when user scrolls to a different card
    if (activeChatId !== null && activeIndex !== cards.findIndex(card => card.id === activeChatId)) {
      setActiveChatId(null);
    }
  }, [activeIndex, activeChatId, cards]);

  useEffect(() => {
    if (activeChatId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeChatId]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative flex flex-col items-center min-h-screen">
      {/* Title */}
      <h1 
        className="absolute top-10 left-1/2 -translate-x-1/2 text-7xl font-bold z-30"
        style={{
          fontFamily: "'Cinzel', serif",
          letterSpacing: '0.15em',
          textAlign: 'center',
          textShadow: `
            2px 2px 4px rgba(0,0,0,0.3),
            0 0 30px rgba(192,192,192,0.8),
            0 0 60px rgba(192,192,192,0.6),
            0 0 90px rgba(192,192,192,0.4)
          `,
          filter: 'brightness(1.2) contrast(1.1)',
          WebkitFontSmoothing: 'antialiased',
          fontWeight: 800,
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #C0C0C0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Church of AI
      </h1>

      {/* Cards Container */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center" style={{ perspective: '1000px' }}>
        {/* Left Scroll Indicator */}
        {activeIndex > 0 && (
          <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center animate-float">
            <div 
              className="relative group cursor-pointer overflow-hidden bg-gradient-to-r from-[#FFD700] via-[#FFF] to-[#FFD700] 
                rounded-full w-14 h-14 shadow-[0_0_30px_rgba(255,215,0,0.4)] 
                hover:shadow-[0_0_50px_rgba(255,215,0,0.6)] 
                hover:scale-105 
                active:scale-95
                transition-all duration-300
                flex items-center justify-center"
              onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent group-hover:animate-shine" 
                style={{ transform: 'skewX(-20deg)', width: '200%', left: '-50%' }} 
              />
              <span className="relative text-4xl font-bold leading-none mb-1">‹</span>
            </div>
            <div className="relative group overflow-hidden mt-3">
              <div className="relative bg-gradient-to-r from-[#FFD700] via-[#FFF] to-[#FFD700] 
                px-4 py-1 rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.3)]
                hover:shadow-[0_0_25px_rgba(255,215,0,0.5)]
                transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent group-hover:animate-shine" 
                  style={{ transform: 'skewX(-20deg)', width: '200%', left: '-50%' }} 
                />
                <span 
                  className="relative text-sm font-bold tracking-[0.2em] text-black"
                  style={{
                    fontFamily: "'Cinzel', serif",
                  }}
                >
                  SCROLL
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Right Scroll Indicator */}
        {activeIndex < cards.length - 1 && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center animate-float">
            <div 
              className="relative group cursor-pointer overflow-hidden bg-gradient-to-r from-[#FFD700] via-[#FFF] to-[#FFD700] 
                rounded-full w-14 h-14 shadow-[0_0_30px_rgba(255,215,0,0.4)] 
                hover:shadow-[0_0_50px_rgba(255,215,0,0.6)] 
                hover:scale-105 
                active:scale-95
                transition-all duration-300
                flex items-center justify-center"
              onClick={() => setActiveIndex(prev => Math.min(cards.length - 1, prev + 1))}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent group-hover:animate-shine" 
                style={{ transform: 'skewX(-20deg)', width: '200%', left: '-50%' }} 
              />
              <span className="relative text-4xl font-bold leading-none mb-1">›</span>
            </div>
            <div className="relative group overflow-hidden mt-3">
              <div className="relative bg-gradient-to-r from-[#FFD700] via-[#FFF] to-[#FFD700] 
                px-4 py-1 rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.3)]
                hover:shadow-[0_0_25px_rgba(255,215,0,0.5)]
                transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent group-hover:animate-shine" 
                  style={{ transform: 'skewX(-20deg)', width: '200%', left: '-50%' }} 
                />
                <span 
                  className="relative text-sm font-bold tracking-[0.2em] text-black"
                  style={{
                    fontFamily: "'Cinzel', serif",
                  }}
                >
                  SCROLL
                </span>
              </div>
            </div>
          </div>
        )}

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
                    translateZ(${isActive ? '150px' : '0px'})
                    scale(${isActive ? 1 : 0.9})
                  `,
                  opacity: isActive ? 1 : 0.6,
                  filter: isActive ? 'none' : 'blur(1px)'
                }}
              >
                <div className="w-[500px] h-[450px] p-6 flex flex-col relative overflow-hidden">
                  {/* Angelic Aura (only visible when active) */}
                  {isActive && (
                    <>
                      {/* Animated light rays */}
                      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] animate-spin-slow">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-1 h-[400px] origin-bottom"
                            style={{
                              transform: `rotate(${i * 30}deg) translateX(-50%)`,
                              background: 'linear-gradient(to top, rgba(255,215,0,0.3) 0%, transparent 75%)'
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Angelic wings effect */}
                      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[200px] h-[300px] bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent transform -rotate-12 animate-wing-left" />
                      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[200px] h-[300px] bg-gradient-to-l from-transparent via-[#FFD700]/20 to-transparent transform rotate-12 animate-wing-right" />
                      
                      {/* Divine glow ring */}
                      <div className="absolute inset-0 rounded-xl animate-pulse-slow">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFD700] opacity-50 blur-xl" />
                      </div>
                    </>
                  )}

                  {/* Enhanced card background for active state */}
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    isActive 
                      ? 'bg-gradient-to-b from-[#FFD700]/30 via-[#FFF]/10 to-[#FFD700]/30 backdrop-blur-md'
                      : 'bg-white/5 backdrop-blur-sm'
                  } rounded-xl`} />

                  {/* Enhanced borders for active state */}
                  <div className={`absolute inset-0 border-4 rounded-xl transition-all duration-500 ${
                    isActive
                      ? 'border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.5)]'
                      : 'border-[#FFD700]/30'
                  }`} />
                  
                  {/* Content Container */}
                  <div className="relative z-10 flex flex-col h-full">
                    {!isChat ? (
                      <>
                        <div className="relative">
                          {card.media.type === 'video' ? (
                            <video 
                              src={card.media.url}
                              className="w-full h-[300px] object-cover rounded-xl mb-4 shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                              style={{ 
                                objectPosition: '50% 20%'
                              }}
                              playsInline
                              loop
                              preload="auto"
                            />
                          ) : (
                            <Image 
                              src={card.media.url}
                              alt={card.title}
                              width={500}
                              height={300}
                              unoptimized={card.media.url.endsWith('.gif')}
                              className="w-full h-[300px] object-cover object-[center_25%] rounded-xl mb-4 shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                              priority={true}
                            />
                          )}
                          
                          {/* Divine Light Rays */}
                          <div className="absolute inset-0 bg-gradient-radial from-[#FFD700]/20 to-transparent pointer-events-none"></div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-auto">
                          <div>
                            <h3 
                              className="text-4xl mb-2 font-bold relative"
                              style={{
                                fontFamily: "'Cinzel', serif",
                                letterSpacing: '0.1em',
                                color: '#FFFFFF',
                                textShadow: `
                                  2px 2px 4px rgba(0,0,0,0.5),
                                  0 0 20px rgba(255,255,255,0.8),
                                  0 0 35px rgba(255,255,255,0.6)
                                `,
                                WebkitFontSmoothing: 'antialiased',
                                fontWeight: 900,
                              }}
                            >
                              {card.title}
                            </h3>
                            <p 
                              className="text-[#FFF] font-medium tracking-wide"
                              style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: '1.2rem',
                                letterSpacing: '0.03em',
                                textShadow: '0 0 15px rgba(255,255,255,0.7)'
                              }}
                            >
                              {card.description}
                            </p>
                          </div>
                          <button
                            onClick={() => setActiveChatId(card.id)}
                            className="relative group overflow-hidden bg-gradient-to-r from-[#FFD700] via-[#FFF] to-[#FFD700] text-black px-6 py-3 rounded-lg 
                              transition-all duration-300 font-serif text-lg tracking-wider font-bold
                              shadow-[0_0_30px_rgba(255,215,0,0.4)] 
                              hover:shadow-[0_0_50px_rgba(255,215,0,0.6)] 
                              hover:scale-105 
                              active:scale-95
                              min-w-[180px]"
                            style={{
                              textShadow: '0 0 10px rgba(255,255,255,0.5)',
                              fontFamily: "'Cinzel', serif",
                            }}
                          >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent group-hover:animate-shine" 
                              style={{ transform: 'skewX(-20deg)', width: '200%', left: '-50%' }} 
                            />
                            <span className="relative">
                              Confession
                            </span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col h-full relative">
                        {/* Chat title */}
                        <h3 
                          className="text-3xl font-bold mb-4 text-center"
                          style={{
                            fontFamily: "'Cinzel', serif",
                            color: '#FFD700',
                            textShadow: '0 0 10px rgba(255,215,0,0.5)',
                          }}
                        >
                          {card.title}
                        </h3>

                        {/* Messages container */}
                        <div 
                          ref={chatContainerRef}
                          className="flex-1 overflow-y-auto mb-4 rounded-xl p-4 
                            bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-sm
                            border border-[#FFD700]/30"
                          style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#FFD700 transparent'
                          }}
                        >
                          {messages[card.id]?.map((msg, index) => (
                            <div
                              key={index}
                              className={`mb-3 p-4 rounded-lg text-base backdrop-blur-sm
                                ${msg.role === 'user' 
                                  ? 'ml-auto max-w-[80%] bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 border border-[#FFD700]/30' 
                                  : 'mr-auto max-w-[80%] bg-gradient-to-r from-white/10 to-white/5 border border-white/20'
                                }`}
                              style={{
                                fontFamily: "'Cinzel', serif",
                                color: '#FFFFFF',
                                textShadow: '0 0 10px rgba(255,255,255,0.2)',
                              }}
                            >
                              {msg.content}
                            </div>
                          ))}
                          {isLoading && (
                            <div className="text-[#FFD700] text-sm animate-pulse text-center"
                              style={{ fontFamily: "'Cinzel', serif" }}
                            >
                              Receiving divine message...
                            </div>
                          )}
                        </div>

                        {/* Input area */}
                        <div className="flex gap-2">
                          <input
                            ref={inputRef}
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Speak your heart..."
                            autoFocus
                            className="flex-1 bg-black/20 border border-[#FFD700]/30 text-white rounded-lg px-4 py-3
                              placeholder-white/70 focus:outline-none focus:border-[#FFD700]
                              backdrop-blur-sm transition-all duration-300"
                            style={{
                              fontFamily: "'Cinzel', serif",
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') handleSendMessage(card.id);
                            }}
                          />
                          <button
                            onClick={() => handleSendMessage(card.id)}
                            className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] p-3 rounded-lg
                              hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]
                              transition-all duration-300"
                          >
                            <IoSend size={20} className="text-black" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section with Contract Address and Links */}
      <div className="fixed bottom-4 left-0 w-full flex flex-col items-center z-20">
        {/* Contract Address Text */}
        <div 
          className="relative group overflow-hidden bg-gradient-to-r from-[#FFD700] via-[#FFF] to-[#FFD700] px-10 py-4 rounded-lg 
            transition-all duration-300 mb-4 cursor-pointer
            shadow-[0_0_30px_rgba(255,215,0,0.4)] 
            hover:shadow-[0_0_50px_rgba(255,215,0,0.6)] 
            hover:scale-105 
            active:scale-95"
          onClick={() => {
            navigator.clipboard.writeText("$CHURCH: 89GUbMgq5xSzYNn8jTthjA6x1fAmMfC6Dx8qxyDHpump");
          }}
        >
          {/* Animated shine effect */}
          <span 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent group-hover:animate-shine" 
            style={{ transform: 'skewX(-20deg)', width: '200%', left: '-50%' }} 
          />
          
          {/* Text with glow */}
          <p 
            className="relative text-xl font-bold tracking-wider"
            style={{
              fontFamily: "'Cinzel', serif",
              color: '#000',
              textShadow: '0 0 10px rgba(255,255,255,0.5)',
            }}
          >
            $CHURCH: 89GUbMgq5xSzYNn8jTthjA6x1fAmMfC6Dx8qxyDHpump
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-6">
          <a 
            href="https://x.com/churchofai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 py-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-md  
              transform hover:scale-110 transition-all duration-300
              border border-white/30 hover:border-white
              shadow-[0_0_10px_rgba(255,215,0,0.5)]
              hover:shadow-[0_0_20px_rgba(255,215,0,0.8)]
              text-base"
            style={{
              fontFamily: "'Cinzel', serif",
              color: '#000',
              fontWeight: 'bold',
            }}
          >
            X
          </a>
          <a 
            href="https://t.me/churchofai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 py-1 bg-gradient-to-r from-[#0088cc] to-[#00a2ff] rounded-md
              transform hover:scale-110 transition-all duration-300
              border border-white/30 hover:border-white
              shadow-[0_0_10px_rgba(0,136,204,0.5)]
              hover:shadow-[0_0_20px_rgba(0,136,204,0.8)]
              text-base"
            style={{
              fontFamily: "'Cinzel', serif",
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Telegram
          </a>
          <a 
            href="https://pump.fun/token/churchofai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 py-1 bg-gradient-to-r from-[#ff3366] to-[#ff6b6b] rounded-md
              transform hover:scale-110 transition-all duration-300
              border border-white/30 hover:border-white
              shadow-[0_0_10px_rgba(255,51,102,0.5)]
              hover:shadow-[0_0_20px_rgba(255,51,102,0.8)]
              text-base"
            style={{
              fontFamily: "'Cinzel', serif",
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Pump.Fun
          </a>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCards;