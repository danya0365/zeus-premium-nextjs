import { ContactView } from "@/src/presentation/components/contact/ContactView";
import { createServerContactPresenter } from "@/src/presentation/presenters/contact/ContactPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerContactPresenter();
  return presenter.generateMetadata();
}

export default async function ContactPage() {
  const presenter = createServerContactPresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <ContactView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <Link
            href="/"
            className="zeus-gradient-bg text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    );
  }
}
