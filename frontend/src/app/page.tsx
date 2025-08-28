import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { HeroSection } from "@/components/sections/hero";
import { ContentSections } from "@/components/sections/content-grid";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <ContentSections />
        </main>
      </div>
    </div>
  );
}
