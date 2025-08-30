import { PageTemplate } from "@/components/layout/PageTemplate";
import { NetflixHero } from "@/components/sections/home";
import { HomeContent } from "@/components/sections/home";

export default function Home() {
  return (
    <PageTemplate>
      {/* Netflix-style Hero Section */}
      <NetflixHero />

      {/* Content Sections */}
      <div className="bg-background">
        <HomeContent />
      </div>
    </PageTemplate>
  );
}
