import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Timer, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { BrowserFrame } from "./Frames";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink } from "@/lib/site";
import innovation from "@/assets/innovation_technology_and_SEO.webp";
import dealership from "@/assets/landing_page_for_a_car_website.webp";
import mobileResponsive from "@/assets/Mockup_mobile_responsiveness.webp";

const headlines = [
  {
    lead: "We listen carefully,",
    typed: "then build what your business actually needs",
  },
  {
    lead: "Websites engineered to",
    typed: "turn visitors into paying customers",
  },
  {
    lead: "E-commerce platforms that",
    typed: "sell securely, 24 hours a day",
  },
  {
    lead: "Business software that",
    typed: "runs your operations without the chaos",
  },
];

const testimonials = [
  {
    quote:
      "Robert listened to every detail of how our clinic works, then delivered a website that books patients for us daily.",
    name: "Ocean Smile Dental Clinic",
    role: "oceansmilesdentals.com — Mombasa",
  },
  {
    quote:
      "Direct communication throughout. No account managers, no delays — just a fast, beautiful store that converts.",
    name: "Online Retail Client",
    role: "E-commerce platform, Nairobi",
  },
  {
    quote:
      "Our dealership finally has a platform that shows inventory properly and looks premium on every phone.",
    name: "Motor Dealership Client",
    role: "Vehicle trading platform",
  },
];

function useTypewriter(text: string, active: boolean) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) return;
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 34);
    return () => clearInterval(id);
  }, [text, active]);
  return out;
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const [tIndex, setTIndex] = useState(0);
  const current = headlines[index]!;
  const typed = useTypewriter(current.typed, true);

  useEffect(() => {
    const id = setInterval(() => setIndex((v) => (v + 1) % headlines.length), 6200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTIndex((v) => (v + 1) % testimonials.length), 5200);
    return () => clearInterval(id);
  }, []);

  const testimonial = useMemo(() => testimonials[tIndex]!, [tIndex]);

  return (
    <section className="relative isolate overflow-hidden hero-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${innovation})`,
          backgroundSize: "cover",
          backgroundPosition: "top right",
          maskImage: "linear-gradient(to left, rgba(0,0,0,0.95) 10%, rgba(0,0,0,0.45) 55%, transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,0.95) 10%, rgba(0,0,0,0.45) 55%, transparent 85%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines opacity-50" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pb-20 lg:pt-14">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" /> One dedicated professional · Direct communication
            </span>
          </Reveal>

          <h1 className="mt-6 min-h-[8.5rem] text-4xl font-bold leading-[1.08] sm:min-h-[10rem] sm:text-5xl lg:min-h-[11.5rem] lg:text-6xl">
            <span className="block text-navy-deep">{current.lead}</span>
            <span key={index} className="mt-2 block caret text-gradient-gold">
              {typed}
            </span>
          </h1>

          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Corporate and portfolio websites, e-commerce platforms, custom web applications,
              business software and Google Business Profile visibility — planned around your goals
              in a real one-on-one conversation.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-whatsapp font-semibold text-white glow-green transition-transform hover:scale-[1.03] hover:bg-whatsapp"
              >
                <a
                  href={waLink(
                    "Hello Royal Robert, I'd like to book a one-on-one consultation about my project.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="size-5" /> Click to Chat
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-full glow-primary transition-transform hover:scale-[1.03]"
              >
                <Link to="/contact">
                  Book a Free Consultation <ArrowRight />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 max-w-xl overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-elegant)]">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <div key={tIndex} className="reveal reveal-in">
                <p className="mt-3 flex gap-2 text-sm leading-relaxed text-foreground/85">
                  <Quote className="size-4 shrink-0 text-primary" />
                  {testimonial.quote}
                </p>
                <p className="mt-3 font-display text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
              <div className="mt-4 flex gap-1.5">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => setTIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === tIndex ? "w-7 bg-primary" : "w-3 bg-primary/25"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, k: "From KSh 19,999", v: "Transparent project pricing" },
                { icon: Timer, k: "Direct line", v: "You talk to the builder" },
                { icon: Sparkles, k: "Mobile-first", v: "Fast, responsive, SEO-ready" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl border border-border bg-card p-4 lift">
                  <s.icon className="size-4 text-primary" />
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
                src={dealership}
                alt="Luxury car dealership website landing page designed by Royal Robert Digital Solutions"
                loading="eager"
                className="aspect-[16/10] w-full object-cover"
              />
            </BrowserFrame>
            <div className="absolute -bottom-10 -left-4 w-28 sm:-left-10 sm:w-36">
              <img
                src={mobileResponsive}
                alt="Mobile view of a responsive vehicle platform"
                loading="lazy"
                className="w-full rounded-2xl border border-border shadow-[var(--shadow-elegant)]"
              />
            </div>
            <div className="absolute -right-2 top-6 hidden rounded-xl border border-primary/20 bg-card/95 px-4 py-3 backdrop-blur sm:block">
              <p className="eyebrow">Live project</p>
              <p className="mt-1 font-display text-sm font-semibold">Dealership platform</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
