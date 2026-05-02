import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import breaks from "remark-breaks";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category?: string;
  tags?: string[];
  thumbnail?: string;
}

export function getAllPosts(category?: string, excludeCategory?: string): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    let allPostsData = fileNames
      .filter((name) => name.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title || "",
          date: data.date || "",
          excerpt: data.excerpt || "",
          content: content,
          category: data.category || "",
          tags: data.tags || [],
          thumbnail: data.thumbnail || "",
        } as BlogPost;
      });

    // カテゴリでフィルタリング
    if (category) {
      allPostsData = allPostsData.filter((post) => post.category === category);
    }

    // 除外カテゴリでフィルタリング
    if (excludeCategory) {
      allPostsData = allPostsData.filter((post) => post.category !== excludeCategory);
    }

    // 日付でソート（新しい順）
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      excerpt: data.excerpt || "",
      content: content,
      category: data.category || "",
      tags: data.tags || [],
      thumbnail: data.thumbnail || "",
    } as BlogPost;
  } catch (error) {
    console.error("Error reading blog post:", error);
    return null;
  }
}

export async function getPostContentHTML(content: string): Promise<string> {
  try {
    const processedContent = await remark()
      .use(breaks)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(content);
    let htmlContent = processedContent.toString();
    
    // 外部リンク（http://またはhttps://で始まる）にtarget="_blank"とrel="noopener noreferrer"を追加
    htmlContent = htmlContent.replace(
      /<a\s+([^>]*?)href=["'](https?:\/\/[^"']+)["']([^>]*?)>/gi,
      (match, before, url, after) => {
        // 既にtargetやrelが設定されているかチェック
        const hasTarget = /target\s*=/i.test(before + after);
        const hasRel = /rel\s*=/i.test(before + after);
        
        let newAttrs = before;
        if (!hasTarget) {
          newAttrs += ' target="_blank"';
        }
        if (!hasRel) {
          newAttrs += ' rel="noopener noreferrer"';
        }
        newAttrs += after;
        
        return `<a ${newAttrs.trim()}href="${url}">`;
      }
    );
    
    return htmlContent;
  } catch (error) {
    console.error("Error processing markdown:", error);
    return content.replace(/\n/g, "<br />");
  }
}
