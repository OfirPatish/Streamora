import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { HeroSection } from "@/components/sections/hero";
import { ContentSections } from "@/components/sections/content-grid";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Header />

      <div className="flex w-full">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 w-full">
          <HeroSection />
          <ContentSections />
        </main>
      </div>
    </div>
  );
}
