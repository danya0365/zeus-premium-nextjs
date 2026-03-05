/**
 * HomePresenterServerFactory
 * Factory for creating HomePresenter instances on the server side
 * ✅ Injects Static repositories
 */

import { StaticCompanyInfoRepository } from "@/src/infrastructure/repositories/static/StaticCompanyInfoRepository";
import { StaticProductCategoryRepository } from "@/src/infrastructure/repositories/static/StaticProductCategoryRepository";
import { HomePresenter } from "./HomePresenter";

export class HomePresenterServerFactory {
  static create(): HomePresenter {
    const productCategoryRepo = new StaticProductCategoryRepository();
    const companyInfoRepo = new StaticCompanyInfoRepository();

    return new HomePresenter(productCategoryRepo, companyInfoRepo);
  }
}

export function createServerHomePresenter(): HomePresenter {
  return HomePresenterServerFactory.create();
}
