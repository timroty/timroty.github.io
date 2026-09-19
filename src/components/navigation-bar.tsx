import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const navigation = [{ label: "Writing", href: "/#writing" }];

export default function NavigationBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="site-shell flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="group w-fit leading-tight"
          aria-label="Tim Roty, home"
        >
          <span className="block text-base font-bold tracking-tight group-hover:text-link">
            Tim Roty
          </span>
        </Link>

        <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-5">
          <nav aria-label="Primary navigation">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:gap-x-5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link className="nav-link" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
