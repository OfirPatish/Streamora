"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function MobileHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="lg:hidden sticky top-0 z-40 w-full bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950/95 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <h1 className="text-xl font-bold text-white">Streamora</h1>
        </div>

        {/* Search Bar - Right */}
        <div className="flex-shrink-0 w-48">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-gray-600"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
