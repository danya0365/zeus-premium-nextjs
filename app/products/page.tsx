import { ProductsView } from "@/src/presentation/components/products/ProductsView";
import { createServerProductsPresenter } from "@/src/presentation/presenters/products/ProductsPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerProductsPresenter();
  return presenter.generateMetadata();
}

export default async function ProductsPage() {
  const presenter = createServerProductsPresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <ProductsView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching products data:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
            ไม่สามารถโหลดข้อมูลสินค้าได้
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
