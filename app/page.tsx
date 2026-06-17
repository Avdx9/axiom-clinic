import SceneCanvas from "@/components/canvas/SceneCanvas";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Services from "@/components/sections/Services";
import BookConsultation from "@/components/sections/BookConsultation";

export default function Home() {
  return (
    <main className="relative">
      {/* Fixed, full-screen WebGL background — sits behind every section */}
      <SceneCanvas />

      {/* Scrolling DOM content, layered above the canvas */}
      <Hero />
      <Manifesto />
      <Services />
      <BookConsultation />
    </main>
  );
}
