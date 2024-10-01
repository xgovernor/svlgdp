"use client";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import { useLayout } from "@/store/layout";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "SVLGDP-Strategic Visualization Lab for Geographical Data and Parameters",
//   description: "A comprehensive GIS platform designed to analyze environmental data using open-source resources, starting with forest analysis and expanding to various geographical parameters. SVLGDP integrates multi-layer data visualization, offering insights into biodiversity, vegetation health, and land use changes, with a focus on scalability and real-time monitoring.",
//   applicationName: "SVLGDP",
//   authors: [{ name: "Abu Taher Muhammad", url: "https://at-mah.vercel.app" }],
//   keywords: "leaflet, map, gis, visualization, environmental data, geospatial, GIS, SVLGDP, SVLGDP-Strategic Visualization Lab for Geographical Data and Parameters",
//   referrer: "same-origin",
//   creator: "SVLGDP team",
//   publisher: "SVLGDP",
//   manifest: "/manifest.json",
//   openGraph: {
//     type: "website",
//     url: "https://svlgdp.vercel.app",
//     title: "SVLGDP",
//     description: "A scalable GIS platform for forest and environmental data analysis using open resources.",
//     siteName: "SVLGDP",
//     images: [{
//       url: "https://svlgdp.vercel.app/images/og.jpg",
//     }],
//   },
//   twitter: { card: "summary_large_image", site: "@site", creator: "@creator", "images": "https://svlgdp.vercel.app/images/og.jpg" },
//   verification: { google: "1234567890", yandex: "1234567890", "me": "1234567890" },
//   appleWebApp: { capable: true, title: "SVLGDP", statusBarStyle: "black-translucent" },
//   archives: "https://svlgdp.vercel.app/archives",
//   robots: "index, follow",
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/icons/48.png",
//     apple: "/icons/48.png",
//     other: {
//       rel: "icon",
//       sizes: "192x192",
//       url: "/icons/192.png",
//     },
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useLayout();

  return (
    <html lang="en" className={theme}>
      <body
        className={`${inter.className} antialiased  bg-[#1B1B1F]`}
      >
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
