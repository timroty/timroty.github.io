import { GetPillColor } from "@/lib/utils";

interface Props {
  title: string;
  tags: string[];
  date: Date;
  link: string;
  description: string;
}

export default function PostCard({
  title,
  tags,
  date,
  link,
  description,
}: Props) {
  const formatedDate = new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="px-4 rounded-md border border-slate-200 dark:border-border bg-card max-w-screen-sm">
      <a href={link}>
        <h2 className="text-md mt-2 mb-1 hover:underline">{title}</h2>
      </a>
      <p className="text-xs my-1 text-slate-500">{formatedDate}</p>
      <p className="text-sm text-slate-800 dark:text-slate-300">
        {description}
      </p>

      <div className="flex flex-row flex-wrap">
        {tags.map((tag, index) => (
          <div
            key={index}
            className={`rounded-sm border px-1 max-w-fit text-xs mt-3 mb-2 mr-2 ${GetPillColor(tag)}`}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
