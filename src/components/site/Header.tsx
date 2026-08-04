import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, ChevronDown, Globe, ShoppingCart, Code2, MapPin, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { WHATSAPP_LINK, SECONDARY_TEL } from "@/lib/site";
import mark from "@/assets/royal-robert-mark.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services", mega: true },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
] as const;

const megaItems = [
  {
    icon: Globe,
    title: "Corporate & Portfolio Websites",
    body: "Brand-led websites that build instant credibility.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Platforms",
    body: "Online stores with secure checkout and analytics.",
  },
  {
    icon: Code2,
    title: "Custom Web Applications",
    body: "Dashboards, inventory and business software.",
  },
  {
    icon: MapPin,
    title: "Google Business Profile",
    body: "Get found on Search and Maps by nearby customers.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first Redesigns",
    body: "Fast, responsive rebuilds of tired websites.",
  },
];

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <img
        src={mark}
        alt="Royal Robert Digital Solutions crown logo"
        className={compact ? "h-11 w-11 shrink-0 object-contain" : "h-14 w-14 shrink-0 object-contain"}
      />
      <span className="min-w-0 leading-none">
        <span
          className={`block truncate font-display font-extrabold tracking-tight text-navy-deep ${
            compact ? "text-[1.05rem]" : "text-xl sm:text-2xl"
          }`}
        >
          ROYAL ROBERT
        </span>
        <span
          className={`mt-1 block truncate font-display font-semibold uppercase tracking-[0.28em] text-muted-foreground ${
            compact ? "text-[0.5rem]" : "text-[0.58rem] sm:text-[0.68rem]"
          }`}
        >
          Digital Solutions
        </span>
      </span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`nav-enter mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-full nav-pill px-3 py-2 transition-shadow duration-500 sm:px-5 ${
          scrolled ? "shadow-[0_18px_46px_-24px_rgba(30,51,82,0.5)]" : ""
        }`}
      >
        <Link to="/" className="min-w-0" onClick={() => setOpen(false)} aria-label="Royal Robert Digital Solutions home">
          <Logo compact />
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => setMega("mega" in item && item.mega ? true : false)}
                onMouseLeave={() => setMega(false)}
              >
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "bg-primary/10 text-primary" }}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-foreground/70 transition-all hover:bg-primary/10 hover:text-primary"
                >
                  {item.label}
                  {"mega" in item && item.mega && <ChevronDown className="size-3.5" />}
                </Link>

                {"mega" in item && item.mega && mega && (
                  <div className="absolute left-1/2 top-full w-[min(44rem,80vw)] -translate-x-1/2 pt-3">
                    <div className="nav-enter grid gap-1 rounded-3xl border border-border bg-popover p-3 shadow-[var(--shadow-elegant)] sm:grid-cols-2">
                      {megaItems.map((m) => (
                        <Link
                          key={m.title}
                          to="/services"
                          onClick={() => setMega(false)}
                          className="flex gap-3 rounded-2xl p-3 transition-colors hover:bg-primary/8"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                            <m.icon className="size-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold">{m.title}</span>
                            <span className="block text-xs text-muted-foreground">{m.body}</span>
                          </span>
                        </Link>
                      ))}
                      <a
                        href={SECONDARY_TEL}
                        className="flex items-center gap-3 rounded-2xl bg-secondary p-3 text-sm font-semibold transition-colors hover:bg-primary/10"
                      >
                        <Phone className="size-4 text-primary" /> Talk it through: +254 792 645 485
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <Button
            asChild
            size="sm"
            className="hidden rounded-full bg-whatsapp px-4 font-semibold text-white glow-green transition-transform hover:scale-[1.04] hover:bg-whatsapp sm:inline-flex"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" /> Click to Chat
            </a>
          </Button>
          <Button
            asChild
            size="icon"
            className="rounded-full bg-whatsapp text-white glow-green hover:bg-whatsapp sm:hidden"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
              <WhatsAppIcon className="size-5" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border bg-secondary lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="nav-enter mx-auto mt-2 max-w-7xl rounded-3xl border border-border bg-popover p-2 shadow-[var(--shadow-elegant)] lg:hidden">
          <nav className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-primary/10 text-primary" }}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3.5 text-base font-semibold text-foreground/80 transition-colors hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={SECONDARY_TEL}
              className="mt-1 flex items-center gap-2 rounded-2xl px-4 py-3.5 text-base font-medium text-muted-foreground hover:bg-secondary"
            >
              <Phone className="size-4 text-primary" /> Call +254 792 645 485
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
