interface Props {
  key: string;
  text: string;
}

export default function TagPill({ key, text }: Props) {
  function GetPillStyle(input: string) {
    switch (input) {
      case "Podcast":
        return "bg-emerald-500/30 border-emerald-900/10 dark:dark:bg-emerald-300/20 dark:border-emerald-800/80";
      case "Book":
      case "Project Review":
        return "bg-sky-500/30 border-sky-900/10 dark:dark:bg-sky-300/30 dark:border-sky-800/80";
      case "Article":
        return "bg-indigo-500/30 border-indigo-900/10 dark:dark:bg-indigo-300/20 dark:border-indigo-800/80";
      case "Blog":
        return "bg-rose-500/30 border-rose-900/10 dark:dark:bg-rose-300/20 dark:border-rose-800/50";
      default:
        return "bg-gray-500/30 border-gray-900/10 dark:dark:bg-gray-300/20 dark:border-gray-800/80";
    }
  }

  return (
    <div
      key={key}
      className={`rounded-sm border px-1 max-w-fit text-xs mt-3 mb-2 mr-2 ${GetPillStyle(text)}`}
    >
      {text}
    </div>
  );
}
