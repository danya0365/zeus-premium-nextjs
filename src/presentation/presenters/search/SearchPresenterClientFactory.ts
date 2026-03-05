"use client";

import { StaticPortfolioProjectRepository } from "@/src/infrastructure/repositories/static/StaticPortfolioProjectRepository";
import { StaticProductCategoryRepository } from "@/src/infrastructure/repositories/static/StaticProductCategoryRepository";
import { SearchPresenter } from "./SearchPresenter";

export class SearchPresenterClientFactory {
  static create(): SearchPresenter {
    return new SearchPresenter(
      new StaticProductCategoryRepository(),
      new StaticPortfolioProjectRepository()
    );
  }
}

export function createClientSearchPresenter(): SearchPresenter {
  return SearchPresenterClientFactory.create();
}
