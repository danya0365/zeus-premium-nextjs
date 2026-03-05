"use client";

import { animated, useTransition } from "@react-spring/web";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useEffect } from "react";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  type?: "success" | "error" | "warning" | "info";
  actionLabel?: string;
  onAction?: () => void;
}

const TYPE_CONFIG = {
  success: {
    icon: CheckCircle2,
    colors: "text-green-500 bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20",
    buttonClass: "bg-green-500 hover:bg-green-600 text-white",
  },
  error: {
    icon: XCircle,
    colors: "text-red-500 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20",
    buttonClass: "bg-red-500 hover:bg-red-600 text-white",
  },
  warning: {
    icon: AlertTriangle,
    colors: "text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20",
    buttonClass: "bg-amber-500 hover:bg-amber-600 text-white",
  },
  info: {
    icon: Info,
    colors: "text-zeus-blue bg-zeus-blue-50 dark:bg-zeus-blue-900/10 border-zeus-blue-200 dark:border-zeus-blue-900/20",
    buttonClass: "zeus-gradient-bg text-white",
  },
};

/**
 * StatusModal
 * A reusable, animated modal for success/error/warning/info messages.
 */
export function StatusModal({
  isOpen,
  onClose,
  title,
  description,
  type = "info",
  actionLabel = "ตกลง",
  onAction,
}: StatusModalProps) {
  const config = TYPE_CONFIG[type];
  const Icon = config.icon;

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
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

  // Transitions
  const backdropTransition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 300, friction: 30 },
  });

  const modalTransition = useTransition(isOpen, {
    from: { opacity: 0, scale: 0.9, y: 20 },
    enter: { opacity: 1, scale: 1, y: 0 },
    leave: { opacity: 0, scale: 0.9, y: 20 },
    config: { tension: 350, friction: 25 },
  });

  return (
    <>
      {backdropTransition(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />
          )
      )}

      {modalTransition(
        (style, item) =>
          item && (
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
              <animated.div
                style={style}
                className="w-full max-w-md bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl border border-border-light dark:border-border-dark overflow-hidden pointer-events-auto"
                role="dialog"
                aria-modal="true"
              >
                {/* Header / Icon Area */}
                <div className="relative pt-8 pb-4 px-6 text-center">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-xl text-text-muted-light dark:text-text-muted-dark hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 border ${config.colors}`}>
                    <Icon className={`w-8 h-8 ${config.colors.split(' ')[0]}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                    {title}
                  </h3>
                </div>

                {/* Body Area */}
                <div className="px-6 pb-8 text-center">
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 leading-relaxed">
                    {description}
                  </p>
                  
                  <button
                    onClick={() => {
                      if (onAction) onAction();
                      onClose();
                    }}
                    className={`w-full py-3 px-4 rounded-xl font-semibold shadow-md transition-all active:scale-95 ${config.buttonClass}`}
                  >
                    {actionLabel}
                  </button>
                </div>
              </animated.div>
            </div>
          )
      )}
    </>
  );
}
