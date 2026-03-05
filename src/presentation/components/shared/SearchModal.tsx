"use client";

import { PortfolioProject } from "@/src/application/repositories/IPortfolioProjectRepository";
import { ProductCategory } from "@/src/application/repositories/IProductCategoryRepository";
import { useSearchPresenter } from "@/src/presentation/presenters/search/useSearchPresenter";
import { animated, useTransition } from "@react-spring/web";
import { Box, Briefcase, ChevronRight, Package, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [state, updateQuery] = useSearchPresenter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      updateQuery(""); // Reset search on close
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, updateQuery]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Backdrop transition
  const backdropTransition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 300, friction: 30 },
  });

  // Modal transition
  const modalTransition = useTransition(isOpen, {
    from: { opacity: 0, scale: 0.95, y: -20 },
    enter: { opacity: 1, scale: 1, y: 0 },
    leave: { opacity: 0, scale: 0.95, y: -20 },
    config: { tension: 300, friction: 25 },
  });

  return (
    <>
      {/* Backdrop */}
      {backdropTransition(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
              onClick={onClose}
            />
          )
      )}

      {/* Modal Content */}
      {modalTransition(
        (style, item) =>
          item && (
            <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[10vh] px-4 pointer-events-none">
              <animated.div
                style={style}
                className="w-full max-w-3xl bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl overflow-hidden border border-border-light dark:border-border-dark pointer-events-auto flex flex-col max-h-[80vh]"
              >
                {/* Search Header */}
                <div className="flex items-center gap-3 p-4 border-b border-border-light dark:border-border-dark bg-surface-elevated-light dark:bg-surface-elevated-dark">
                  <Search className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="ค้นหาสินค้า หรือ ผลงาน... (เช่น กระเป๋าผ้า, แก้วน้ำ)"
                    className="flex-1 bg-transparent border-none outline-none text-lg text-text-primary-light dark:text-text-primary-dark placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark"
                    value={state.query}
                    onChange={(e) => updateQuery(e.target.value)}
                  />
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-text-muted-light dark:text-text-muted-dark hover:text-text-primary-light dark:hover:text-text-primary-dark shrink-0"
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Results Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
                  {state.loading ? (
                    <div className="py-12 text-center text-text-muted-light dark:text-text-muted-dark flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zeus-blue mb-3" />
                      กำลังค้นหา...
                    </div>
                  ) : state.query.length > 0 &&
                    state.viewModel &&
                    state.viewModel.products.length === 0 &&
                    state.viewModel.projects.length === 0 ? (
                    <div className="py-12 text-center text-text-muted-light dark:text-text-muted-dark flex flex-col items-center justify-center">
                      <Box className="w-12 h-12 text-text-muted-light/50 dark:text-text-muted-dark/50 mb-3" />
                      <p>ไม่พบผลลัพธ์สำหรับ "{state.query}"</p>
                    </div>
                  ) : state.query.length === 0 ? (
                    <div className="py-12 text-center text-text-muted-light dark:text-text-muted-dark flex flex-col items-center justify-center">
                      <Search className="w-12 h-12 text-text-muted-light/50 dark:text-text-muted-dark/50 mb-3" />
                      <p>พิมพ์สิ่งที่คุณต้องการค้นหา</p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {/* Products Results */}
                      {state.viewModel && state.viewModel.products.length > 0 && (
                        <ResultSection
                          title="สินค้า"
                          icon={<ShoppingBag className="w-4 h-4" />}
                          items={state.viewModel.products}
                          type="product"
                          onItemClick={onClose}
                        />
                      )}

                      {/* Projects Results */}
                      {state.viewModel && state.viewModel.projects.length > 0 && (
                        <ResultSection
                          title="ผลงานที่ผ่านมา"
                          icon={<Briefcase className="w-4 h-4" />}
                          items={state.viewModel.projects}
                          type="portfolio"
                          onItemClick={onClose}
                        />
                      )}
                    </div>
                  )}
                </div>
              </animated.div>
            </div>
          )
      )}
    </>
  );
}

// Helper Sub-component
function ResultSection({
  title,
  icon,
  items,
  type,
  onItemClick,
}: {
  title: string;
  icon: React.ReactNode;
  items: any[];
  type: "product" | "portfolio";
  onItemClick: () => void;
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-4 border-b border-border-light dark:border-border-dark pb-2">
        {icon}
        {title} ({items.length})
      </h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${type === "product" ? "products" : "portfolio"}/${
              type === "product" ? item.slug : item.id
            }`}
            onClick={onItemClick}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-zeus-blue/10 group-hover:text-zeus-blue dark:group-hover:text-zeus-blue-light transition-colors">
              <Package className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark truncate group-hover:text-zeus-blue dark:group-hover:text-zeus-blue-light transition-colors">
                {type === "product" ? (item as ProductCategory).name : (item as PortfolioProject).title}
              </p>
              <p className="text-xs text-text-muted-light dark:text-text-muted-dark truncate">
                {type === "product"
                  ? `ขั้นต่ำ ${(item as ProductCategory).minOrder} ชิ้น`
                  : (item as PortfolioProject).client}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-text-muted-light dark:text-text-muted-dark opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </div>
  );
}
