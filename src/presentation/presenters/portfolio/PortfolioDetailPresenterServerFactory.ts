import { StaticPortfolioProjectRepository } from "@/src/infrastructure/repositories/static/StaticPortfolioProjectRepository";
import { PortfolioDetailPresenter } from "./PortfolioDetailPresenter";

export function createServerPortfolioDetailPresenter(): PortfolioDetailPresenter {
  return new PortfolioDetailPresenter(new StaticPortfolioProjectRepository());
}
