/**
 * StaticProductCategoryRepository
 * Static implementation for product categories
 * Following Clean Architecture - Infrastructure layer
 */

import {
    IProductCategoryRepository,
    ProductCategory,
} from "@/src/application/repositories/IProductCategoryRepository";

const STATIC_PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "cat-001",
    slug: "spunbond-bag",
    name: "กระเป๋าผ้าสปันบอนด์",
    description: "กระเป๋าผ้าสปันบอนด์คุณภาพสูง รับผลิตตามแบบ พิมพ์โลโก้ได้",
    icon: "shopping-bag",
    minOrder: 300,
    isActive: true,
  },
  {
    id: "cat-002",
    slug: "umbrella-bag",
    name: "กระเป๋าผ้าร่ม",
    description: "กระเป๋าผ้าร่ม พับเก็บ/สะพายหลัง กันน้ำ ทนทาน",
    icon: "umbrella",
    minOrder: 300,
    isActive: true,
  },
  {
    id: "cat-003",
    slug: "canvas-bag",
    name: "กระเป๋าผ้าแคนวาส",
    description: "กระเป๋าผ้าแคนวาสหนา ทนทาน รับน้ำหนักได้ดี",
    icon: "briefcase",
    minOrder: 300,
    isActive: true,
  },
  {
    id: "cat-004",
    slug: "jute-bag",
    name: "กระเป๋าผ้ากระสอบ",
    description: "กระเป๋าผ้ากระสอบ เป็นมิตรกับสิ่งแวดล้อม สวยงาม",
    icon: "package",
    minOrder: 300,
    isActive: true,
  },
  {
    id: "cat-005",
    slug: "cotton-bag",
    name: "กระเป๋าผ้าดิบ",
    description: "กระเป๋าผ้าดิบ ย้อมสีได้ พิมพ์ลายสวยงาม",
    icon: "shopping-bag",
    minOrder: 300,
    isActive: true,
  },
  {
    id: "cat-006",
    slug: "600d-bag",
    name: "กระเป๋า 600D",
    description: "กระเป๋า 600D ทนทานพิเศษ เหมาะสำหรับงานหนัก",
    icon: "backpack",
    minOrder: 300,
    isActive: true,
  },
  {
    id: "cat-007",
    slug: "plastic-fan",
    name: "พัดพลาสติก",
    description: "พัดพลาสติก ไดคัทได้หลายแบบ พิมพ์ออฟเซท ไม่จำกัดสี",
    icon: "wind",
    minOrder: 300,
    isActive: true,
  },
  {
    id: "cat-008",
    slug: "spring-fan",
    name: "พัดสปริง",
    description: "พัดสปริงพับเก็บได้ พกพาสะดวก พิมพ์ลายสวย",
    icon: "fan",
    minOrder: 300,
    isActive: true,
  },
  {
    id: "cat-009",
    slug: "cap",
    name: "หมวกแก๊ป",
    description: "หมวกแก๊ป ปักโลโก้ หลากหลายสี คุณภาพเยี่ยม",
    icon: "hard-hat",
    minOrder: 200,
    isActive: true,
  },
  {
    id: "cat-010",
    slug: "visor",
    name: "หมวกไวเซอร์",
    description: "หมวกไวเซอร์ ระบายอากาศดี เหมาะสำหรับกิจกรรมกลางแจ้ง",
    icon: "sun",
    minOrder: 200,
    isActive: true,
  },
  {
    id: "cat-011",
    slug: "tshirt",
    name: "เสื้อยืด",
    description: "เสื้อยืดคุณภาพ เนื้อผ้าดี สกรีน/ปักโลโก้ได้",
    icon: "shirt",
    minOrder: 100,
    isActive: true,
  },
  {
    id: "cat-012",
    slug: "polo",
    name: "เสื้อโปโล",
    description: "เสื้อโปโลพรีเมียม เหมาะสำหรับยูนิฟอร์ม ของแจก",
    icon: "shirt",
    minOrder: 100,
    isActive: true,
  },
  {
    id: "cat-013",
    slug: "tumbler",
    name: "แก้วเก็บอุณหภูมิ",
    description: "แก้วเก็บอุณหภูมิ สแตนเลสคุณภาพสูง สกรีนโลโก้",
    icon: "cup-soda",
    minOrder: 100,
    isActive: true,
  },
  {
    id: "cat-014",
    slug: "water-bottle",
    name: "กระบอกน้ำ",
    description: "กระบอกน้ำหลากหลายแบบ ปลอดภัย BPA Free",
    icon: "bottle",
    minOrder: 100,
    isActive: true,
  },
  {
    id: "cat-015",
    slug: "pen",
    name: "ปากกา",
    description: "ปากกาพรีเมียม หลากหลายรุ่น สกรีนโลโก้ได้",
    icon: "pen-tool",
    minOrder: 500,
    isActive: true,
  },
  {
    id: "cat-016",
    slug: "notebook",
    name: "สมุดโน้ต",
    description: "สมุดโน้ตพรีเมียม ออกแบบปกตามต้องการ",
    icon: "book-open",
    minOrder: 200,
    isActive: true,
  },
  {
    id: "cat-017",
    slug: "stationery",
    name: "เครื่องเขียน",
    description: "เครื่องเขียนครบชุด ทั้งปากกา ดินสอ ยางลบ ไม้บรรทัด",
    icon: "pencil",
    minOrder: 300,
    isActive: true,
  },
  {
    id: "cat-018",
    slug: "packaging",
    name: "กล่องบรรจุภัณฑ์",
    description: "กล่องบรรจุภัณฑ์คุณภาพ ออกแบบตามต้องการ",
    icon: "box",
    minOrder: 500,
    isActive: true,
  },
];

export class StaticProductCategoryRepository
  implements IProductCategoryRepository
{
  async getAll(): Promise<ProductCategory[]> {
    return [...STATIC_PRODUCT_CATEGORIES];
  }

  async getActive(): Promise<ProductCategory[]> {
    return STATIC_PRODUCT_CATEGORIES.filter((cat) => cat.isActive);
  }

  async getBySlug(slug: string): Promise<ProductCategory | null> {
    return (
      STATIC_PRODUCT_CATEGORIES.find((cat) => cat.slug === slug) || null
    );
  }

  async getById(id: string): Promise<ProductCategory | null> {
    return STATIC_PRODUCT_CATEGORIES.find((cat) => cat.id === id) || null;
  }
}
