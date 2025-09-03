"use client";

import { ReactNode } from "react";
import { MainHeader } from "./MainHeader";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AppLayout({ children, className = "" }: AppLayoutProps) {
  return (
    <div className={`min-h-screen w-full bg-background ${className}`}>
      <MainHeader />

      <main className="pb-0">{children}</main>
    </div>
  );
}
