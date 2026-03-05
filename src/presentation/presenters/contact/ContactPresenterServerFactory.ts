import { StaticCompanyInfoRepository } from "@/src/infrastructure/repositories/static/StaticCompanyInfoRepository";
import { ContactPresenter } from "./ContactPresenter";

export class ContactPresenterServerFactory {
  static create(): ContactPresenter {
    return new ContactPresenter(new StaticCompanyInfoRepository());
  }
}

export function createServerContactPresenter(): ContactPresenter {
  return ContactPresenterServerFactory.create();
}
