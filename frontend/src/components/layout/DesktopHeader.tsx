"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
    <header className="hidden lg:block sticky top-0 z-40 w-full bg-black/20 backdrop-blur-sm shadow-lg">
      <div className="flex items-center gap-6 py-3 px-8">
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <Link href="/" className="block">
            <h1 className="text-2xl font-bold text-red-500">STREAMORA</h1>
          </Link>
        </div>

        {/* Navigation Menu - Left side next to logo */}
        <div className="flex-shrink-0">
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
                    className={cn(
                      "text-white/80 hover:text-white transition-colors",
                      pathname === "/" && "text-white"
                    )}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Movies & Shows */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-transparent"
                >
                  <Link
                    href="/movies-shows"
                    className={cn(
                      "text-white/80 hover:text-white transition-colors",
                      pathname === "/movies-shows" && "text-white"
                    )}
                  >
                    Movies & Shows
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
                      "text-white/80 hover:text-white transition-colors",
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

        {/* Spacer to push search and profile to the right */}
        <div className="flex-1" />

        {/* Search Bar */}
        <div className="flex-shrink-0 w-56">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/80" />
            <Input
              type="search"
              placeholder="Search movies, shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black/20 border-white/20 text-white placeholder-white/60 focus:border-white/40 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Action Buttons - Right */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Profile Avatar */}
          <Button
            variant="ghost"
            size="icon"
            className="p-0 h-auto w-auto text-white/80 hover:text-white hover:bg-white/10"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
}
