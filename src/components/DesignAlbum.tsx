"use client";
import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useIsDesktop } from "./useIsDesktop";
import { AlbumPage } from "./AlbumPage";
import { LightboxViewer } from "./LightboxViewer";
import { DesignAlbumMobile } from "./DesignAlbumMobile";
import type { DesignSection, PhotoEntry } from "@/content/galleries";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  title: string;
  subtitle?: string;
  sections: DesignSection[];
};

type PageMeta =
  | { kind: "cover-front" }
  | { kind: "cover-back" }
  | { kind: "divider"; sectionIndex: number }
  | { kind: "intro"; sectionIndex: number }
  | { kind: "project-desc"; sectionIndex: number; projectIndex: number }
  | { kind: "project-image"; sectionIndex: number; projectIndex: number };

const PAGE_W = 500;
const PAGE_H = 640;

function buildPages(sections: DesignSection[]): PageMeta[] {
  const pages: PageMeta[] = [{ kind: "cover-front" }];
  sections.forEach((section, sectionIndex) => {
    pages.push({ kind: "divider", sectionIndex });
    if (section.intro) pages.push({ kind: "intro", sectionIndex });
    section.projects.forEach((_project, projectIndex) => {
      pages.push({ kind: "project-desc", sectionIndex, projectIndex });
      pages.push({ kind: "project-image", sectionIndex, projectIndex });
    });
  });
  pages.push({ kind: "cover-back" });
  return pages;
}

export function DesignAlbum({ title, subtitle, sections }: Props) {
  const isDesktop = useIsDesktop();
  const [open, setOpen] = useState(-1);
  const [pageNo, setPageNo] = useState(0);
  const [thumbSectionOverride, setThumbSectionOverride] = useState<number | null>(null);
  const bookRef = useRef<{ pageFlip: () => { flip: (n: number) => void } } | null>(null);

  const pages = useMemo(() => buildPages(sections), [sections]);
  const flatImages: PhotoEntry[] = useMemo(
    () =>
      sections.flatMap((s) =>
        s.projects.flatMap((p) => p.images.map((src) => ({ src, alt: p.title }))),
      ),
    [sections],
  );

  if (isDesktop === null) {
    return <div className="mx-auto" style={{ minHeight: PAGE_H }} />;
  }

  if (!isDesktop) {
    return (
      <DesignAlbumMobile title={title} subtitle={subtitle} sections={sections} />
    );
  }

  const currentPage = pages[pageNo];
  const derivedSection =
    currentPage && "sectionIndex" in currentPage ? currentPage.sectionIndex : 0;
  const activeSection = thumbSectionOverride ?? derivedSection;
  const section = sections[activeSection];

  const findProjectPage = (sectionIndex: number, projectIndex: number) =>
    pages.findIndex(
      (p) =>
        p.kind === "project-desc" &&
        p.sectionIndex === sectionIndex &&
        p.projectIndex === projectIndex,
    );

  const findDividerPage = (sectionIndex: number) =>
    pages.findIndex((p) => p.kind === "divider" && p.sectionIndex === sectionIndex);

  const gotoProject = (sectionIndex: number, projectIndex: number) => {
    const target = findProjectPage(sectionIndex, projectIndex);
    if (target >= 0) bookRef.current?.pageFlip()?.flip(target);
  };

  const gotoSection = (sectionIndex: number) => {
    const target = findDividerPage(sectionIndex);
    if (target >= 0) bookRef.current?.pageFlip()?.flip(target);
    setThumbSectionOverride(null);
  };

  const openLightbox = (sectionIndex: number, projectIndex: number, imageIndex: number) => {
    let globalIndex = 0;
    for (let s = 0; s < sectionIndex; s++) {
      for (const p of sections[s].projects) globalIndex += p.images.length;
    }
    for (let p = 0; p < projectIndex; p++) {
      globalIndex += sections[sectionIndex].projects[p].images.length;
    }
    globalIndex += imageIndex;
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
          clickEventForward
          useMouseEvents
          swipeDistance={30}
          showPageCorners
          disableFlipByClick={false}
          onFlip={(e: { data: number }) => {
            setPageNo(e.data);
            setThumbSectionOverride(null);
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
                <p className="italic text-muted mt-3 text-balance px-2">{s.subtitle}</p>
              )}
              {s.trailingLogo && (
                <div className="relative w-32 h-32 mt-6 mx-auto">
                  <Image
                    src={s.trailingLogo}
                    alt=""
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
              )}
              {s.projects.length === 0 && (
                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted">
                  Projects coming soon
                </p>
              )}
            </AlbumPage>,
            ...(s.intro
              ? [
                  <AlbumPage
                    key={`${s.id}-intro`}
                    className="bg-white p-10 flex flex-col justify-center"
                  >
                    <p className="text-xs uppercase tracking-widest text-muted mb-4">
                      About the work
                    </p>
                    <p className="text-muted leading-relaxed">{s.intro}</p>
                  </AlbumPage>,
                ]
              : []),
            ...s.projects.flatMap((p, pIdx) => [
              <AlbumPage
                key={`${s.id}-${p.title}-desc`}
                className="bg-white p-10 flex flex-col justify-center"
              >
                <p className="text-xs uppercase tracking-widest text-muted mb-4">Client</p>
                <h3 className="font-serif text-3xl leading-snug mb-6">{p.title}</h3>
                <p className="text-muted leading-relaxed">{p.description}</p>
              </AlbumPage>,
              <AlbumPage key={`${s.id}-${p.title}-image`} className="bg-white p-4">
                <div
                  className="w-full h-full grid gap-3"
                  style={{ gridTemplateRows: `repeat(${p.images.length}, minmax(0, 1fr))` }}
                >
                  {p.images.map((src, iIdx) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => openLightbox(sIdx, pIdx, iIdx)}
                      className="relative w-full h-full block"
                      aria-label={`Open ${p.title} full screen${p.images.length > 1 ? ` (${iIdx + 1})` : ""}`}
                    >
                      <Image
                        src={src}
                        alt={p.title}
                        fill
                        sizes={`${PAGE_W}px`}
                        className="object-contain"
                      />
                    </button>
                  ))}
                </div>
              </AlbumPage>,
            ]),
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

      {section && section.projects.length > 0 && (
        <div className="w-full max-w-4xl">
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-xs uppercase tracking-widest text-muted">
              Jump to a project — {section.title}
            </p>
            <p className="text-xs text-muted">
              {section.projects.length}{" "}
              {section.projects.length === 1 ? "project" : "projects"}
            </p>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {section.projects.map((p, i) => {
              const pageIdx = findProjectPage(activeSection, i);
              const active = pageNo === pageIdx || pageNo === pageIdx + 1;
              return (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => gotoProject(activeSection, i)}
                  className={`relative aspect-video overflow-hidden border transition-colors ${
                    active ? "border-accent" : "border-line hover:border-accent/60"
                  }`}
                  aria-label={`Flip to ${p.title}`}
                >
                  {p.images[0] && (
                    <Image
                      src={p.images[0]}
                      alt=""
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <LightboxViewer images={flatImages} index={open} onClose={() => setOpen(-1)} />
    </div>
  );
}
