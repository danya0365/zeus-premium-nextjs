"use client";

import { animated, useSpring } from "@react-spring/web";
import { Briefcase, CheckCircle2, FileEdit, Focus, Truck, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PROCESS_STEPS = [
  {
    id: "step-1",
    title: "1. รับมอบโจทย์ (Requirement)",
    description: "ทีมงานผู้เชี่ยวชาญรับบรีฟจากลูกค้า พร้อมให้คำปรึกษาเพื่อหาสินค้าที่เหมาะสมกับงบประมาณและกลุ่มเป้าหมาย",
    icon: <Briefcase className="w-8 h-8" />,
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: "step-2",
    title: "2. ออกแบบ (Design & Prototype)",
    description: "ทีมดีไซเนอร์ออกแบบโลโก้และจัดวางลงบนสินค้า เพื่อให้ลูกค้าเห็นภาพเสมือนจริง (Virtual Mockup) ก่อนผลิต",
    icon: <FileEdit className="w-8 h-8" />,
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    id: "step-3",
    title: "3. ขึ้นตัวอย่าง (Sample Production)",
    description: "ดำเนินการผลิตตัวอย่างจริง 1 ชิ้น เพื่อให้ลูกค้าตรวจสอบสี วัสดุ และคุณภาพงานสกรีน/ปัก ก่อนผลิตจำนวนมาก",
    icon: <Focus className="w-8 h-8" />,
    color: "text-pink-500",
    bg: "bg-pink-100 dark:bg-pink-900/30",
  },
  {
    id: "step-4",
    title: "4. ผลิตจริง (Mass Production)",
    description: "เริ่มกระบวนการผลิตสินค้าทั้งหมดด้วยเครื่องจักรที่ทันสมัย ควบคุมระยะเวลาอย่างเข้มงวดให้ตรงตามกำหนดการ",
    icon: <Zap className="w-8 h-8" />,
    color: "text-zeus-orange",
    bg: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    id: "step-5",
    title: "5. ตรวจสอบคุณภาพ (QC)",
    description: "ทีม Quality Control ตรวจสอบคุณภาพสินค้าทุกชิ้นอย่างละเอียด 100% เพื่อให้มั่นใจในความสมบูรณ์แบบ",
    icon: <CheckCircle2 className="w-8 h-8" />,
    color: "text-green-500",
    bg: "bg-green-100 dark:bg-green-900/30",
  },
  {
    id: "step-6",
    title: "6. จัดส่ง (Delivery)",
    description: "บรรจุอย่างแน่นหนาและจัดส่งอย่างปลอดภัยถึงมือลูกค้า ตรงเวลา ทันใจ พร้อมใช้งานสำหรับทุกโอกาสสำคัญ",
    icon: <Truck className="w-8 h-8" />,
    color: "text-zeus-blue",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
];

export function QualityProcess() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 bg-surface-light dark:bg-surface-dark relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-zeus-blue/5 dark:bg-zeus-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-zeus-orange/5 dark:bg-zeus-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold zeus-gradient-text mb-6">
            กระบวนการผลิตมาตรฐานระดับโลก
          </h2>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
            มั่นใจงานเป๊ะ ตรงเวลา ทันใจทุกการใช้งาน ด้วย 6 ขั้นตอนการทำงานที่โปร่งใส ตรวจสอบได้ และใส่ใจในทุกรายละเอียด
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[10%] w-[80%] h-0.5 bg-gradient-to-r from-border-light via-zeus-blue to-border-light dark:from-border-dark dark:via-zeus-blue-light dark:to-border-dark z-0" />
          {/* Connecting Line Row 2 (Desktop) */}
          <div className="hidden lg:block absolute bottom-[8rem] right-[10%] w-[80%] h-0.5 bg-gradient-to-l from-border-light via-zeus-orange to-border-light dark:from-border-dark dark:via-zeus-orange dark:to-border-dark z-0" />

          {PROCESS_STEPS.map((step, index) => (
            <AnimatedProcessStep
              key={step.id}
              step={step}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedProcessStep({
  step,
  index,
  isVisible,
}: {
  step: typeof PROCESS_STEPS[0];
  index: number;
  isVisible: boolean;
}) {
  const style = useSpring({
    opacity: isVisible ? 1 : 0,
    y: isVisible ? 0 : 30,
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 200 + index * 100, // Stagger effect instead of useTrail
  });

  return (
    <animated.div
      style={style}
      className="relative z-10 bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-8 border border-border-light dark:border-border-dark shadow-sm hover:shadow-xl transition-shadow duration-300 group"
    >
      <div
        className={`w-16 h-16 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6 transform group-hover:-translate-y-2 transition-transform duration-300`}
      >
        {step.icon}
      </div>
      <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
        {step.title}
      </h3>
      <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
        {step.description}
      </p>
    </animated.div>
  );
}
