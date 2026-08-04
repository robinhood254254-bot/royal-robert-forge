import { FlaskConical } from "lucide-react";
import { Reveal } from "./Reveal";
import { PhoneFrame } from "./Frames";
import mock2 from "@/assets/Mockup_2.webp.asset.json";
import mock3 from "@/assets/Mockup_3.webp.asset.json";
import mockMobile from "@/assets/Mockup_mobile_responsiveness.webp.asset.json";

export function FutureLab() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-secondary/60 py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-secondary/60 px-3 py-1.5 text-xs font-medium text-primary">
            <FlaskConical className="size-3.5" /> Concept · Prototype · Not yet released
          </span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            Vehicle inventory & hire-purchase software — in development
          </h2>
          <p className="mt-4 text-muted-foreground">
            These are working prototypes and interface concepts, not finished products. They show
            the direction of custom dealership software: stock control, instalment tracking,
            customer records and reporting. If this fits your business, we can shape a bespoke
            version around your process.
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <figure className="relative">
              <img
                src={mock3.url}
                alt="Concept prototype of a vehicle inventory platform shown on a laptop"
                loading="lazy"
                className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-elegant)]"
              />
              <figcaption className="absolute left-4 top-4 rounded-full border border-primary/30 bg-card/90 px-3 py-1 text-[0.65rem] uppercase tracking-wider text-primary backdrop-blur">
                Prototype · Laptop
              </figcaption>
            </figure>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <Reveal delay={100}>
              <figure className="relative">
                <img
                  src={mock2.url}
                  alt="Concept prototype of the dealership trading platform on a desktop display"
                  loading="lazy"
                  className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-elegant)]"
                />
                <figcaption className="absolute left-4 top-4 rounded-full border border-primary/30 bg-card/90 px-3 py-1 text-[0.65rem] uppercase tracking-wider text-primary backdrop-blur">
                  Concept · Desktop
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={180} className="mx-auto w-40 sm:w-44">
              <PhoneFrame>
                <img
                  src={mockMobile.url}
                  alt="Concept prototype of the vehicle platform on a mobile phone"
                  loading="lazy"
                  className="w-full object-cover"
                />
              </PhoneFrame>
              <p className="mt-3 text-center text-[0.65rem] uppercase tracking-wider text-primary">
                Concept · Mobile
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            {
              t: "Inventory management",
              d: "Vehicle records, availability states, pricing history and photo libraries.",
            },
            {
              t: "Hire-purchase tracking",
              d: "Deposit schedules, instalment plans, balances and payment reminders.",
            },
            {
              t: "Customer & reporting",
              d: "Buyer profiles, agreements, staff roles and business performance reports.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="h-full rounded-2xl border border-dashed border-primary/25 bg-surface/60 p-6">
                <h3 className="font-display text-base font-semibold">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
                <p className="mt-3 text-[0.65rem] uppercase tracking-wider text-muted-foreground/70">
                  Planned capability
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
