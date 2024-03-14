import { getPostsDatabase } from "@/lib/notion";
import PageHeading from "@/components/page-heading";
import NavigationBar from "@/components/navigation-bar";
import PostCard from "@/components/post-card";

export default async function Posts() {
  const posts = await getPostsDatabase();
  return (
    <>
      <NavigationBar></NavigationBar>
      <main>
        <div className="container max-w-screen-xl">
          <PageHeading>Posts</PageHeading>
          <div>
            {posts?.length ? (
              posts.map((post: any) => {
                return (
                  <div key={post.id} className="mt-6 mb-8">
                    <PostCard
                      title={post.properties.Title.title[0]?.text?.content}
                      description={
                        post.properties.Description.rich_text[0]?.text?.content
                      }
                      date={post.properties.PublishDate?.date?.start}
                      tags={post.properties.Tags?.multi_select?.map(
                        (item: { name: string }) => item.name,
                      )}
                      link={`/posts/${post.properties.Slug.rich_text[0]?.text?.content}`}
                    ></PostCard>
                  </div>
                );
              })
            ) : (
              <h2 className="text-md mt-4">
                No posts to display at this time.
              </h2>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
