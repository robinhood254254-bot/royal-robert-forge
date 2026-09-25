import { Reveal } from "./Reveal";

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
    <section className="overflow-hidden border-b-8 border-gold bg-navy-deep text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal className="max-w-3xl border-l-4 border-gold pl-6">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/75 sm:text-lg">{body}</p>
        </Reveal>
      </div>
    </section>
  );
}
