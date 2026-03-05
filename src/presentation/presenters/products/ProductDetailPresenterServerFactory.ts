import { StaticCompanyInfoRepository } from "@/src/infrastructure/repositories/static/StaticCompanyInfoRepository";
import { StaticProductCategoryRepository } from "@/src/infrastructure/repositories/static/StaticProductCategoryRepository";
import { StaticProductSpecRepository } from "@/src/infrastructure/repositories/static/StaticProductSpecRepository";
import { ProductDetailPresenter } from "./ProductDetailPresenter";

export function createServerProductDetailPresenter(): ProductDetailPresenter {
  return new ProductDetailPresenter(
    new StaticCompanyInfoRepository(),
    new StaticProductCategoryRepository(),
    new StaticProductSpecRepository()
  );
}
