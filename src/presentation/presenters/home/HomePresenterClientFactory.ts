/**
 * HomePresenterClientFactory
 * Factory for creating HomePresenter instances on the client side
 * ✅ Injects Static repositories
 */

"use client";

import { StaticCompanyInfoRepository } from "@/src/infrastructure/repositories/static/StaticCompanyInfoRepository";
import { StaticProductCategoryRepository } from "@/src/infrastructure/repositories/static/StaticProductCategoryRepository";
import { HomePresenter } from "./HomePresenter";

export class HomePresenterClientFactory {
  static create(): HomePresenter {
    const productCategoryRepo = new StaticProductCategoryRepository();
    const companyInfoRepo = new StaticCompanyInfoRepository();

    return new HomePresenter(productCategoryRepo, companyInfoRepo);
  }
}

export function createClientHomePresenter(): HomePresenter {
  return HomePresenterClientFactory.create();
}
