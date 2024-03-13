import ThemeToggle from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

export default function NavigationBar() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-12 max-w-screen-2xl items-center px-8">
          <div className="mr-4 hidden sm:flex"> 
            <nav className="flex items-center gap-6 text-sm">
              <a className="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer" href="/"> Home</a>
              <a className="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer" href="/about"> About</a>
              <a className="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer" href="/posts"> Posts</a>
              <a className="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer" href="/favorites"> Favorites</a>
            </nav>
          </div>
          <div className="flex mr-4 w-screen-2xl sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                  <HamburgerMenuIcon className="h-[1.1rem] w-[1.1rem] transition-all" />
                  <span className="sr-only">Pages Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 ml-6">
                <a href="/">
                  <DropdownMenuItem className="h-10">
                    Home
                  </DropdownMenuItem>
                </a>
                <DropdownMenuSeparator/>
                <a href="/about">
                  <DropdownMenuItem className="h-10">
                    About
                  </DropdownMenuItem>
                </a>
                <DropdownMenuSeparator/>
                <a href="/posts">
                  <DropdownMenuItem className="h-10">
                    Posts
                  </DropdownMenuItem>
                </a>
                <DropdownMenuSeparator/>
                <a href="/favorites">
                  <DropdownMenuItem className="h-10">
                    Favorites
                  </DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <a target="_blank" rel="noreferrer" href="https://github.com/timroty">
              <GitHubLogoIcon className="h-[1.1rem] w-[1.1rem] transition-all" />
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/timroty">
              <LinkedInLogoIcon className="h-[1.2rem] w-[1.2rem] transition-all mr-4" />
            </a>
            <ThemeToggle></ThemeToggle>
          </div>
        </div>
      </header>
    </>
  );
}