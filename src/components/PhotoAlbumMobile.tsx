"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { PhotoSection } from "@/content/galleries";
import { LightboxViewer } from "./LightboxViewer";

type Props = {
  title: string;
  subtitle?: string;
  sections: PhotoSection[];
};

export function PhotoAlbumMobile({ title, subtitle, sections }: Props) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "center" });
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(-1);

  const flatImages = useMemo(
    () => sections.flatMap((s) => s.images),
    [sections],
  );

  const section = sections[sectionIndex];
  const images = section?.images ?? [];

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

  const openAt = (localIndex: number) => {
    const offset = sections
      .slice(0, sectionIndex)
      .reduce((sum, s) => sum + s.images.length, 0);
    setOpen(offset + localIndex);
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
        <div className="text-center px-4">
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
        </div>
      )}

      {images.length === 0 ? (
        <div className="mx-4 border border-line bg-white p-8 text-center text-muted">
          <p className="text-xs uppercase tracking-[0.3em] mb-3">Images coming soon</p>
          <p className="text-sm">This section is being curated.</p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {images.map((img, i) => (
                <div key={img.src} className="flex-[0_0_100%] min-w-0 px-2">
                  <button
                    type="button"
                    onClick={() => openAt(i)}
                    className="relative w-full aspect-[3/2] block bg-white shadow-sm"
                    aria-label={`Open image ${i + 1} full screen`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority={i < 2}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between px-4 text-sm text-muted">
            <span>
              {selected + 1} / {images.length}
            </span>
            <span className="text-xs uppercase tracking-widest">Swipe or tap to view</span>
          </div>
          <div className="grid grid-cols-6 gap-2 px-2">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => scrollTo(i)}
                className={`relative aspect-[3/2] overflow-hidden border transition-colors ${
                  selected === i ? "border-accent" : "border-line"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="60px" className="object-cover" />
              </button>
            ))}
          </div>
        </>
      )}

      <LightboxViewer images={flatImages} index={open} onClose={() => setOpen(-1)} />
    </div>
  );
}
