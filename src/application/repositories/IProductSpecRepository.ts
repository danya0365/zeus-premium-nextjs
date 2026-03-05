import { ProductSpec } from "@/src/presentation/presenters/products/ProductDetailPresenter";
import { ProductCategory } from "./IProductCategoryRepository";

export interface IProductSpecRepository {
  /**
   * Get specifications for a specific product
   */
  getSpecs(product: ProductCategory): Promise<ProductSpec[]>;
}
