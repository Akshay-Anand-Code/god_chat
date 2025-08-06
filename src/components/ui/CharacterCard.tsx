'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiMessageSquare } from 'react-icons/fi'

interface CharacterCardProps {
  id: number
  name: string
  description: string
  imageUrl: string
  creator: string
  commentCount: number
}

export default function CharacterCard({
  id,
  name,
  description,
  imageUrl,
  creator,
  commentCount
}: CharacterCardProps) {
  return (
    <Link href={`/character/${id}`}>
      <div className="hover-card gradient-border bg-[#14141f] rounded-lg overflow-hidden transition-all duration-300">
        <div className="relative h-56 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#14141f]/80 z-10"></div>
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute bottom-3 right-3 z-20 bg-[#14141f]/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
            <FiMessageSquare className="text-[#a0a0b0] mr-1" size={12} />
            <span className="text-xs text-[#a0a0b0]">{commentCount}</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-sm text-[#a0a0b0] mt-1 line-clamp-2">{description}</p>
          
          <div className="flex items-center mt-4 text-xs text-[#6c6c7c]">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                {creator.charAt(0).toUpperCase()}
              </div>
              <span className="ml-1.5">@{creator}</span>
            </div>
            
            <div className="ml-auto px-2 py-1 bg-[#1a1a25] rounded-md">
              <span className="text-xs text-[#a0a0b0]">Chat now</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}