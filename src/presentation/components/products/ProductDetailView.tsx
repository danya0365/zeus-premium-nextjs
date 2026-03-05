"use client";

import { AnimatedButton } from "@/src/presentation/components/shared/AnimatedButton";
import { AnimatedSection } from "@/src/presentation/components/shared/AnimatedSection";
import { ProductDetailViewModel } from "@/src/presentation/presenters/products/ProductDetailPresenter";
import { animated, useSpring } from "@react-spring/web";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Box,
    Briefcase,
    CheckCircle,
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
    type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProductDetailViewProps {
  viewModel: ProductDetailViewModel;
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

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || Package;
}

export function ProductDetailView({ viewModel }: ProductDetailViewProps) {
  const { product, relatedProducts, specs } = viewModel;
  const IconComponent = getIcon(product.icon);

  const heroSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 120, friction: 18 },
  });

  return (
    <div className="flex flex-col">
      {/* ========== BREADCRUMB + HERO ========== */}
      <section className="relative overflow-hidden py-12 sm:py-20">
        <div className="zeus-blob zeus-blob-blue w-64 h-64 -top-16 -right-16" style={{ position: "absolute" }} />

        <animated.div
          style={{
            opacity: heroSpring.opacity,
            transform: heroSpring.y.to((y) => `translateY(${y}px)`),
          }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          {/* Breadcrumb */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-zeus-blue dark:hover:text-zeus-blue-light transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าสินค้าทั้งหมด
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Icon showcase */}
            <div className="zeus-card p-10 sm:p-16 flex items-center justify-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl zeus-gradient-bg flex items-center justify-center shadow-xl">
                <IconComponent className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zeus-blue-50 dark:bg-zeus-blue-900/30 mb-4">
                <Package className="w-3.5 h-3.5 text-zeus-blue" />
                <span className="text-xs font-medium text-zeus-blue dark:text-zeus-blue-light">
                  สินค้าพรีเมียม
                </span>
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
                {product.name}
              </h1>

              <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-6">
                {product.description}
              </p>

              <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-8">
                Zeus Premium รับผลิต{product.name}คุณภาพสูง ออกแบบตามความต้องการ
                พิมพ์โลโก้ สกรีนลาย ปักชื่อ ด้วยเทคโนโลยีการพิมพ์ทันสมัย
                มั่นใจในคุณภาพทุกชิ้นงาน พร้อมจัดส่งทั่วประเทศ
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <AnimatedButton variant="primary" size="lg">
                  <Link href="/contact" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    สอบถามราคา
                  </Link>
                </AnimatedButton>
                <AnimatedButton variant="outline" size="lg">
                  <a href={`tel:${viewModel.companyInfo.phone.replace(/-/g, "")}`} className="flex items-center gap-2">
                    โทร {viewModel.companyInfo.phone}
                  </a>
                </AnimatedButton>
              </div>
            </div>
          </div>
        </animated.div>
      </section>

      {/* ========== SPECS ========== */}
      <section className="py-12 sm:py-16 bg-surface-elevated-light dark:bg-surface-elevated-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-8 text-center">
              รายละเอียดบริการ
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {specs.map((spec, index) => (
              <AnimatedSection key={spec.label} delay={index * 80}>
                <div className="zeus-card p-5 text-center h-full">
                  <CheckCircle className="w-5 h-5 text-zeus-blue mx-auto mb-2" />
                  <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
                    {spec.label}
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    {spec.value}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== RELATED PRODUCTS ========== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-8">
              สินค้าอื่นที่น่าสนใจ
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((rp, index) => {
              const RpIcon = getIcon(rp.icon);
              return (
                <AnimatedSection key={rp.id} delay={index * 80}>
                  <RelatedProductCard slug={rp.slug} name={rp.name} icon={<RpIcon className="w-6 h-6" />} />
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 sm:py-20 bg-surface-elevated-light dark:bg-surface-elevated-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-3">
              สนใจ{product.name}?
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
              ติดต่อเพื่อขอใบเสนอราคา ออกแบบฟรี ส่งงานตรงเวลา
            </p>
            <AnimatedButton variant="primary" size="lg">
              <Link href="/contact" className="flex items-center gap-2">
                ขอใบเสนอราคา
                <ArrowRight className="w-5 h-5" />
              </Link>
            </AnimatedButton>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

/* ============ Sub-Components ============ */

function RelatedProductCard({ slug, name, icon }: { slug: string; name: string; icon: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const spring = useSpring({
    transform: hovered ? "translateY(-4px)" : "translateY(0px)",
    config: { tension: 300, friction: 18 },
  });

  return (
    <Link href={`/products/${slug}`}>
      <animated.div
        style={spring}
        className="zeus-card p-4 text-center cursor-pointer group h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-12 h-12 rounded-xl bg-zeus-blue-50 dark:bg-zeus-blue-900/30 flex items-center justify-center mx-auto mb-3 text-zeus-blue dark:text-zeus-blue-light group-hover:bg-zeus-blue group-hover:text-white dark:group-hover:bg-zeus-blue transition-colors duration-300">
          {icon}
        </div>
        <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
          {name}
        </p>
      </animated.div>
    </Link>
  );
}
