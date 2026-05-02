import { NextResponse } from "next/server";
import { getAllBlogs } from "../../../lib/microcms";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const excludeCategory = searchParams.get("excludeCategory") || undefined;
    const posts = await getAllBlogs({ category, excludeCategory });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json([], { status: 500 });
  }
}
