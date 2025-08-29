"use client";

import { Home, Film, Tv, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Film, label: "Movies", href: "/movies" },
    { icon: Tv, label: "Series", href: "/series" },
    { icon: Star, label: "Top", href: "/top-rated" },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-t border-gray-800">
      <div className="flex items-center justify-around py-2 px-4 safe-area-pb">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors duration-200 min-w-[60px]",
                isActive ? "text-white bg-gray-800/50" : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/30"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
