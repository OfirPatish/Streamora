import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeContent } from "@/components/home/HomeContent";
import { DebugModal } from "@/components/debug/DebugModal";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background">
      <DesktopHeader />
      <MobileHeader />

      <main className="pb-20 lg:pb-0">
        <HeroSection />
        <HomeContent />
      </main>
      <MobileBottomNav />
      <DebugModal />
    </div>
  );
}
