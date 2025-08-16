import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "@/components/footer/Footer";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { createClient } from "@/utils/supabase/server";
import UserProvider from "@/context/UserProvider";

// Use CSS variables for fonts to avoid build-time Google Fonts dependencies
const fontClasses = {
  montserrat: "font-montserrat",
  sans: "font-sans",
  ubuntu: "font-ubuntu",
};

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
        className={`${fontClasses.montserrat} ${fontClasses.ubuntu} bg-background-dark 
          ${cn("min-h-screen bg-background font-sans antialiased")}`}
        style={{
          fontFamily: "Montserrat, system-ui, sans-serif",
        }}
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
