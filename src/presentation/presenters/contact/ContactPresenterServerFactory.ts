import { StaticCompanyInfoRepository } from "@/src/infrastructure/repositories/static/StaticCompanyInfoRepository";
import { StaticContactFaqRepository } from "@/src/infrastructure/repositories/static/StaticContactFaqRepository";
import { ContactPresenter } from "./ContactPresenter";

export class ContactPresenterServerFactory {
  static create(): ContactPresenter {
    return new ContactPresenter(
      new StaticCompanyInfoRepository(),
      new StaticContactFaqRepository()
    );
  }
}

export function createServerContactPresenter(): ContactPresenter {
  return ContactPresenterServerFactory.create();
}
