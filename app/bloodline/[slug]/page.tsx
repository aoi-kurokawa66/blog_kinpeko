import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogs, getBlogBySlug } from "@/lib/microcms";

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

  return (
    <div className="min-h-screen">
      {/* ページヘッダー */}
      <section className="bg-ocean-800 py-10 md:py-14 border-b border-ocean-500/50">
        <div className="container mx-auto px-5 max-w-3xl">
          <Link
            href="/bloodline"
            className="inline-flex items-center gap-1.5 text-ink-muted hover:text-cyan-400 text-xs font-medium mb-5 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            血統一覧
          </Link>
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
