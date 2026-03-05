"use client";

import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  /** Custom hover scale (default: 1.03) */
  hoverScale?: number;
  /** onClick handler */
  onClick?: () => void;
}

/**
 * AnimatedCard
 * Card component with react-spring hover effect: scale up + lift shadow
 * Supports mouse hover interaction
 */
export function AnimatedCard({
  children,
  className = "",
  hoverScale = 1.03,
  onClick,
}: AnimatedCardProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const spring = useSpring({
    transform: pressed
      ? `scale(${hoverScale - 0.02})`
      : hovered
      ? `scale(${hoverScale})`
      : "scale(1)",
    boxShadow: hovered
      ? "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)"
      : "0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
    config: { tension: 300, friction: 18 },
  });

  return (
    <animated.div
      style={spring}
      className={`zeus-card p-6 cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={onClick}
    >
      {children}
    </animated.div>
  );
}
