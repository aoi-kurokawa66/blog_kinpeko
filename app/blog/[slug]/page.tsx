import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getPostContentHTML } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const htmlContent = await getPostContentHTML(post.content);

  return (
    <div className="min-h-screen">
      {/* ページヘッダー */}
      <section className="bg-ocean-800 py-10 md:py-14 border-b border-ocean-500/50">
        <div className="container mx-auto px-5 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-ink-muted hover:text-cyan-400 text-xs font-medium mb-5 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ブログ一覧
          </Link>
          <div className="flex items-center gap-2 mb-3">
            {post.category && (
              <span className="text-[0.6rem] font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full tracking-wide">
                {post.category}
              </span>
            )}
            <time className="text-[0.6rem] text-ink-muted">
              {new Date(post.date).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
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
              href="/blog"
              className="inline-flex items-center gap-1.5 text-ink-muted hover:text-cyan-400 text-xs font-medium transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              ブログ一覧に戻る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
