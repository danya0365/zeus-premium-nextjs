import { ProductDetailView } from "@/src/presentation/components/products/ProductDetailView";
import { createServerProductDetailPresenter } from "@/src/presentation/presenters/products/ProductDetailPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const presenter = createServerProductDetailPresenter();
  return presenter.generateMetadata(slug);
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const presenter = createServerProductDetailPresenter();

  try {
    const viewModel = await presenter.getViewModel(slug);
    if (!viewModel) return notFound();
    return <ProductDetailView viewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <Link
            href="/products"
            className="zeus-gradient-bg text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            กลับหน้าสินค้า
          </Link>
        </div>
      </div>
    );
  }
}
