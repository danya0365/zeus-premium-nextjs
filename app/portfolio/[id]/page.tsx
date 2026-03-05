import { PortfolioDetailView } from "@/src/presentation/components/portfolio/PortfolioDetailView";
import { PortfolioDetailPresenter } from "@/src/presentation/presenters/portfolio/PortfolioDetailPresenter";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const presenter = new PortfolioDetailPresenter();
  return presenter.generateMetadata(id);
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params;
  const presenter = new PortfolioDetailPresenter();

  try {
    const viewModel = await presenter.getViewModel(id);
    if (!viewModel) return notFound();
    return <PortfolioDetailView viewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching portfolio detail:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <Link
            href="/portfolio"
            className="zeus-gradient-bg text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            กลับหน้าผลงาน
          </Link>
        </div>
      </div>
    );
  }
}
