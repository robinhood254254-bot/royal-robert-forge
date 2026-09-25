import { Link } from "@tanstack/react-router";
import { MessageSquare, Search, PenTool, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import person from "@/assets/inspiration_advancement.webp";

const pillars = [
  {
    icon: MessageSquare,
    title: "Clear communication",
    body: "Practical conversations keep decisions, feedback and delivery focused throughout the project.",
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
    <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20" id="about">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal className="relative mx-auto w-full max-w-md">
          <img
            src={person}
            alt="A client engaging with a tablet in front of the Royal Robert brand mark"
            loading="lazy"
            className="relative w-full border-8 border-gold shadow-[var(--shadow-elegant)]"
          />
          <div className="relative mx-auto -mt-8 w-fit border border-primary bg-card px-5 py-2.5 text-center">
            <p className="font-display text-sm font-semibold">Human first, technology second</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">Who you work with</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
               Strategy first. Design and technology with a purpose.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
               We start by understanding the business, the audience and the result the solution
               must create. That keeps every website, online store and software build focused on
               useful outcomes rather than decoration or generic templates.
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
