import type { Metadata } from "next";
import FavoriteCard from "@/components/favorite-card";
import NavigationBar from "@/components/navigation-bar";
import { getFavoriteSummaries } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Favorites | Tim Roty"
};

export default async function Favorites() {
  const favorites = await getFavoriteSummaries();

  return (
    <>
      <NavigationBar />
      <main className="site-shell section-spacing">
        <p className="section-kicker">Archive</p>
        <h1 className="page-heading mt-2">Favorites</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground"></p>
        <div className="mt-6 border-b border-border">
          {favorites.length > 0 ? (
            favorites.map((favorite) => (
              <FavoriteCard key={favorite.id} {...favorite} />
            ))
          ) : (
            <p className="border-t border-border py-6 text-muted-foreground">
              No favorites to display right now.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
