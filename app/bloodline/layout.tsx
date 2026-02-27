import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kinpeko.example.com";

export const metadata: Metadata = {
  title: "血統紹介",
  description: "ブリードした個体の血統情報、特徴、こだわりポイントを詳しくご紹介します",
  openGraph: {
    title: "血統紹介 | キンペコ（L333）ブリード・血統・飼育記録",
    description: "ブリードした個体の血統情報、特徴、こだわりポイントを詳しくご紹介します",
    url: `${siteUrl}/bloodline`,
  },
  twitter: {
    card: "summary_large_image",
    title: "血統紹介 | キンペコ（L333）ブリード・血統・飼育記録",
    description: "ブリードした個体の血統情報、特徴、こだわりポイントを詳しくご紹介します",
  },
};

export default function BloodlineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
