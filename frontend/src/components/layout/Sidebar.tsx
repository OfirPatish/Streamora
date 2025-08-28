import { TrendingUp, Star, Clock, Film, Tv, Heart, History } from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

export function Sidebar() {
  const categories = [
    { icon: TrendingUp, label: "Trending", href: "/trending" },
    { icon: Star, label: "Top Rated", href: "/top-rated" },
    { icon: Clock, label: "Recently Added", href: "/recent" },
    { icon: Heart, label: "My List", href: "/my-list" },
    { icon: History, label: "Continue Watching", href: "/continue" },
  ];

  const genres = [
    { label: "Action", href: "/genre/action" },
    { label: "Comedy", href: "/genre/comedy" },
    { label: "Drama", href: "/genre/drama" },
    { label: "Horror", href: "/genre/horror" },
    { label: "Sci-Fi", href: "/genre/sci-fi" },
    { label: "Romance", href: "/genre/romance" },
    { label: "Thriller", href: "/genre/thriller" },
    { label: "Documentary", href: "/genre/documentary" },
  ];

  const contentTypes = [
    { icon: Film, label: "Movies", href: "/movies" },
    { icon: Tv, label: "TV Shows", href: "/series" },
  ];

  return (
    <ShadcnSidebar className="hidden lg:block">
      <SidebarContent>
        <SidebarHeader>
          <h3 className="text-lg font-semibold">Browse</h3>
        </SidebarHeader>

        {/* Content Types */}
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarMenu>
            {contentTypes.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <a href={item.href} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Categories */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categories.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <a href={item.href} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Genres */}
        <SidebarGroup>
          <SidebarGroupLabel>Genres</SidebarGroupLabel>
          <SidebarMenu>
            {genres.map((genre) => (
              <SidebarMenuItem key={genre.label}>
                <SidebarMenuButton asChild size="sm">
                  <a href={genre.href}>{genre.label}</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
}
