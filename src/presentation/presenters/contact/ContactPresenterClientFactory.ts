"use client";

import { StaticCompanyInfoRepository } from "@/src/infrastructure/repositories/static/StaticCompanyInfoRepository";
import { StaticContactFaqRepository } from "@/src/infrastructure/repositories/static/StaticContactFaqRepository";
import { ContactPresenter } from "./ContactPresenter";

export class ContactPresenterClientFactory {
  static create(): ContactPresenter {
    return new ContactPresenter(
      new StaticCompanyInfoRepository(),
      new StaticContactFaqRepository()
    );
  }
}

export function createClientContactPresenter(): ContactPresenter {
  return ContactPresenterClientFactory.create();
}
