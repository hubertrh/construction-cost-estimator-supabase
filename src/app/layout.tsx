import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Montserrat, Ubuntu } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/organisms/Sidebar";
 
const montserrat = Montserrat({
  weight: ["200", "300", "400"],
  variable: "--font-montserrat",
  subsets: ["latin"],
});
const ubuntu = Ubuntu({ weight: ["300", "400"], variable: "--font-ubuntu", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Construction Cost Estimator - Kamil Woźniacki",
  description:
    "Online estimator for my clients to accurately calculate construction project costs. Enter the details and get a PDF estimate.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
          <Sidebar />
          <main className="min-h-dvh ml-[22vw] p-[10dvh] grid place-items-center">
            <div className="max-w-[65vw] bg-background-light px-20 py-12 text-center">
              {children}
            </div>
          </main>
          {/* {!session ? <LoginBtn /> : <Home />} */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
