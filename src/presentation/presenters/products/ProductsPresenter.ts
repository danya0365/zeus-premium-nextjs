/**
 * ProductsPresenter
 * Handles business logic for Products page
 * Reuses IProductCategoryRepository
 */

import {
    IProductCategoryRepository,
    ProductCategory,
} from "@/src/application/repositories/IProductCategoryRepository";
import { seoConfig } from "@/src/config/seo.config";
import { Metadata } from "next";

export interface ProductsViewModel {
  categories: ProductCategory[];
  totalCategories: number;
}

export class ProductsPresenter {
  constructor(
    private readonly productCategoryRepo: IProductCategoryRepository
  ) {}

  async getViewModel(): Promise<ProductsViewModel> {
    const categories = await this.productCategoryRepo.getActive();
    return {
      categories,
      totalCategories: categories.length,
    };
  }

  generateMetadata(): Metadata {
    return {
      title: seoConfig.products.title,
      description: seoConfig.products.description,
    };
  }
}
