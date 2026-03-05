import { StaticProductCategoryRepository } from "@/src/infrastructure/repositories/static/StaticProductCategoryRepository";
import { ProductsPresenter } from "./ProductsPresenter";

export class ProductsPresenterServerFactory {
  static create(): ProductsPresenter {
    return new ProductsPresenter(new StaticProductCategoryRepository());
  }
}

export function createServerProductsPresenter(): ProductsPresenter {
  return ProductsPresenterServerFactory.create();
}
