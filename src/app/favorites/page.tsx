"use client"

import PageHeading from "@/components/page-heading";
import PageSubheading from "@/components/page-subheading";
import NavigationBar from "../../components/navigation-bar";
import { getFavoritesDatabase } from "@/lib/notion";
import FavoriteCard from "@/components/favorite-card";
import { useEffect, useState } from "react";

export default async function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      const data: any = await getFavoritesDatabase();
      setFavorites(data);
    }
    fetchFavorites();
  }, []);
  
  return (
    <>
      <NavigationBar></NavigationBar>
      <main>
        <div className="container max-w-screen-xl">
          <PageHeading>Favorites</PageHeading>
          <PageSubheading>
            Favorites are pieces of content I&#39;ve read, watched, or listened
            to and really enjoyed. Each card has a link to where you can find
            the favorite as well as the date I consumed it. The list is not
            exhaustive and is always updating!
          </PageSubheading>
          <hr className="mt-6 mb-2" />
          <div>
            {favorites?.length ? (
              favorites.map((favorite: any) => {
                return (
                  <div key={favorite.id} className="mt-6 mb-6">
                    <FavoriteCard
                      title={favorite.properties.Name.title[0]?.text?.content}
                      tags={favorite.properties.Tags?.multi_select?.map(
                        (item: { name: string }) => item.name,
                      )}
                      date={favorite.properties.Date.date?.start}
                      link={
                        favorite.properties.Link?.rich_text[0]?.text?.content
                      }
                      author={
                        favorite.properties.Author?.rich_text[0]?.text?.content
                      }
                    ></FavoriteCard>
                  </div>
                );
              })
            ) : (
              <h2 className="text-md mt-4">
                No favorites to display at this time.
              </h2>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
