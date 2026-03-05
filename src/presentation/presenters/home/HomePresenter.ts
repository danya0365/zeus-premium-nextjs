/**
 * HomePresenter
 * Handles business logic for Home page
 * Aggregates data from product category and company info repositories
 */

import {
    CompanyFeature,
    CompanyInfo,
    CompanyStat,
    ICompanyInfoRepository,
} from "@/src/application/repositories/ICompanyInfoRepository";
import {
    IProductCategoryRepository,
    ProductCategory,
} from "@/src/application/repositories/IProductCategoryRepository";
import { Metadata } from "next";

export interface HomeViewModel {
  companyInfo: CompanyInfo;
  categories: ProductCategory[];
  features: CompanyFeature[];
  stats: CompanyStat[];
}

/**
 * Presenter for Home page
 * ✅ Receives repositories via constructor injection
 */
export class HomePresenter {
  constructor(
    private readonly productCategoryRepo: IProductCategoryRepository,
    private readonly companyInfoRepo: ICompanyInfoRepository
  ) {}

  /**
   * Get view model for the home page
   */
  async getViewModel(): Promise<HomeViewModel> {
    try {
      const [companyInfo, categories, features, stats] = await Promise.all([
        this.companyInfoRepo.getInfo(),
        this.productCategoryRepo.getActive(),
        this.companyInfoRepo.getFeatures(),
        this.companyInfoRepo.getStats(),
      ]);

      return {
        companyInfo,
        categories,
        features,
        stats,
      };
    } catch (error) {
      console.error("Error getting home view model:", error);
      throw error;
    }
  }

  /**
   * Generate metadata for the home page
   */
  generateMetadata(): Metadata {
    return {
      title: "Zeus Premium | รับผลิตของพรีเมียมครบวงจร",
      description:
        "รับผลิตของพรีเมียมครบวงจร คุณภาพสูง ดีไซน์ทันสมัย ใส่ใจทุกรายละเอียดตั้งแต่การออกแบบจนถึงการส่งมอบ",
    };
  }
}
