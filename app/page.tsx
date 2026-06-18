import SceneCanvas from "@/components/canvas/SceneCanvas";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Manifesto from "@/components/sections/Manifesto";
import Services from "@/components/sections/Services";
import BookConsultation from "@/components/sections/BookConsultation";

export default function Home() {
  return (
    <main className="relative">
      {/* Fixed, full-screen WebGL background — sits behind every section */}
      <SceneCanvas />

      {/* Fixed transparent nav, then the scrolling DOM content */}
      <Navbar />
      <Hero />
      <About />
      <Manifesto />
      <Services />
      <BookConsultation />

      {/* Solid dark anchor at the very bottom of the page */}
      <Footer />
    </main>
  );
}
