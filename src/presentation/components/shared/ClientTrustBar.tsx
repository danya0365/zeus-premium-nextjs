"use client";

import { useEffect, useState } from "react";

// Mocking some premium brand names to display in the trust bar.
// In a real scenario, these could be SVG logos.
const BRANDS = [
  "Microsoft",
  "Google",
  "Amazon",
  "Netflix",
  "Spotify",
  "Adobe",
  "Salesforce",
  "Tesla",
  "Intel",
  "Oracle",
];

export function ClientTrustBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Use a simple CSS animation for the infinite marquee effect
  // We double the list to create a seamless loop
  const displayBrands = [...BRANDS, ...BRANDS];

  if (!mounted) return null;

  return (
    <section className="py-12 bg-surface-elevated-light dark:bg-surface-elevated-dark border-y border-border-light dark:border-border-dark overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h3 className="text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest">
          ได้รับความไว้วางใจจากองค์กรชั้นนำระดับโลก
        </h3>
      </div>
      
      {/* Marquee Container */}
      <div className="relative flex overflow-x-hidden group">
        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-surface-elevated-light dark:from-surface-elevated-dark to-transparent z-10 pointer-events-none" />
        
        {/* Animated Row */}
        <div className="animate-marquee flex whitespace-nowrap py-4 items-center">
          {displayBrands.map((brand, idx) => (
            <div
              key={`${brand}-${idx}`}
              className="mx-8 sm:mx-16 text-2xl sm:text-3xl font-extrabold text-text-muted-light/60 dark:text-text-muted-dark/40 hover:text-zeus-blue dark:hover:text-zeus-blue-light transition-colors duration-300 cursor-default"
            >
              {brand}
            </div>
          ))}
        </div>
        
        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-surface-elevated-light dark:from-surface-elevated-dark to-transparent z-10 pointer-events-none" />
      </div>

      <style suppressHydrationWarning>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
}
