"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function MobileHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="lg:hidden sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-foreground">Streamora</h1>
          </div>

          {/* Search Bar - Right */}
          <div className="flex-shrink-0 w-40">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border text-foreground placeholder-muted-foreground focus:border-border"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
