import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-5xl md:text-6xl mb-8">About</h1>
      <p className="font-serif italic text-xl text-muted mb-10">
        Images, Ideas, Impact.
      </p>
      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          I&rsquo;m a multidisciplinary visual creative with a background in
          graphic design, photography, and visual storytelling. My work spans
          branding, digital and print design, commercial and editorial
          photography, events, and promotional content.
        </p>
        <p>
          I enjoy turning ideas into practical, engaging visual
          solutions&mdash;whether that means designing a campaign, capturing an
          authentic moment, building a brand asset, or finding a better way to
          make a creative process work. My experience in both design and
          photography gives me a broad perspective on visual communication,
          while my background in print production and technology keeps me
          focused on the details that turn good ideas into finished work.
        </p>
        <p>
          I&rsquo;m naturally curious, adaptable, and hands-on, and I enjoy
          taking ownership of projects from the initial idea through to the
          final result.
        </p>
      </div>
    </article>
  );
}
