import { StaticProductCategoryRepository } from "@/src/infrastructure/repositories/static/StaticProductCategoryRepository";
import { ProductDetailPresenter } from "./ProductDetailPresenter";

export function createServerProductDetailPresenter(): ProductDetailPresenter {
  return new ProductDetailPresenter(new StaticProductCategoryRepository());
}
