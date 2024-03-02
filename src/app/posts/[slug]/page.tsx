import NavigationBar from "@/components/navigation-bar";
import { getPostsDatabase, getPostFromSlug } from "@/lib/notion";

export default async function Post({ params }: any) {
  const page = await getPostFromSlug(params?.slug);
  
  if (!page) {
    return (
      <>
        <NavigationBar></NavigationBar>
        <main>
          <div className="container">
            <h2 className="mt-20">
              No post found.
            </h2>
            <a href="/" className="underline mt-8">Home</a>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
     <NavigationBar></NavigationBar>
      <main>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPostsDatabase();
  return posts?.map((page: any) => {
    const slug = page.properties.Slug?.formula?.string;
    return ({ slug: slug });
  }) ?? [];
}