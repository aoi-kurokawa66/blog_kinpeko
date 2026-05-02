import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

export interface MicroCMSBlog {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch?: { url: string; height: number; width: number };
  category?: string;
  date?: string;
  excerpt?: string;
  tags?: string;
}

export interface Blog {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category?: string;
  tags?: string[];
  thumbnail?: string;
}

function normalize(post: MicroCMSBlog): Blog {
  return {
    slug: post.id,
    title: post.title || "",
    date: post.date ? post.date.slice(0, 10) : post.publishedAt.slice(0, 10),
    excerpt: post.excerpt || "",
    content: post.content || "",
    category: post.category || "",
    tags: post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    thumbnail: post.eyecatch?.url || "",
  };
}

export async function getAllBlogs(options?: {
  category?: string;
  excludeCategory?: string;
  limit?: number;
}): Promise<Blog[]> {
  const limit = options?.limit ?? 100;
  const data = await client.getList<MicroCMSBlog>({
    endpoint: "blogs",
    queries: { limit, orders: "-date" },
  });

  let blogs = data.contents.map(normalize);

  if (options?.category) {
    blogs = blogs.filter((b) => b.category === options.category);
  }
  if (options?.excludeCategory) {
    blogs = blogs.filter((b) => b.category !== options.excludeCategory);
  }

  return blogs;
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const post = await client.get<MicroCMSBlog>({
      endpoint: "blogs",
      contentId: slug,
    });
    return normalize(post);
  } catch {
    return null;
  }
}
