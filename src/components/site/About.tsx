import { Link } from "@tanstack/react-router";
import { MessageSquare, Search, PenTool, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import person from "@/assets/inspiration_advancement.png.asset.json";

const pillars = [
  {
    icon: MessageSquare,
    title: "Direct one-on-one communication",
    body: "No account managers, no hand-offs. You speak with the person actually designing and building your product.",
  },
  {
    icon: Search,
    title: "Requirements before code",
    body: "I take time to understand your business, customers and goals first, then propose the smallest solution that truly fits.",
  },
  {
    icon: PenTool,
    title: "Focused, tailored builds",
    body: "Websites, e-commerce and software shaped around your workflow — not forced into a generic template.",
  },
  {
    icon: Rocket,
    title: "Built to be found and used",
    body: "Search visibility, Google Business Profile, speed and mobile usability are part of the build, not an upsell.",
  },
];

export function About() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28" id="about">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden
            className="absolute inset-4 rounded-full bg-[var(--gradient-gold)] opacity-20 blur-3xl"
          />
          <img
            src={person.url}
            alt="A client engaging with a tablet in front of the Royal Robert brand mark"
            loading="lazy"
            className="relative w-full rounded-full border border-border shadow-[var(--shadow-elegant)]"
          />
          <div className="relative mx-auto -mt-8 w-fit rounded-full border border-primary/30 bg-card/90 px-5 py-2.5 text-center backdrop-blur">
            <p className="font-display text-sm font-semibold">Human first, technology second</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">Who you work with</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              A dedicated professional who listens before building
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Royal Robert Digital Solutions is led by one committed developer and designer. That
              means faster decisions, honest advice, and a solution shaped precisely around what
              your business actually needs — from a first corporate website to vehicle inventory
              and hire-purchase software.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="h-full rounded-2xl border border-border bg-surface/70 p-5 lift">
                  <p.icon className="size-5 text-primary" />
                  <h3 className="mt-3 font-display text-base font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <Button asChild size="lg" className="mt-8">
              <Link to="/contact">Start with a conversation</Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
