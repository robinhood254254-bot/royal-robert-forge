import { Reveal } from "./Reveal";
import innovation from "@/assets/innovation_technology_and_SEO.webp";

export function PageIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="relative overflow-hidden hero-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${innovation})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,0.95) 5%, rgba(0,0,0,0.4) 55%, transparent 88%)",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,0.95) 5%, rgba(0,0,0,0.4) 55%, transparent 88%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground sm:text-lg">{body}</p>
        </Reveal>
      </div>
    </section>
  );
}
