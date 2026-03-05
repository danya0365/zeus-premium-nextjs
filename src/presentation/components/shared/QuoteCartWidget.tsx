"use client";

import { useQuoteStore } from "@/src/application/store/useQuoteStore";
import { animated, useSpring } from "@react-spring/web";
import { FileText, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { QuoteSidebar } from "./QuoteSidebar";

export function QuoteCartWidget() {
  const [mounted, setMounted] = useState(false);
  const items = useQuoteStore((state) => state.items);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const itemCount = items.length;

  // Pop animation when items count changes
  const [spring, api] = useSpring(() => ({
    scale: 1,
    config: { tension: 300, friction: 10 },
  }));

  useEffect(() => {
    if (mounted && itemCount > 0) {
      api.start({
        from: { scale: 1.3 },
        to: { scale: 1 },
      });
    }
  }, [itemCount, mounted, api]);

  if (!mounted) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <animated.button
          style={spring}
          onClick={() => setIsSidebarOpen(true)}
          className="relative group flex items-center justify-center w-14 h-14 bg-zeus-blue text-white rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          {itemCount > 0 ? (
            <FileText className="w-6 h-6" />
          ) : (
            <ShoppingCart className="w-6 h-6" />
          )}

          {/* Badge */}
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-zeus-orange text-white text-xs font-bold rounded-full border-2 border-white dark:border-surface-dark">
              {itemCount}
            </span>
          )}

          {/* Tooltip */}
          <span className="absolute right-full mr-4 bg-surface-elevated-light dark:bg-surface-elevated-dark text-text-primary-light dark:text-text-primary-dark px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
            {itemCount > 0 ? "ดูรายการใบเสนอราคา" : "ยังไม่มีสินค้า"}
            {/* Triangle pointing right */}
            <span className="absolute top-1/2 -right-1 -mt-1 border-4 border-transparent border-l-surface-elevated-light dark:border-l-surface-elevated-dark" />
          </span>
        </animated.button>
      </div>

      <QuoteSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}
