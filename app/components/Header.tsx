"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "ホーム", icon: HomeIcon },
  { href: "/blog", label: "ブログ", icon: BlogIcon },
  { href: "/bloodline", label: "血統", icon: BloodlineIcon },
  { href: "/environment", label: "飼育環境", icon: EnvironmentIcon },
  { href: "/links", label: "リンク", icon: LinkIcon },
];

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-cyan-400" : "text-ink-secondary"}`} fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function BlogIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-cyan-400" : "text-ink-secondary"}`} fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function BloodlineIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-cyan-400" : "text-ink-secondary"}`} fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  );
}

function EnvironmentIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-cyan-400" : "text-ink-secondary"}`} fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  );
}

function LinkIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-cyan-400" : "text-ink-secondary"}`} fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* デスクトップ上部ナビ */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-ocean-800/95 backdrop-blur-md border-b border-ocean-500/60">
        <nav className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src="/images/logo/logo_side.png"
                alt="ABYSS BREED"
                width={400}
                height={120}
                className="h-24 w-auto object-contain"
                priority
              />
            </Link>
            <ul className="flex items-center gap-1">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive(href)
                        ? "text-cyan-400 bg-cyan-400/10"
                        : "text-ink-secondary hover:text-ink-primary hover:bg-ocean-700"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* モバイル上部（ロゴのみ） */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-ocean-800/95 backdrop-blur-md border-b border-ocean-500/60">
        <div className="flex items-center justify-center h-14 px-4">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo/logo_side.png"
              alt="ABYSS BREED"
              width={140}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
        </div>
      </header>

      {/* モバイル下部タブバー */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-ocean-800/97 backdrop-blur-md border-t border-ocean-500/60">
        <div className="flex items-stretch h-[4.25rem] pb-safe">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 pt-2 pb-1 transition-colors duration-150 ${
                  active ? "text-cyan-400" : "text-ink-muted"
                }`}
              >
                <Icon active={active} />
                <span className={`text-[0.625rem] font-medium leading-none ${active ? "text-cyan-400" : "text-ink-muted"}`}>
                  {label}
                </span>
                {active && (
                  <span className="absolute bottom-0 w-6 h-0.5 bg-cyan-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* デスクトップ用スペーサー */}
      <div className="hidden md:block h-20" />
    </>
  );
}
