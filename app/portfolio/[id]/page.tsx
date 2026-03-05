import { seoConfig } from "@/src/config/seo.config";
import { PortfolioDetailView } from "@/src/presentation/components/portfolio/PortfolioDetailView";
import { createServerPortfolioDetailPresenter } from "@/src/presentation/presenters/portfolio/PortfolioDetailPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface PortfolioDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({
  params,
}: PortfolioDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const presenter = createServerPortfolioDetailPresenter();

  try {
    return await presenter.generateMetadata(resolvedParams.id);
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: seoConfig.portfolio.title,
      description: seoConfig.portfolio.description,
    };
  }
}

/**
 * Portfolio Detail page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const resolvedParams = await params;
  const presenter = createServerPortfolioDetailPresenter();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel(resolvedParams.id);
    if (!viewModel) return notFound();

    return (
      <PortfolioDetailView viewModel={viewModel} />
    );
  } catch (error) {
    console.error("Error fetching portfolio detail:", error);

    // Fallback UI
    return (
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
            ไม่สามารถโหลดข้อมูลรายละเอียดผลงานได้
          </p>
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
