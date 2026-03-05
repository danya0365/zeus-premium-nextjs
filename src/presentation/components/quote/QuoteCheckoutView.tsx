"use client";

import { useQuoteStore } from "@/src/application/store/useQuoteStore";
import { QuoteForm } from "@/src/domain/models/Quote";
import { AnimatedButton } from "@/src/presentation/components/shared/AnimatedButton";
import { animated, useSpring } from "@react-spring/web";
import { ArrowLeft, CheckCircle2, FileText, Minus, Plus, Send, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function QuoteCheckoutView() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, clearQuote } = useQuoteStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState<QuoteForm>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    budget: "",
    requiredDate: "",
    additionalNotes: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 280, friction: 60 },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    clearQuote();
  };

  if (!mounted) return null;

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <animated.div style={fadeIn} className="max-w-md w-full text-center zeus-card p-10">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            ส่งคำขอสำเร็จ!
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">
            เราได้รับรายการขอใบเสนอราคาของคุณเรียบร้อยแล้ว ทีมงานจะติดต่อกลับพร้อมใบเสนอราคาโดยเร็วที่สุด
          </p>
          <AnimatedButton variant="primary" className="w-full justify-center">
            <Link href="/products" className="flex items-center gap-2 justify-center py-1">
              เลือกดูสินค้าเพิ่มเติม
            </Link>
          </AnimatedButton>
        </animated.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-24 h-24 rounded-full bg-surface-elevated-light dark:bg-surface-elevated-dark flex items-center justify-center mx-auto mb-6">
          <FileText className="w-12 h-12 text-text-muted-light dark:text-text-muted-dark" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          ยังไม่มีรายการขอใบเสนอราคา
        </h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-md">
          คุณสามารถเลือกสินค้าที่สนใจและกด &quot;เพิ่มลงใบเสนอราคา&quot; เพื่อให้ทีมงานประเมินราคาให้ได้เลยครับ
        </p>
        <AnimatedButton variant="primary">
          <Link href="/products" className="flex items-center gap-2">
            หมวดหมู่สินค้าทั้งหมด <ArrowLeft className="w-5 h-5 order-first" />
          </Link>
        </AnimatedButton>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-zeus-blue transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          เลือกสินค้าต่อ
        </Link>
        
        <h1 className="text-3xl font-extrabold text-text-primary-light dark:text-text-primary-dark mb-8">
          ขอใบเสนอราคา
        </h1>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Form Section */}
          <animated.div style={fadeIn} className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="zeus-card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
                ข้อมูลฟอร์มติดต่อ (Contact Information)
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
                    ชื่อบริษัท / องค์กร *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl px-4 py-3 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-zeus-blue/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
                    ชื่อผู้ติดต่อ *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl px-4 py-3 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-zeus-blue/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
                    อีเมล *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl px-4 py-3 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-zeus-blue/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
                    เบอร์โทรศัพท์ *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl px-4 py-3 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-zeus-blue/50"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
                    งบประมาณโดยรวม (โดยประมาณ)
                  </label>
                  <input
                    type="text"
                    name="budget"
                    placeholder="เช่น 50,000 บาท หรือ 200 บาท/ชิ้น"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl px-4 py-3 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-zeus-blue/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
                    วันที่คาดว่าจะใช้งาน
                  </label>
                  <input
                    type="date"
                    name="requiredDate"
                    value={formData.requiredDate}
                    onChange={handleInputChange}
                    className="w-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl px-4 py-3 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-zeus-blue/50"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
                  รายละเอียดเพิ่มเติม
                </label>
                <textarea
                  name="additionalNotes"
                  rows={4}
                  placeholder="รายละเอียดโลโก้ สี หรือความต้องการอื่นๆ"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  className="w-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl px-4 py-3 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-zeus-blue/50 resize-none"
                />
              </div>

              <AnimatedButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full flex justify-center py-4"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    กำลังส่งข้อมูล...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    ส่งขอใบเสนอราคา
                  </span>
                )}
              </AnimatedButton>
            </form>
          </animated.div>

          {/* Items Summary Section */}
          <animated.div style={fadeIn} className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
            <div className="zeus-card p-6 top-24 sticky">
              <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-zeus-blue" />
                สรุปรายการสินค้า
              </h2>
              
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark text-sm">
                        {item.productName}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-text-muted-light hover:text-zeus-orange dark:text-text-muted-dark transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {item.options?.logoOption && (
                      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-3">
                        โลโก้: {item.options.logoOption}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between border-t border-border-light dark:border-border-dark pt-3">
                      <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">
                        จำนวน:
                      </span>
                      <div className="flex items-center bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-lg border border-border-light dark:border-border-dark p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 100)}
                          className="p-1 text-text-secondary-light hover:text-zeus-blue dark:text-text-secondary-dark transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-12 text-center text-zeus-blue dark:text-zeus-blue-light">
                          {item.quantity.toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 100)}
                          className="p-1 text-text-secondary-light hover:text-zeus-blue dark:text-text-secondary-dark transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border-light dark:border-border-dark flex justify-between items-center text-sm font-bold">
                <span className="text-text-secondary-light dark:text-text-secondary-dark">รวมทั้งหมด</span>
                <span className="text-text-primary-light dark:text-text-primary-dark text-lg">{items.length} รายการ</span>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </div>
  );
}
