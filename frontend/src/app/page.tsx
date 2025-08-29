import { DesktopHeader, MobileHeader, MobileBottomNav } from "@/components/layout";
import { HeroSection, HomeContent } from "@/components/features/home";
import { DebugModal } from "@/components/debug/DebugModal";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
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
