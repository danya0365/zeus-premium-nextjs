"use client";

import { AnimatedButton } from "@/src/presentation/components/shared/AnimatedButton";
import { AnimatedCard } from "@/src/presentation/components/shared/AnimatedCard";
import { AnimatedCounter } from "@/src/presentation/components/shared/AnimatedCounter";
import { AnimatedSection } from "@/src/presentation/components/shared/AnimatedSection";
import { ClientTrustBar } from "@/src/presentation/components/shared/ClientTrustBar";
import { QualityProcess } from "@/src/presentation/components/shared/QualityProcess";
import { HomeViewModel } from "@/src/presentation/presenters/home/HomePresenter";
import { useHomePresenter } from "@/src/presentation/presenters/home/useHomePresenter";
import { animated, useSpring } from "@react-spring/web";
import {
    ArrowRight,
    BookOpen,
    Box,
    Briefcase,
    CheckCircle,
    Clock,
    CupSoda,
    Fan,
    MessageCircle,
    Package,
    Palette,
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

interface HomeViewProps {
  initialViewModel?: HomeViewModel;
}

// Map icon strings to Lucide components
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
  palette: Palette,
  clock: Clock,
  "check-circle": CheckCircle,
};

function getIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] || Package;
}

export function HomeView({ initialViewModel }: HomeViewProps) {
  const [state] = useHomePresenter(initialViewModel);
  const viewModel = state.viewModel;

  // Hero animation
  const heroSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 120, friction: 18 },
  });

  if (state.loading && !viewModel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zeus-blue mx-auto mb-4" />
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            กำลังโหลด...
          </p>
        </div>
      </div>
    );
  }

  if (!viewModel) return null;

  return (
    <div className="flex flex-col">
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Decorative Blobs */}
        <div className="zeus-blob zeus-blob-blue w-72 h-72 -top-20 -left-20 sm:w-96 sm:h-96" style={{ position: "absolute" }} />
        <div className="zeus-blob zeus-blob-orange w-56 h-56 top-20 -right-16 sm:w-72 sm:h-72" style={{ position: "absolute" }} />
        <div className="zeus-blob zeus-blob-blue w-40 h-40 bottom-10 left-1/3" style={{ position: "absolute" }} />
        <div className="zeus-blob zeus-blob-orange w-32 h-32 -bottom-10 right-1/4" style={{ position: "absolute" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <animated.div
              style={{
                opacity: heroSpring.opacity,
                transform: heroSpring.y.to((y) => `translateY(${y}px)`),
              }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zeus-blue-50 dark:bg-zeus-blue-900/30 mb-6">
                <Zap className="w-4 h-4 text-zeus-blue" />
                <span className="text-sm font-medium text-zeus-blue dark:text-zeus-blue-light">
                  Zeus Premium
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                <span className="text-text-primary-light dark:text-text-primary-dark">
                  ดีไซน์โดนใจ
                </span>
                <br />
                <span className="zeus-gradient-text">งานไวทันใช้</span>
                <br />
                <span className="text-text-primary-light dark:text-text-primary-dark">
                  มั่นใจคุณภาพ
                </span>
              </h1>

              <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-8 max-w-lg">
                {viewModel.companyInfo.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <AnimatedButton variant="primary" size="lg">
                  <Link href="/products" className="flex items-center gap-2">
                    ดูสินค้าทั้งหมด
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </AnimatedButton>
                <AnimatedButton variant="outline" size="lg">
                  <Link href="/contact" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    ติดต่อเรา
                  </Link>
                </AnimatedButton>
              </div>
            </animated.div>

            {/* Right - Stats Cards */}
            <AnimatedSection direction="right" delay={200}>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {viewModel.stats.map((stat, index) => (
                  <AnimatedSection key={stat.id} delay={300 + index * 100}>
                    <div className="zeus-card p-6 sm:p-8 text-center">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        className="text-3xl sm:text-4xl font-extrabold zeus-gradient-text"
                        duration={2500}
                      />
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2 font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== CLIENT TRUST BAR ========== */}
      <ClientTrustBar />

      {/* ========== PRODUCT CATEGORIES SECTION ========== */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zeus-orange-50 dark:bg-zeus-orange-dark/10 mb-4">
                <ShoppingBag className="w-4 h-4 text-zeus-orange" />
                <span className="text-sm font-medium text-zeus-orange-dark dark:text-zeus-orange-light">
                  สินค้าของเรา
                </span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
                หมวดหมู่สินค้าพรีเมียม
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
                รับผลิตของพรีเมียมคุณภาพสูงกว่า 18 หมวดหมู่ ออกแบบฟรี สั่งผลิตขั้นต่ำเพียง 100 ชิ้น
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
            {viewModel.categories.map((category, index) => {
              const IconComponent = getIcon(category.icon);
              return (
                <AnimatedSection key={category.id} delay={index * 50}>
                  <ProductCategoryCard
                    name={category.name}
                    icon={<IconComponent className="w-7 h-7" />}
                    minOrder={category.minOrder}
                    slug={category.slug}
                  />
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== QUALITY PROCESS SECTION ========== */}
      <QualityProcess />

      {/* ========== WHY CHOOSE US SECTION ========== */}
      <section className="py-16 sm:py-24 bg-surface-elevated-light dark:bg-surface-elevated-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zeus-blue-50 dark:bg-zeus-blue-900/30 mb-4">
                <Zap className="w-4 h-4 text-zeus-blue" />
                <span className="text-sm font-medium text-zeus-blue dark:text-zeus-blue-light">
                  ทำไมต้อง Zeus Premium
                </span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
                ไว้ใจ ZEUS พรีเมียม
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
                เราใส่ใจทุกรายละเอียด ตั้งแต่การออกแบบจนถึงการส่งมอบ
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {viewModel.features.map((feature, index) => {
              const IconComponent = getIcon(feature.icon);
              return (
                <AnimatedSection key={feature.id} delay={index * 100}>
                  <AnimatedCard className="text-center h-full">
                    <div className="w-14 h-14 rounded-2xl zeus-gradient-bg flex items-center justify-center mx-auto mb-5 shadow-lg">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                      {feature.description}
                    </p>
                  </AnimatedCard>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CTA / CONTACT SECTION ========== */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        {/* Decorative */}
        <div className="zeus-blob zeus-blob-blue w-64 h-64 -top-20 -right-20" style={{ position: "absolute" }} />
        <div className="zeus-blob zeus-blob-orange w-48 h-48 bottom-0 -left-10" style={{ position: "absolute" }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="zeus-card p-8 sm:p-12 text-center relative overflow-hidden">
              {/* Gradient Border Top */}
              <div className="absolute top-0 left-0 right-0 h-1 zeus-gradient-bg" />

              <div className="w-16 h-16 rounded-2xl zeus-gradient-bg flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
                พร้อมเริ่มสั่งผลิตแล้วหรือยัง?
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-xl mx-auto">
                ติดต่อเราวันนี้ ออกแบบฟรี! เริ่มต้นสั่งผลิตขั้นต่ำเพียง 100 ชิ้น
                ส่งไว ทั่วประเทศ
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <AnimatedButton variant="primary" size="lg">
                  <a
                    href={`tel:${viewModel.companyInfo.phone.replace(/-/g, "")}`}
                    className="flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    โทร {viewModel.companyInfo.phone}
                  </a>
                </AnimatedButton>
                <AnimatedButton variant="secondary" size="lg">
                  <a
                    href={viewModel.companyInfo.lineUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.627-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.515.254l2.449 3.325V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                    </svg>
                    LINE Official
                  </a>
                </AnimatedButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

/**
 * ProductCategoryCard - Individual product category card with hover effect
 */
function ProductCategoryCard({
  name,
  icon,
  minOrder,
  slug,
}: {
  name: string;
  icon: React.ReactNode;
  minOrder: number;
  slug: string;
}) {
  const [hovered, setHovered] = useState(false);

  const spring = useSpring({
    transform: hovered ? "scale(1.05) translateY(-4px)" : "scale(1) translateY(0px)",
    boxShadow: hovered
      ? "0 16px 32px rgba(37, 99, 235, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)"
      : "0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
    config: { tension: 300, friction: 18 },
  });

  const iconSpring = useSpring({
    transform: hovered ? "rotate(-8deg) scale(1.1)" : "rotate(0deg) scale(1)",
    config: { tension: 350, friction: 15 },
  });

  return (
    <Link href={`/products/${slug}`} className="block">
      <animated.div
        style={spring}
        className="zeus-card p-5 cursor-pointer text-center group h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <animated.div
          style={iconSpring}
          className="w-14 h-14 rounded-2xl bg-zeus-blue-50 dark:bg-zeus-blue-900/30
            flex items-center justify-center mx-auto mb-3
            text-zeus-blue dark:text-zeus-blue-light
            group-hover:bg-zeus-blue group-hover:text-white dark:group-hover:bg-zeus-blue
            transition-colors duration-300"
        >
          {icon}
        </animated.div>
        <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-1 leading-tight">
          {name}
        </h3>
        <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
          ขั้นต่ำ {minOrder.toLocaleString()} ชิ้น
        </p>
      </animated.div>
    </Link>
  );
}
