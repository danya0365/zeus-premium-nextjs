"use client";

import { StaticCompanyInfoRepository } from "@/src/infrastructure/repositories/static/StaticCompanyInfoRepository";
import { AboutPresenter } from "./AboutPresenter";

export class AboutPresenterClientFactory {
  static create(): AboutPresenter {
    return new AboutPresenter(new StaticCompanyInfoRepository());
  }
}

export function createClientAboutPresenter(): AboutPresenter {
  return AboutPresenterClientFactory.create();
}
