/**
 * AboutPresenter
 * Handles business logic for About page
 */

import { IAboutDataRepository } from "@/src/application/repositories/IAboutDataRepository";
import {
  CompanyFeature,
  CompanyInfo,
  CompanyStat,
  ICompanyInfoRepository,
} from "@/src/application/repositories/ICompanyInfoRepository";
import { seoConfig } from "@/src/config/seo.config";
import { Metadata } from "next";

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface TeamValue {
  title: string;
  description: string;
  icon: string;
}

export interface AboutViewModel {
  companyInfo: CompanyInfo;
  features: CompanyFeature[];
  stats: CompanyStat[];
  timeline: TimelineEvent[];
  values: TeamValue[];
}

export class AboutPresenter {
  constructor(
    private readonly companyInfoRepo: ICompanyInfoRepository,
    private readonly aboutDataRepo: IAboutDataRepository
  ) {}

  async getViewModel(): Promise<AboutViewModel> {
    const [companyInfo, features, stats, timeline, values] = await Promise.all([
      this.companyInfoRepo.getInfo(),
      this.companyInfoRepo.getFeatures(),
      this.companyInfoRepo.getStats(),
      this.aboutDataRepo.getTimeline(),
      this.aboutDataRepo.getValues(),
    ]);

    return {
      companyInfo,
      features,
      stats,
      timeline,
      values,
    };
  }

  generateMetadata(): Metadata {
    return {
      title: seoConfig.about.title,
      description: seoConfig.about.description,
    };
  }
}
