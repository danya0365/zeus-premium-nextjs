"use client";

import { StaticCompanyInfoRepository } from "@/src/infrastructure/repositories/static/StaticCompanyInfoRepository";
import { ContactPresenter } from "./ContactPresenter";

export class ContactPresenterClientFactory {
  static create(): ContactPresenter {
    return new ContactPresenter(new StaticCompanyInfoRepository());
  }
}

export function createClientContactPresenter(): ContactPresenter {
  return ContactPresenterClientFactory.create();
}
