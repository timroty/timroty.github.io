import type { Metadata } from "next";
import NavigationBar from "@/components/navigation-bar";
import PostCard from "@/components/post-card";
import { getPostSummaries } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Writing | Tim Roty",
};

export default async function Posts() {
  const posts = await getPostSummaries();

  return (
    <>
      <NavigationBar />
      <main className="site-shell section-spacing">
        <p className="section-kicker">Archive</p>
        <h1 className="page-heading mt-2">Writing</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground"></p>
        <div className="mt-6 border-b border-border">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} {...post} />)
          ) : (
            <p className="border-t border-border py-6 text-muted-foreground">
              No posts to display right now.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
