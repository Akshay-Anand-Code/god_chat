import HorizontalCards from '../../components/custom/HorizontalCards'
import Navbar from '../../components/custom/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <HorizontalCards />
      </main>
    </>
  )
}