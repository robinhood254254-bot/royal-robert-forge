import { Link } from "@tanstack/react-router";
import { Check, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const websiteTiers = [
  {
    name: "Essential website",
    price: "From KSh 19,999",
    body: "A focused, professional presence for a new or small business.",
    points: [
      "Up to 5 well-structured pages",
      "Mobile-first responsive design",
      "Contact form + WhatsApp integration",
      "Basic on-page SEO setup",
    ],
  },
  {
    name: "Business & e-commerce",
    price: "KSh 45,000 – 100,000",
    body: "Larger corporate sites, catalogues and online stores.",
    points: [
      "Multi-page corporate or shop structure",
      "Product catalogue, cart and checkout",
      "Blog, galleries and content systems",
      "Analytics, SEO and speed optimisation",
    ],
    featured: true,
  },
  {
    name: "Custom software",
    price: "KSh 100,000 – 150,000+",
    body: "Web applications, dashboards and business systems.",
    points: [
      "Accounts, roles and permissions",
      "Databases, records and reporting",
      "Payments and third-party integrations",
      "Inventory / hire-purchase style workflows",
    ],
  },
];

const gbpTiers = [
  {
    name: "Basic Location Setup",
    price: "KSh 3,000",
    points: ["Profile creation & verification guidance", "Accurate business details & map pin", "Category and hours setup"],
  },
  {
    name: "Standard Profile Setup",
    price: "KSh 5,000",
    points: ["Everything in Basic", "Photos, services and description copy", "Review prompts & messaging setup"],
  },
  {
    name: "Advanced Digital Visibility",
    price: "KSh 8,000",
    points: [
      "Everything in Standard",
      "Keyword-optimised profile content",
      "Posts, Q&A and performance insights",
      "Website + profile visibility alignment",
    ],
    recommended: true,
  },
];

export function Pricing() {
  return (
    <section className="border-y border-border bg-secondary/60 py-20 lg:py-28" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Investment</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Transparent starting points</h2>
          <p className="mt-4 text-muted-foreground">
            Professional website projects start from <strong className="text-foreground">KSh 19,999</strong>{" "}
            and typically range to around KSh 100,000–150,000 or more depending on website type,
            number of pages, features, integrations, content volume, e-commerce requirements and
            software complexity. Final pricing is confirmed only after your requirements are
            understood.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {websiteTiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-2xl border bg-surface/70 p-7 lift",
                  t.featured ? "border-primary/50 shadow-[var(--shadow-gold)]" : "border-border",
                )}
              >
                <h3 className="font-display text-lg font-semibold">{t.name}</h3>
                <p className="mt-2 font-display text-2xl font-bold text-gradient-gold">{t.price}</p>
                <p className="mt-3 text-sm text-muted-foreground">{t.body}</p>
                <ul className="mt-5 flex-1 space-y-2.5 text-sm text-muted-foreground">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6" variant={t.featured ? "default" : "outline"}>
                  <Link to="/contact">Request a Custom Quote</Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 max-w-2xl">
          <p className="eyebrow">Google Business Profile</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Local visibility packages</h2>
          <p className="mt-4 text-muted-foreground">
            Get found by customers searching nearby, on Google Search and Maps.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {gbpTiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-surface/70 p-7 lift",
                  t.recommended
                    ? "border-primary bg-[var(--gradient-panel)] shadow-[var(--shadow-gold)]"
                    : "border-border",
                )}
              >
                {t.recommended && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-[var(--gradient-gold)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-primary-foreground">
                    <Star className="size-3" /> Recommended · Best value
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold">{t.name}</h3>
                <p className="mt-2 font-display text-2xl font-bold text-gradient-gold">{t.price}</p>
                <ul className="mt-5 flex-1 space-y-2.5 text-sm text-muted-foreground">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="mt-6"
                  variant={t.recommended ? "default" : "outline"}
                >
                  <a
                    href={waLink(
                      `Hello Royal Robert, I'm interested in the ${t.name} Google Business Profile package (${t.price}).`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle /> Discuss this package
                  </a>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 rounded-2xl border border-border bg-surface/60 p-5 text-sm text-muted-foreground">
            No deposit is requested before your requirements, scope, quotation and agreement have
            been discussed and confirmed together.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
