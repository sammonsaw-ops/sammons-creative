"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { DesignSection, PhotoEntry } from "@/content/galleries";
import { LightboxViewer } from "./LightboxViewer";

type Props = {
  title: string;
  subtitle?: string;
  sections: DesignSection[];
};

export function DesignAlbumMobile({ title, subtitle, sections }: Props) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(-1);

  const section = sections[sectionIndex];
  const projects = section?.projects ?? [];

  const flatImages: PhotoEntry[] = useMemo(
    () =>
      sections.flatMap((s) =>
        s.projects.flatMap((p) => p.images.map((src) => ({ src, alt: p.title }))),
      ),
    [sections],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    emblaApi?.scrollTo(0);
    setSelected(0);
  }, [sectionIndex, emblaApi]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const openLightbox = (
    localSectionIdx: number,
    projectIdx: number,
    imageIdx: number,
  ) => {
    let globalIndex = 0;
    for (let s = 0; s < localSectionIdx; s++) {
      for (const p of sections[s].projects) globalIndex += p.images.length;
    }
    for (let p = 0; p < projectIdx; p++) {
      globalIndex += sections[localSectionIdx].projects[p].images.length;
    }
    globalIndex += imageIdx;
    setOpen(globalIndex);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="font-serif text-3xl">{title}</h2>
        {subtitle && <p className="text-muted italic mt-1">{subtitle}</p>}
      </div>

      {sections.length > 1 && (
        <nav
          className="flex flex-wrap gap-2 justify-center px-4"
          aria-label="Sections"
        >
          {sections.map((s, i) => {
            const active = sectionIndex === i;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSectionIndex(i)}
                className={`text-xs uppercase tracking-[0.2em] px-3 py-2 border transition-colors ${
                  active
                    ? "border-accent text-accent bg-accent/5"
                    : "border-line text-muted"
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </nav>
      )}

      {section && (
        <div className="px-4">
          <div className="text-center">
            {section.logo && (
              <div className="relative w-24 h-24 mx-auto mb-3">
                <Image
                  src={section.logo}
                  alt={section.title}
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
            )}
            <h3 className="font-serif text-2xl">{section.title}</h3>
            {section.subtitle && (
              <p className="text-muted italic mt-1 text-sm">{section.subtitle}</p>
            )}
            {section.trailingLogo && (
              <div className="relative w-20 h-20 mx-auto mt-3">
                <Image
                  src={section.trailingLogo}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
            )}
          </div>
          {section.intro && (
            <div className="mt-6 max-w-prose mx-auto">
              <p className="text-xs uppercase tracking-widest text-muted mb-3">
                About the work
              </p>
              <p className="text-muted leading-relaxed text-sm">{section.intro}</p>
            </div>
          )}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="mx-4 border border-line bg-white p-8 text-center text-muted">
          <p className="text-xs uppercase tracking-[0.3em] mb-3">Projects coming soon</p>
          <p className="text-sm">This section is being curated.</p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {projects.map((p, pIdx) => (
                <div key={p.title} className="flex-[0_0_100%] min-w-0 px-4">
                  <div className="bg-white p-6 border border-line">
                    <h3 className="font-serif text-2xl mb-2">{p.title}</h3>
                    <p className="text-sm text-muted mb-6">{p.description}</p>
                    <div className="space-y-3">
                      {p.images.map((src, iIdx) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => openLightbox(sectionIndex, pIdx, iIdx)}
                          className="relative w-full aspect-video block bg-background"
                          aria-label={`Open ${p.title} full screen`}
                        >
                          <Image
                            src={src}
                            alt={p.title}
                            fill
                            sizes="100vw"
                            className="object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between px-4 text-sm text-muted">
            <span>
              {selected + 1} / {projects.length}
            </span>
            <span className="text-xs uppercase tracking-widest">Swipe for next</span>
          </div>
          <div className="flex flex-wrap gap-2 px-4 justify-center">
            {projects.map((p, i) => (
              <button
                key={p.title}
                type="button"
                onClick={() => scrollTo(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  selected === i ? "bg-accent" : "bg-line"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <LightboxViewer images={flatImages} index={open} onClose={() => setOpen(-1)} />
    </div>
  );
}
