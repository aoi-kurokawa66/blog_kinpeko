import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ページヘッダー */}
      <section className="bg-ocean-800 py-10 md:py-14 border-b border-ocean-500/50">
        <div className="container mx-auto px-5 max-w-3xl">
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">About</p>
          <h1 className="text-2xl md:text-3xl font-bold text-ink-primary">自己紹介</h1>
          <p className="text-sm text-ink-muted mt-1">Abyssについて</p>
        </div>
      </section>

      {/* イントロ */}
      <section className="bg-ocean-900 py-10 md:py-14">
        <div className="container mx-auto px-5 max-w-3xl">
          <div className="glass-card p-6 md:p-8 space-y-4">
            <p className="text-sm md:text-base text-ink-secondary leading-relaxed">
              2024年3月に <span className="text-cyan-400 font-semibold">キンペコ（L333）</span>という美しい熱帯魚と出会い、飼育の世界に足を踏み入れました。
            </p>
            <p className="text-sm md:text-base text-ink-secondary leading-relaxed">
              日々の観察と記録を通じて、個体の成長や特徴を丁寧に把握し、血統の情報を可能な限り明確にしていくことが重要だと感じています。
            </p>
            <p className="text-sm md:text-base text-ink-secondary leading-relaxed">
              キンペコの世界をより多くの人に知っていただくため、ブリーダーを目指して情報発信とブリーディングに取り組んでいます。
            </p>
          </div>
        </div>
      </section>

      {/* 大事にしていること */}
      <section className="bg-ocean-800 py-10 md:py-14">
        <div className="container mx-auto px-5 max-w-3xl">
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">Philosophy</p>
          <h2 className="text-lg md:text-xl font-bold text-ink-primary mb-6">大事にしていること</h2>

          <div className="glass-card p-5 md:p-6 mb-5 border-l-2 border-cyan-400/50">
            <p className="text-sm text-ink-secondary leading-relaxed italic">
              「キンペコの魅力を知ってもらうための情報発信を徹底すること」
            </p>
          </div>

          <div className="space-y-3">
            {[
              "健康的な個体を繁殖するために適切な環境管理を徹底すること",
              "血統情報を可能な限り正確に記録し、透明性の高い情報発信を行うこと",
              "私自身が飼育を通じて、キンペコの魅力と可能性を追求し続けること",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 glass-card p-4">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2" />
                <p className="text-sm text-ink-secondary leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ストーリー */}
      <section className="bg-ocean-900 py-10 md:py-14">
        <div className="container mx-auto px-5 max-w-3xl">
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">Story</p>
          <h2 className="text-lg md:text-xl font-bold text-ink-primary mb-6">ストーリー</h2>

          <div className="relative pl-6 border-l border-ocean-500">
            {[
              { date: "2023年3月", text: "某店にてキンペコと偶然出会い、初めて飼育を始める" },
              { date: "2024年6月", text: "キンペコの魅力にハマり、什器水槽（多段水槽）を半自作・設置する" },
              { date: "2025年5月", text: "初めてのキンペコ繁殖を成功させる" },
              { date: "2025年9月", text: "キンペコ飼育に関するYouTube動画の投稿を始める" },
            ].map((item, i) => (
              <div key={i} className="relative mb-6 last:mb-0">
                <div className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full bg-ocean-600 border-2 border-cyan-400/60" />
                <time className="text-[0.6rem] text-ink-muted block mb-1">{item.date}</time>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* いまやっていること */}
      <section className="bg-ocean-800 py-10 md:py-14">
        <div className="container mx-auto px-5 max-w-3xl">
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">Now</p>
          <h2 className="text-lg md:text-xl font-bold text-ink-primary mb-4">いまやっていること</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-5">
            現在は、約2畳の専用スペースでキンペコの飼育を行っています。日々の観察と記録を大切にしながら、情報発信に力を入れています。
          </p>
          <div className="space-y-2.5">
            {[
              "血統管理と記録のシステム化",
              "個体の成長過程の写真とデータ収集",
              "情報発信とYouTube動画の投稿",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 glass-card p-3.5">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <p className="text-sm text-ink-secondary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SNS */}
      <section className="bg-ocean-900 py-10 md:py-14">
        <div className="container mx-auto px-5 max-w-3xl">
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">SNS</p>
          <h2 className="text-lg md:text-xl font-bold text-ink-primary mb-6">各種SNS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "https://www.youtube.com/@aquarium-abyss", label: "YouTube", bg: "from-red-600 to-red-700" },
              { href: "https://x.com/aquarium621", label: "X (Twitter)", bg: "from-gray-700 to-gray-900" },
              { href: "https://www.instagram.com/kinpeco_aquarium", label: "Instagram", bg: "from-purple-500 via-pink-500 to-orange-400" },
            ].map(({ href, label, bg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 p-3.5 bg-gradient-to-r ${bg} text-white rounded-xl text-sm font-bold hover:opacity-90 active:scale-95 transition-all`}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="mt-5 text-center">
            <Link href="/links" className="text-xs text-ink-muted hover:text-cyan-400 transition-colors">
              すべてのリンクを見る →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
