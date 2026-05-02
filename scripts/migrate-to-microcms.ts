/**
 * 既存のMarkdownブログ記事をmicroCMSに移行するスクリプト
 * 実行: pnpm tsx scripts/migrate-to-microcms.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import breaks from "remark-breaks";

const SERVICE_DOMAIN = "abyss-kinpeko";
const API_KEY = process.env.MICROCMS_API_KEY!;
const POSTS_DIR = path.join(process.cwd(), "content/blog");
const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;

async function markdownToHtml(content: string): Promise<string> {
  const result = await remark()
    .use(breaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);
  return result.toString();
}

async function postToCMS(slug: string, fields: Record<string, unknown>) {
  const res = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    headers: {
      "X-MICROCMS-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...fields, id: slug }),
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
  console.log(`📂 ${files.length}件の記事を移行します\n`);

  let success = 0;
  let failed = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(POSTS_DIR, file);
    const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));

    const html = await markdownToHtml(content);

    const fields: Record<string, unknown> = {
      title: data.title || slug,
      content: html,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      excerpt: data.excerpt || "",
      tags: Array.isArray(data.tags) ? data.tags.join(", ") : (data.tags || ""),
    };

    if (data.category) {
      fields.category = data.category;
    }

    const ok = await postToCMS(slug, fields);
    if (ok) {
      console.log(`✅ ${slug}`);
      success++;
    } else {
      failed++;
    }

    // レートリミット回避
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\n完了: ${success}件成功, ${failed}件失敗`);
}

main();
