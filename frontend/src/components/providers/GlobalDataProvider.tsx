"use client";

import { useEffect } from "react";
import { useGlobalData } from "@/hooks/global/useGlobalData";

interface GlobalDataProviderProps {
  children: React.ReactNode;
}

export function GlobalDataProvider({ children }: GlobalDataProviderProps) {
  const { loading, error, isInitialized } = useGlobalData();

  // This ensures global data is fetched once when the app starts
  // The useGlobalData hook will handle the initialization
  return <>{children}</>;
}
