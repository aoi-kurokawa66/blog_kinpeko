import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kinpeko.example.com";

export const metadata: Metadata = {
  title: "ブログ",
  description: "日々の育成状況、成長状況の記録を更新しています",
  openGraph: {
    title: "ブログ | キンペコ（L333）ブリード・血統・飼育記録",
    description: "日々の育成状況、成長状況の記録を更新しています",
    url: `${siteUrl}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "ブログ | キンペコ（L333）ブリード・血統・飼育記録",
    description: "日々の育成状況、成長状況の記録を更新しています",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
