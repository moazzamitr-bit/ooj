import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { AppProvider } from "@/providers/app-provider";
import { CampaignOverlays } from "@/components/campaign/campaign-overlays";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "اوج | پلتفرم هوشمند کنکور",
  description: "پلتفرم آموزشی هوشمند برای دانش‌آموزان کنکوری و والدین",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-primary-deep">
        <AppProvider>
          {children}
          <CampaignOverlays />
        </AppProvider>
      </body>
    </html>
  );
}
