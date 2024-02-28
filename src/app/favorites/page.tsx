import PageHeading from '@/components/page-heading';
import NavigationBar from '../../components/navigation-bar'
import { getFavoritesDatabase } from '@/lib/notion';
import FavoriteCard from '@/components/favorite-card';

export default async function Favorites() {
  const favorites = await getFavoritesDatabase();
  return (
    <>
      <NavigationBar></NavigationBar>
      <main>
        <div className="container max-w-screen-xl">
          <PageHeading>
            Favorites
          </PageHeading>
          <div>
          {
            favorites?.length 
              ? favorites.map((favorite: any) => {
                return (
                  <div key={favorite.id} className="mt-6 mb-6">
                    <FavoriteCard 
                      title={favorite.properties.Name.title[0]?.text?.content} 
                      tags={favorite.properties.Tags?.multi_select?.map((item: { name: string; }) => item.name)} 
                      date={favorite.properties.Date.date?.start} 
                      link={favorite.properties.Link?.rich_text[0]?.text?.content}
                      author={favorite.properties.Author?.rich_text[0]?.text?.content}>
                    </FavoriteCard>
                  </div>
                );
              })
              : <h2 className="text-md mt-4">No favorites to display at this time.</h2>
            }
          </div>
        </div>
      </main>
    </>
  );
}
