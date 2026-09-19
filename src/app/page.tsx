import Link from "next/link";
import NavigationBar from "@/components/navigation-bar";
import PostCard from "@/components/post-card";
import SiteFooter from "@/components/site-footer";
import { getPostSummaries } from "@/lib/notion";

export default async function Home() {
  const posts = await getPostSummaries();

  return (
    <>
      <NavigationBar />
      <main>
        <section className="site-shell py-8 sm:py-10">
          <p className="text-sm italic text-link">Hi, I&apos;m Tim.</p>
          <h1 className="mt-1 text-lg leading-7">
            Here are my thoughts...
          </h1>
        </section>

        <section id="writing" className="site-section">
          <div className="site-shell section-spacing">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="section-heading">Writing</h2>
              <Link
                className="editorial-link text-sm font-semibold"
                href="/posts"
              >
                View all posts
              </Link>
            </div>
            <div className="mt-6 border-b border-border">
              {posts.length > 0 ? (
                posts
                  .slice(0, 3)
                  .map((post) => <PostCard key={post.id} {...post} />)
              ) : (
                <p className="border-t border-border py-6 text-muted-foreground">
                  More writing is on the way.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
