"use client";

import { useQuoteStore } from "@/src/application/store/useQuoteStore";
import { AnimatedButton } from "@/src/presentation/components/shared/AnimatedButton";
import { animated, useTransition } from "@react-spring/web";
import {
    ArrowRight,
    Minus,
    Package,
    Plus,
    Trash2,
    X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface QuoteSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteSidebar({ isOpen, onClose }: QuoteSidebarProps) {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity } = useQuoteStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const transitions = useTransition(isOpen, {
    from: { opacity: 0, x: 400 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: 400 },
    config: { tension: 280, friction: 25 },
  });

  const overlayTransitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      {overlayTransitions(
        (styles, item) =>
          item && (
            <animated.div
              style={styles}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={onClose}
            />
          )
      )}

      {/* Sidebar */}
      {transitions(
        (styles, item) =>
          item && (
            <animated.div
              style={{ ...styles, transform: styles.x.to((x) => `translateX(${x}px)`) }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-surface-light dark:bg-surface-dark shadow-2xl z-50 flex flex-col border-l border-border-light dark:border-border-dark"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-light dark:border-border-dark">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full zeus-gradient-bg flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                    รายการขอใบเสนอราคา
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-surface-elevated-light dark:hover:bg-surface-elevated-dark text-text-secondary-light dark:text-text-secondary-dark transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-surface-elevated-light dark:bg-surface-elevated-dark flex items-center justify-center">
                      <Package className="w-10 h-10 text-text-muted-light dark:text-text-muted-dark" />
                    </div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      ยังไม่มีสินค้าในรายการขอใบเสนอราคา
                    </p>
                    <button
                      onClick={onClose}
                      className="text-zeus-blue dark:text-zeus-blue-light font-medium hover:underline"
                    >
                      เลือกดูสินค้าของเรา
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-surface-elevated-light dark:bg-surface-elevated-dark border border-border-light dark:border-border-dark flex gap-4"
                      >
                        {/* Thumbnail placeholder */}
                        <div className="w-20 h-20 rounded-xl bg-surface-light dark:bg-surface-dark flex items-center justify-center shrink-0 border border-border-light/50 dark:border-border-dark/50">
                          <Package className="w-8 h-8 text-text-muted-light dark:text-text-muted-dark" />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark truncate pr-2">
                                {item.productName}
                              </h3>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-text-muted-light hover:text-zeus-orange dark:text-text-muted-dark transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            {item.options?.logoOption && (
                              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                                โลโก้: {item.options.logoOption}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs font-medium text-zeus-blue dark:text-zeus-blue-light">
                              {item.quantity.toLocaleString()} ชิ้น
                            </span>
                            <div className="flex items-center bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark p-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 100)}
                                className="p-1 text-text-secondary-light dark:text-text-secondary-dark hover:text-zeus-blue transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-medium w-10 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 100)}
                                className="p-1 text-text-secondary-light dark:text-text-secondary-dark hover:text-zeus-blue transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border-light dark:border-border-dark bg-surface-elevated-light dark:bg-surface-elevated-dark">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-text-secondary-light dark:text-text-secondary-dark font-medium">
                      รวมทั้งหมด
                    </span>
                    <span className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                      {items.length} รายการ
                    </span>
                  </div>
                  <AnimatedButton variant="primary" className="w-full flex justify-center">
                    <Link
                      href="/quote"
                      onClick={onClose}
                      className="flex items-center gap-2 py-1"
                    >
                      ดำเนินการขอใบเสนอราคา <ArrowRight className="w-5 h-5" />
                    </Link>
                  </AnimatedButton>
                </div>
              )}
            </animated.div>
          )
      )}
    </>
  );
}
