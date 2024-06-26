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
import { createClient } from "@/utils/supabase/server";
import UserProvider from "@/context/UserProvider";

const montserrat = Montserrat({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});
const fontSans = Montserrat({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
const ubuntu = Ubuntu({
  weight: ["300", "400", "500"],
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
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body
        className={`${montserrat.className} ${ubuntu.variable} bg-background-dark 
          ${cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}`}
      >
        <UserProvider userData={userData}>
          <NextTopLoader
            color="#D19130"
            height={5}
            initialPosition={0.2}
            easing="ease"
            speed={500}
          />
          <Sidebar />
          <main className="grid min-h-dvh place-items-center bg-background py-[10dvh] transition-all duration-200">
            <div className="main-darker relative bg-background-light px-8 py-12 text-center transition-all lg:px-16">
              {children}
            </div>
          </main>
          <Toaster />
          <Footer />
          <Analytics />
          <SpeedInsights />
        </UserProvider>
      </body>
    </html>
  );
}
