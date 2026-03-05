/**
 * ContactPresenter
 * Handles business logic for Contact page
 */

import {
  CompanyInfo,
  ICompanyInfoRepository,
} from "@/src/application/repositories/ICompanyInfoRepository";
import { IContactFaqRepository } from "@/src/application/repositories/IContactFaqRepository";
import { seoConfig } from "@/src/config/seo.config";
import { Metadata } from "next";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactViewModel {
  companyInfo: CompanyInfo;
  faqItems: FAQItem[];
}

export class ContactPresenter {
  constructor(
    private readonly companyInfoRepo: ICompanyInfoRepository,
    private readonly contactFaqRepo: IContactFaqRepository
  ) {}

  async getViewModel(): Promise<ContactViewModel> {
    const [companyInfo, faqItems] = await Promise.all([
      this.companyInfoRepo.getInfo(),
      this.contactFaqRepo.getFaqs(),
    ]);
    return {
      companyInfo,
      faqItems,
    };
  }

  generateMetadata(): Metadata {
    return {
      title: seoConfig.contact.title,
      description: seoConfig.contact.description,
    };
  }
}
