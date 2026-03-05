/**
 * ProductDetailPresenter
 * Handles business logic for individual product detail page
 */

import {
    IProductCategoryRepository,
    ProductCategory,
} from "@/src/application/repositories/IProductCategoryRepository";
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

/** Generate mock specs for each product category */
function generateSpecs(product: ProductCategory): ProductSpec[] {
  return [
    { label: "สั่งขั้นต่ำ", value: `${product.minOrder.toLocaleString()} ชิ้น` },
    { label: "ระยะเวลาผลิต", value: "7-15 วันทำการ" },
    { label: "การพิมพ์", value: "สกรีน / ปั๊ม / ปัก / ดิจิตอล" },
    { label: "ออกแบบ", value: "ฟรี ไม่มีค่าใช้จ่าย" },
    { label: "ตัวอย่าง", value: "จัดทำ Sample ก่อนผลิตจริง" },
    { label: "จัดส่ง", value: "ทั่วประเทศ" },
  ];
}

export class ProductDetailPresenter {
  constructor(private readonly productCategoryRepo: IProductCategoryRepository) {}

  async getViewModel(slug: string): Promise<ProductDetailViewModel | null> {
    const product = await this.productCategoryRepo.getBySlug(slug);
    if (!product) return null;

    const allProducts = await this.productCategoryRepo.getActive();
    const relatedProducts = allProducts
      .filter((p) => p.id !== product.id)
      .slice(0, 4);

    return {
      product,
      relatedProducts,
      specs: generateSpecs(product),
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
