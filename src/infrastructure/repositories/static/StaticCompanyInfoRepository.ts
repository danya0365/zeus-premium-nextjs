/**
 * StaticCompanyInfoRepository
 * Static implementation for company information
 * Following Clean Architecture - Infrastructure layer
 */

import {
    CompanyFeature,
    CompanyInfo,
    CompanyStat,
    ICompanyInfoRepository,
} from "@/src/application/repositories/ICompanyInfoRepository";

const COMPANY_FEATURES: CompanyFeature[] = [
  {
    id: "feat-001",
    title: "คุณภาพสูง",
    description:
      "วัสดุคุณภาพเยี่ยม ผ่านการคัดสรรอย่างพิถีพิถัน ทุกชิ้นผ่าน QC ก่อนส่งมอบ",
    icon: "shield-check",
  },
  {
    id: "feat-002",
    title: "ดีไซน์ทันสมัย",
    description:
      "ทีมดีไซเนอร์มืออาชีพ ออกแบบฟรี ตามสไตล์แบรนด์ของคุณ",
    icon: "palette",
  },
  {
    id: "feat-003",
    title: "ตรงเวลา ทันใจ",
    description:
      "ระบบการผลิตที่มีประสิทธิภาพ ส่งมอบงานตรงเวลา ไม่เลื่อนนัด",
    icon: "clock",
  },
  {
    id: "feat-004",
    title: "ครบวงจร",
    description:
      "บริการครบจบที่เดียว ตั้งแต่ออกแบบ ผลิต จนถึงส่งมอบถึงมือ",
    icon: "check-circle",
  },
];

const COMPANY_STATS: CompanyStat[] = [
  {
    id: "stat-001",
    label: "ลูกค้าที่ไว้วางใจ",
    value: 1500,
    suffix: "+",
  },
  {
    id: "stat-002",
    label: "สินค้าที่ผลิต",
    value: 50000,
    suffix: "+",
  },
  {
    id: "stat-003",
    label: "ปีประสบการณ์",
    value: 10,
    suffix: "+",
  },
  {
    id: "stat-004",
    label: "หมวดหมู่สินค้า",
    value: 18,
    suffix: "",
  },
];

const COMPANY_INFO: CompanyInfo = {
  name: "Zeus Premium",
  tagline: "ดีไซน์โดนใจ งานไวทันใช้ มั่นใจคุณภาพ",
  description:
    "รับผลิตของพรีเมียมครบวงจร คุณภาพสูง ดีไซน์ทันสมัย ใส่ใจทุกรายละเอียดตั้งแต่การออกแบบจนถึงการส่งมอบ มั่นใจงานเป๊ะ ตรงเวลา ทันใจทุกการใช้งาน",
  phone: "063-878-7995",
  email: "info@zeuspremium.co.th",
  lineId: "@zeuspremium",
  lineUrl: "https://line.me/ti/p/@zeuspremium",
  address: "กรุงเทพมหานคร, ประเทศไทย",
  features: COMPANY_FEATURES,
  stats: COMPANY_STATS,
};

export class StaticCompanyInfoRepository implements ICompanyInfoRepository {
  async getInfo(): Promise<CompanyInfo> {
    return { ...COMPANY_INFO };
  }

  async getFeatures(): Promise<CompanyFeature[]> {
    return [...COMPANY_FEATURES];
  }

  async getStats(): Promise<CompanyStat[]> {
    return [...COMPANY_STATS];
  }
}
