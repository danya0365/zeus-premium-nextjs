"use client";

import { AnimatedButton } from "@/src/presentation/components/shared/AnimatedButton";
import { AnimatedSection } from "@/src/presentation/components/shared/AnimatedSection";
import { PortfolioDetailViewModel } from "@/src/presentation/presenters/portfolio/PortfolioDetailPresenter";
import { animated, useSpring } from "@react-spring/web";
import {
    ArrowLeft,
    ArrowRight,
    Box,
    Briefcase,
    Building2,
    CheckCircle,
    CupSoda,
    Fan,
    Hash,
    Package,
    PenTool,
    Pencil,
    Phone,
    ShieldCheck,
    Shirt,
    ShoppingBag,
    Umbrella,
    type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface PortfolioDetailViewProps {
  viewModel: PortfolioDetailViewModel;
}

const ICON_MAP: Record<string, LucideIcon> = {
  "shopping-bag": ShoppingBag,
  umbrella: Umbrella,
  briefcase: Briefcase,
  package: Package,
  fan: Fan,
  "hard-hat": ShieldCheck,
  shirt: Shirt,
  "cup-soda": CupSoda,
  "pen-tool": PenTool,
  pencil: Pencil,
  box: Box,
};

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || Package;
}

export function PortfolioDetailView({ viewModel }: PortfolioDetailViewProps) {
  const { project, relatedProjects, highlights } = viewModel;
  const IconComponent = getIcon(project.icon);

  const heroSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 120, friction: 18 },
  });

  return (
    <div className="flex flex-col">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden py-12 sm:py-20">
        <div className="zeus-blob zeus-blob-orange w-56 h-56 -top-16 -right-16" style={{ position: "absolute" }} />

        <animated.div
          style={{
            opacity: heroSpring.opacity,
            transform: heroSpring.y.to((y) => `translateY(${y}px)`),
          }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-zeus-blue dark:hover:text-zeus-blue-light transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าผลงาน
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Icon */}
            <div className="zeus-card p-10 sm:p-16 flex items-center justify-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl zeus-gradient-bg flex items-center justify-center shadow-xl">
                <IconComponent className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zeus-blue-50 dark:bg-zeus-blue-900/30 mb-4">
                <span className="text-xs font-medium text-zeus-blue dark:text-zeus-blue-light">
                  {project.category}
                </span>
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
                {project.title}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-4 h-4 text-text-muted-light dark:text-text-muted-dark" />
                <span className="text-text-secondary-light dark:text-text-secondary-dark font-medium">
                  {project.client}
                </span>
              </div>

              <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex items-center gap-2 mb-8">
                <Hash className="w-4 h-4 text-zeus-orange" />
                <span className="text-text-primary-light dark:text-text-primary-dark font-bold">
                  {project.quantity}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <AnimatedButton variant="primary" size="lg">
                  <a href="/contact" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    สั่งผลิตแบบนี้
                  </a>
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

      {/* ========== HIGHLIGHTS ========== */}
      <section className="py-12 sm:py-16 bg-surface-elevated-light dark:bg-surface-elevated-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-8 text-center">
              ไฮไลท์โปรเจกต์
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((item, index) => (
              <AnimatedSection key={index} delay={index * 80}>
                <div className="zeus-card p-5 flex items-start gap-3 h-full">
                  <CheckCircle className="w-5 h-5 text-zeus-blue shrink-0 mt-0.5" />
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {item}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== RELATED PROJECTS ========== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-8">
              ผลงานอื่นๆ
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedProjects.map((rp, index) => (
              <AnimatedSection key={rp.id} delay={index * 80}>
                <RelatedCard project={rp} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 sm:py-20 bg-surface-elevated-light dark:bg-surface-elevated-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-3">
              อยากได้ผลงานแบบนี้?
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
              ปรึกษาทีม Zeus Premium วันนี้ ฟรี! ไม่มีค่าใช้จ่าย
            </p>
            <AnimatedButton variant="primary" size="lg">
              <a href="/contact" className="flex items-center gap-2">
                ปรึกษาฟรี
                <ArrowRight className="w-5 h-5" />
              </a>
            </AnimatedButton>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

/* ============ Sub-Component ============ */

function RelatedCard({ project }: { project: { id: string; title: string; client: string; icon: string } }) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = getIcon(project.icon);

  const spring = useSpring({
    transform: hovered ? "translateY(-4px)" : "translateY(0px)",
    config: { tension: 300, friction: 18 },
  });

  return (
    <Link href={`/portfolio/${project.id}`}>
      <animated.div
        style={spring}
        className="zeus-card p-5 cursor-pointer group h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-zeus-blue-50 dark:bg-zeus-blue-900/30 flex items-center justify-center shrink-0 text-zeus-blue dark:text-zeus-blue-light group-hover:bg-zeus-blue group-hover:text-white dark:group-hover:bg-zeus-blue transition-colors duration-300">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
              {project.title}
            </p>
            <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
              {project.client}
            </p>
          </div>
        </div>
      </animated.div>
    </Link>
  );
}
