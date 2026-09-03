import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Bossert Immobilien | Established expertise. Contemporary discretion.",
  description: "Bossert Immobilien — An independent real-estate house rooted in the Rhein-Main region, combining more than three decades of market knowledge with personal advisory and discretion.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Placeholder for The Seasons font — will be replaced with self-hosted @font-face
// once font files are placed in /public/fonts/
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-seasons",
  display: "swap",
});

import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable}`}>
        <LanguageProvider>
          <SmoothScroll>
            {children}
            {modal}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
