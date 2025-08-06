import CharacterGrid from '@/components/ui/CharacterGrid'
import Header from '@/components/ui/Header'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <CharacterGrid />
      </main>
    </div>
  )
}