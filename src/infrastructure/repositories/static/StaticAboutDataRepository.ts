import { IAboutDataRepository } from "@/src/application/repositories/IAboutDataRepository";
import { TeamValue, TimelineEvent } from "@/src/presentation/presenters/about/AboutPresenter";

const TIMELINE: TimelineEvent[] = [
  {
    year: "2015",
    title: "ก่อตั้งบริษัท",
    description: "เริ่มต้นจากทีมเล็กๆ ที่มีความหลงใหลในงานออกแบบและการผลิตสินค้าพรีเมียม",
  },
  {
    year: "2017",
    title: "ขยายไลน์สินค้า",
    description: "เพิ่มหมวดหมู่สินค้าจาก 5 เป็น 10 หมวดหมู่ ครอบคลุมกระเป๋า พัด และหมวก",
  },
  {
    year: "2019",
    title: "ลูกค้า 500+ ราย",
    description: "ได้รับความไว้วางใจจากลูกค้ากว่า 500 ราย ทั้งหน่วยงานภาครัฐและเอกชน",
  },
  {
    year: "2021",
    title: "อัพเกรดโรงงาน",
    description: "ลงทุนอัพเกรดเครื่องจักรและเทคโนโลยีการพิมพ์เพื่อคุณภาพที่สูงขึ้น",
  },
  {
    year: "2024",
    title: "ครบวงจรมากขึ้น",
    description: "ขยายไลน์สินค้ากว่า 18 หมวดหมู่ พร้อมบริการออกแบบครบวงจร",
  },
];

const VALUES: TeamValue[] = [
  {
    title: "คุณภาพต้องมาก่อน",
    description: "ทุกชิ้นงานต้องผ่านการตรวจสอบคุณภาพอย่างละเอียดก่อนส่งมอบ",
    icon: "shield-check",
  },
  {
    title: "สร้างสรรค์ไม่หยุด",
    description: "ทีมดีไซเนอร์พร้อมสร้างผลงานที่โดดเด่นและแตกต่าง",
    icon: "palette",
  },
  {
    title: "ลูกค้าคือหัวใจ",
    description: "เราใส่ใจทุกความต้องการ ให้คำปรึกษาตลอดกระบวนการ",
    icon: "heart",
  },
  {
    title: "รักษาสัญญา",
    description: "ตรงเวลาคือสัญญาที่เราให้ ส่งมอบงานตามกำหนดทุกครั้ง",
    icon: "clock",
  },
];

export class StaticAboutDataRepository implements IAboutDataRepository {
  async getTimeline(): Promise<TimelineEvent[]> {
    return [...TIMELINE];
  }

  async getValues(): Promise<TeamValue[]> {
    return [...VALUES];
  }
}
