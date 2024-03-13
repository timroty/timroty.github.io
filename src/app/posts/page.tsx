import { getPostsDatabase } from "@/lib/notion";
import PageHeading from "@/components/page-heading";
import NavigationBar from "@/components/navigation-bar";

export default async function Posts() {
  const posts = await getPostsDatabase();
  return (
    <>
      <NavigationBar></NavigationBar>
      <main>
        <div className="container max-w-screen-xl">
          <PageHeading>
            Posts
          </PageHeading>
          <div>
            {
              posts?.length 
              ? posts.map((post: any) => {
                const date = new Date(post.last_edited_time).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  },
                );

                return (
                  <div key={post.id} className="mt-6 mb-8">
                    <a href={`/posts/${post.properties?.Slug?.rich_text[0].text.content}`}> 
                      <h2 className="text-lg font-bold underline">
                        {post.properties?.Title.title[0].text.content}  
                      </h2>
                    </a>
                    <p className="text-xs text-slate-500 mt-1">
                      {date}
                    </p>
                    <p className="mt-1">
                      {post.properties.Description.rich_text[0].text.content}  
                    </p>
                  </div>
                );
              })
              : <h2 className="text-md mt-4">No posts to display at this time.</h2>
            }
          </div>
        </div>
      </main>
    </>
  );
}