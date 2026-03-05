import { seoConfig } from "@/src/config/seo.config";
import { PortfolioView } from "@/src/presentation/components/portfolio/PortfolioView";
import { createServerPortfolioPresenter } from "@/src/presentation/presenters/portfolio/PortfolioPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface PortfolioPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerPortfolioPresenter();

  try {
    return presenter.generateMetadata();
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
 * Portfolio page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const presenter = createServerPortfolioPresenter();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return <PortfolioView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching portfolio data:", error);

    // Fallback UI
    return (
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
            ไม่สามารถโหลดข้อมูลผลงานได้
          </p>
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
