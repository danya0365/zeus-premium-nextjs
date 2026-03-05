/**
 * PortfolioDetailPresenter
 * Handles business logic for individual portfolio project detail page
 */

import { Metadata } from "next";
import { PortfolioProject } from "./PortfolioPresenter";

/** All projects (same data as PortfolioPresenter) */
const ALL_PROJECTS: PortfolioProject[] = [
  {
    id: "port-001",
    title: "กระเป๋าผ้าสปันบอนด์ งานสัมมนา",
    client: "บริษัท ABC จำกัด",
    category: "กระเป๋าผ้า",
    description: "ผลิตกระเป๋าผ้าสปันบอนด์พิมพ์โลโก้ 4 สี สำหรับงานสัมมนาประจำปี",
    quantity: "2,000 ใบ",
    icon: "shopping-bag",
  },
  {
    id: "port-002",
    title: "เสื้อโปโลพนักงาน",
    client: "บริษัท XYZ จำกัด (มหาชน)",
    category: "เสื้อ",
    description: "เสื้อโปโลปักโลโก้ ผ้า CVC Cotton เกรดพรีเมียม สำหรับทีมขาย",
    quantity: "500 ตัว",
    icon: "shirt",
  },
  {
    id: "port-003",
    title: "หมวกแก๊ปทีมกีฬา",
    client: "สมาคมกีฬาแห่งประเทศไทย",
    category: "หมวก",
    description: "หมวกแก๊ปปักโลโก้สมาคม สีกรมท่า สำหรับทีมนักกีฬา",
    quantity: "1,000 ใบ",
    icon: "hard-hat",
  },
  {
    id: "port-004",
    title: "แก้วเก็บอุณหภูมิ ของขวัญปีใหม่",
    client: "ธนาคาร DEF",
    category: "แก้ว & กระบอกน้ำ",
    description: "แก้วเก็บอุณหภูมิสแตนเลส สกรีนโลโก้ บรรจุกล่องพรีเมียม",
    quantity: "3,000 ใบ",
    icon: "cup-soda",
  },
  {
    id: "port-005",
    title: "กระเป๋าผ้าแคนวาส แจกงาน Event",
    client: "บริษัท GHI จำกัด",
    category: "กระเป๋าผ้า",
    description: "กระเป๋าผ้าแคนวาสพิมพ์ลายดีไซน์พิเศษ สำหรับแจกในงาน Brand Launch",
    quantity: "1,500 ใบ",
    icon: "briefcase",
  },
  {
    id: "port-006",
    title: "ชุดเครื่องเขียนพรีเมียม",
    client: "มหาวิทยาลัย JKL",
    category: "เครื่องเขียน",
    description: "ชุดเครื่องเขียนสกรีนโลโก้ ประกอบด้วยปากกา สมุดโน้ต ดินสอ สำหรับแจกบัณฑิต",
    quantity: "5,000 ชุด",
    icon: "pencil",
  },
  {
    id: "port-007",
    title: "พัดพลาสติก แคมเปญรณรงค์",
    client: "กระทรวงสาธารณสุข",
    category: "พัด",
    description: "พัดพลาสติกพิมพ์ข้อมูลสุขภาพ 2 หน้า สำหรับแจกในชุมชน",
    quantity: "10,000 ด้าม",
    icon: "fan",
  },
  {
    id: "port-008",
    title: "กล่องบรรจุภัณฑ์สินค้า",
    client: "บริษัท MNO จำกัด",
    category: "บรรจุภัณฑ์",
    description: "กล่องบรรจุภัณฑ์พรีเมียมออกแบบเฉพาะ พิมพ์ 4 สี เคลือบด้าน",
    quantity: "8,000 กล่อง",
    icon: "box",
  },
];

export interface PortfolioDetailViewModel {
  project: PortfolioProject;
  relatedProjects: PortfolioProject[];
  highlights: string[];
}

function generateHighlights(project: PortfolioProject): string[] {
  return [
    `ผลิตจำนวน ${project.quantity}`,
    "ออกแบบฟรี ไม่มีค่าใช้จ่ายเพิ่มเติม",
    "จัดทำตัวอย่างก่อนผลิตจริง",
    "ส่งมอบงานตรงเวลาตามกำหนด",
    "ลูกค้าพึงพอใจ สั่งผลิตซ้ำ",
  ];
}

export class PortfolioDetailPresenter {
  async getViewModel(id: string): Promise<PortfolioDetailViewModel | null> {
    const project = ALL_PROJECTS.find((p) => p.id === id);
    if (!project) return null;

    const relatedProjects = ALL_PROJECTS.filter((p) => p.id !== id).slice(0, 3);

    return {
      project,
      relatedProjects,
      highlights: generateHighlights(project),
    };
  }

  generateMetadata(id: string): Metadata {
    const project = ALL_PROJECTS.find((p) => p.id === id);
    if (!project) {
      return { title: "ไม่พบผลงาน | Zeus Premium" };
    }
    return {
      title: `${project.title} | Zeus Premium`,
      description: `ผลงาน${project.title} - ${project.client} | Zeus Premium`,
    };
  }
}
