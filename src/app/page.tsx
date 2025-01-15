import HorizontalCards from '../components/custom/HorizontalCards'
import VideoBackground from '../components/custom/VideoBackground'
import CloudOverlay from '../components/custom/CloudOverlay'

export default function Home() {
  return (
    <>
      <VideoBackground />
      <CloudOverlay />
      <main className="relative z-20">
        <HorizontalCards />
      </main>
    </>
  )
}