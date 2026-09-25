import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { MonitorFrame } from "./Frames";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink } from "@/lib/site";
import dealership from "@/assets/landing_page_for_a_car_website.webp";
import mombasaHearing from "@/assets/mombasahearing.com.webp";
import oceansmiles from "@/assets/oceansmiles.webp";
import onlineStore from "@/assets/online-store.webp";
import mobileResponsive from "@/assets/Mockup_mobile_responsiveness.webp";

const headlines = [
  {
    lead: "We listen carefully,",
    typed: "then build what your business actually needs",
    image: mombasaHearing,
    site: "mombasahearing.com — Mombasa Hearing Centre",
    caption: "Live client",
    project: "Specialist hearing care",
    alt: "Mombasa Hearing Centre website built by Royal Robert Digital Solutions",
  },
  {
    lead: "Websites engineered to",
    typed: "turn visitors into paying customers",
    image: oceansmiles,
    site: "oceansmilesdentals.com — dental clinic",
    caption: "Live client",
    project: "Dental clinic platform",
    alt: "Ocean Smile Dental Clinic website built by Royal Robert Digital Solutions",
  },
  {
    lead: "E-commerce platforms that",
    typed: "sell securely, 24 hours a day",
    image: onlineStore,
    site: "online store — secure checkout",
    caption: "E-commerce",
    project: "Online store build",
    alt: "Online store web design with secure payments and SEO growth",
  },
  {
    lead: "Business software that",
    typed: "runs your operations without the chaos",
    image: dealership,
    site: "royalautos.co.ke — dealership build",
    caption: "Live project",
    project: "Dealership platform",
    alt: "Luxury car dealership website landing page designed by Royal Robert Digital Solutions",
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

export function Hero() {
  const [index, setIndex] = useState(0);
  const [tIndex, setTIndex] = useState(0);
  const current = headlines[index]!;

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
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pb-16 lg:pt-12">
        <div>
          <p className="eyebrow border-l-4 border-gold pl-3">Royal Robert Digital Solutions</p>
          <h1 className="mt-5 min-h-[8.5rem] text-4xl font-bold uppercase leading-[1.05] sm:min-h-[10rem] sm:text-5xl lg:min-h-[11.5rem] lg:text-6xl">
            <span className="block text-navy-deep">{current.lead}</span>
            <span key={index} className="mt-2 block text-primary">
              {current.typed}
            </span>
          </h1>

          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Corporate and portfolio websites, e-commerce platforms, custom web applications,
               business software and digital visibility — designed around clear commercial goals.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                 className="rounded-sm bg-whatsapp font-semibold text-primary-foreground transition-transform hover:translate-y-[-2px] hover:bg-whatsapp"
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
                 className="rounded-sm transition-transform hover:translate-y-[-2px]"
              >
                <Link to="/contact">
                  Book a Free Consultation <ArrowRight />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 max-w-xl overflow-hidden border-l-8 border-gold bg-navy-deep p-5 text-primary-foreground">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <div key={tIndex} className="reveal reveal-in">
                 <p className="mt-3 flex gap-2 text-sm leading-relaxed text-primary-foreground/85">
                  <Quote className="size-4 shrink-0 text-primary" />
                  {testimonial.quote}
                </p>
                <p className="mt-3 font-display text-sm font-semibold">{testimonial.name}</p>
                 <p className="text-xs text-primary-foreground/65">{testimonial.role}</p>
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

        </div>

        <Reveal delay={200} className="relative lg:sticky lg:top-28 lg:self-start">
          <div className="relative mx-auto max-w-xl">
            <MonitorFrame label={current.site}>
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                {headlines.map((h, i) => (
                  <img
                    key={h.site}
                    src={h.image}
                    alt={h.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    className={`absolute inset-0 size-full object-cover object-top transition-all duration-700 ease-[var(--ease-out-soft)] ${
                      i === index ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                    }`}
                  />
                ))}
              </div>
            </MonitorFrame>
            <div className="absolute -bottom-6 -left-4 w-24 sm:-bottom-8 sm:-left-10 sm:w-32">
              <img
                src={mobileResponsive}
                alt="Mobile view of a responsive website build"
                loading="lazy"
                className="w-full rounded-2xl border border-border shadow-[var(--shadow-elegant)]"
              />
            </div>
            <div className="absolute -right-2 top-6 hidden border border-primary/20 bg-card px-4 py-3 sm:block">
              <p className="eyebrow">{current.caption}</p>
              <p className="mt-1 font-display text-sm font-semibold">{current.project}</p>
            </div>
            <div className="mt-5 flex justify-center gap-1.5">
              {headlines.map((h, i) => (
                <button
                  key={h.site}
                  aria-label={`Show project ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-7 bg-primary" : "w-3 bg-primary/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
