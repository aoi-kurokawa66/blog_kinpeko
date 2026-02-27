import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kinpeko.example.com";

export const metadata: Metadata = {
  title: "飼育環境",
  description: "キンペコが健やかに育つ飼育環境づくりと日々の管理についてご紹介します",
  openGraph: {
    title: "飼育環境 | キンペコ（L333）ブリード・血統・飼育記録",
    description: "キンペコが健やかに育つ飼育環境づくりと日々の管理についてご紹介します",
    url: `${siteUrl}/environment`,
  },
  twitter: {
    card: "summary_large_image",
    title: "飼育環境 | キンペコ（L333）ブリード・血統・飼育記録",
    description: "キンペコが健やかに育つ飼育環境づくりと日々の管理についてご紹介します",
  },
};

export default function EnvironmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
