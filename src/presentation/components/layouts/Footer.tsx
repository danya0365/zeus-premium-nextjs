"use client";

import { CompanyInfo } from "@/src/application/repositories/ICompanyInfoRepository";
import { ProductCategory } from "@/src/application/repositories/IProductCategoryRepository";
import { animated, useSpring } from "@react-spring/web";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const COMPANY_LINKS = [
  { label: "เกี่ยวกับเรา", href: "/about" },
  { label: "ผลงาน", href: "/portfolio" },
  { label: "ติดต่อเรา", href: "/contact" },
];

interface FooterProps {
  companyInfo: CompanyInfo;
  productCategories: ProductCategory[];
}

/**
 * Footer
 * Company information footer with animated elements
 */
export function Footer({ companyInfo, productCategories }: FooterProps) {
  const fadeIn = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 150, friction: 20 },
  });

  return (
    <animated.footer
      style={fadeIn}
      className="bg-surface-elevated-light dark:bg-surface-elevated-dark border-t border-border-light dark:border-border-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-md border-2 border-white dark:border-surface-dark flex items-center justify-center shrink-0">
                <Image
                  src="/images/zeus-avatar.jpg"
                  alt="Zeus Premium Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xl font-black tracking-tight leading-none text-zeus-blue dark:text-zeus-blue-light">
                  ZEUS
                </span>
                <span className="text-[11px] font-bold tracking-[0.2em] text-zeus-orange dark:text-zeus-orange-light mt-0.5">
                  PREMIUM
                </span>
              </div>
            </Link>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
              {companyInfo.description}
            </p>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider mb-4">
              สินค้า
            </h3>
            <ul className="space-y-2.5">
              {productCategories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <FooterLink href={`/products/${category.slug}`}>{category.name}</FooterLink>
                </li>
              ))}
              {productCategories.length > 5 && (
                <li>
                  <FooterLink href="/products">
                    <span className="font-semibold text-zeus-blue dark:text-zeus-blue-light">ดูสินค้าทั้งหมด &rarr;</span>
                  </FooterLink>
                </li>
              )}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider mb-4">
              บริษัท
            </h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider mb-4">
              ติดต่อเรา
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-zeus-blue dark:text-zeus-blue-light mt-0.5 shrink-0" />
                <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  {companyInfo.phone}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-zeus-blue dark:text-zeus-blue-light mt-0.5 shrink-0" />
                <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  {companyInfo.email}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-zeus-blue dark:text-zeus-blue-light mt-0.5 shrink-0" />
                <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  {companyInfo.address}
                </span>
              </li>
            </ul>

            {/* LINE Button */}
            <div className="mt-4">
              <a
                href={companyInfo.lineUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                  bg-[#06C755] hover:bg-[#05B34C] text-white text-sm font-medium
                  transition-colors shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.515.254l2.449 3.325V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINE Official
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-light dark:border-border-dark">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
              © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </p>
            <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
              {companyInfo.tagline}
            </p>
          </div>
        </div>
      </div>
    </animated.footer>
  );
}

/**
 * FooterLink with hover spring
 */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  const spring = useSpring({
    x: hovered ? 4 : 0,
    color: hovered ? "#2563EB" : undefined,
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.div style={{ transform: spring.x.to((x) => `translateX(${x}px)`) }}>
      <Link
        href={href}
        className="text-sm text-text-secondary-light dark:text-text-secondary-dark
          hover:text-zeus-blue dark:hover:text-zeus-blue-light
          transition-colors"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </Link>
    </animated.div>
  );
}
