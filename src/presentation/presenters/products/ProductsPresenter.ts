/**
 * ProductsPresenter
 * Handles business logic for Products page
 * Reuses IProductCategoryRepository
 */

import {
    CompanyInfo,
    ICompanyInfoRepository,
} from "@/src/application/repositories/ICompanyInfoRepository";
import {
    IProductCategoryRepository,
    ProductCategory,
} from "@/src/application/repositories/IProductCategoryRepository";
import { seoConfig } from "@/src/config/seo.config";
import { Metadata } from "next";

export interface ProductsViewModel {
  categories: ProductCategory[];
  totalCategories: number;
  companyInfo: CompanyInfo;
}

export class ProductsPresenter {
  constructor(
    private readonly companyInfoRepo: ICompanyInfoRepository,
    private readonly productCategoryRepo: IProductCategoryRepository
  ) {}

  async getViewModel(): Promise<ProductsViewModel> {
    const categories = await this.productCategoryRepo.getActive();
    const companyInfo = await this.companyInfoRepo.getInfo();
    return {
      categories,
      totalCategories: categories.length,
      companyInfo,
    };
  }

  generateMetadata(): Metadata {
    return {
      title: seoConfig.products.title,
      description: seoConfig.products.description,
    };
  }
}
