import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { cache } from "react";
import {
  normalizeFavorite,
  normalizePost,
  type FavoriteSummary,
  type PostSummary,
} from "./notion-normalizers";

export const revalidate = 86400; // revalidate the data at most once a day

const postsDatabaseId = process.env.NOTION_POSTS_DATABASE_ID ?? "";
const favoritesDatabaseId = process.env.NOTION_FAVORITES_DATABASE_ID ?? "";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getPostsDatabase = cache(async () => {
  const response = await notion.databases.query({
    database_id: postsDatabaseId,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "PublishDate",
        direction: "descending",
      },
    ],
  });
  return response.results;
});

export const getFavoritesDatabase = cache(async () => {
  const response = await notion.databases.query({
    database_id: favoritesDatabaseId,
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });
  return response.results;
});

export const getPostSummaries = cache(async (): Promise<PostSummary[]> => {
  const pages = await getPostsDatabase();
  return pages
    .map(normalizePost)
    .filter((post): post is PostSummary => post !== null);
});

export const getFavoriteSummaries = cache(
  async (): Promise<FavoriteSummary[]> => {
    const pages = await getFavoritesDatabase();
    return pages
      .map(normalizeFavorite)
      .filter((favorite): favorite is FavoriteSummary => favorite !== null);
  },
);

export const getPostFromSlug = cache(async (slug: string) => {
  const response = await notion.databases.query({
    database_id: postsDatabaseId,
    filter: {
      and: [
        {
          property: "Slug",
          formula: {
            string: {
              equals: slug,
            },
          },
        },
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  });

  if (response?.results?.length) {
    return response.results[0];
  }
  return null;
});

export const generateNotionMarkdown = cache(async (pageId: string) => {
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdblocks = await n2m.pageToMarkdown(pageId);
  return n2m.toMarkdownString(mdblocks).parent;
});
