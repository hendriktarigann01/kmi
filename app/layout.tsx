import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://envsn.asia",
  ),
  title: "Envision - Digital Display Solutions",
  description:
    "Envision delivers premium digital display solutions for corporate, retail, and government projects across Indonesia.",
  keywords: [
    "digital display",
    "LED display",
    "LCD display",
    "Envision",
    "display solutions",
  ],
  authors: [{ name: "Envision" }],
  openGraph: {
    title: "Envision - Digital Display Solutions",
    description:
      "Envision delivers premium digital display solutions for corporate, retail, and government projects across Indonesia.",
    url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://envsn.asia",
    siteName: "Envision",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
