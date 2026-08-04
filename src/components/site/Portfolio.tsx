import { useState } from "react";
import { ChevronDown, ExternalLink, MousePointer2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { BrowserFrame, PhoneFrame } from "./Frames";
import { cn } from "@/lib/utils";
import dentals from "@/assets/lebanondentals.com.webp";
import oceansmiles from "@/assets/oceansmiles.webp";
import appMockups from "@/assets/portfolio-mockups.webp";
import dealership from "@/assets/landing_page_for_a_car_website.webp";
import luxuryTall from "@/assets/luxury_car_dealership_and_trading_platform_2.webp";
import luxuryPair from "@/assets/luxury_car_dealership_and_trading_platform.webp";
import responsive from "@/assets/mobile_responsiveness.webp";
import mobileMock from "@/assets/Mockup_mobile_responsiveness.webp";

const projects = [
  {
    id: "oceansmiles",
    label: "Ocean Smile Dental Clinic",
    tag: "Satisfied client",
    url: "oceansmilesdentals.com",
    image: oceansmiles,
    alt: "Ocean Smile Dental Clinic website designed by Royal Robert Digital Solutions",
    summary:
      "A same-day emergency dental clinic website in Mombasa with instant booking, service navigation and a trust-first hero.",
    details: [
      "Emergency-first hero with appointment and call actions",
      "Services mega navigation and company profile download",
      "Patient-rating trust badges and values strip",
      "Fast, mobile-first layout with WhatsApp chat support",
    ],
    link: "https://oceansmilesdentals.com",
  },
  {
    id: "lebanon",
    label: "Lebanon Dental Care",
    tag: "Completed website",
    url: "lebanondentals.com",
    image: dentals,
    alt: "Lebanon Dental Care clinic website homepage with services menu",
    summary:
      "A complete clinic website with a full treatment directory, emergency contact bar and online booking call-to-action.",
    details: [
      "Service directory with 15+ treatments and image cards",
      "Sticky emergency contact strip and Book Now conversion path",
      "Blog, testimonials and structured contact pages",
      "Mobile-first layout with fast image delivery",
    ],
    link: "https://lebanondentals.com",
  },
  {
    id: "royal-autos",
    label: "Royal Autos",
    tag: "Dealership landing page",
    url: "royalautos.co.ke",
    image: dealership,
    alt: "Royal Autos luxury dealership landing page with inventory dashboard preview",
    summary:
      "Premium dealership landing experience with vehicle search, filtering and a live inventory dashboard preview.",
    details: [
      "Make / model / price / year search built into the hero",
      "Inventory dashboard preview with availability states",
      "Finance, services and contact journeys",
      "Designed for high-value vehicle enquiries",
    ],
  },
];

export function Portfolio({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState<string | null>("lebanon");

  return (
    <section className="py-20 lg:py-28" id="portfolio">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Selected work</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Real projects, built end to end
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore live builds and platform demonstrations. Hover or tap a preview to interact.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 120}>
              <article className="h-full overflow-hidden rounded-2xl border border-border bg-surface/70 lift">
                <BrowserFrame label={p.url} className="rounded-none border-0 shadow-none">
                  <div className="overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.alt}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-soft)] hover:scale-[1.04]"
                    />
                  </div>
                </BrowserFrame>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-primary/30 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-wider text-primary">
                      {p.tag}
                    </span>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                      >
                        Visit site <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold">{p.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                  <button
                    type="button"
                    onClick={() => setOpen(open === p.id ? null : p.id)}
                    aria-expanded={open === p.id}
                    className="mt-4 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-primary"
                  >
                    {open === p.id ? "Hide details" : "Project details"}
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform duration-300",
                        open === p.id && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-[var(--ease-out-soft)]",
                      open === p.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <ul className="overflow-hidden text-sm text-muted-foreground">
                      {p.details.map((d) => (
                        <li key={d} className="mt-2 flex gap-2">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Immersive vertical demonstration */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <Reveal>
            <div className="scroll-demo group relative">
              <BrowserFrame label="luxury dealership & trading platform — full page walkthrough">
                <div className="h-[420px] overflow-hidden">
                  <img
                    src={luxuryTall}
                    alt="Full-page scrolling walkthrough of a luxury car dealership and trading platform"
                    loading="lazy"
                    className="w-full object-cover object-top"
                  />
                </div>
              </BrowserFrame>
              <span className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary/30 bg-card/90 px-4 py-2 text-xs text-muted-foreground backdrop-blur transition-opacity duration-300 group-hover:opacity-0">
                <MousePointer2 className="size-3.5 text-primary" /> Hover to scroll the full page
              </span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Immersive demonstration</p>
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
              Luxury car dealership & trading platform
            </h3>
            <p className="mt-4 text-muted-foreground">
              A complete top-to-bottom experience: hero search, service pathways for buying,
              selling and trade-in, featured vehicle grids with booking, and client testimonials —
              all delivered as one continuous, cinematic scroll.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {[
                "Buy · Sell · Trade-in service pathways",
                "Featured vehicle cards with instant booking",
                "Comparison, gallery and account journeys",
                "Dark, high-contrast automotive art direction",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Responsive storytelling */}
        {!compact && (
          <div className="mt-20 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal>
              <p className="eyebrow">Responsive by design</p>
              <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                One product, deliberately designed for every screen
              </h3>
              <p className="mt-4 text-muted-foreground">
                Desktop, tablet and mobile layouts are designed separately, not squeezed. Touch
                targets, cropping, typography and load times are tuned per breakpoint — verified
                against real device widths.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { k: "0.9s", v: "Typical load" },
                  { k: "98/100", v: "Performance target" },
                  { k: "0", v: "Horizontal overflow" },
                ].map((m) => (
                  <div key={m.v} className="rounded-xl border border-border bg-surface/70 p-4">
                    <p className="font-display text-lg font-bold text-primary">{m.k}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{m.v}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120} className="relative">
              <img
                src={responsive}
                alt="Desktop, tablet and mobile presentations of a responsive digital product"
                loading="lazy"
                className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-elegant)]"
              />
              <div className="absolute -bottom-8 -left-2 w-24 sm:w-32">
                <PhoneFrame>
                  <img
                    src={mobileMock}
                    alt="Mobile vehicle platform layout"
                    loading="lazy"
                    className="w-full object-cover"
                  />
                </PhoneFrame>
              </div>
              <img
                src={luxuryPair}
                alt="Desktop and mobile views of the vehicle trading platform"
                loading="lazy"
                className="absolute -right-3 -top-8 hidden w-28 rounded-xl border border-border shadow-[var(--shadow-elegant)] sm:block lg:w-36"
              />
            </Reveal>
          </div>
        )}

        {/* Product & app design showcase */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary/40 p-4">
              <img
                src={appMockups}
                alt="Collection of mobile app screens: delivery tracking, checkout, dashboards, instalment payments and video consultation"
                loading="lazy"
                className="w-full object-contain transition-transform duration-700 ease-[var(--ease-out-soft)] hover:scale-[1.03]"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Product & app design</p>
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
              Interfaces built for real day-to-day use
            </h3>
            <p className="mt-4 text-muted-foreground">
              Delivery tracking, checkout flows, branch dashboards, instalment plans and live
              consultation screens — designed around the way people actually work, then tested on
              real device widths.
            </p>
            <ul className="mt-5 grid gap-2.5 text-sm text-muted-foreground sm:grid-cols-2">
              {[
                "Order tracking & dispatch",
                "Cart and secure checkout",
                "Instalment / hire-purchase plans",
                "Branch & inventory dashboards",
                "Live consultation screens",
                "Assistance & safety flows",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
