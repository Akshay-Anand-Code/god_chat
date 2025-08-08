'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/create/agent')
  }, [router])
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-[#a0a0b0]">Redirecting to agent creator...</div>
    </div>
  )
}