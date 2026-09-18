import Link from "next/link";

interface Props {
  title: string;
  tags: string[];
  publishDate: string | null;
  slug: string;
  description: string | null;
}

function formatDate(value: string | null): string | null {
  if (!value) return null;

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function PostCard({
  title,
  publishDate,
  slug,
}: Props) {
  const formattedDate = formatDate(publishDate);

  return (
    <article className="border-t border-border py-4 sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6">
      <div className="min-w-0">
        <h3 className="text-xl font-semibold tracking-tight">
          <Link className="editorial-link" href={`/posts/${slug}`}>
            {title}
          </Link>
        </h3>
      </div>
      {formattedDate ? (
        <time
          className="mt-3 block whitespace-nowrap text-sm text-muted-foreground sm:mt-1"
          dateTime={publishDate ?? undefined}
        >
          {formattedDate}
        </time>
      ) : null}
    </article>
  );
}
