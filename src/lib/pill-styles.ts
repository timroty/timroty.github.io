export function getPillStyle(input: string): string {
  switch (input) {
    case "Podcast":
      return "bg-emerald-500/30 border-emerald-900/10 dark:bg-emerald-400/40 dark:border-emerald-700/20";
    case "Article":
    case "Project Review":
      return "bg-sky-500/30 border-sky-900/10 dark:bg-sky-400/40 dark:border-sky-700/20";
    case "Book":
      return "bg-indigo-500/30 border-indigo-900/10 dark:bg-indigo-400/40 dark:border-indigo-700/20";
    case "Blog":
    case "Video":
      return "bg-rose-500/30 border-rose-900/10 dark:bg-rose-400/40 dark:border-rose-700/20";
    case "Podcast Episode":
      return "bg-fuchsia-500/30 border-fuchsia-900/10 dark:bg-fuchsia-400/40 dark:border-fuchsia-700/20";
    case "Coffee":
      return "bg-amber-800/30 border-amber-950/10 dark:bg-amber-700/40 dark:border-amber-900/20";
    default:
      return "bg-gray-500/30 border-gray-900/10 dark:bg-gray-300/20 dark:border-gray-800/80";
  }
}
