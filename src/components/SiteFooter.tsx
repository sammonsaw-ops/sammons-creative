import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-muted">
        <div>
          <p className="font-serif text-lg text-foreground">Sammons Creative</p>
          <p className="italic">Images, Ideas, Impact.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/pricing" className="hover:text-accent">Pricing</Link>
          <Link href="/about" className="hover:text-accent">About</Link>
          <Link href="/contact" className="hover:text-accent">Contact</Link>
          <a
            href="https://promo-builder.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            Promo-Builder
          </a>
          <a href="mailto:sammonsaw@gmail.com" className="hover:text-accent">
            sammonsaw@gmail.com
          </a>
        </div>
        <p>© {new Date().getFullYear()} Sammons Creative</p>
      </div>
    </footer>
  );
}
