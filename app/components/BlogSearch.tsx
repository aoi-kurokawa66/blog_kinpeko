"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

interface BlogSearchProps {
  allTags: string[];
  currentQuery: string;
  currentTag: string;
}

export default function BlogSearch({ allTags, currentQuery, currentTag }: BlogSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParams("q", e.target.value);
  };

  const handleTag = (tag: string) => {
    updateParams("tag", currentTag === tag ? "" : tag);
  };

  const handleClear = () => {
    router.push(pathname);
  };

  const hasFilter = currentQuery || currentTag;

  return (
    <div className="space-y-3 mb-6">
      {/* 検索バー */}
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="記事を検索..."
          defaultValue={currentQuery}
          onChange={handleSearch}
          className="w-full bg-ocean-700 border border-ocean-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-cyan-400/60 transition-colors"
        />
      </div>

      {/* タグフィルター */}
      {allTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[0.6rem] text-ink-muted font-bold tracking-widest uppercase">Tag:</span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTag(tag)}
              className={`text-[0.65rem] font-bold px-2.5 py-1 rounded-full transition-all ${
                currentTag === tag
                  ? "bg-cyan-400 text-ocean-900"
                  : "bg-ocean-600 text-ink-muted hover:text-ink-primary hover:bg-ocean-500"
              }`}
            >
              {tag}
            </button>
          ))}
          {hasFilter && (
            <button
              onClick={handleClear}
              className="text-[0.65rem] text-ink-muted hover:text-cyan-400 transition-colors ml-1"
            >
              クリア ×
            </button>
          )}
        </div>
      )}
    </div>
  );
}
