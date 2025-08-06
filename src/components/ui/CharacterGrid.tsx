'use client'

import { useState } from 'react'
import CharacterCard from './CharacterCard'
import { FiSearch } from 'react-icons/fi'

// Character data with the 4 specified agents
const characters = [
  {
    id: 1,
    name: 'Ani',
    description: 'Friendly AI assistant with a cheerful personality',
    imageUrl: '/images/ani.png',
    creator: 'companion.ai',
    commentCount: 42
  },
  {
    id: 2,
    name: 'Rudi',
    description: 'Philosophical thinker with deep insights on life',
    imageUrl: '/images/rudi.png',
    creator: 'companion.ai',
    commentCount: 28
  },
  {
    id: 3,
    name: 'Valentine',
    description: 'Romantic poet with a flair for the dramatic',
    imageUrl: '/images/valentine.png',
    creator: 'companion.ai',
    commentCount: 35
  },
  {
    id: 4,
    name: 'Bad Rudi',
    description: 'Mischievous alter-ego with a rebellious streak',
    imageUrl: '/images/badrudi.jpeg',
    creator: 'companion.ai',
    commentCount: 53
  }
]

export default function CharacterGrid() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredCharacters = searchQuery
    ? characters.filter(char => 
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : characters
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 gradient-text">AI Companions</h1>
        <p className="text-[#a0a0b0]">Chat with unique AI personalities</p>
      </div>
      
      <div className="mb-8 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-[#6c6c7c]" />
        </div>
        <input
          type="text"
          placeholder="Search companions..."
          className="w-full bg-[#14141f] border border-[#2e2e3a] rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-[#6c6c7c] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid-bg pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCharacters.map(character => (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              description={character.description}
              imageUrl={character.imageUrl}
              creator={character.creator}
              commentCount={character.commentCount}
            />
          ))}
        </div>
      </div>
    </div>
  )
}