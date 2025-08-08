import CharacterGrid from '@/components/ui/CharacterGrid'
import Header from '@/components/ui/Header'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero */}
        <section className="mb-12 relative overflow-hidden rounded-2xl gradient-border">
          <div className="relative z-10 px-6 py-10 bg-[#0a0a0f]/70 backdrop-blur-md rounded-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold gradient-text">Build, deploy and chat with niche AI agents</h1>
            <p className="mt-3 text-[#a0a0b0] max-w-2xl">A curated set of bespoke AI companions with distinct personalities. Smooth, futuristic and crafted for delightful conversations.</p>
            <div className="mt-6 flex items-center gap-3">
              <Link href="/" className="btn-primary">Explore agents</Link>
              <Link href="/create/agent" className="text-[#a0a0b0] hover:text-white transition-colors">Creator Studio</Link>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-emerald-500/10 to-transparent" />
        </section>

        <CharacterGrid />
      </main>
    </div>
  )
}