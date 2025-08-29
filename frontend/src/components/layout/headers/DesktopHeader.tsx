"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function DesktopHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  return (
    <header className="hidden lg:block sticky top-0 z-40 w-full bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950/95 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center gap-6 px-4 py-3">
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-white">Streamora</h1>
        </div>

        {/* Navigation Menu - Center */}
        <div className="flex-1 flex justify-end pr-8">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-transparent"
                >
                  <Link
                    href="/"
                    className={cn("text-gray-300 hover:text-white transition-colors", pathname === "/" && "text-white")}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Movies */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-transparent"
                >
                  <Link
                    href="/movies"
                    className={cn(
                      "text-gray-300 hover:text-white transition-colors",
                      pathname === "/movies" && "text-white"
                    )}
                  >
                    Movies
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* TV Shows */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-transparent"
                >
                  <Link
                    href="/series"
                    className={cn(
                      "text-gray-300 hover:text-white transition-colors",
                      pathname === "/series" && "text-white"
                    )}
                  >
                    TV Shows
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Watchlist */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-transparent"
                >
                  <Link
                    href="/watchlist"
                    className={cn(
                      "text-gray-300 hover:text-white transition-colors",
                      pathname === "/watchlist" && "text-white"
                    )}
                  >
                    Watchlist
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search Bar */}
        <div className="flex-shrink-0 w-64">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search movies, shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-gray-600"
            />
          </div>
        </div>

        {/* Action Buttons - Right */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white hover:bg-gray-800/50">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-red-600 text-xs flex items-center justify-center">
              3
            </Badge>
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800/50">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
