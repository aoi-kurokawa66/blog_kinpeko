const links = [
  {
    title: "YouTube",
    url: "https://www.youtube.com/@aquarium-abyss",
    description: "キンペコの動画コンテンツを配信しています",
    category: "SNS",
  },
  {
    title: "X (Twitter)",
    url: "https://x.com/aquarium621",
    description: "最新情報や日常の様子をツイートしています",
    category: "SNS",
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/kinpeco_aquarium",
    description: "キンペコの写真や動画を投稿しています",
    category: "SNS",
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen">
      {/* ページヘッダー */}
      <section className="bg-ocean-800 py-10 md:py-14 border-b border-ocean-500/50">
        <div className="container mx-auto px-5 max-w-5xl">
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">Links</p>
          <h1 className="text-2xl md:text-3xl font-bold text-ink-primary">リンク集</h1>
          <p className="text-sm text-ink-muted mt-1">SNSや委託販売ショップへのリンク</p>
        </div>
      </section>

      {/* SNSリンク */}
      <section className="bg-ocean-900 py-8 md:py-12">
        <div className="container mx-auto px-5 max-w-5xl">
          <p className="text-[0.65rem] font-bold text-ink-muted tracking-[0.2em] uppercase mb-5">SNS</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {links.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card-hover p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.6rem] font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full tracking-wide">
                    {link.category}
                  </span>
                  <svg
                    className="w-3.5 h-3.5 text-ink-muted group-hover:text-cyan-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-ink-primary group-hover:text-cyan-400 transition-colors mb-1">
                    {link.title}
                  </p>
                  <p className="text-xs text-ink-muted leading-relaxed">{link.description}</p>
                </div>
              </a>
            ))}
          </div>

          {/* 委託販売 */}
          <div className="mt-10 pt-8 border-t border-ocean-500/50">
            <p className="text-[0.65rem] font-bold text-ink-muted tracking-[0.2em] uppercase mb-3">Shop</p>
            <h2 className="text-base font-bold text-ink-primary mb-3">委託販売ショップ</h2>
            <div className="glass-card p-5">
              <p className="text-sm text-ink-muted">委託販売ショップの情報は準備中です</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
