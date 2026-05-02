import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/blog";
import BlogSearch from "@/app/components/BlogSearch";

const DEFAULT_THUMBNAIL = "/images/fish/hero.webp";

function getTagsFromPosts(posts: ReturnType<typeof getAllPosts>): string[] {
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags?.forEach((t) => t && tagSet.add(t)));
  return Array.from(tagSet).slice(0, 10);
}

interface Props {
  searchParams: Promise<{ q?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { q = "", tag = "" } = await searchParams;

  const allPosts = getAllPosts(undefined, "bloodline");
  const allTags = getTagsFromPosts(allPosts);

  const posts = allPosts.filter((post) => {
    const matchesQuery =
      !q ||
      post.title.toLowerCase().includes(q.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(q.toLowerCase());
    const matchesTag = !tag || post.tags?.includes(tag);
    return matchesQuery && matchesTag;
  });

  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen">
      {/* ページヘッダー */}
      <section className="bg-ocean-800 py-10 md:py-14 border-b border-ocean-500/50">
        <div className="container mx-auto px-5 max-w-5xl">
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">Blog</p>
          <h1 className="text-2xl md:text-3xl font-bold text-ink-primary">ブログ</h1>
          <p className="text-sm text-ink-muted mt-1">日々の育成状況・繁殖記録を更新しています</p>
        </div>
      </section>

      <section className="bg-ocean-900 py-8 md:py-12">
        <div className="container mx-auto px-5 max-w-5xl">

          {/* 検索・タグフィルター */}
          <Suspense>
            <BlogSearch allTags={allTags} currentQuery={q} currentTag={tag} />
          </Suspense>

          {posts.length === 0 ? (
            <div className="glass-card p-10 text-center">
              <p className="text-ink-muted text-sm">「{q || tag}」に一致する記事が見つかりません</p>
            </div>
          ) : (
            <>
              {/* フィーチャーカード（最新1件・大） */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block glass-card-hover overflow-hidden rounded-2xl mb-5"
                >
                  <div className="md:flex">
                    <div className="relative w-full md:w-72 lg:w-80 flex-shrink-0 h-48 md:h-auto">
                      <Image
                        src={featured.thumbnail || DEFAULT_THUMBNAIL}
                        alt={featured.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ocean-900/70 via-transparent to-transparent" />
                    </div>
                    <div className="p-5 md:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[0.55rem] font-bold text-gold-300 bg-gold-300/10 px-2 py-0.5 rounded-full tracking-wide border border-gold-300/20">
                            LATEST
                          </span>
                          {featured.category && (
                            <span className="text-[0.6rem] font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full tracking-wide">
                              {featured.category}
                            </span>
                          )}
                          <time className="text-[0.6rem] text-ink-muted">
                            {new Date(featured.date).toLocaleDateString("ja-JP", { year: "numeric", month: "short", day: "numeric" })}
                          </time>
                        </div>
                        <h2 className="text-base md:text-lg font-bold text-ink-primary group-hover:text-cyan-400 transition-colors leading-snug mb-2">
                          {featured.title}
                        </h2>
                        <p className="text-xs text-ink-muted leading-relaxed line-clamp-3">{featured.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-4 text-cyan-400 text-xs font-semibold">
                        続きを読む
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* カードグリッド */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rest.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group glass-card-hover overflow-hidden rounded-2xl flex flex-col"
                    >
                      {/* サムネ */}
                      <div className="relative h-40 flex-shrink-0">
                        <Image
                          src={post.thumbnail || DEFAULT_THUMBNAIL}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/80 via-transparent to-transparent" />
                        {post.category && (
                          <span className="absolute top-3 left-3 text-[0.55rem] font-bold text-cyan-400 bg-ocean-900/80 backdrop-blur-sm px-2 py-0.5 rounded-full tracking-wide border border-cyan-400/20">
                            {post.category}
                          </span>
                        )}
                      </div>

                      {/* テキスト */}
                      <div className="p-4 flex flex-col flex-1">
                        <time className="text-[0.6rem] text-ink-muted mb-1.5">
                          {new Date(post.date).toLocaleDateString("ja-JP", { year: "numeric", month: "short", day: "numeric" })}
                        </time>
                        <h3 className="text-sm font-semibold text-ink-primary group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2 flex-1">
                          {post.title}
                        </h3>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2.5">
                            {post.tags.slice(0, 3).map((t) => (
                              <span key={t} className="text-[0.55rem] text-ink-muted bg-ocean-600 px-1.5 py-0.5 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <p className="text-center text-[0.65rem] text-ink-muted mt-6">
                {posts.length} 件の記事
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
