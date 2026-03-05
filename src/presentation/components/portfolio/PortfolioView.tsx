"use client";

import { AnimatedButton } from "@/src/presentation/components/shared/AnimatedButton";
import { AnimatedCounter } from "@/src/presentation/components/shared/AnimatedCounter";
import { AnimatedSection } from "@/src/presentation/components/shared/AnimatedSection";
import { PortfolioViewModel } from "@/src/presentation/presenters/portfolio/PortfolioPresenter";
import { usePortfolioPresenter } from "@/src/presentation/presenters/portfolio/usePortfolioPresenter";
import { animated, useSpring } from "@react-spring/web";
import {
  ArrowRight,
  Award,
  BookOpen,
  Box,
  Briefcase,
  Building2,
  CupSoda,
  Fan,
  Hash,
  Package,
  Pencil,
  PenTool,
  Phone,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Sun,
  Umbrella,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface PortfolioViewProps {
  initialViewModel?: PortfolioViewModel;
}

const ICON_MAP: Record<string, LucideIcon> = {
  "shopping-bag": ShoppingBag,
  umbrella: Umbrella,
  briefcase: Briefcase,
  package: Package,
  wind: Fan,
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
};

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || Package;
}

export function PortfolioView({ initialViewModel }: PortfolioViewProps) {
  const [state] = usePortfolioPresenter(initialViewModel);
  const viewModel = state.viewModel;
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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

  const allCategories = [...new Set(viewModel.projects.map((p) => p.category))];
  const filteredProjects = activeFilter
    ? viewModel.projects.filter((p) => p.category === activeFilter)
    : viewModel.projects;

  return (
    <div className="flex flex-col">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="zeus-blob zeus-blob-blue w-72 h-72 -top-20 -left-20" style={{ position: "absolute" }} />
        <div className="zeus-blob zeus-blob-orange w-48 h-48 bottom-0 -right-10" style={{ position: "absolute" }} />

        <animated.div
          style={{
            opacity: heroSpring.opacity,
            transform: heroSpring.y.to((y) => `translateY(${y}px)`),
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zeus-blue-50 dark:bg-zeus-blue-900/30 mb-6">
              <Award className="w-4 h-4 text-zeus-blue" />
              <span className="text-sm font-medium text-zeus-blue dark:text-zeus-blue-light">
                ผลงานของเรา
              </span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              <span className="text-text-primary-light dark:text-text-primary-dark">ตัวอย่าง</span>
              <span className="zeus-gradient-text">ผลงาน</span>
            </h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
              ผลงานคุณภาพจากลูกค้าที่ไว้วางใจ ตั้งแต่หน่วยงานภาครัฐ ไปจนถึงบริษัทชั้นนำ
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {viewModel.stats.map((stat, i) => (
              <AnimatedSection key={stat.id} delay={200 + i * 100}>
                <div className="zeus-card p-4 text-center">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    className="text-2xl font-extrabold zeus-gradient-text"
                    duration={2000}
                  />
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </animated.div>
      </section>

      {/* ========== FILTER ========== */}
      <section className="sticky top-16 sm:top-20 z-30 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveFilter(null)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeFilter === null
                  ? "zeus-gradient-bg text-white shadow-md"
                  : "bg-surface-elevated-light dark:bg-surface-elevated-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-zeus-blue-50 dark:hover:bg-zeus-blue-900/20"
              }`}
            >
              ทั้งหมด ({viewModel.projects.length})
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "zeus-gradient-bg text-white shadow-md"
                    : "bg-surface-elevated-light dark:bg-surface-elevated-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-zeus-blue-50 dark:hover:bg-zeus-blue-900/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROJECTS GRID ========== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 80}>
                <Link href={`/portfolio/${project.id}`} className="block h-full">
                  <ProjectCard project={project} />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 sm:py-24 bg-surface-elevated-light dark:bg-surface-elevated-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
              อยากมีผลงานแบบนี้บ้าง?
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-xl mx-auto">
              ปรึกษาทีมงาน Zeus Premium วันนี้ เราพร้อมสร้างสรรค์ผลงานคุณภาพให้คุณ
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AnimatedButton variant="primary" size="lg">
                <Link href="/contact" className="flex items-center gap-2">
                  ปรึกษาฟรี
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </AnimatedButton>
              <AnimatedButton variant="outline" size="lg">
                <a href={`tel:${viewModel.companyInfo.phone.replace(/-/g, "")}`} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  โทร {viewModel.companyInfo.phone}
                </a>
              </AnimatedButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

/* ============ Sub-Components ============ */

function ProjectCard({
  project,
}: {
  project: {
    title: string;
    client: string;
    category: string;
    description: string;
    quantity: string;
    icon: string;
  };
}) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = getIcon(project.icon);

  const spring = useSpring({
    transform: hovered ? "translateY(-4px)" : "translateY(0px)",
    boxShadow: hovered
      ? "0 20px 40px rgba(37, 99, 235, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06)"
      : "0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
    config: { tension: 300, friction: 18 },
  });

  return (
    <animated.div
      style={spring}
      className="zeus-card p-6 cursor-pointer group h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-zeus-blue-50 dark:bg-zeus-blue-900/30 flex items-center justify-center shrink-0 text-zeus-blue dark:text-zeus-blue-light group-hover:bg-zeus-blue group-hover:text-white dark:group-hover:bg-zeus-blue transition-colors duration-300">
          <IconComponent className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-3.5 h-3.5 text-text-muted-light dark:text-text-muted-dark" />
            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              {project.client}
            </span>
          </div>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-3">
            {project.description}
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zeus-blue-50 dark:bg-zeus-blue-900/30 text-xs font-medium text-zeus-blue dark:text-zeus-blue-light">
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-text-muted-light dark:text-text-muted-dark">
              <Hash className="w-3 h-3" />
              {project.quantity}
            </span>
          </div>
        </div>
      </div>
    </animated.div>
  );
}
