import { StaticCompanyInfoRepository } from "@/src/infrastructure/repositories/static/StaticCompanyInfoRepository";
import { AboutPresenter } from "./AboutPresenter";

export class AboutPresenterServerFactory {
  static create(): AboutPresenter {
    return new AboutPresenter(new StaticCompanyInfoRepository());
  }
}

export function createServerAboutPresenter(): AboutPresenter {
  return AboutPresenterServerFactory.create();
}
