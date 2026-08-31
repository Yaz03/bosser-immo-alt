import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Bossert Immobilien | Premium Real Estate Rhein-Main",
  description: "Bossert Immobilien — Discretion and precision in every transaction. Premium residential real estate in the Rhein-Main region since 1991.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";
import Providers from "@/app/providers";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrumentSerif.variable}`}>
        <Providers>
          <LanguageProvider>
            <SmoothScroll>
              {children}
              {modal}
            </SmoothScroll>
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}

