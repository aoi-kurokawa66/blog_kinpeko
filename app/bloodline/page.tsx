import Link from "next/link";
import Image from "next/image";
import { getAllBlogs } from "@/lib/microcms";

export const revalidate = 60;

export default async function BloodlinePage() {
  const posts = await getAllBlogs({ category: "bloodline" });

  return (
    <div className="min-h-screen">
      {/* ページヘッダー */}
      <section className="bg-ocean-800 py-10 md:py-14 border-b border-ocean-500/50">
        <div className="container mx-auto px-5 max-w-5xl">
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">Bloodline</p>
          <h1 className="text-2xl md:text-3xl font-bold text-ink-primary">血統紹介</h1>
          <p className="text-sm text-ink-muted mt-1">ブリードした個体の血統情報と特徴を詳しくご紹介します</p>
        </div>
      </section>

      <section className="bg-ocean-900 py-8 md:py-12">
        <div className="container mx-auto px-5 max-w-5xl">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/bloodline/${post.slug}`}
                  className="group glass-card-hover overflow-hidden rounded-2xl flex flex-col"
                >
                  {/* サムネ */}
                  <div className="relative h-48">
                    <Image
                      src={post.thumbnail || "/images/fish/tank.webp"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/90 via-ocean-900/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <span className="text-[0.55rem] font-bold text-cyan-400 bg-ocean-900/80 backdrop-blur-sm px-2 py-0.5 rounded-full tracking-wide border border-cyan-400/20">
                        Bloodline
                      </span>
                    </div>
                  </div>

                  {/* テキスト */}
                  <div className="p-5 flex flex-col flex-1">
                    <time className="text-[0.6rem] text-ink-muted mb-1.5">
                      {new Date(post.date).toLocaleDateString("ja-JP", { year: "numeric", month: "short", day: "numeric" })}
                    </time>
                    <h3 className="text-base font-bold text-ink-primary group-hover:text-cyan-400 transition-colors leading-snug mb-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-xs text-ink-muted leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                    )}
                    <div className="flex items-center gap-1.5 mt-4 text-cyan-400 text-xs font-semibold">
                      詳しく見る
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass-card p-10 text-center">
              <p className="text-ink-muted text-sm">まだ血統紹介がありません</p>
            </div>
          )}
        </div>
      </section>

      {/* 血統DB誘導 */}
      <section className="bg-ocean-800 py-10 md:py-14 border-t border-ocean-500/50">
        <div className="container mx-auto px-5 max-w-5xl">
          <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border border-gold-300/20 bg-gradient-to-br from-gold-300/5 to-transparent">
            <div>
              <p className="text-gold-300 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">Blood DB</p>
              <h2 className="text-lg md:text-xl font-bold text-ink-primary mb-1.5">キンペコ血統DBで詳細を調べる</h2>
              <p className="text-sm text-ink-muted leading-relaxed max-w-lg">
                血統情報の共有プラットフォームで、より詳細な血統データや他のブリーダーの情報を確認できます。
              </p>
            </div>
            <a
              href="https://db.abyss-kinpeko.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-gold-300/15 border border-gold-300/30 text-gold-300 rounded-full text-sm font-bold hover:bg-gold-300/25 transition-all"
            >
              血統DBを開く
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
