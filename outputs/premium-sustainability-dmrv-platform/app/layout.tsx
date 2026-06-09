import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { Providers } from "@/providers";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Carbon Nexus",
    template: "%s | Carbon Nexus"
  },
  description: "Premium sustainability, ESG, carbon credit, and dMRV platform prototype.",
  applicationName: "Carbon Nexus",
  authors: [{ name: "Carbon Nexus" }],
  creator: "Carbon Nexus",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : new URL("http://localhost:3000"),
  openGraph: {
    title: "Carbon Nexus",
    description: "Premium sustainability, ESG, carbon credit, and dMRV platform prototype.",
    type: "website",
    images: ["/brandmark.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Carbon Nexus",
    description: "Premium sustainability, ESG, carbon credit, and dMRV platform prototype.",
    images: ["/brandmark.svg"]
  },
  icons: {
    icon: "/brandmark.svg",
    shortcut: "/brandmark.svg",
    apple: "/brandmark.svg"
  },
  themeColor: "#9333ea"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
