import type { Metadata } from "next";
import { getPostBySlug } from "../../../lib/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kinpeko.example.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

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
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | キンペコ（L333）ブリード・血統・飼育記録`,
      description: post.excerpt,
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
