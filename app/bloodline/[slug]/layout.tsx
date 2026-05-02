import type { Metadata } from "next";
import { getBlogBySlug } from "../../../lib/microcms";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.abyss-kinpeko.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "血統紹介が見つかりません",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | キンペコ（L333）ブリード・血統・飼育記録`,
      description: post.excerpt,
      url: `${siteUrl}/bloodline/${slug}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: post.thumbnail ? [{ url: `${siteUrl}${post.thumbnail}`, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | キンペコ（L333）ブリード・血統・飼育記録`,
      description: post.excerpt,
      images: post.thumbnail ? [`${siteUrl}${post.thumbnail}`] : undefined,
    },
  };
}

export default function BloodlinePostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
