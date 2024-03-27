import TagPill from "./tag-pill";

interface Props {
  title: string;
  tags: string[];
  date: Date;
  link: string;
  author: string;
}

export default function FavoriteCard({
  title,
  tags,
  date,
  link,
  author,
}: Props) {
  const formatedDate = new Date(date).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="px-4 rounded-md border border-slate-200 dark:border-border bg-card max-w-screen-sm">
      <a href={link} target="_blank">
        <h2 className="text-md mt-2 mb-1 hover:underline">{title}</h2>
      </a>
      <p className="text-sm text-slate-800 dark:text-slate-300">{author}</p>
      <p className="text-xs mt-1 text-slate-500">{formatedDate}</p>
      <div className="flex flex-row flex-wrap">
        {tags.map((tag, index) => (
          <TagPill key={index.toString()} text={tag}></TagPill>
        ))}
      </div>
    </div>
  );
}
