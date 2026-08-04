import { Reveal } from "./Reveal";

const steps = [
  { t: "Submit an inquiry", d: "Share your goals, project type, timeline and budget range." },
  { t: "One-on-one discussion", d: "We talk directly on WhatsApp or a call — no sales scripts." },
  { t: "Requirements analysis", d: "I map features, pages, integrations and content needs." },
  { t: "Custom proposal & quotation", d: "A written scope with a clear, itemised price." },
  { t: "Agreement", d: "We confirm scope, timeline and deliverables in writing." },
  { t: "Deposit confirmation", d: "Only after the scope and quotation are agreed — never before." },
  { t: "Development begins", d: "Build, review checkpoints, testing, launch and handover." },
];

export function Process() {
  return (
    <section className="py-20 lg:py-28" id="process">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">How we work together</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">The consultation journey</h2>
          <p className="mt-4 text-muted-foreground">
            Nothing is paid until your requirements, scope, quotation and agreement have been
            discussed and confirmed.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={(i % 4) * 80} as="li">
              <div className="relative h-full rounded-2xl border border-border bg-surface/70 p-6 lift">
                <span className="font-display text-3xl font-bold text-gold/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-base font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
