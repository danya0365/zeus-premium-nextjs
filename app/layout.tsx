import "@/public/styles/index.css";
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
  title: "Zeus Premium | รับผลิตของพรีเมียมครบวงจร",
  description:
    "รับผลิตของพรีเมียมครบวงจร คุณภาพสูง ดีไซน์ทันสมัย ใส่ใจทุกรายละเอียดตั้งแต่การออกแบบจนถึงการส่งมอบ",
  keywords: [
    "ของพรีเมียม",
    "สินค้าพรีเมียม",
    "ของแจก",
    "กระเป๋าผ้า",
    "พัดพลาสติก",
    "หมวก",
    "เสื้อ",
    "Zeus Premium",
  ],
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
