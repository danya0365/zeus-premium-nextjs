import { ProductCategory } from "@/src/application/repositories/IProductCategoryRepository";
import { IProductSpecRepository } from "@/src/application/repositories/IProductSpecRepository";
import { ProductSpec } from "@/src/presentation/presenters/products/ProductDetailPresenter";

export class StaticProductSpecRepository implements IProductSpecRepository {
  async getSpecs(product: ProductCategory): Promise<ProductSpec[]> {
    // Return dynamically defined specs from the product itself, or fallback
    return product.specs || [
      { label: "สั่งขั้นต่ำ", value: `${product.minOrder.toLocaleString()} ชิ้น` },
      { label: "ระยะเวลาผลิต", value: "7-15 วันทำการ" },
      { label: "จัดส่ง", value: "ทั่วประเทศ" },
    ];
  }
}
