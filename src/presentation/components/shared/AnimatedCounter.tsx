"use client";

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  /** Target number to count to */
  target: number;
  /** Duration in milliseconds (approx.) */
  duration?: number;
  /** Suffix to display after the number (e.g., "+", "%") */
  suffix?: string;
  /** Prefix to display before the number */
  prefix?: string;
  /** CSS class for the number */
  className?: string;
}

/**
 * AnimatedCounter
 * Number counter animation using react-spring useSpring
 * Triggered when element scrolls into view
 */
export function AnimatedCounter({
  target,
  duration = 2000,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

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
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const spring = useSpring({
    number: isVisible ? target : 0,
    config: { duration },
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      <animated.span>
        {spring.number.to((n) => Math.floor(n).toLocaleString())}
      </animated.span>
      {suffix}
    </span>
  );
}
