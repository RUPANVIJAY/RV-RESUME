import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-heading-lg font-bold tracking-tight text-foreground">
              RV
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#about"
              className="text-label-sm uppercase transition-colors hover:text-accent"
            >
              01_ABOUT
            </Link>
            <Link
              href="#skills"
              className="text-label-sm uppercase transition-colors hover:text-accent"
            >
              02_SKILLS
            </Link>
            <Link
              href="#projects"
              className="text-label-sm uppercase transition-colors hover:text-accent"
            >
              03_PROJECTS
            </Link>
            <Link
              href="#contact"
              className="text-label-sm uppercase transition-colors hover:text-accent"
            >
              04_CONTACT
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
