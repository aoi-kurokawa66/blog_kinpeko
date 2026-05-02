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
      title: "記事が見つかりません",
    };
  }

  const thumbnailUrl = post.thumbnail
    ? post.thumbnail.startsWith("http")
      ? post.thumbnail
      : `${siteUrl}${post.thumbnail}`
    : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | キンペコ（L333）ブリード・血統・飼育記録`,
      description: post.excerpt,
      url: `${siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: thumbnailUrl ? [{ url: thumbnailUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | キンペコ（L333）ブリード・血統・飼育記録`,
      description: post.excerpt,
      images: thumbnailUrl ? [thumbnailUrl] : undefined,
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
