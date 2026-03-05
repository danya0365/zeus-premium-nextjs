import { IContactFaqRepository } from "@/src/application/repositories/IContactFaqRepository";
import { FAQItem } from "@/src/presentation/presenters/contact/ContactPresenter";

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-001",
    question: "สั่งผลิตขั้นต่ำกี่ชิ้น?",
    answer: "ขั้นต่ำเริ่มต้นที่ 100 ชิ้นขึ้นไป ขึ้นอยู่กับประเภทสินค้า สามารถสอบถามรายละเอียดเพิ่มเติมได้",
  },
  {
    id: "faq-002",
    question: "ค่าออกแบบเท่าไหร่?",
    answer: "ฟรี! เราออกแบบฟรีทุกออเดอร์ ไม่มีค่าใช้จ่ายเพิ่มเติม โดยทีมดีไซเนอร์มืออาชีพ",
  },
  {
    id: "faq-003",
    question: "ใช้เวลาผลิตนานเท่าไหร่?",
    answer: "โดยปกติ 7-15 วันทำการ ขึ้นอยู่กับปริมาณและประเภทสินค้า สามารถเร่งด่วนได้ตามตกลง",
  },
  {
    id: "faq-004",
    question: "จัดส่งทั่วประเทศไหม?",
    answer: "ได้ครับ เราจัดส่งทั่วประเทศไทย มีบริการขนส่งหลายช่องทาง ทั้งรถส่วนตัวและขนส่งเอกชน",
  },
  {
    id: "faq-005",
    question: "สามารถดูตัวอย่างก่อนผลิตจริงได้ไหม?",
    answer: "ได้ครับ เราจัดทำตัวอย่าง (Sample) ให้ตรวจสอบก่อนผลิตจริงทุกออเดอร์ เพื่อความมั่นใจ",
  },
];

export class StaticContactFaqRepository implements IContactFaqRepository {
  async getFaqs(): Promise<FAQItem[]> {
    return [...FAQ_ITEMS];
  }
}
