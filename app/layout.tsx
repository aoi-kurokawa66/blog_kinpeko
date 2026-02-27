import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoogleAnalytics from "./components/GoogleAnalytics";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kinpeko.example.com";

export const metadata: Metadata = {
  title: {
    default: "キンペコ（L333）ブリード・血統・飼育記録",
    template: "%s｜キンペコ（L333）ブリード記録",
  },
  description: "キンペコ（L333）の血統紹介、飼育環境、繁殖・育成の記録をまとめた個人サイト。",
  icons: {
    icon: "/images/logo/favicon.ico",
    apple: "/images/logo/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "キンペコ（L333）ブリード記録",
    title: "キンペコ（L333）ブリード・血統・飼育記録",
    description: "キンペコ（L333）の血統紹介、飼育環境、繁殖・育成の記録をまとめた個人サイト。",
    images: [
      {
        url: `${siteUrl}/images/logo/logo_side.png`,
        width: 1536,
        height: 1024,
        alt: "キンペコ（L333）ブリード記録",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "キンペコ（L333）ブリード・血統・飼育記録",
    description: "キンペコ（L333）の血統紹介、飼育環境、繁殖・育成の記録をまとめた個人サイト。",
    images: [`${siteUrl}/images/logo/logo_side.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kinpeko.example.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Abyss（キンペコL333ブリーダー）",
    description: "キンペコ（L333）の血統紹介、飼育環境、繁殖・育成の記録をまとめた個人サイト。",
    url: siteUrl,
    sameAs: [
      "https://x.com/aquarium621",
      "https://www.instagram.com/kinpeco_aquarium",
      "https://www.youtube.com/@aquarium-abyss",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Abyss（キンペコL333ブリーダー）",
    url: siteUrl,
      description: "キンペコ（L333）の血統紹介、飼育環境、繁殖・育成の記録をまとめた個人サイト。",
  };

  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notoSansJP.variable} font-sans flex flex-col min-h-screen`}>
        <GoogleAnalytics />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}