import Image from "next/image";
import { PortfolioGrid } from "@/components/PortfolioGrid";

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
        <Image
          src="/logos/sammons-creative.svg"
          alt="Sammons Creative"
          width={640}
          height={100}
          priority
          className="mx-auto h-auto w-full max-w-xl"
        />
        <p className="mt-6 font-serif italic text-xl md:text-2xl text-muted">
          Images, Ideas, Impact.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <PortfolioGrid />
      </section>
    </div>
  );
}
