import { StaticCompanyInfoRepository } from "@/src/infrastructure/repositories/static/StaticCompanyInfoRepository";
import { StaticProductCategoryRepository } from "@/src/infrastructure/repositories/static/StaticProductCategoryRepository";
import { PortfolioPresenter } from "./PortfolioPresenter";

export class PortfolioPresenterServerFactory {
  static create(): PortfolioPresenter {
    return new PortfolioPresenter(
      new StaticProductCategoryRepository(),
      new StaticCompanyInfoRepository()
    );
  }
}

export function createServerPortfolioPresenter(): PortfolioPresenter {
  return PortfolioPresenterServerFactory.create();
}
