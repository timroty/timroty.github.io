export interface PostSummary {
  id: string;
  title: string;
  publishDate: string | null;
  slug: string;
}

export interface FavoriteSummary {
  id: string;
  title: string;
  author: string | null;
  url: string;
}

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  return value as UnknownRecord;
}

function getProperty(page: UnknownRecord, name: string): UnknownRecord | null {
  const properties = asRecord(page.properties);
  return properties ? asRecord(properties[name]) : null;
}

function getPlainText(property: UnknownRecord | null): string | null {
  if (!property) return null;

  const items = Array.isArray(property.title)
    ? property.title
    : Array.isArray(property.rich_text)
      ? property.rich_text
      : null;

  if (items) {
    const text = items
      .map((item) => asRecord(item)?.plain_text)
      .filter((value): value is string => typeof value === "string")
      .join("")
      .trim();

    return text || null;
  }

  const formula = asRecord(property.formula);
  const formulaValue = formula?.string;
  return typeof formulaValue === "string" && formulaValue.trim()
    ? formulaValue.trim()
    : null;
}

function getDate(property: UnknownRecord | null): string | null {
  const date = property ? asRecord(property.date) : null;
  return typeof date?.start === "string" ? date.start : null;
}

export function normalizePost(value: unknown): PostSummary | null {
  const page = asRecord(value);
  if (!page || typeof page.id !== "string") return null;

  const title = getPlainText(getProperty(page, "Title"));
  const slug = getPlainText(getProperty(page, "Slug"));
  if (!title || !slug) return null;

  return {
    id: page.id,
    title,
    publishDate: getDate(getProperty(page, "PublishDate")),
    slug,
  };
}

export function normalizeFavorite(value: unknown): FavoriteSummary | null {
  const page = asRecord(value);
  if (!page || typeof page.id !== "string") return null;

  const title = getPlainText(getProperty(page, "Name"));
  const url = getPlainText(getProperty(page, "Link"));
  if (!title || !url) return null;

  return {
    id: page.id,
    title,
    author: getPlainText(getProperty(page, "Author")),
    url,
  };
}
