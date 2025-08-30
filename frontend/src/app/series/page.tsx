import { PageTemplate } from "@/components/layout/PageTemplate";
import { ContentSection } from "@/components/layout/PageContentWrapper";
import { SeriesContent } from "@/components/sections/shared";

export default function SeriesPage() {
  return (
    <PageTemplate>
      <ContentSection
        title="📺 TV Shows"
        subtitle="Explore amazing TV series and shows"
        showHero={true}
        heroContent={
          <div className="text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-4 tracking-tight">
              📺 TV Shows
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl font-medium">
              Explore amazing TV series and shows
            </p>
          </div>
        }
      >
        <SeriesContent />
      </ContentSection>
    </PageTemplate>
  );
}
