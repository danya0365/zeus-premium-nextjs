"use client";

import { VirtualLogoMockup } from "@/src/presentation/components/products/VirtualLogoMockup";
import { AddToQuoteButton } from "@/src/presentation/components/shared/AddToQuoteButton";
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
    ShieldCheck,
    Shirt,
    ShoppingBag,
    Sun,
    Umbrella,
    Wind,
    type LucideIcon
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

  // Local state for quote options
  const [quantity, setQuantity] = useState(product.minOrder);
  const [logoOption, setLogoOption] = useState<"none" | "1-color" | "multi-color" | "laser" | "embroidery">("1-color");

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
            {/* Virtual Logo Mockup */}
            <div className="w-full">
              <VirtualLogoMockup
                productName={product.name}
                // Using a placeholder blank product image for demonstration
                productImageSrc="https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=800&auto=format&fit=crop"
              />
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

              <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark p-6 rounded-2xl border border-border-light dark:border-border-dark mb-8">
                <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                  ระบุความต้องการเบื้องต้น
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1.5">
                      จำนวนขั้นต่ำ (ชิ้น)
                    </label>
                    <div className="flex gap-2">
                      {[product.minOrder, product.minOrder * 5, product.minOrder * 10].map((qty) => (
                        <button
                          key={qty}
                          onClick={() => setQuantity(qty)}
                          className={`flex-1 py-2 text-sm rounded-lg border transition-all ${
                            quantity === qty
                              ? "border-zeus-blue bg-zeus-blue-50 text-zeus-blue dark:bg-zeus-blue-900/20 dark:text-zeus-blue-light"
                              : "border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:border-zeus-blue/50"
                          }`}
                        >
                          {qty.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1.5">
                      รูปแบบโลโก้
                    </label>
                    <select
                      value={logoOption}
                      onChange={(e) => setLogoOption(e.target.value as any)}
                      className="w-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg px-3 py-2 text-sm text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-zeus-blue/50"
                    >
                      <option value="none">ไม่พิมพ์โลโก้ (สินค้าเปล่า)</option>
                      <option value="1-color">สกรีน 1 สี</option>
                      <option value="multi-color">สกรีนหลายสี / พิมพ์ UV</option>
                      <option value="laser">เลเซอร์สลักชื่อ (ถ้ามี)</option>
                      <option value="embroidery">ปักโลโก้ (สำหรับงานผ้า)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <AddToQuoteButton 
                  productSlug={product.slug}
                  productName={product.name}
                  quantity={quantity}
                  options={{ logoOption }}
                  size="lg"
                  className="flex-1"
                />
                <AnimatedButton variant="outline" size="lg">
                  <a href={`tel:${viewModel.companyInfo.phone.replace(/-/g, "")}`} className="flex items-center justify-center gap-2">
                    โทรด่วน
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
