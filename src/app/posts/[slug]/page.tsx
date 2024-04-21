import NavigationBar from "@/components/navigation-bar";
import { renderBlock } from "@/components/notion/renderer";
import { getPostsDatabase, getPostFromSlug, getBlocks } from "@/lib/notion";
import { isFullPage } from "@notionhq/client";

export default async function Post({ params }: any) {
  const page = await getPostFromSlug(params?.slug);
  const blocks = await getBlocks(page?.id ?? "");

  return (
    <>
      <NavigationBar></NavigationBar>
      <main>
        <div className="container max-w-screen-lg">
          {!page || !isFullPage(page) || !blocks ? (
            <>
              <h2 className="mt-20">No post to display.</h2>
              <a href="/" className="underline mt-8">
                Home
              </a>
            </>
          ) : (
            <>
              <article>
                <h1 className="text-4xl font-bold  mt-14 mb-6">
                  {(page.properties.Title as any).title[0].plain_text}
                </h1>
                <section>
                  {blocks.map((block: any) => (
                    <div key={block.id}>{renderBlock(block)}</div>
                  ))}
                </section>
              </article>
              <a href="/posts" className="">
                <p className="text-sm text-gray-500 my-8 underline">
                  More Posts
                </p>
              </a>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPostsDatabase();
  return (
    posts?.map((page: any) => {
      const slug = page.properties.Slug?.rich_text[0]?.plain_text;
      return { slug: slug };
    }) ?? []
  );
}
