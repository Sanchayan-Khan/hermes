// import type React from "react";
// import type { Metadata } from "next";
// import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
// import Navigation from "@/components/navigation";
// import { Montserrat } from "next/font/google";
// import LoadingProvider from "@/components/loading-provider";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   variable: "--font-montserrat",
// });

// export const metadata: Metadata = {
//   title: "Hermes | Travel Journal & Postcards",
//   description:
//     "Document your travels with a beautiful scrapbook-inspired journal",
//   generator: "v0.dev",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={montserrat.variable} suppressHydrationWarning>
//       <body className="font-sans">
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="light"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <LoadingProvider>
//             <div className="min-h-screen bg-texture transition-colors duration-300">
//               <Navigation />
//               <main>{children}</main>
//             </div>
//           </LoadingProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation-1";
import { Montserrat } from "next/font/google";
import LoadingProvider from "@/components/loading-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Hermes | Travel Journal & Postcards",
  description:
    "Document your travels with a beautiful scrapbook-inspired journal",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
            <div className="min-h-screen bg-texture transition-colors duration-300">
              {/* single, global nav */}
              <Navigation />

              {/* all page content */}
              <main>{children}</main>
            </div>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
