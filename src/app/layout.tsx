import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Montserrat, Ubuntu } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/organisms/Sidebar";
import Footer from "@/components/organisms/Footer";

const montserrat = Montserrat({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});
const ubuntu = Ubuntu({
  weight: ["300", "400"],
  variable: "--font-ubuntu",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Construction Cost Estimator - Kamil Woźniacki",
  description:
    "Online estimator for my clients to accurately calculate construction project costs. Enter the details and get a PDF estimate.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${ubuntu.variable}`}>
        <Sidebar />
        <main className="ml-[22vw] grid min-h-dvh place-items-center p-[10dvh]">
          <div className="max-w-[65vw] bg-background-light px-20 py-12 text-center">
            {children}
          </div>
        </main>
        <Footer />
        {/* {!session ? <LoginBtn /> : <Home />} */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
