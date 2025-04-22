import SimplifiedLandingPage from "./components/SimplifiedLandingPage"
import ExperimentalHero from "./components/ExperimentalHero"
import CreativeProjectsSection from "./components/CreativeProjectsSection"
import ExperimentalAudioPlayer from "./components/ExperimentalAudioPlayer"
import VideoCarousel from "./components/VideoCarousel"
import FloatingActionButton from "./components/FloatingActionButton"
import ServicesSection from "./components/ServicesSection"
import ContactForm from "./components/ContactForm"
import BlogSection from "./components/BlogSection"

export default function Home() {
  return (
    <>
      {/* Main content - positioned below the landing page */}
      <div className="relative z-10 bg-black">
        <div id="top" className="h-screen"></div>
        <ExperimentalHero />
        <CreativeProjectsSection />
        <ServicesSection />
        <ExperimentalAudioPlayer />
        <VideoCarousel />
        <BlogSection />
        <ContactForm />
        <FloatingActionButton />
      </div>

      {/* Landing page - positioned above the main content */}
      <SimplifiedLandingPage />
    </>
  )
}
