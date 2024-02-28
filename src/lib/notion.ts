import { Client } from '@notionhq/client';
import { cache } from 'react';

export const revalidate = 86400; // revalidate the data at most once a day

const postsDatabaseId = process.env.NOTION_POSTS_DATABASE_ID ?? "";
const favoritesDatabaseId = process.env.NOTION_FAVORITES_DATABASE_ID ?? "";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getPostsDatabase = cache(async () => {
  const response = await notion.databases.query({
    database_id: postsDatabaseId,
    filter:{
      property: 'Published',
      checkbox: {
        equals: true
      }
    }
  });
  return response.results;
}); 

export const getFavoritesDatabase = cache(async () => {
  const response = await notion.databases.query({
    database_id: favoritesDatabaseId,
    sorts: [
      {
          property: "Date",
          direction: "descending"
      }
    ]
  });
  return response.results;
});

export const getPostFromSlug = cache(async (slug: string) => {
  const response = await notion.databases.query({
    database_id: postsDatabaseId,
    filter: {
      and: [
        {
          property: 'Slug',
          formula: {
            string: {
              equals: slug,
            }
          }
        },
        {
          property: 'Published',
          checkbox: {
            equals: true
          }
        }
      ]
    },
  });
  if (response?.results?.length) {
    return response.results[0];
  }
  return null;
});