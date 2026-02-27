import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kinpeko.example.com";

export const metadata: Metadata = {
  title: "購入方法",
  description: "私のブリードしたキンペコの購入方法をご案内いたします",
  openGraph: {
    title: "購入方法 | キンペコ（L333）ブリード・血統・飼育記録",
    description: "私のブリードしたキンペコの購入方法をご案内いたします",
    url: `${siteUrl}/purchase`,
  },
  twitter: {
    card: "summary_large_image",
    title: "購入方法 | キンペコ（L333）ブリード・血統・飼育記録",
    description: "私のブリードしたキンペコの購入方法をご案内いたします",
  },
};

export default function PurchaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
