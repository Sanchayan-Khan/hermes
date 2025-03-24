import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hermes | Travel Journal & Postcards",
  description:
    "Document your travels with a beautiful scrapbook-inspired journal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-[#f9f7f2] dark:bg-[#2a2522] transition-colors duration-300">
          <Navigation />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
