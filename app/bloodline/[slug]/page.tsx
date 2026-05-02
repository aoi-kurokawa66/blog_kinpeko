import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getAllBlogs, getBlogBySlug } from "@/lib/microcms";
import Breadcrumb from "@/app/components/Breadcrumb";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.abyss-kinpeko.com";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllBlogs({ category: "bloodline" });
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BloodlinePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const htmlContent = post.content;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Abyss",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Abyss",
      url: siteUrl,
    },
    url: `${siteUrl}/bloodline/${slug}`,
    ...(post.thumbnail && { image: post.thumbnail }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "血統紹介", item: `${siteUrl}/bloodline` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/bloodline/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen">
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ページヘッダー */}
      <section className="bg-ocean-800 py-10 md:py-14 border-b border-ocean-500/50">
        <div className="container mx-auto px-5 max-w-3xl">
          <Breadcrumb
            items={[
              { label: "ホーム", href: "/" },
              { label: "血統紹介", href: "/bloodline" },
              { label: post.title },
            ]}
          />
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">Bloodline Record</p>
          <time className="text-[0.6rem] text-ink-muted block mb-3">
            {new Date(post.date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <h1 className="text-xl md:text-2xl font-bold text-ink-primary leading-snug">{post.title}</h1>
        </div>
      </section>

      {/* 記事本文 */}
      <section className="bg-ocean-900 py-8 md:py-12">
        <div className="container mx-auto px-5 max-w-3xl">
          <div className="glass-card p-5 md:p-8">
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
          <div className="mt-8">
            <Link
              href="/bloodline"
              className="inline-flex items-center gap-1.5 text-ink-muted hover:text-cyan-400 text-xs font-medium transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              血統一覧に戻る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
