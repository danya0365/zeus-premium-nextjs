/**
 * ProductDetailPresenter
 * Handles business logic for individual product detail page
 */

import {
    IProductCategoryRepository,
    ProductCategory,
} from "@/src/application/repositories/IProductCategoryRepository";
import { IProductSpecRepository } from "@/src/application/repositories/IProductSpecRepository";
import { seoConfig } from "@/src/config/seo.config";
import { Metadata } from "next";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDetailViewModel {
  product: ProductCategory;
  relatedProducts: ProductCategory[];
  specs: ProductSpec[];
}

export class ProductDetailPresenter {
  constructor(
    private readonly productCategoryRepo: IProductCategoryRepository,
    private readonly productSpecRepo: IProductSpecRepository
  ) {}

  async getViewModel(slug: string): Promise<ProductDetailViewModel | null> {
    const product = await this.productCategoryRepo.getBySlug(slug);
    if (!product) return null;

    const allProducts = await this.productCategoryRepo.getActive();
    const relatedProducts = allProducts
      .filter((p) => p.id !== product.id)
      .slice(0, 4);

    const specs = await this.productSpecRepo.getSpecs(product);

    return {
      product,
      relatedProducts,
      specs,
    };
  }

  async generateMetadata(slug: string): Promise<Metadata> {
    const product = await this.productCategoryRepo.getBySlug(slug);
    if (!product) {
      return { title: seoConfig.notFound.title };
    }
    return {
      title: seoConfig.productDetail.titleTemplate(product.name),
      description: product.description,
    };
  }
}
