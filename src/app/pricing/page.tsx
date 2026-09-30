import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Pricing" };

const tiers = [
  {
    title: "Photography",
    rate: "$2,000",
    unit: "per day",
    notes: [
      "Full-day coverage, delivered as high-resolution edited files.",
      "Partial-day rates available for shorter shoots.",
      "Reduced rates available for non-profits and amateur sports.",
      "Travel and expenses billed at cost.",
    ],
  },
  {
    title: "Graphic Design",
    rate: "$60",
    unit: "per hour",
    notes: [
      "Three-hour minimum on any engagement.",
      "Print-ready files delivered in your preferred format.",
      "Volume and campaign pricing on request.",
    ],
  },
  {
    title: "Consultation & Quotes",
    rate: "Free",
    unit: "always",
    notes: [
      "Every project starts with a conversation.",
      "No obligation, no rushed quotes.",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="font-serif text-5xl md:text-6xl mb-6">Pricing</h1>
      <p className="text-lg text-muted mb-14 max-w-2xl">
        Transparent rates for photography and design. Every engagement begins
        with a free consultation so we can scope the right approach for your
        project.
      </p>

      <div className="grid gap-8 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.title} className="border border-line p-8 bg-background/60">
            <h2 className="font-serif text-2xl">{t.title}</h2>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-serif text-5xl text-accent">{t.rate}</span>
              <span className="text-muted">{t.unit}</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              {t.notes.map((n) => (
                <li key={n} className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-accent">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-line pt-10 text-center">
        <p className="text-lg">
          Have a project in mind?{" "}
          <Link href="/contact" className="text-accent underline underline-offset-4 hover:text-accent-hover">
            Get a free quote →
          </Link>
        </p>
      </div>
    </div>
  );
}
