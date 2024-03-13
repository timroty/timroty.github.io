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

  const getPillColor = (inputString: string) => {
    switch (inputString) {
      case "Podcast":
        return "bg-emerald-500/30 border-emerald-900/10 dark:dark:bg-emerald-300/20 dark:border-emerald-800/80";
      case "Book":
        return "bg-sky-500/30 border-sky-900/10 dark:dark:bg-sky-300/20 dark:border-sky-800/80";
      case "Article":
        return "bg-indigo-500/30 border-indigo-900/10 dark:dark:bg-indigo-300/20 dark:border-indigo-800/80";
      case "Blog":
        return "bg-rose-500/30 border-rose-900/10 dark:dark:bg-rose-300/20 dark:border-rose-800/50";
      default:
        return "bg-gray-500/30 border-gray-900/10 dark:dark:bg-gray-300/20 dark:border-gray-800/80";
    }
  };

  return (
    <div className="px-4 rounded-md border border-slate-200 dark:border-border bg-card max-w-screen-sm">
      <a href={link} target="_blank">
        <h2 className="text-md mt-2 mb-1 hover:underline">{title}</h2>
      </a>
      <p className="text-sm text-slate-800 dark:text-slate-300">{author}</p>
      <p className="text-xs mt-1 text-slate-500">{formatedDate}</p>
      <div
        className={`rounded-sm border pl-1 pr-1 max-w-fit text-xs mt-2 mb-2 ${getPillColor(tags[0])}`}
      >
        {tags[0]}
      </div>
    </div>
  );
}
