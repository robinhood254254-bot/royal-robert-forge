import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK, SECONDARY_TEL } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          {/* Placeholder: official Royal Robert logo not yet supplied */}
          <span
            aria-hidden
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gold/40 bg-secondary font-display text-sm font-bold text-gold"
            title="Logo placeholder — official logo pending"
          >
            RR
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-bold tracking-tight sm:text-base">
              Royal Robert
            </span>
            <span className="block truncate text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              Digital Solutions
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-gold" }}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button asChild size="sm" className="hidden shadow-none sm:inline-flex">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> Chat on WhatsApp
            </a>
          </Button>
          <Button
            asChild
            size="icon"
            variant="outline"
            className="border-border bg-secondary sm:hidden"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
              <MessageCircle />
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-border bg-secondary lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-gold" }}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3.5 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={SECONDARY_TEL}
              className="mt-1 mb-3 flex items-center gap-2 rounded-lg px-3 py-3.5 text-base font-medium text-muted-foreground hover:bg-secondary"
            >
              <Phone className="size-4" /> Call +254 792 645 485
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
