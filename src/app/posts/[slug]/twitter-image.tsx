import { getPostSummaries } from "@/lib/notion";

export { alt, contentType, default, size } from "./opengraph-image";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getPostSummaries();
  return posts.map((post) => ({ slug: post.slug }));
}
