"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
    <header className="hidden lg:block sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center gap-6 px-4 py-3">
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-foreground">Streamora</h1>
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
                    className={cn(
                      "text-muted-foreground hover:text-foreground transition-colors",
                      pathname === "/" && "text-foreground"
                    )}
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
                      "text-muted-foreground hover:text-foreground transition-colors",
                      pathname === "/movies" && "text-foreground"
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
                      "text-muted-foreground hover:text-foreground transition-colors",
                      pathname === "/series" && "text-foreground"
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
                      "text-muted-foreground hover:text-foreground transition-colors",
                      pathname === "/watchlist" && "text-foreground"
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search movies, shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border text-foreground placeholder-muted-foreground focus:border-border"
            />
          </div>
        </div>

        {/* Action Buttons - Right */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-destructive text-xs flex items-center justify-center">
              3
            </Badge>
          </Button>

          {/* Profile Avatar */}
          <Button
            variant="ghost"
            size="icon"
            className="p-0 h-auto w-auto text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
