import Link from "next/link";
import Image from "next/image";
import { galleries } from "@/content/galleries";

const covers: Record<string, string | null> = {
  sports: "/galleries/sports/game-1-09.jpg",
  "real-estate": null,
  "graphic-design": "/galleries/graphic-design/4-h-nova-scotia.png",
  "side-projects": null,
};

export function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {galleries.map((g) => {
        const cover = covers[g.id];
        const soon = g.kind === "coming-soon";
        return (
          <Link
            key={g.id}
            href={`/${g.id}`}
            className="group relative block aspect-[4/3] overflow-hidden border border-line hover:border-accent transition-colors"
            style={{ backgroundColor: "#f2ece0" }}
          >
            {cover && (
              <Image
                src={cover}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover opacity-15 group-hover:opacity-25 transition-opacity duration-700 saturate-50"
              />
            )}
            <div className="relative h-full flex flex-col items-center justify-center text-center p-8 text-foreground">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
                Portfolio
              </p>
              <h2 className="font-serif text-4xl md:text-5xl">{g.title}</h2>
              {soon ? (
                <span className="mt-6 text-xs uppercase tracking-[0.3em] text-muted">
                  Coming soon
                </span>
              ) : (
                <span className="mt-6 text-xs uppercase tracking-[0.3em] text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Open album →
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
