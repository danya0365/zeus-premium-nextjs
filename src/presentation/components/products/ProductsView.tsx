"use client";

import { AddToQuoteButton } from "@/src/presentation/components/shared/AddToQuoteButton";
import { AnimatedButton } from "@/src/presentation/components/shared/AnimatedButton";
import { AnimatedSection } from "@/src/presentation/components/shared/AnimatedSection";
import { ProductsViewModel } from "@/src/presentation/presenters/products/ProductsPresenter";
import { useProductsPresenter } from "@/src/presentation/presenters/products/useProductsPresenter";
import { animated, useSpring } from "@react-spring/web";
import {
    ArrowRight,
    BookOpen,
    Box,
    Briefcase,
    CupSoda,
    Fan,
    Package,
    Pencil,
    PenTool,
    Phone,
    ShieldCheck,
    Shirt,
    ShoppingBag,
    Sun,
    Umbrella,
    Wind,
    Zap,
    type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProductsViewProps {
  initialViewModel?: ProductsViewModel;
}

const ICON_MAP: Record<string, LucideIcon> = {
  "shopping-bag": ShoppingBag,
  umbrella: Umbrella,
  briefcase: Briefcase,
  package: Package,
  backpack: ShoppingBag,
  wind: Wind,
  fan: Fan,
  "hard-hat": ShieldCheck,
  sun: Sun,
  shirt: Shirt,
  "cup-soda": CupSoda,
  bottle: CupSoda,
  "pen-tool": PenTool,
  "book-open": BookOpen,
  pencil: Pencil,
  box: Box,
  "shield-check": ShieldCheck,
};

function getIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] || Package;
}

// Group categories by type
const CATEGORY_GROUPS: Record<string, string[]> = {
  "กระเป๋า": ["spunbond-bag", "umbrella-bag", "canvas-bag", "jute-bag", "cotton-bag", "600d-bag"],
  "พัด": ["plastic-fan", "spring-fan"],
  "หมวก": ["cap", "visor"],
  "เสื้อ": ["tshirt", "polo"],
  "แก้ว & กระบอกน้ำ": ["tumbler", "water-bottle"],
  "เครื่องเขียน & อื่นๆ": ["pen", "notebook", "stationery", "packaging"],
};

export function ProductsView({ initialViewModel }: ProductsViewProps) {
  const [state] = useProductsPresenter(initialViewModel);
  const viewModel = state.viewModel;
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const heroSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 120, friction: 18 },
  });

  if (state.loading && !viewModel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zeus-blue mx-auto" />
      </div>
    );
  }

  if (!viewModel) return null;

  const filteredCategories = activeGroup
    ? viewModel.categories.filter((c) =>
        CATEGORY_GROUPS[activeGroup]?.includes(c.slug)
      )
    : viewModel.categories;

  return (
    <div className="flex flex-col">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="zeus-blob zeus-blob-blue w-64 h-64 -top-20 -right-20" style={{ position: "absolute" }} />
        <div className="zeus-blob zeus-blob-orange w-48 h-48 bottom-0 -left-10" style={{ position: "absolute" }} />

        <animated.div
          style={{
            opacity: heroSpring.opacity,
            transform: heroSpring.y.to((y) => `translateY(${y}px)`),
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zeus-blue-50 dark:bg-zeus-blue-900/30 mb-6">
              <ShoppingBag className="w-4 h-4 text-zeus-blue" />
              <span className="text-sm font-medium text-zeus-blue dark:text-zeus-blue-light">
                สินค้าของเรา
              </span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
              สินค้า<span className="zeus-gradient-text">พรีเมียม</span>ทุกหมวดหมู่
            </h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto mb-8">
              รับผลิตของพรีเมียมคุณภาพสูง {viewModel.totalCategories} หมวดหมู่
              ออกแบบฟรี สั่งผลิตได้ตามต้องการ
            </p>
          </div>
        </animated.div>
      </section>

      {/* ========== FILTER TABS ========== */}
      <section className="sticky top-16 sm:top-20 z-30 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
            <FilterTab
              label="ทั้งหมด"
              count={viewModel.totalCategories}
              isActive={activeGroup === null}
              onClick={() => setActiveGroup(null)}
            />
            {Object.entries(CATEGORY_GROUPS).map(([group, slugs]) => (
              <FilterTab
                key={group}
                label={group}
                count={slugs.length}
                isActive={activeGroup === group}
                onClick={() => setActiveGroup(group)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRODUCTS GRID ========== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category, index) => {
              const IconComponent = getIcon(category.icon);
              return (
                <AnimatedSection key={category.id} delay={index * 60}>
                  <ProductDetailCard
                    slug={category.slug}
                    name={category.name}
                    description={category.description}
                    icon={<IconComponent className="w-8 h-8" />}
                    minOrder={category.minOrder}
                  />
                </AnimatedSection>
              );
            })}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-text-muted-light dark:text-text-muted-dark mx-auto mb-4" />
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                ไม่พบสินค้าในหมวดหมู่นี้
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 sm:py-24 bg-surface-elevated-light dark:bg-surface-elevated-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="w-16 h-16 rounded-2xl zeus-gradient-bg flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
              สนใจสินค้าของเรา?
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-xl mx-auto">
              ติดต่อทีมงานเพื่อขอใบเสนอราคา ออกแบบฟรี ไม่มีค่าใช้จ่ายเพิ่มเติม
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AnimatedButton variant="primary" size="lg">
                <a href={`tel:${viewModel.companyInfo.phone.replace(/-/g, "")}`} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  โทรสอบถาม
                </a>
              </AnimatedButton>
              <AnimatedButton variant="outline" size="lg">
                <Link href="/contact" className="flex items-center gap-2">
                  ขอใบเสนอราคา
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </AnimatedButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

/* ============ Sub-Components ============ */

function FilterTab({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer
        ${
          isActive
            ? "zeus-gradient-bg text-white shadow-md"
            : "bg-surface-elevated-light dark:bg-surface-elevated-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-zeus-blue-50 dark:hover:bg-zeus-blue-900/20"
        }`}
    >
      {label} ({count})
    </button>
  );
}

function ProductDetailCard({
  slug,
  name,
  description,
  icon,
  minOrder,
}: {
  slug: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  minOrder: number;
}) {
  const [hovered, setHovered] = useState(false);

  const spring = useSpring({
    transform: hovered ? "translateY(-6px)" : "translateY(0px)",
    boxShadow: hovered
      ? "0 20px 40px rgba(37, 99, 235, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06)"
      : "0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
    config: { tension: 300, friction: 18 },
  });

  const iconSpring = useSpring({
    transform: hovered ? "rotate(-5deg) scale(1.1)" : "rotate(0deg) scale(1)",
    config: { tension: 350, friction: 15 },
  });

  return (
    <div className="block h-full">
    <animated.div
      style={spring}
      className="zeus-card p-6 cursor-pointer group h-full flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${slug}`} className="flex items-start gap-4 mb-4">
        <animated.div
           style={iconSpring}
           className="w-14 h-14 rounded-2xl bg-zeus-blue-50 dark:bg-zeus-blue-900/30
             flex items-center justify-center shrink-0
             text-zeus-blue dark:text-zeus-blue-light
             group-hover:bg-zeus-blue group-hover:text-white
             dark:group-hover:bg-zeus-blue transition-colors duration-300"
         >
           {icon}
         </animated.div>
         <div className="flex-1 min-w-0">
           <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-1 group-hover:text-zeus-blue dark:group-hover:text-zeus-blue-light transition-colors">
             {name}
           </h3>
           <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed line-clamp-2">
             {description}
           </p>
         </div>
      </Link>

      <div className="mt-auto pt-4 border-t border-border-light dark:border-border-dark flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted-light dark:text-text-muted-dark">
            ขั้นต่ำ {minOrder.toLocaleString()} ชิ้น
          </span>
        </div>
        
        <AddToQuoteButton 
          productSlug={slug}
          productName={name}
          quantity={minOrder}
          className="w-full text-sm py-2"
          label="ขอราคา"
        />
      </div>
    </animated.div>
    </div>
  );
}
