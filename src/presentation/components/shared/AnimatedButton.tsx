"use client";

import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";

export interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const VARIANT_CLASSES = {
  primary:
    "zeus-gradient-bg text-white shadow-md hover:shadow-lg",
  secondary:
    "zeus-gradient-orange text-white shadow-md hover:shadow-lg",
  outline:
    "border-2 border-zeus-blue text-zeus-blue dark:text-zeus-blue-light hover:bg-zeus-blue-50 dark:hover:bg-zeus-blue-900/20",
};

const SIZE_CLASSES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

/**
 * AnimatedButton
 * Button with react-spring press bounce and hover scale effect
 */
export function AnimatedButton({
  children,
  className = "",
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
}: AnimatedButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const spring = useSpring({
    transform: pressed
      ? "scale(0.95)"
      : hovered
      ? "scale(1.05)"
      : "scale(1)",
    config: { tension: 350, friction: 15 },
  });

  return (
    <animated.button
      type={type}
      style={spring}
      className={`rounded-xl font-semibold transition-colors cursor-pointer
        disabled:opacity-60 disabled:cursor-not-allowed
        ${VARIANT_CLASSES[variant]}
        ${SIZE_CLASSES[size]}
        ${className}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      disabled={disabled}
    >
      {children}
    </animated.button>
  );
}
