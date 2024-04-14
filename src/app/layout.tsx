import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Montserrat, Ubuntu } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "@/components/footer/Footer";

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
      <body
        className={`${montserrat.className} ${ubuntu.variable} bg-background-dark`}
      >
        <NextTopLoader
          color="#D68B1A"
          height={5}
          initialPosition={0.2}
          easing="ease"
          speed={500}
        />
        <Sidebar />
        <main className="grid min-h-dvh place-items-center bg-background p-[10dvh] transition-all duration-200">
          <div className="max-w-[65vw] bg-background-light px-8 py-12 text-center lg:px-20">
            {children}
          </div>
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
