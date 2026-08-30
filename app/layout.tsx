import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito, Noto_Sans_Arabic } from "next/font/google";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppNav } from "@/components/layout/AppNav";
import { ProgressProvider } from "@/components/progress/ProgressProvider";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://manar-learning.vercel.app"
  ),
  title: "MANĀR — A Beacon for Learning",
  description:
    "MANĀR is a modern learning app for children to explore English, Arabic, reading and mathematics.",
  applicationName: "MANĀR",
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "MANĀR",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/brand/favicon.ico", sizes: "48x48" },
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      {
        url: "/brand/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/brand/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/brand/favicon.ico"],
  },
  openGraph: {
    title: "MANĀR — A Beacon for Learning",
    description:
      "MANĀR is a modern learning app for children to explore English, Arabic, reading and mathematics.",
    siteName: "MANĀR",
    images: [{ url: "/brand/manar-og.jpg", width: 1200, height: 630, alt: "MANĀR logo" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MANĀR — A Beacon for Learning",
    description:
      "MANĀR is a modern learning app for children to explore English, Arabic, reading and mathematics.",
    images: ["/brand/manar-og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#073B3A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${fraunces.variable} ${notoArabic.variable} h-full antialiased`}
    >
      <body className="manar-atmosphere flex min-h-full flex-col font-sans text-manar-charcoal">
        <ProgressProvider>
          <AppHeader />
          <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-28 pt-4 sm:px-6 md:pb-12">
            {children}
          </main>
          <AppNav variant="bottom" />
        </ProgressProvider>
      </body>
    </html>
  );
}
