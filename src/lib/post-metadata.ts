import type { Metadata } from "next";
import type { PostSummary } from "./notion-normalizers";

export const SITE_NAME = "Tim Roty";
export const SITE_URL = "https://timroty.github.io";
export const SITE_DESCRIPTION =
  "Writing from Tim Roty, a Senior Software Engineer at Hudl.";

export function createPostMetadata(
  post: PostSummary | null,
  slug: string,
): Metadata {
  if (!post) {
    return {
      title: `Writing | ${SITE_NAME}`,
      description: SITE_DESCRIPTION,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${post.title} | ${SITE_NAME}`;
  const url = `${SITE_URL}/posts/${encodeURIComponent(slug)}`;

  return {
    title,
    description: SITE_DESCRIPTION,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title,
      description: SITE_DESCRIPTION,
      url,
      siteName: SITE_NAME,
      ...(post.publishDate ? { publishedTime: post.publishDate } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: SITE_DESCRIPTION,
    },
  };
}
