import { Link } from "@tanstack/react-router";
import {
  Building2,
  UserRound,
  ShoppingCart,
  Code2,
  Cpu,
  MapPin,
  TrendingUp,
  Car,
  Boxes,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import innovation from "@/assets/innovation_technology_and_SEO.webp.asset.json";
import store from "@/assets/online-store.webp.asset.json";

export const services = [
  {
    icon: Building2,
    title: "Corporate websites",
    body: "Credible, fast company websites that explain what you do and turn visitors into enquiries.",
  },
  {
    icon: UserRound,
    title: "Portfolio websites",
    body: "Personal and professional showcases for creatives, consultants and specialists.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce platforms",
    body: "Product catalogues, carts, checkout and order flows built for real Kenyan buying habits.",
  },
  {
    icon: Code2,
    title: "Custom web applications",
    body: "Dashboards, portals and booking systems tailored to how your team actually works.",
  },
  {
    icon: Cpu,
    title: "Business software",
    body: "Internal tools that replace spreadsheets — records, reporting, roles and automation.",
  },
  {
    icon: MapPin,
    title: "Google Business Profile",
    body: "Location setup, optimisation and management so nearby customers find you first.",
  },
  {
    icon: TrendingUp,
    title: "Digital visibility & SEO",
    body: "Technical SEO, structured content and measurable growth in search traffic.",
  },
  {
    icon: Car,
    title: "Car dealership websites",
    body: "Inventory-led dealership sites with search, filtering and enquiry capture.",
  },
  {
    icon: Boxes,
    title: "Vehicle inventory & hire-purchase systems",
    body: "Custom software concepts for stock, instalments and customer records. Currently in prototype.",
    badge: "In development",
  },
];

export function Services({ compact = false }: { compact?: boolean }) {
  return (
    <section className="relative overflow-hidden border-y border-border bg-secondary/60 py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${innovation.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "radial-gradient(70% 60% at 50% 0%, rgba(0,0,0,0.8), transparent 70%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 0%, rgba(0,0,0,0.8), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">What I build</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Focused digital solutions, matched to your business stage
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every engagement begins with understanding the problem. Then we choose the right build —
            nothing more, nothing less.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(compact ? services.slice(0, 6) : services).map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <article className="group h-full rounded-2xl border border-border bg-surface/80 p-6 lift">
                <span className="grid size-11 place-items-center rounded-xl border border-primary/25 bg-primary/10">
                  <s.icon className="size-5 text-primary" />
                </span>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  {"badge" in s && s.badge ? (
                    <span className="rounded-full border border-primary/30 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-primary">
                      {s.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>


        <Reveal delay={140}>
          <div className="mt-14 grid items-center gap-8 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-elegant)] lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
            <div className="relative overflow-hidden rounded-2xl bg-secondary/40">
              <img
                src={store.url}
                alt="Online store dashboard showing sales growth, conversion analytics and secure checkout"
                loading="lazy"
                className="w-full object-contain transition-transform duration-700 ease-[var(--ease-out-soft)] hover:scale-[1.03]"
              />
            </div>
            <div>
              <p className="eyebrow">E-commerce solutions</p>
              <h3 className="mt-3 text-2xl font-bold sm:text-3xl">Launch your online store</h3>
              <p className="mt-3 text-muted-foreground">
                Product catalogues, secure payments, order notifications and live sales analytics —
                a store designed to grow revenue, not just to look good.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { k: "SEO", v: "Optimised" },
                  { k: "Mobile", v: "Responsive" },
                  { k: "Secure", v: "Payments" },
                  { k: "24/7", v: "Business online" },
                ].map((f) => (
                  <div key={f.k} className="rounded-xl border border-border bg-secondary/50 p-3">
                    <p className="font-display text-sm font-bold text-primary">{f.k}</p>
                    <p className="text-xs text-muted-foreground">{f.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {compact && (
          <Reveal delay={120}>
            <div className="mt-10">
              <Button asChild variant="outline" className="border-primary/40 bg-transparent">
                <Link to="/services">See all services</Link>
              </Button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
