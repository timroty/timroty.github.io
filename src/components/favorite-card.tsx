interface Props {
  title: string;
  url: string;
  author: string | null;
}

export default function FavoriteCard({
  title,
  url,
  author,
}: Props) {
  return (
    <article className="border-t border-border py-4">
      <div className="min-w-0">
        <h3 className="text-lg font-semibold tracking-tight">
          <a
            className="editorial-link"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            {title}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </h3>
        {author ? (
          <p className="mt-1 text-sm text-muted-foreground">{author}</p>
        ) : null}
      </div>
    </article>
  );
}
