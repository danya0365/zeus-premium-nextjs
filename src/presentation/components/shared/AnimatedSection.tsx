"use client";

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Animation direction: "up" | "left" | "right" */
  direction?: "up" | "left" | "right";
  /** Delay in ms */
  delay?: number;
}

/**
 * AnimatedSection
 * Fade-in wrapper triggered by IntersectionObserver when scrolled into view
 * Uses react-spring useSpring (not useTrail)
 */
export function AnimatedSection({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(40px)";
      case "left":
        return "translateX(-40px)";
      case "right":
        return "translateX(40px)";
      default:
        return "translateY(40px)";
    }
  };

  const spring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px) translateX(0px)" : getInitialTransform(),
    delay,
    config: { tension: 150, friction: 22 },
  });

  return (
    <animated.div ref={ref} style={spring} className={className}>
      {children}
    </animated.div>
  );
}
