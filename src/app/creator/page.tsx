'use client'

import Link from 'next/link'

export default function CreatorPreviewPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] grid-bg pt-24">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center">Creator <span className="badge-upcoming ml-3">Upcoming</span></h1>
          <p className="text-[#a0a0b0] mt-2 max-w-2xl">A glimpse of our upcoming agent creation studio. Design personalities, upload avatars, and launch your companion — all in a single smooth flow.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#14141f]/80 border border-[#2e2e3a] rounded-xl p-5">
            <div className="h-8 w-40 skeleton rounded-md mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 skeleton rounded-lg" />
              <div className="h-10 skeleton rounded-lg" />
              <div className="h-24 skeleton rounded-lg col-span-2" />
            </div>
            <div className="mt-6 flex gap-3">
              <button className="btn-primary opacity-50 cursor-not-allowed">Save draft</button>
              <button className="btn-primary opacity-50 cursor-not-allowed">Launch</button>
            </div>
            <p className="text-xs text-[#6c6c7c] mt-3">Feature is not yet available</p>
          </div>

          <div className="bg-[#14141f]/80 border border-[#2e2e3a] rounded-xl p-5">
            <div className="h-48 skeleton rounded-lg mb-4" />
            <div className="space-y-2">
              <div className="h-4 skeleton rounded" />
              <div className="h-4 skeleton rounded w-2/3" />
              <div className="h-4 skeleton rounded w-4/5" />
            </div>
          </div>
        </div>

        <div className="mt-10 text-sm text-[#6c6c7c]">
          Looking for agents? <Link href="/" className="underline hover:text-white">Explore the gallery</Link>
        </div>
      </div>
    </div>
  )
}