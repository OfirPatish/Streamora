"use client";

import { useState } from "react";

export function useSplitScreen() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  const handleHoverStart = (side: "left" | "right") => {
    setHoveredSide(side);
  };

  const handleHoverEnd = () => {
    setHoveredSide(null);
  };

  // Calculate widths based on hover state
  const getLeftWidth = () => {
    if (hoveredSide === "left") return "70%";
    if (hoveredSide === "right") return "30%";
    return "50%";
  };

  const getRightWidth = () => {
    if (hoveredSide === "left") return "30%";
    if (hoveredSide === "right") return "70%";
    return "50%";
  };

  return {
    hoveredSide,
    leftWidth: getLeftWidth(),
    rightWidth: getRightWidth(),
    handleHoverStart,
    handleHoverEnd,
  };
}
