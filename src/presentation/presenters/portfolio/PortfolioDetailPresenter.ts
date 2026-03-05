/**
 * PortfolioDetailPresenter
 * Handles business logic for individual portfolio project detail page
 */

import {
  CompanyInfo,
  ICompanyInfoRepository,
} from "@/src/application/repositories/ICompanyInfoRepository";
import {
  IPortfolioProjectRepository,
  PortfolioProject,
} from "@/src/application/repositories/IPortfolioProjectRepository";
import { seoConfig } from "@/src/config/seo.config";
import { Metadata } from "next";

export interface PortfolioDetailViewModel {
  project: PortfolioProject;
  relatedProjects: PortfolioProject[];
  highlights: string[];
  companyInfo: CompanyInfo;
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
  constructor(
    private readonly companyInfoRepo: ICompanyInfoRepository,
    private readonly portfolioRepo: IPortfolioProjectRepository
  ) {}

  async getViewModel(id: string): Promise<PortfolioDetailViewModel | null> {
    const project = await this.portfolioRepo.getById(id);
    if (!project) return null;

    const allProjects = await this.portfolioRepo.getAll();
    const relatedProjects = allProjects.filter((p) => p.id !== id).slice(0, 3);
    const companyInfo = await this.companyInfoRepo.getInfo();

    return {
      project,
      relatedProjects,
      highlights: generateHighlights(project),
      companyInfo,
    };
  }

  async generateMetadata(id: string): Promise<Metadata> {
    const project = await this.portfolioRepo.getById(id);
    if (!project) {
      return { title: seoConfig.notFound.title };
    }
    return {
      title: seoConfig.portfolioDetail.titleTemplate(project.title),
      description: seoConfig.portfolioDetail.descriptionTemplate(project.title, project.client),
    };
  }
}
