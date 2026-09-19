import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { cache } from "react";
import { normalizePost, type PostSummary } from "./notion-normalizers";

const postsDatabaseId = process.env.NOTION_POSTS_DATABASE_ID ?? "";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const getPostsDatabase = cache(async () => {
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

export const getPostSummaries = cache(async (): Promise<PostSummary[]> => {
  const pages = await getPostsDatabase();
  return pages
    .map(normalizePost)
    .filter((post): post is PostSummary => post !== null);
});

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
