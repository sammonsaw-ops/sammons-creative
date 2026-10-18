"use client";
import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useIsDesktop } from "./useIsDesktop";
import { AlbumPage } from "./AlbumPage";
import { LightboxViewer } from "./LightboxViewer";
import { PhotoAlbumMobile } from "./PhotoAlbumMobile";
import type { PhotoEntry, PhotoSection } from "@/content/galleries";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  title: string;
  subtitle?: string;
  sections: PhotoSection[];
};

type PageMeta =
  | { kind: "cover-front" }
  | { kind: "cover-back" }
  | { kind: "divider"; sectionIndex: number }
  | { kind: "image"; sectionIndex: number; imageIndex: number; image: PhotoEntry };

const PAGE_W = 480;
const PAGE_H = 640;

function buildPages(sections: PhotoSection[]): PageMeta[] {
  const pages: PageMeta[] = [{ kind: "cover-front" }];
  sections.forEach((section, sectionIndex) => {
    pages.push({ kind: "divider", sectionIndex });
    section.images.forEach((image, imageIndex) => {
      pages.push({ kind: "image", sectionIndex, imageIndex, image });
    });
  });
  pages.push({ kind: "cover-back" });
  return pages;
}

export function PhotoAlbum({ title, subtitle, sections }: Props) {
  const isDesktop = useIsDesktop();
  const [open, setOpen] = useState(-1);
  const bookRef = useRef<{ pageFlip: () => { flip: (n: number) => void } } | null>(null);
  const [pageNo, setPageNo] = useState(0);

  const pages = useMemo(() => buildPages(sections), [sections]);
  const flatImages = useMemo(
    () => sections.flatMap((s) => s.images),
    [sections],
  );

  if (isDesktop === null) {
    return <div className="mx-auto" style={{ minHeight: PAGE_H }} />;
  }

  if (!isDesktop) {
    return (
      <PhotoAlbumMobile title={title} subtitle={subtitle} sections={sections} />
    );
  }

  const currentPage = pages[pageNo];
  const activeSection =
    currentPage && "sectionIndex" in currentPage ? currentPage.sectionIndex : 0;

  const findDividerPage = (sectionIndex: number) =>
    pages.findIndex((p) => p.kind === "divider" && p.sectionIndex === sectionIndex);

  const gotoSection = (sectionIndex: number) => {
    const target = findDividerPage(sectionIndex);
    if (target >= 0) bookRef.current?.pageFlip()?.flip(target);
  };

  const openLightbox = (sectionIndex: number, imageIndex: number) => {
    const globalIndex = sections
      .slice(0, sectionIndex)
      .reduce((sum, s) => sum + s.images.length, 0) + imageIndex;
    setOpen(globalIndex);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {sections.length > 1 && (
        <nav className="flex flex-wrap gap-2 justify-center" aria-label="Sections">
          {sections.map((s, i) => {
            const active = activeSection === i;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => gotoSection(i)}
                className={`text-xs uppercase tracking-[0.2em] px-4 py-2 border transition-colors ${
                  active
                    ? "border-accent text-accent bg-accent/5"
                    : "border-line text-muted hover:border-accent/60 hover:text-foreground"
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </nav>
      )}

      <div className="w-full flex justify-center">
        <HTMLFlipBook
          ref={bookRef}
          width={PAGE_W}
          height={PAGE_H}
          size="fixed"
          minWidth={300}
          maxWidth={800}
          minHeight={400}
          maxHeight={1000}
          maxShadowOpacity={0.4}
          showCover
          drawShadow
          usePortrait={false}
          mobileScrollSupport
          flippingTime={700}
          startPage={0}
          startZIndex={0}
          autoSize={false}
          className=""
          style={{}}
          clickEventForward={true}
          useMouseEvents
          swipeDistance={30}
          showPageCorners
          disableFlipByClick={false}
          onFlip={(e: { data: number }) => {
            setPageNo(e.data);
          }}
        >
          <AlbumPage
            hard
            className="flex flex-col items-center justify-center p-10 text-center text-foreground"
            style={{ backgroundColor: "#f2ece0" }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">Portfolio</p>
            <h2 className="font-serif text-5xl leading-tight">{title}</h2>
            {subtitle && (
              <p className="italic text-muted mt-4 text-center px-2 text-balance">{subtitle}</p>
            )}
            <div className="mt-10 flex flex-col items-center gap-2">
              <span className="h-px w-10 bg-accent/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted">
                Sammons Creative
              </span>
            </div>
          </AlbumPage>

          {sections.flatMap((s, sIdx) => [
            <AlbumPage
              key={`${s.id}-divider`}
              className="flex flex-col items-center justify-center p-10 text-center text-foreground"
              style={{ backgroundColor: "#f2ece0" }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">
                Section {sIdx + 1} of {sections.length}
              </p>
              {s.logo && (
                <div className="relative w-48 h-48 mb-6 mx-auto">
                  <Image
                    src={s.logo}
                    alt={s.title}
                    fill
                    sizes="192px"
                    className="object-contain"
                  />
                </div>
              )}
              <h3 className="font-serif text-4xl leading-tight">{s.title}</h3>
              {s.subtitle && (
                <p className="italic text-muted mt-3 text-balance">{s.subtitle}</p>
              )}
              {s.images.length === 0 && (
                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted">
                  Images coming soon
                </p>
              )}
            </AlbumPage>,
            ...s.images.map((img, iIdx) => (
              <AlbumPage
                key={img.src}
                className="bg-white p-3 flex items-center justify-center"
              >
                <button
                  type="button"
                  onClick={() => openLightbox(sIdx, iIdx)}
                  className="relative w-full h-full block"
                  aria-label={`Open image ${iIdx + 1} of ${s.title} full screen`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={`${PAGE_W}px`}
                    className="object-contain"
                  />
                </button>
              </AlbumPage>
            )),
          ])}

          <AlbumPage
            hard
            className="flex flex-col items-center justify-center p-10 text-center text-foreground"
            style={{ backgroundColor: "#f2ece0" }}
          >
            <p className="font-serif italic text-2xl text-accent">Images, Ideas, Impact.</p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted">
              Sammons Creative
            </p>
          </AlbumPage>
        </HTMLFlipBook>
      </div>

      <LightboxViewer images={flatImages} index={open} onClose={() => setOpen(-1)} />
    </div>
  );
}
