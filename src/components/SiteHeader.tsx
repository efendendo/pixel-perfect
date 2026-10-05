import { Link } from "react-router";
import { Plane } from "lucide-react";
import type { ReactNode } from "react";

export function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 font-display font-bold uppercase tracking-wider"
    >
      <span className="bg-mustard border-ink grid h-9 w-9 place-items-center rounded-full border-2 text-primary shadow-glow">
        <Plane className="h-4 w-4 -rotate-45" />
      </span>
      <span>Flight Price Notifier</span>
    </Link>
  );
}

export function SiteHeader({ right }: { right?: ReactNode }) {
  return (
    <header className="border-ink sticky top-0 z-40 border-b-2 bg-background/80 backdrop-blur">
      <div className="h-1 w-full bg-primary" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        {right}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-ink relative border-t-2 bg-background/85 py-8 text-center font-display text-sm uppercase tracking-[0.2em] text-muted-foreground">
      © 2026 Flight Price Notifier
    </footer>
  );
}
