import type { PostSummary } from "./notion-normalizers";

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

const MAX_TITLE_LENGTH = 120;

export interface SocialImageModel {
  title: string;
  fontSize: 48 | 60 | 72;
  publishDate: string | null;
}

function truncateTitle(title: string): string {
  return title.length > MAX_TITLE_LENGTH
    ? `${title.slice(0, MAX_TITLE_LENGTH - 1)}…`
    : title;
}

function getTitleFontSize(title: string): SocialImageModel["fontSize"] {
  if (title.length <= 42) return 72;
  if (title.length <= 72) return 60;
  return 48;
}

function formatPublishDate(publishDate: string | null): string | null {
  if (!publishDate) return null;

  const date = new Date(
    publishDate.includes("T") ? publishDate : `${publishDate}T00:00:00Z`,
  );

  if (Number.isNaN(date.valueOf())) return null;

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function createSocialImageModel(
  post: PostSummary | null,
): SocialImageModel {
  const title = truncateTitle(post?.title ?? "Writing by Tim Roty");

  return {
    title,
    fontSize: getTitleFontSize(title),
    publishDate: formatPublishDate(post?.publishDate ?? null),
  };
}
