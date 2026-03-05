import { FAQItem } from "@/src/presentation/presenters/contact/ContactPresenter";

export interface IContactFaqRepository {
  /**
   * Get all Frequently Asked Questions
   */
  getFaqs(): Promise<FAQItem[]>;
}
