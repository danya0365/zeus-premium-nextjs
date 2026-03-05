"use client";

import { StaticCompanyInfoRepository } from "@/src/infrastructure/repositories/static/StaticCompanyInfoRepository";
import { StaticPortfolioProjectRepository } from "@/src/infrastructure/repositories/static/StaticPortfolioProjectRepository";
import { StaticProductCategoryRepository } from "@/src/infrastructure/repositories/static/StaticProductCategoryRepository";
import { PortfolioPresenter } from "./PortfolioPresenter";

export class PortfolioPresenterClientFactory {
  static create(): PortfolioPresenter {
    return new PortfolioPresenter(
      new StaticCompanyInfoRepository(),
      new StaticProductCategoryRepository(),
      new StaticPortfolioProjectRepository()
    );
  }
}

export function createClientPortfolioPresenter(): PortfolioPresenter {
  return PortfolioPresenterClientFactory.create();
}
