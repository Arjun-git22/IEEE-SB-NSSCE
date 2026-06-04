import Hero from "@/components/home/Hero";
import Marquee from "@/components/ui/Marquee";
import SocietiesShowcase from "@/components/home/SocietiesShowcase";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import AboutSection from "@/components/home/AboutSection";
import AchievementsPreview from "@/components/home/AchievementsPreview";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      <Hero />
      <Marquee text="IEEE SB NSSCE ✦ INNOVATING SINCE 1987" bgColor="bg-sky-200" />
      <SocietiesShowcase />
      <Marquee text="IEEE SB NSSCE ✦ INNOVATING SINCE 1987" bgColor="bg-sky-200" direction="right" rotate="rotate-2" />
      <UpcomingEvents />
      <AboutSection />
      <AchievementsPreview />
      <div className="bg-white">
        <Marquee text="JOIN THE MOVEMENT ✦ SHAPE THE FUTURE" bgColor="bg-[#FFD700]" direction="right" rotate="rotate-2" />
      </div>
      <CtaSection />
    </div>
  );
}

