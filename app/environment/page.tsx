import Image from "next/image";

export default function EnvironmentPage() {
  return (
    <div className="min-h-screen">
      {/* ページヘッダー */}
      <section className="bg-ocean-800 py-10 md:py-14 border-b border-ocean-500/50">
        <div className="container mx-auto px-5 max-w-3xl">
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">Environment</p>
          <h1 className="text-2xl md:text-3xl font-bold text-ink-primary">飼育環境</h1>
          <p className="text-sm text-ink-muted mt-1">キンペコが健やかに育つ環境づくり</p>
        </div>
      </section>

      {/* イントロ */}
      <section className="bg-ocean-900 py-10 md:py-14">
        <div className="container mx-auto px-5 max-w-3xl">
          <div className="glass-card p-6 md:p-8 space-y-4">
            <p className="text-sm md:text-base text-ink-secondary leading-relaxed">
              生物にとって、適切な環境は健康と成長の基盤です。
            </p>
            <p className="text-sm md:text-base text-ink-secondary leading-relaxed">
              水質管理・水温管理・適切な餌の供給などを行い、キンペコが健やかに育つ環境を意識しています。
            </p>
            <p className="text-sm md:text-base text-ink-secondary leading-relaxed">
              固定観念を持たず、日々の観察を通じて最適な環境条件を追求し続けています。
            </p>
          </div>
        </div>
      </section>

      {/* 方針 */}
      <section className="bg-ocean-800 py-10 md:py-14">
        <div className="container mx-auto px-5 max-w-3xl">
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">Policy</p>
          <h2 className="text-lg md:text-xl font-bold text-ink-primary mb-6">飼育環境の方針</h2>

          <div className="glass-card p-5 md:p-6 mb-5 border-l-2 border-cyan-400/50">
            <p className="text-sm text-ink-secondary leading-relaxed italic">
              「個体の健康を最優先に考え、自然に近い環境を作り出すこと」
            </p>
          </div>

          <div className="space-y-3">
            {[
              "水質の安定維持と定期的な水換えによる清潔な環境の確保",
              "適切な水温管理と水流の調整により、快適な生息環境を提供",
              "スペースと隠れ家を配置し、ストレスを最小限に抑えるレイアウト設計",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 glass-card p-4">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2" />
                <p className="text-sm text-ink-secondary leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 設備 */}
      <section className="bg-ocean-900 py-10 md:py-14">
        <div className="container mx-auto px-5 max-w-3xl">
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">Setup</p>
          <h2 className="text-lg md:text-xl font-bold text-ink-primary mb-6">設備とシステム</h2>

          <div className="relative pl-6 border-l border-ocean-500">
            {[
              {
                label: "水質管理",
                text: "強力な濾過システムと定期的な換水により、常に清潔で安定した水環境を維持しています",
              },
              {
                label: "水温管理",
                text: "水量に合ったヒーターとエアコン24時間稼働により、年間を通じて最適な水温を維持",
              },
              {
                label: "レイアウト設計",
                text: "血統の厳格な管理と十分な隠れ家の配置により、ストレスのない快適な空間を実現",
              },
            ].map((item, i) => (
              <div key={i} className="relative mb-6 last:mb-0">
                <div className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full bg-ocean-600 border-2 border-cyan-400/60" />
                <p className="text-[0.6rem] text-ink-muted mb-1 font-semibold tracking-wide uppercase">{item.label}</p>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ギャラリー */}
      <section className="bg-ocean-800 py-10 md:py-14">
        <div className="container mx-auto px-5 max-w-3xl">
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">Gallery</p>
          <h2 className="text-lg md:text-xl font-bold text-ink-primary mb-6">飼育環境ギャラリー</h2>
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden glass-card">
            <Image
              src="/images/environment/environment_image.jpg"
              alt="什器水槽（多段水槽）システム"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-sm font-semibold text-white">什器水槽（多段水槽）システム</p>
              <p className="text-xs text-white/70 mt-0.5">約2畳のスペースで複数の水槽を効率的に管理</p>
            </div>
          </div>
        </div>
      </section>

      {/* 日々の管理 */}
      <section className="bg-ocean-900 py-10 md:py-14">
        <div className="container mx-auto px-5 max-w-3xl">
          <p className="text-cyan-400 text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2">Daily</p>
          <h2 className="text-lg md:text-xl font-bold text-ink-primary mb-4">日々の管理</h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-5">
            毎日の観察とメンテナンスを通じて、環境の最適化を続けています。
          </p>
          <div className="space-y-2.5">
            {[
              "痩せている個体や体調を崩している個体がいないかのチェック",
              "毎日の水換えと清掃作業",
              "個体の健康状態と行動パターンの観察",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 glass-card p-3.5">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <p className="text-sm text-ink-secondary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
