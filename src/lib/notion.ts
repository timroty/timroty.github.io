import { Client, isFullBlock } from "@notionhq/client";
import { cache } from "react";

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
          property: "Slug",
          formula: {
            string: {
              equals: slug,
            }
          }
        },
        {
          property: "Published",
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

export const getBlocks = cache(async (blockId: string) => {
  if (!blockId)
    return;

  const blockIdSanatized = blockId.replaceAll("-", "");

  const { results } = await notion.blocks.children.list({
    block_id: blockIdSanatized,
    page_size: 100,
  });

  // Fetches all child blocks recursively
  const blocksWithChildren: any[] = await Promise.all(results.map(async (block) => {
    if (isFullBlock(block) && block.has_children) {
      const children = await getBlocks(block.id);
      return { ...block, children };
    }
    return block;
  }));

  return blocksWithChildren.reduce((acc, curr, index) => {
    const addToList = (listType: string, child: any, index: number) => {
      if (acc.length > 0 && acc[acc.length - 1].type === listType) {
        acc[acc.length - 1][listType].children?.push(child);
      } else {
        acc.push({
          id: curr.id.substring(0, 8) + "_" + index,
          type: listType,
          [listType]: { children: [child] },
        });
      }
    };

    if (curr.type === "bulleted_list_item") {
      addToList("bulleted_list", curr, index);
    } else if (curr.type === "numbered_list_item") {
      addToList("numbered_list", curr, index);
    } else {
      acc.push(curr);
    }

    return acc;
  }, []);
});