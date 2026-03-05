/**
 * ProductsPresenter
 * Handles business logic for Products page
 * Reuses IProductCategoryRepository
 */

import {
    IProductCategoryRepository,
    ProductCategory,
} from "@/src/application/repositories/IProductCategoryRepository";
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
      title: "สินค้าพรีเมียม | Zeus Premium",
      description:
        "หมวดหมู่สินค้าพรีเมียมครบวงจร กระเป๋าผ้า พัด หมวก เสื้อ แก้ว เครื่องเขียน บรรจุภัณฑ์ ออกแบบฟรี สั่งผลิตขั้นต่ำเพียง 100 ชิ้น",
    };
  }
}
