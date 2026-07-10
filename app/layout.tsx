import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sfPro = localFont({
  src: [
    { path: "./fonts/SFProDisplay-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/SFProDisplay-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/SFProDisplay-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-sf-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Precision Standard™ | Ger’Quia Abner",
  description: "An independent conceptual brand and marketing exploration for Precision Management by Ger’Quia Abner.",
  robots: "noindex, nofollow",
};

import SmoothScroll from "./components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sfPro.variable}>
      <body className="antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
