"use client";

import { AnimatedButton } from "@/src/presentation/components/shared/AnimatedButton";
import { AnimatedSection } from "@/src/presentation/components/shared/AnimatedSection";
import { ContactViewModel } from "@/src/presentation/presenters/contact/ContactPresenter";
import { useContactPresenter } from "@/src/presentation/presenters/contact/useContactPresenter";
import { animated, useSpring } from "@react-spring/web";
import {
    ChevronDown,
    Clock,
    HelpCircle,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    XCircle,
    Zap
} from "lucide-react";
import { useState } from "react";

interface ContactViewProps {
  initialViewModel?: ContactViewModel;
}

export function ContactView({ initialViewModel }: ContactViewProps) {
  const [state] = useContactPresenter(initialViewModel);
  const viewModel = state.viewModel;
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000); // Hide after 5 seconds
  };

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
        <div className="zeus-blob zeus-blob-blue w-72 h-72 -top-20 -right-20" style={{ position: "absolute" }} />
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
              <MessageCircle className="w-4 h-4 text-zeus-blue" />
              <span className="text-sm font-medium text-zeus-blue dark:text-zeus-blue-light">
                ติดต่อเรา
              </span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              <span className="text-text-primary-light dark:text-text-primary-dark">พร้อม</span>
              <span className="zeus-gradient-text">ให้บริการ</span>
            </h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
              สอบถามราคา ขอใบเสนอราคา หรือปรึกษาเรื่องสินค้า
              ทีมงานพร้อมตอบทุกคำถามภายใน 24 ชั่วโมง
            </p>
          </div>
        </animated.div>
      </section>

      {/* ========== CONTACT CARDS + FORM ========== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left - Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatedSection delay={0}>
                <ContactInfoCard
                  icon={<Phone className="w-6 h-6" />}
                  title="โทรศัพท์"
                  value={viewModel.companyInfo.phone}
                  href={`tel:${viewModel.companyInfo.phone.replace(/-/g, "")}`}
                  description="จ-ศ 09:00-18:00 น."
                />
              </AnimatedSection>

              <AnimatedSection delay={80}>
                <ContactInfoCard
                  icon={<Mail className="w-6 h-6" />}
                  title="อีเมล"
                  value={viewModel.companyInfo.email}
                  href={`mailto:${viewModel.companyInfo.email}`}
                  description="ตอบกลับภายใน 24 ชม."
                />
              </AnimatedSection>

              <AnimatedSection delay={160}>
                <div className="zeus-card p-6 group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#06C755] flex items-center justify-center shrink-0 shadow-md">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.515.254l2.449 3.325V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
                        LINE Official
                      </h3>
                      <p className="text-sm text-zeus-blue dark:text-zeus-blue-light font-medium">
                        {viewModel.companyInfo.lineId}
                      </p>
                      <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
                        แชทได้ตลอด 24 ชม.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={240}>
                <ContactInfoCard
                  icon={<MapPin className="w-6 h-6" />}
                  title="ที่อยู่"
                  value={viewModel.companyInfo.address}
                  description="นัดเข้าพบได้"
                />
              </AnimatedSection>

              <AnimatedSection delay={320}>
                <div className="zeus-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-zeus-orange-50 dark:bg-zeus-orange-dark/20 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-zeus-orange dark:text-zeus-orange-light" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
                        เวลาทำการ
                      </h3>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        จันทร์ - ศุกร์: 09:00 - 18:00 น.
                      </p>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        เสาร์: 09:00 - 15:00 น.
                      </p>
                      <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
                        หยุดวันอาทิตย์และวันนักขัตฤกษ์
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right - Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={100} direction="right">
                <div className="zeus-card p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 zeus-gradient-bg" />

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl zeus-gradient-bg flex items-center justify-center">
                      <Send className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                        ส่งข้อความถึงเรา
                      </h2>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        กรอกข้อมูลด้านล่าง เราจะติดต่อกลับโดยเร็ว
                      </p>
                    </div>
                  </div>

                  {showAlert && (
                    <animated.div 
                      style={useSpring({ from: { opacity: 0, scale: 0.9 }, to: { opacity: 1, scale: 1 } })}
                      className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 flex items-start gap-3"
                    >
                      <XCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                          แจ้งเตือนการใช้งาน
                        </h4>
                        <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                          ระบบส่งข้อความกำลังอยู่ในช่วงพัฒนา กรุณาติดต่อผ่านเบอร์โทรศัพท์หรือแอพพลิเคชั่น LINE แทนในขณะนี้ ขออภัยในความไม่สะดวกครับ
                        </p>
                      </div>
                    </animated.div>
                  )}

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField label="ชื่อ-นามสกุล" placeholder="กรุณากรอกชื่อ" id="contact-name" />
                      <FormField label="เบอร์โทร" placeholder="0xx-xxx-xxxx" type="tel" id="contact-phone" />
                    </div>
                    <FormField label="อีเมล" placeholder="email@example.com" type="email" id="contact-email" />
                    <FormField label="บริษัท / องค์กร" placeholder="ชื่อบริษัทหรือองค์กร (ถ้ามี)" id="contact-company" />

                    <div>
                      <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                        สินค้าที่สนใจ
                      </label>
                      <select
                        id="contact-product"
                        className="w-full px-4 py-3 rounded-xl
                          bg-surface-light dark:bg-surface-dark
                          border border-border-light dark:border-border-dark
                          text-text-primary-light dark:text-text-primary-dark
                          focus:ring-2 focus:ring-zeus-blue focus:border-transparent
                          transition-all outline-none"
                      >
                        <option value="">-- เลือกหมวดหมู่สินค้า --</option>
                        <option value="bag">กระเป๋าผ้า</option>
                        <option value="fan">พัด</option>
                        <option value="cap">หมวก</option>
                        <option value="shirt">เสื้อ</option>
                        <option value="tumbler">แก้ว / กระบอกน้ำ</option>
                        <option value="stationery">เครื่องเขียน</option>
                        <option value="packaging">บรรจุภัณฑ์</option>
                        <option value="other">อื่นๆ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                        รายละเอียดเพิ่มเติม
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="บอกรายละเอียดสินค้าที่ต้องการ จำนวน งบประมาณ ฯลฯ"
                        className="w-full px-4 py-3 rounded-xl
                          bg-surface-light dark:bg-surface-dark
                          border border-border-light dark:border-border-dark
                          text-text-primary-light dark:text-text-primary-dark
                          placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark
                          focus:ring-2 focus:ring-zeus-blue focus:border-transparent
                          transition-all outline-none resize-none"
                      />
                    </div>

                    <button type="submit" className="w-full sm:w-auto">
                      <AnimatedButton variant="primary" size="lg">
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-5 h-5" />
                          ส่งข้อความ
                        </span>
                      </AnimatedButton>
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-16 sm:py-24 bg-surface-elevated-light dark:bg-surface-elevated-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zeus-orange-50 dark:bg-zeus-orange-dark/10 mb-4">
                <HelpCircle className="w-4 h-4 text-zeus-orange" />
                <span className="text-sm font-medium text-zeus-orange-dark dark:text-zeus-orange-light">
                  คำถามที่พบบ่อย
                </span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark">
                FAQ
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-3">
            {viewModel.faqItems.map((faq, index) => (
              <AnimatedSection key={faq.id} delay={index * 80}>
                <FAQAccordion question={faq.question} answer={faq.answer} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== QUICK CTA ========== */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="zeus-blob zeus-blob-blue w-64 h-64 -bottom-20 -left-20" style={{ position: "absolute" }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <AnimatedSection>
            <div className="w-16 h-16 rounded-2xl zeus-gradient-bg flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-4">
              ต้องการคำตอบเร็วกว่านี้?
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">
              โทรหาเราได้เลย หรือแอดไลน์เพื่อรับคำตอบทันที
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AnimatedButton variant="primary" size="lg">
                <a href={`tel:${viewModel.companyInfo.phone.replace(/-/g, "")}`} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  โทร {viewModel.companyInfo.phone}
                </a>
              </AnimatedButton>
              <AnimatedButton variant="secondary" size="lg">
                <a href={viewModel.companyInfo.lineUrl} className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.515.254l2.449 3.325V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  แอดไลน์
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

function ContactInfoCard({
  icon,
  title,
  value,
  href,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  description: string;
}) {
  return (
    <div className="zeus-card p-6 group cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-zeus-blue-50 dark:bg-zeus-blue-900/30 flex items-center justify-center shrink-0 text-zeus-blue dark:text-zeus-blue-light group-hover:bg-zeus-blue group-hover:text-white dark:group-hover:bg-zeus-blue transition-colors duration-300">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
            {title}
          </h3>
          {href ? (
            <a href={href} className="text-sm text-zeus-blue dark:text-zeus-blue-light font-medium hover:underline">
              {value}
            </a>
          ) : (
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{value}</p>
          )}
          <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  type = "text",
  id,
}: {
  label: string;
  placeholder: string;
  type?: string;
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl
          bg-surface-light dark:bg-surface-dark
          border border-border-light dark:border-border-dark
          text-text-primary-light dark:text-text-primary-dark
          placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark
          focus:ring-2 focus:ring-zeus-blue focus:border-transparent
          transition-all outline-none"
      />
    </div>
  );
}

function FAQAccordion({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const contentSpring = useSpring({
    maxHeight: isOpen ? 200 : 0,
    opacity: isOpen ? 1 : 0,
    config: { tension: 250, friction: 25 },
  });

  const chevronSpring = useSpring({
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    config: { tension: 300, friction: 20 },
  });

  return (
    <div className="zeus-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer"
      >
        <span className="font-semibold text-text-primary-light dark:text-text-primary-dark pr-4">
          {question}
        </span>
        <animated.div style={chevronSpring} className="shrink-0">
          <ChevronDown className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
        </animated.div>
      </button>
      <animated.div style={contentSpring} className="overflow-hidden">
        <div className="px-6 pb-5">
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
            {answer}
          </p>
        </div>
      </animated.div>
    </div>
  );
}
