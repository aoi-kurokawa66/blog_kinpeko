import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllBlogs, getBlogBySlug, type Blog } from "@/lib/microcms";

const DEFAULT_THUMBNAIL = "/images/fish/hero.webp";
const RELATED_POSTS_COUNT = 3;

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts.map((post) => ({ slug: post.slug }));
}

function getRelatedPosts(allPosts: Blog[], currentPost: Blog): Blog[] {
  const others = allPosts.filter((p) => p.slug !== currentPost.slug);
  if (currentPost.tags && currentPost.tags.length > 0) {
    const byTag = others.filter((p) =>
      p.tags?.some((t) => currentPost.tags!.includes(t))
    );
    if (byTag.length > 0) return byTag.slice(0, RELATED_POSTS_COUNT);
  }
  return others.slice(0, RELATED_POSTS_COUNT);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogBySlug(slug),
    getAllBlogs({ excludeCategory: "bloodline" }),
  ]);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(allPosts, post);
  const htmlContent = post.content;

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

          {/* 関連記事 */}
          {relatedPosts.length > 0 && (
            <div className="mt-10">
              <p className="text-[0.65rem] font-bold text-ink-muted tracking-[0.2em] uppercase mb-4">Related Posts</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group glass-card-hover overflow-hidden rounded-xl flex flex-col"
                  >
                    <div className="relative h-28 flex-shrink-0">
                      <Image
                        src={related.thumbnail || DEFAULT_THUMBNAIL}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/80 via-transparent to-transparent" />
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <time className="text-[0.55rem] text-ink-muted mb-1">
                        {new Date(related.date).toLocaleDateString("ja-JP", { year: "numeric", month: "short", day: "numeric" })}
                      </time>
                      <p className="text-xs font-semibold text-ink-primary group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2">
                        {related.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

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
