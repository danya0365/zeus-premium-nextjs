import { StaticCompanyInfoRepository } from "@/src/infrastructure/repositories/static/StaticCompanyInfoRepository";
import { StaticProductCategoryRepository } from "@/src/infrastructure/repositories/static/StaticProductCategoryRepository";
import { Footer } from "@/src/presentation/components/layouts/Footer";
import { Header } from "@/src/presentation/components/layouts/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout
 * Root layout with Header, content area, and Footer
 * Uses the Zeus grid background pattern
 */
export async function MainLayout({ children }: MainLayoutProps) {
  const companyInfoRepo = new StaticCompanyInfoRepository();
  const companyInfo = await companyInfoRepo.getInfo();

  const productCategoryRepo = new StaticProductCategoryRepository();
  const featuredCategories = await productCategoryRepo.getFeatured();
  const allActiveCategories = await productCategoryRepo.getActive();
  
  // Combine featured first, then backfill with active, removing duplicates
  const combinedCategories = [
    ...featuredCategories,
    ...allActiveCategories.filter(
      (activeCat) => !featuredCategories.some((featuredCat) => featuredCat.id === activeCat.id)
    )
  ];

  return (
    <div className="min-h-screen flex flex-col zeus-grid-bg">
      <Header />
      <main className="flex-1 pt-16 sm:pt-20">{children}</main>
      <Footer companyInfo={companyInfo} productCategories={combinedCategories} />
    </div>
  );
}
