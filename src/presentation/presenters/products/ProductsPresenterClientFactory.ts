"use client";

import { StaticProductCategoryRepository } from "@/src/infrastructure/repositories/static/StaticProductCategoryRepository";
import { ProductsPresenter } from "./ProductsPresenter";

export class ProductsPresenterClientFactory {
  static create(): ProductsPresenter {
    return new ProductsPresenter(new StaticProductCategoryRepository());
  }
}

export function createClientProductsPresenter(): ProductsPresenter {
  return ProductsPresenterClientFactory.create();
}
