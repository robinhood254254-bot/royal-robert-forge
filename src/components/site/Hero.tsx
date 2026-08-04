import { Link } from "@tanstack/react-router";
import { MessageCircle, ArrowRight, ShieldCheck, Sparkles, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { BrowserFrame } from "./Frames";
import { waLink } from "@/lib/site";
import innovation from "@/assets/innovation_technology_and_SEO.webp.asset.json";
import dealership from "@/assets/landing_page_for_a_car_website.png.asset.json";
import mobileResponsive from "@/assets/Mockup_mobile_responsiveness.webp.asset.json";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden hero-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `url(${innovation.url})`,
          backgroundSize: "cover",
          backgroundPosition: "top right",
          maskImage: "linear-gradient(to left, rgba(0,0,0,0.9), transparent 72%)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.9), transparent 72%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines opacity-40" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pb-28 lg:pt-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-secondary/70 px-3 py-1.5 text-xs font-medium text-gold">
              <Sparkles className="size-3.5" /> One dedicated professional · Not an agency
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Building powerful <span className="text-gradient-gold">digital experiences</span>{" "}
              — one client at a time
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Corporate and portfolio websites, e-commerce platforms, custom web applications,
              business software and Google Business Profile visibility. Every project starts with a
              real one-on-one conversation about your goals — never a template handed over.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="shadow-[var(--shadow-gold)]">
                <a
                  href={waLink(
                    "Hello Royal Robert, I'd like to book a one-on-one consultation about my project.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle /> Chat on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gold/40 bg-transparent text-foreground hover:bg-secondary"
              >
                <Link to="/contact">
                  Book a One-on-One Consultation <ArrowRight />
                </Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, k: "From KSh 19,999", v: "Transparent project pricing" },
                { icon: Timer, k: "Direct line", v: "You talk to the builder" },
                { icon: Sparkles, k: "Mobile-first", v: "Fast, responsive, SEO-ready" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl border border-border bg-surface/70 p-4">
                  <s.icon className="size-4 text-gold" />
                  <dt className="mt-2 font-display text-sm font-semibold">{s.k}</dt>
                  <dd className="text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative mx-auto max-w-xl">
            <BrowserFrame label="royalautos.co.ke — dealership build">
              <img
                src={dealership.url}
                alt="Luxury car dealership website landing page designed by Royal Robert Digital Solutions"
                loading="eager"
                className="aspect-[16/10] w-full object-cover"
              />
            </BrowserFrame>
            <div className="absolute -bottom-10 -left-4 w-28 sm:-left-10 sm:w-36">
              <img
                src={mobileResponsive.url}
                alt="Mobile view of a responsive vehicle platform"
                loading="lazy"
                className="w-full rounded-2xl border border-border shadow-[var(--shadow-elegant)]"
              />
            </div>
            <div className="absolute -right-2 top-6 hidden rounded-xl border border-gold/30 bg-navy-deep/90 px-4 py-3 backdrop-blur sm:block">
              <p className="eyebrow">Live project</p>
              <p className="mt-1 font-display text-sm font-semibold">Dealership platform</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
