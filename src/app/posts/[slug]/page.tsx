import Link from "next/link";
import NavigationBar from "@/components/navigation-bar";
import MarkdownRenderer from "@/components/markdown-renderer";
import {
  generateNotionMarkdown,
  getPostFromSlug,
  getPostSummaries,
} from "@/lib/notion";
import { normalizePost } from "@/lib/notion-normalizers";

interface Props {
  params: { slug: string };
}

export default async function Post({ params }: Props) {
  const page = await getPostFromSlug(params.slug);
  const post = normalizePost(page);
  const markdown = page?.id ? await generateNotionMarkdown(page.id) : "";

  return (
    <>
      <NavigationBar />
      <main className="site-shell section-spacing">
        {!page || !post ? (
          <div className="reading-width">
            <h1 className="page-heading">No post to display.</h1>
            <Link
              href="/posts"
              className="editorial-link mt-6 inline-block font-semibold"
            >
              Browse all writing
            </Link>
          </div>
        ) : (
          <article className="article-shell">
            <header className="mb-8 border-b border-border pb-6">
              <p className="section-kicker">Writing</p>
              <h1 className="page-heading mt-2">{post.title}</h1>
              {post.publishDate ? (
                <time
                  className="mt-3 block text-sm text-muted-foreground"
                  dateTime={post.publishDate}
                >
                  {new Intl.DateTimeFormat("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  }).format(new Date(`${post.publishDate}T00:00:00Z`))}
                </time>
              ) : null}
            </header>
            <MarkdownRenderer content={markdown} />
            <Link
              href="/posts"
              className="editorial-link mt-8 inline-block text-sm font-semibold"
            >
              More writing
            </Link>
          </article>
        )}
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPostSummaries();
  return posts.map((post) => ({ slug: post.slug }));
}
