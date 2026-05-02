/**
 * microCMSの既存記事にサムネイルパスをPATCHするスクリプト
 * 実行: pnpm tsx scripts/patch-thumbnails.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SERVICE_DOMAIN = "abyss-kinpeko";
const API_KEY = process.env.MICROCMS_API_KEY!;
const POSTS_DIR = path.join(process.cwd(), "content/blog");
const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;

async function patchThumbnail(slug: string, thumbnail: string) {
  const res = await fetch(`${BASE_URL}/blogs/${slug}`, {
    method: "PATCH",
    headers: {
      "X-MICROCMS-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ thumbnail }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`❌ ${slug}: ${res.status} ${err}`);
    return false;
  }
  return true;
}

async function main() {
  if (!API_KEY) {
    console.error("MICROCMS_API_KEY が設定されていません");
    process.exit(1);
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(POSTS_DIR, file);
    const { data } = matter(fs.readFileSync(fullPath, "utf8"));

    if (!data.thumbnail) {
      skipped++;
      continue;
    }

    const ok = await patchThumbnail(slug, data.thumbnail);
    if (ok) {
      console.log(`✅ ${slug}: ${data.thumbnail}`);
      success++;
    } else {
      failed++;
    }

    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\n完了: ${success}件更新, ${skipped}件スキップ, ${failed}件失敗`);
}

main();
