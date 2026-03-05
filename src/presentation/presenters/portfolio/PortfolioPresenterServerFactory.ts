import { StaticCompanyInfoRepository } from "@/src/infrastructure/repositories/static/StaticCompanyInfoRepository";
import { StaticPortfolioProjectRepository } from "@/src/infrastructure/repositories/static/StaticPortfolioProjectRepository";
import { StaticProductCategoryRepository } from "@/src/infrastructure/repositories/static/StaticProductCategoryRepository";
import { PortfolioPresenter } from "./PortfolioPresenter";

export class PortfolioPresenterServerFactory {
  static create(): PortfolioPresenter {
    return new PortfolioPresenter(
      new StaticCompanyInfoRepository(),
      new StaticProductCategoryRepository(),
      new StaticPortfolioProjectRepository()
    );
  }
}

export function createServerPortfolioPresenter(): PortfolioPresenter {
  return PortfolioPresenterServerFactory.create();
}
