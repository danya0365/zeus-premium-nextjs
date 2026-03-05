"use client";

import { AnimatedButton } from "@/src/presentation/components/shared/AnimatedButton";
import { AnimatedCard } from "@/src/presentation/components/shared/AnimatedCard";
import { AnimatedCounter } from "@/src/presentation/components/shared/AnimatedCounter";
import { AnimatedSection } from "@/src/presentation/components/shared/AnimatedSection";
import { AboutViewModel } from "@/src/presentation/presenters/about/AboutPresenter";
import { useAboutPresenter } from "@/src/presentation/presenters/about/useAboutPresenter";
import { animated, useSpring } from "@react-spring/web";
import {
    ArrowRight,
    Building2,
    CheckCircle,
    Clock,
    Heart,
    Palette,
    ShieldCheck,
    Zap,
    type LucideIcon,
} from "lucide-react";
import Link from "next/link";

interface AboutViewProps {
  initialViewModel?: AboutViewModel;
}

const ICON_MAP: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  palette: Palette,
  clock: Clock,
  "check-circle": CheckCircle,
  heart: Heart,
};

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || CheckCircle;
}

export function AboutView({ initialViewModel }: AboutViewProps) {
  const [state] = useAboutPresenter(initialViewModel);
  const viewModel = state.viewModel;

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

  return (
    <div className="flex flex-col">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="zeus-blob zeus-blob-blue w-72 h-72 -top-20 -left-20" style={{ position: "absolute" }} />
        <div className="zeus-blob zeus-blob-orange w-56 h-56 top-20 -right-16" style={{ position: "absolute" }} />

        <animated.div
          style={{
            opacity: heroSpring.opacity,
            transform: heroSpring.y.to((y) => `translateY(${y}px)`),
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zeus-blue-50 dark:bg-zeus-blue-900/30 mb-6">
                <Building2 className="w-4 h-4 text-zeus-blue" />
                <span className="text-sm font-medium text-zeus-blue dark:text-zeus-blue-light">
                  เกี่ยวกับเรา
                </span>
              </span>

              <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
                <span className="text-text-primary-light dark:text-text-primary-dark">เรื่องราวของ</span>
                <br />
                <span className="zeus-gradient-text">Zeus Premium</span>
              </h1>

              <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-6">
                {viewModel.companyInfo.description}
              </p>

              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                เราเริ่มต้นจากทีมเล็กๆ ที่มีความหลงใหลในการสร้างสรรค์ผลงานคุณภาพ
                วันนี้ Zeus Premium เติบโตเป็นหนึ่งในผู้นำด้านการผลิตสินค้าพรีเมียมครบวงจร
                ด้วยทีมงานมืออาชีพกว่า 30 คน พร้อมเครื่องจักรทันสมัย
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {viewModel.stats.map((stat, index) => (
                <AnimatedSection key={stat.id} delay={200 + index * 100}>
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
          </div>
        </animated.div>
      </section>

      {/* ========== OUR VALUES ========== */}
      <section className="py-16 sm:py-24 bg-surface-elevated-light dark:bg-surface-elevated-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zeus-orange-50 dark:bg-zeus-orange-dark/10 mb-4">
                <Heart className="w-4 h-4 text-zeus-orange" />
                <span className="text-sm font-medium text-zeus-orange-dark dark:text-zeus-orange-light">
                  ค่านิยมของเรา
                </span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
                สิ่งที่เราเชื่อมั่น
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
                ค่านิยมหลักที่ขับเคลื่อนทุกการทำงานของ Zeus Premium
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {viewModel.values.map((value, index) => {
              const IconComponent = getIcon(value.icon);
              return (
                <AnimatedSection key={value.title} delay={index * 100}>
                  <AnimatedCard className="text-center h-full">
                    <div className="w-14 h-14 rounded-2xl zeus-gradient-bg flex items-center justify-center mx-auto mb-5 shadow-lg">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                      {value.description}
                    </p>
                  </AnimatedCard>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== TIMELINE ========== */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zeus-blue-50 dark:bg-zeus-blue-900/30 mb-4">
                <Clock className="w-4 h-4 text-zeus-blue" />
                <span className="text-sm font-medium text-zeus-blue dark:text-zeus-blue-light">
                  เส้นทางของเรา
                </span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
                ก้าวสำคัญ
              </h2>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border-light dark:bg-border-dark -translate-x-1/2" />

            <div className="space-y-8 sm:space-y-12">
              {viewModel.timeline.map((event, index) => (
                <AnimatedSection
                  key={event.year}
                  delay={index * 120}
                  direction={index % 2 === 0 ? "left" : "right"}
                >
                  <div className={`relative flex items-start gap-6 ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}>
                    {/* Timeline dot */}
                    <div className="absolute left-8 sm:left-1/2 w-4 h-4 rounded-full zeus-gradient-bg -translate-x-1/2 mt-1 z-10 shadow-md" />

                    {/* Content */}
                    <div className={`ml-16 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8 sm:ml-auto"
                    }`}>
                      <div className="zeus-card p-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-zeus-blue-50 dark:bg-zeus-blue-900/30 text-zeus-blue dark:text-zeus-blue-light text-sm font-bold mb-3">
                          {event.year}
                        </span>
                        <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                          {event.title}
                        </h3>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="py-16 sm:py-24 bg-surface-elevated-light dark:bg-surface-elevated-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zeus-blue-50 dark:bg-zeus-blue-900/30 mb-4">
                <Zap className="w-4 h-4 text-zeus-blue" />
                <span className="text-sm font-medium text-zeus-blue dark:text-zeus-blue-light">
                  จุดเด่นของเรา
                </span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
                ทำไมต้อง Zeus Premium
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {viewModel.features.map((feature, index) => {
              const IconComponent = getIcon(feature.icon);
              return (
                <AnimatedSection key={feature.id} delay={index * 100}>
                  <AnimatedCard className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl zeus-gradient-bg flex items-center justify-center shrink-0 shadow-md">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedCard>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="zeus-blob zeus-blob-blue w-64 h-64 -top-20 -right-20" style={{ position: "absolute" }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
              พร้อมร่วมงานกับ Zeus Premium?
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-xl mx-auto">
              ไม่ว่าจะเป็นงานเล็กหรืองานใหญ่ เราพร้อมดูแลทุกโปรเจกต์อย่างใส่ใจ
            </p>
            <AnimatedButton variant="primary" size="lg">
              <Link href="/contact" className="flex items-center gap-2">
                ติดต่อเราวันนี้
                <ArrowRight className="w-5 h-5" />
              </Link>
            </AnimatedButton>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
