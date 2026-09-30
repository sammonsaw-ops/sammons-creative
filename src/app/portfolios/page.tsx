import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/PortfolioGrid";

export const metadata: Metadata = { title: "Portfolios" };

export default function PortfoliosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <header className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Library</p>
        <h1 className="font-serif text-5xl md:text-6xl">Portfolios</h1>
        <p className="mt-4 text-muted max-w-xl mx-auto">
          A living library of photography and design work. Pick an album to
          browse.
        </p>
      </header>
      <PortfolioGrid />
    </div>
  );
}
