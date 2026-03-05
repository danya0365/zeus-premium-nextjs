/**
 * PortfolioPresenter
 * Handles business logic for Portfolio page
 */

import {
  CompanyStat,
  ICompanyInfoRepository,
} from "@/src/application/repositories/ICompanyInfoRepository";
import {
  IPortfolioProjectRepository,
  PortfolioProject,
} from "@/src/application/repositories/IPortfolioProjectRepository";
import {
  IProductCategoryRepository
} from "@/src/application/repositories/IProductCategoryRepository";
import { seoConfig } from "@/src/config/seo.config";
import { Metadata } from "next";



export interface PortfolioViewModel {
  projects: PortfolioProject[];
  categories: string[];
  stats: CompanyStat[];
}

export class PortfolioPresenter {
  constructor(
    private readonly companyInfoRepo: ICompanyInfoRepository,
    private readonly productCategoryRepo: IProductCategoryRepository,
    private readonly portfolioProjectRepo: IPortfolioProjectRepository
  ) {}

  async getViewModel(): Promise<PortfolioViewModel> {
    const stats = await this.companyInfoRepo.getStats();
    const categories = await this.productCategoryRepo.getActive();
    const categoryNames = ["ทั้งหมด", ...categories.map((c) => c.name)];
    
    // Fetch from repository instead of hardware data
    const projects = await this.portfolioProjectRepo.getAll();

    return {
      projects,
      categories: categoryNames,
      stats,
    };
  }

  generateMetadata(): Metadata {
    return {
      title: seoConfig.portfolio.title,
      description: seoConfig.portfolio.description,
    };
  }
}
