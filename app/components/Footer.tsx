import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ocean-700 border-t border-ocean-500/60 mt-auto">
      <div className="container mx-auto px-5 max-w-5xl py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-cyan-400 tracking-widest uppercase mb-1">Abyss</p>
            <p className="text-ink-secondary text-sm">キンペコ（L333）ブリーダーによる飼育・繁殖記録サイト</p>
          </div>

          <div className="flex gap-8">
            <div>
              <p className="text-xs text-ink-muted mb-2 uppercase tracking-wider">Pages</p>
              <ul className="space-y-1.5">
                {[
                  { href: "/blog", label: "ブログ" },
                  { href: "/bloodline", label: "血統紹介" },
                  { href: "/environment", label: "飼育環境" },
                  { href: "/about", label: "自己紹介" },
                  { href: "/links", label: "リンク" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-ink-secondary hover:text-cyan-400 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs text-ink-muted mb-2 uppercase tracking-wider">SNS</p>
              <ul className="space-y-1.5">
                {[
                  { href: "https://x.com/aquarium621", label: "X (Twitter)" },
                  { href: "https://www.instagram.com/kinpeco_aquarium", label: "Instagram" },
                  { href: "https://www.youtube.com/@aquarium-abyss", label: "YouTube" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-secondary hover:text-cyan-400 transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="section-divider mt-8 pt-4">
          <p className="text-xs text-ink-muted text-center">
            &copy; {new Date().getFullYear()} Abyss. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
