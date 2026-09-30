import Link from "next/link";
import Image from "next/image";

const portfolios = [
  { href: "/sports", label: "Sports Photography" },
  { href: "/form-structure", label: "Form & Structure Photography" },
  { href: "/graphic-design", label: "Graphic Design" },
  { href: "/side-projects", label: "Side Projects" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between gap-6">
        <Link
          href="/"
          title="Return home"
          aria-label="Sammons Creative — return home"
          className="group flex items-center gap-4 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logos/sammons-creative.svg"
            alt="Sammons Creative"
            width={360}
            height={68}
            priority
            className="h-12 md:h-14 w-auto"
          />
          <span className="hidden sm:flex items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-muted group-hover:text-accent transition-colors">
            <span aria-hidden>←</span> Home
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <div className="group relative">
            <Link href="/portfolios" className="hover:text-accent transition-colors">
              Portfolios
            </Link>
            <div className="absolute right-0 top-full hidden group-hover:block pt-2">
              <div className="bg-background border border-line shadow-sm rounded-sm py-2 min-w-[200px]">
                <Link
                  href="/portfolios"
                  className="block px-4 py-2 hover:bg-line/50 hover:text-accent font-medium border-b border-line mb-1"
                >
                  All portfolios
                </Link>
                {portfolios.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="block px-4 py-2 hover:bg-line/50 hover:text-accent"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/pricing" className="hover:text-accent transition-colors">Pricing</Link>
          <Link href="/about" className="hover:text-accent transition-colors">About</Link>
          <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
          <a
            href="https://promo-builder.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            Promo-Builder ↗
          </a>
        </nav>
        <details className="md:hidden relative">
          <summary className="list-none cursor-pointer select-none px-2 py-1 text-sm">Menu</summary>
          <div className="absolute right-0 top-full mt-2 bg-background border border-line shadow-sm rounded-sm py-2 min-w-[200px]">
            <Link
              href="/portfolios"
              className="block px-4 py-2 hover:bg-line/50 font-medium border-b border-line mb-1"
            >
              All portfolios
            </Link>
            {portfolios.map((p) => (
              <Link key={p.href} href={p.href} className="block px-4 py-2 hover:bg-line/50">
                {p.label}
              </Link>
            ))}
            <div className="border-t border-line my-2" />
            <Link href="/pricing" className="block px-4 py-2 hover:bg-line/50">Pricing</Link>
            <Link href="/about" className="block px-4 py-2 hover:bg-line/50">About</Link>
            <Link href="/contact" className="block px-4 py-2 hover:bg-line/50">Contact</Link>
            <a
              href="https://promo-builder.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 hover:bg-line/50 text-muted"
            >
              Promo-Builder ↗
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}
