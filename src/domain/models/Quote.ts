/**
 * Domain Models for Quote System
 */

export interface QuoteItemOptions {
  logoOption?: "none" | "1-color" | "multi-color" | "laser" | "embroidery";
  specificColor?: string;
  notes?: string;
}

export interface QuoteItem {
  id: string; // Unique ID for the item in the quote (e.g., could be productSlug-timestamp)
  productSlug: string;
  productName: string;
  quantity: number;
  options?: QuoteItemOptions;
  thumbnailUrl?: string; // Optional thumbnail for display
}

export interface QuoteForm {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  budget?: string; // Approximate budget
  requiredDate?: string; // Format: YYYY-MM-DD
  additionalNotes?: string;
}

export interface Quote {
  items: QuoteItem[];
}
