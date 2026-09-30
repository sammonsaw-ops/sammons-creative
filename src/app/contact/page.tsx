import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

const email = "sammonsaw@gmail.com";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-serif text-5xl md:text-6xl mb-8">Contact</h1>
      <p className="text-lg text-muted mb-12">
        Consultations and quotes are always free. Reach out anytime.
      </p>

      <a
        href={`mailto:${email}`}
        className="inline-block font-serif text-3xl md:text-4xl text-accent hover:text-accent-hover underline underline-offset-8 decoration-1"
      >
        {email}
      </a>

      <p className="mt-10 text-sm uppercase tracking-[0.3em] text-muted">
        Typical response within 24 hours
      </p>
    </div>
  );
}
