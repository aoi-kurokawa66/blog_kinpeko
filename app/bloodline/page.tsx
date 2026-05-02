import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BloodlinePage() {
  const posts = getAllPosts("bloodline");

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

      {/* 血統一覧 */}
      <section className="bg-ocean-900 py-8 md:py-12">
        <div className="container mx-auto px-5 max-w-5xl">
          {posts.length > 0 ? (
            <div className="space-y-2.5">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/bloodline/${post.slug}`}
                  className="group flex items-start gap-4 glass-card-hover p-4 md:p-5"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-ocean-600 border border-ocean-500 flex items-center justify-center text-[0.6rem] font-bold text-ink-muted group-hover:border-cyan-400/40 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <time className="text-[0.6rem] text-ink-muted block mb-1.5">
                      {new Date(post.date).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <h3 className="text-sm md:text-[0.95rem] font-semibold text-ink-primary group-hover:text-cyan-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-xs text-ink-muted mt-1 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  <svg
                    className="flex-shrink-0 w-3.5 h-3.5 text-ink-muted group-hover:text-cyan-400 transition-colors mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center">
              <p className="text-ink-muted">まだ血統紹介がありません</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
