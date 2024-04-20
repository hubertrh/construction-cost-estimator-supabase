import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Montserrat, Ubuntu } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "@/components/footer/Footer";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});
const fontSans = Montserrat({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
const ubuntu = Ubuntu({
  weight: ["300", "400"],
  variable: "--font-ubuntu",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CostCraft",
  description: "Construction Cost Estimator by Constructive Creativity.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} ${ubuntu.variable} bg-background-dark 
          ${cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}`}
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
        <Toaster />
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
