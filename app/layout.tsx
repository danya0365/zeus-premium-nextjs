import "@/public/styles/index.css";
import { seoConfig, siteConfig } from "@/src/config/seo.config";
import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { ThemeProvider } from "@/src/presentation/components/providers/ThemeProvider";
import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-noto-sans-thai",
});

export const metadata: Metadata = {
  metadataBase: siteConfig.metadataBase,
  title: seoConfig.default.title,
  description: seoConfig.default.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: seoConfig.default.title,
    description: seoConfig.default.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.default.title,
    description: seoConfig.default.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${notoSansThai.className} antialiased`}>
        <ThemeProvider>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
