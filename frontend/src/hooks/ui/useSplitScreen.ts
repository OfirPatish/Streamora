"use client";

import { useState } from "react";
import { useMotionValue, useTransform, useSpring } from "motion/react";

export function useSplitScreen() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  // Use spring values for smoother animations - start with 50-50 split
  const leftWidth = useSpring(50, { stiffness: 300, damping: 30 });
  const rightWidth = useSpring(50, { stiffness: 300, damping: 30 });

  // Position values
  const leftX = useMotionValue(0);
  const rightX = useMotionValue(0);

  // Transform values for content scaling
  const leftScale = useTransform(leftWidth, [30, 70], [0.95, 1.02]);
  const rightScale = useTransform(rightWidth, [30, 70], [0.95, 1.02]);

  // Convert to percentage strings
  const leftWidthPercent = useTransform(leftWidth, (value) => `${value}%`);
  const rightWidthPercent = useTransform(rightWidth, (value) => `${value}%`);

  const handleHoverStart = (side: "left" | "right") => {
    setHoveredSide(side);

    if (side === "left") {
      leftWidth.set(70);
      rightWidth.set(30);
    } else {
      leftWidth.set(30);
      rightWidth.set(70);
    }
  };

  const handleHoverEnd = () => {
    setHoveredSide(null);
    // Return to default 50-50 state
    leftWidth.set(50);
    rightWidth.set(50);
  };

  return {
    hoveredSide,
    leftWidth: leftWidthPercent,
    rightWidth: rightWidthPercent,
    leftX,
    rightX,
    leftScale,
    rightScale,
    handleHoverStart,
    handleHoverEnd,
  };
}
