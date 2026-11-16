import AboutSection from "@/components/home/AboutSection";
import ChampionshipSection from "@/components/home/ChamionshipSection";
import EventGallerySection from "@/components/home/EventGallerySection";
import HeroSection from "@/components/home/HeroSection";
import InfoSection from "@/components/home/InfoSection";

export default function Home() {
  return (
    <div className="max-container overflow-hidden">
      <HeroSection />
      <AboutSection />
      <InfoSection />
      <EventGallerySection />
      <ChampionshipSection />
    </div>
  );
}
