"use client";

import { ReactNode } from "react";
import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";
import { MobileBottomNav } from "./MobileBottomNav";

interface PageTemplateProps {
  children: ReactNode;
  className?: string;
}

export function PageTemplate({ children, className = "" }: PageTemplateProps) {
  return (
    <div className={`min-h-screen w-full bg-background ${className}`}>
      <DesktopHeader />
      <MobileHeader />

      <main className="pb-20 lg:pb-0">
        {children}
      </main>

      <MobileBottomNav />
    </div>
  );
}
