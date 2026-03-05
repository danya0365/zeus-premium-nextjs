import { seoConfig } from "@/src/config/seo.config";
import { QuoteCheckoutView } from "@/src/presentation/components/quote/QuoteCheckoutView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `ขอใบเสนอราคา | ${seoConfig.default.title}`,
  description: "ขอใบเสนอราคาสินค้าพรีเมียม ของขวัญองค์กร จาก Zeus Premium",
  robots: {
    index: false,
    follow: false,
  },
};

export default function QuotePage() {
  return <QuoteCheckoutView />;
}
