import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="min-h-screen">

      {/* ─── ヒーロー ─── */}
      <section className="relative h-[88svh] md:h-[82vh] min-h-[520px] flex items-end overflow-hidden mt-14 md:mt-0">
        <Image
          src="/images/fish/hero.webp"
          alt="キンペコ（L333）成魚"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-overlay-mobile md:hidden" />
        <div className="absolute inset-0 hero-overlay hidden md:block" />

        {/* ヒーローテキスト */}
        <div className="relative z-10 w-full px-5 pb-12 md:px-16 md:pb-20 max-w-3xl">
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.25em] uppercase mb-3">
            L333 Breeder — Abyss
          </p>
          <h1 className="text-[2.2rem] md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-4">
            実体験と記録で語る、<br />
            <span className="text-cyan-gold">キンペコ繁殖日記</span>
          </h1>
          <p className="text-sm md:text-base text-white/60 leading-relaxed mb-7 max-w-lg">
            キンペコ（L333）の血統・飼育環境・繁殖記録を発信する個人サイト
          </p>
          <div className="flex gap-3">
            <Link
              href="/blog"
              className="px-6 py-2.5 bg-cyan-400 text-ocean-900 rounded-full text-sm font-bold hover:bg-cyan-300 active:scale-95 transition-all"
            >
              ブログを読む
            </Link>
            <Link
              href="/bloodline"
              className="px-6 py-2.5 rounded-full text-sm font-medium text-white border border-white/20 hover:border-white/40 hover:bg-white/10 active:scale-95 transition-all"
              style={{ backdropFilter: "blur(8px)" }}
            >
              血統を見る
            </Link>
          </div>
        </div>

        {/* スクロールヒント */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-40">
          <span className="text-white text-[0.6rem] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/50 animate-pulse" />
        </div>
      </section>

      {/* ─── Bento Grid ─── */}
      <section className="bg-ocean-800 py-8 md:py-14 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">

          {/* モバイル: 縦積み / デスクトップ: Bento */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[200px]">

            {/* 血統: 大カード（画像背景） col-span-2 row-span-2 */}
            <Link
              href="/bloodline"
              className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl group"
            >
              <Image
                src="/images/fish/tank.webp"
                alt="キンペコ水槽"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/90 via-ocean-900/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 md:p-7">
                <span className="text-cyan-400 text-[0.6rem] font-bold tracking-[0.2em] uppercase">Bloodline</span>
                <h2 className="text-xl md:text-3xl font-bold text-white mt-1 mb-2 leading-tight">
                  血統紹介
                </h2>
                <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-xs hidden md:block">
                  キンペコ（L333）の血統情報を整理して発信しています
                </p>
                <span className="inline-flex items-center gap-1.5 mt-3 text-cyan-400 text-xs font-semibold">
                  詳しく見る
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* 飼育環境: 小カード */}
            <Link
              href="/environment"
              className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl group glass-card-hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-300/10 to-transparent" />
              <div className="relative h-full flex flex-col justify-between p-4">
                <span className="text-gold-300 text-[0.55rem] font-bold tracking-[0.2em] uppercase">Environment</span>
                <div>
                  <h2 className="text-base md:text-lg font-bold text-white mb-1">飼育環境</h2>
                  <p className="text-white/50 text-[0.65rem] leading-relaxed hidden md:block">
                    約2畳の専用水槽部屋
                  </p>
                </div>
              </div>
            </Link>

            {/* 自己紹介: 小カード */}
            <Link
              href="/about"
              className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl group glass-card-hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/8 to-transparent" />
              <div className="relative h-full flex flex-col justify-between p-4">
                <span className="text-cyan-400 text-[0.55rem] font-bold tracking-[0.2em] uppercase">About</span>
                <div>
                  <h2 className="text-base md:text-lg font-bold text-white mb-1">自己紹介</h2>
                  <p className="text-white/50 text-[0.65rem] leading-relaxed hidden md:block">
                    Abyssについて
                  </p>
                </div>
              </div>
            </Link>

            {/* ブログ: 横長カード（画像背景） col-span-2 */}
            <Link
              href="/blog"
              className="col-span-2 md:col-span-3 row-span-1 relative overflow-hidden rounded-2xl group"
            >
              <Image
                src="/images/fish/juveniles.webp"
                alt="稚魚"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/90 via-ocean-900/70 to-ocean-900/30" />
              <div className="relative h-full flex items-center px-5 md:px-8 gap-4">
                <div className="flex-1">
                  <span className="text-cyan-400 text-[0.6rem] font-bold tracking-[0.2em] uppercase">Blog</span>
                  <h2 className="text-lg md:text-2xl font-bold text-white mt-0.5">
                    繁殖日記・飼育記録
                  </h2>
                  <p className="text-white/50 text-xs mt-1 hidden md:block">
                    孵化から育成まで、実体験にもとづいた記録を公開中
                  </p>
                </div>
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center group-hover:bg-cyan-400/25 transition-colors">
                  <svg className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ─── 最新記事 ─── */}
      <section className="bg-ocean-900 py-10 md:py-16">
        <div className="container mx-auto px-5 max-w-5xl">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-1.5">Latest Posts</p>
              <h2 className="text-xl font-bold text-ink-primary">最新記事</h2>
            </div>
            <Link
              href="/blog"
              className="text-xs text-ink-muted hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              すべて見る
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-4 glass-card-hover p-4"
              >
                {/* 番号 */}
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-ocean-600 border border-ocean-500 flex items-center justify-center text-[0.6rem] font-bold text-ink-muted group-hover:border-cyan-400/40 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
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
                  <h3 className="text-sm md:text-[0.95rem] font-semibold text-ink-primary group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </div>

                <svg className="flex-shrink-0 w-3.5 h-3.5 text-ink-muted group-hover:text-cyan-400 transition-colors mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
