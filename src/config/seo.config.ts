/**
 * Centralized SEO Configuration
 * Contains all static titles, descriptions, and keywords for the application.
 */

export const siteConfig = {
  name: "Zeus Premium",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  ogImage: "/og.jpg", // can use relative path now because of metadataBase
  description: "รับผลิตของพรีเมียมครบวงจร คุณภาพสูง ดีไซน์ทันสมัย",
  keywords: ["ของพรีเมียม", "รับผลิตของพรีเมียม", "ของที่ระลึก", "ของแจก", "กระเป๋าผ้า", "ร่ม", "กระบอกน้ำ"],
  author: "Zeus Premium",
  twitterHandle: "@zeuspremium",
  locale: "th_TH",
};

export const seoConfig = {
  default: {
    title: `${siteConfig.name} | รับผลิตของพรีเมียมครบวงจร`,
    description: siteConfig.description,
  },
  home: {
    title: `${siteConfig.name} | รับผลิตของพรีเมียมครบวงจร`,
    description: siteConfig.description,
  },
  about: {
    title: `เกี่ยวกับเรา | ${siteConfig.name}`,
    description: "ทำความรู้จักกับ Zeus Premium ผู้เชี่ยวชาญด้านการผลิตและจัดจำหน่ายของพรีเมียมแบบครบวงจร ด้วยประสบการณ์กว่า 10 ปี",
  },
  products: {
    title: `สินค้า | ${siteConfig.name}`,
    description: "รวมแคตตาล็อกสินค้าพรีเมียม กระเป๋า หมวก เสื้อ แก้วน้ำ เครื่องเขียน พร้อมสกรีนโลโก้เพื่อส่งเสริมการขาย",
  },
  portfolio: {
    title: `ผลงาน | ${siteConfig.name}`,
    description: "ตัวอย่างผลงานผลิตสินค้าพรีเมียม กระเป๋าผ้า หมวก เสื้อ แก้ว เครื่องเขียน จากลูกค้ากว่า 1,500 ราย",
  },
  contact: {
    title: `ติดต่อเรา | ${siteConfig.name}`,
    description: "ติดต่อ Zeus Premium เพื่อสอบถามราคา สั่งผลิตของพรีเมียม หรือขอรับคำปรึกษาฟรี",
  },
  notFound: {
    title: `ไม่พบหน้า | ${siteConfig.name}`,
    description: "ไม่พบหน้าที่คุณต้องการ",
  },
  error: {
    title: `เกิดข้อผิดพลาด | ${siteConfig.name}`,
    description: "เกิดข้อผิดพลาดในการโหลดข้อมูล",
  },
  // Dynamic page titles templates
  productDetail: {
    titleTemplate: (productName: string) => `${productName} | ${siteConfig.name}`,
  },
  portfolioDetail: {
    titleTemplate: (projectName: string) => `${projectName} | ${siteConfig.name}`,
    descriptionTemplate: (projectName: string, clientName: string) => `ผลงาน${projectName} - ${clientName} | ${siteConfig.name}`,
  }
};
