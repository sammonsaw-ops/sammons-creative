import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { galleries, getGallery } from "@/content/galleries";
import { PhotoAlbum } from "@/components/PhotoAlbum";
import { DesignAlbum } from "@/components/DesignAlbum";

export function generateStaticParams() {
  return galleries.map((g) => ({ gallery: g.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[gallery]">): Promise<Metadata> {
  const { gallery } = await params;
  const g = getGallery(gallery);
  return { title: g?.title ?? "Gallery" };
}

export default async function GalleryPage({ params }: PageProps<"/[gallery]">) {
  const { gallery } = await params;
  const g = getGallery(gallery);
  if (!g) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
      {g.kind === "photo" && (
        <PhotoAlbum title={g.title} subtitle={g.subtitle} sections={g.sections} />
      )}

      {g.kind === "design" && (
        <DesignAlbum title={g.title} subtitle={g.subtitle} sections={g.sections} />
      )}

      {g.kind === "coming-soon" && (
        <>
          <header className="mb-10 md:mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Portfolio</p>
            <h1 className="font-serif text-4xl md:text-6xl">{g.title}</h1>
            {g.subtitle && (
              <p className="mt-4 text-lg text-muted italic max-w-2xl mx-auto">
                {g.subtitle}
              </p>
            )}
          </header>
          <div className="mx-auto max-w-lg text-center border border-line p-12 bg-white">
            <p className="font-serif text-2xl mb-4">This album is being curated.</p>
            <p className="text-muted mb-8">
              New work is being prepared for this portfolio. In the meantime,
              reach out for shoot inquiries and rates.
            </p>
            <Link
              href="/contact"
              className="inline-block text-accent underline underline-offset-4 hover:text-accent-hover"
            >
              Contact Sammons Creative →
            </Link>
          </div>
        </>
      )}

      {g.kind === "experiments" && (
        <>
          <header className="mb-10 md:mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Portfolio</p>
            <h1 className="font-serif text-4xl md:text-6xl">{g.title}</h1>
            {g.subtitle && (
              <p className="mt-4 text-lg text-muted italic max-w-2xl mx-auto">
                {g.subtitle}
              </p>
            )}
            {g.intro && (
              <p className="mt-6 text-muted leading-relaxed max-w-2xl mx-auto">
                {g.intro}
              </p>
            )}
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {g.entries.map((e) => (
              <a
                key={e.id}
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-line bg-white p-8 hover:border-accent transition-colors"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
                  Experiment
                </p>
                <h2 className="font-serif text-3xl leading-snug mb-2">{e.title}</h2>
                {e.subtitle && (
                  <p className="italic text-muted mb-4">{e.subtitle}</p>
                )}
                <p className="text-muted leading-relaxed mb-6">{e.description}</p>
                <span className="text-xs uppercase tracking-[0.3em] text-accent group-hover:text-accent-hover">
                  Open the piece ↗
                </span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
