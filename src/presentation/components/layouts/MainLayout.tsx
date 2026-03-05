"use client";

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
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col zeus-grid-bg">
      <Header />
      <main className="flex-1 pt-16 sm:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
