import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { WHATSAPP_LINK, WHATSAPP_NUMBER, SECONDARY_NUMBER, SECONDARY_TEL, EMAIL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            One dedicated professional building corporate websites, e-commerce platforms, custom
            web applications and business software — with direct, one-on-one communication from
            first conversation to launch.
          </p>
        </div>


        <div>
          <h3 className="font-display text-sm font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {[
              { to: "/", label: "Home" },
              { to: "/services", label: "Services" },
              { to: "/portfolio", label: "Portfolio" },
              { to: "/pricing", label: "Pricing" },
              { to: "/contact", label: "Contact & Consultation" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold">Solutions</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>Corporate & portfolio websites</li>
            <li>E-commerce platforms</li>
            <li>Custom web applications</li>
            <li>Business software</li>
            <li>Google Business Profile</li>
            <li>Car dealership websites</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold">Talk to me directly</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-muted-foreground transition-colors hover:text-primary"
              >
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-whatsapp" />
                <span>
                  <span className="block text-foreground">{WHATSAPP_NUMBER}</span>
                  Primary — WhatsApp chat & project inquiries
                </span>
              </a>
            </li>
            <li>
              <a
                href={SECONDARY_TEL}
                className="flex items-start gap-2.5 text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  <span className="block text-foreground">{SECONDARY_NUMBER}</span>
                  Secondary — calls & alternative inquiries
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-start gap-2.5 text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="break-all">{EMAIL}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Royal Robert Digital Solutions. Nairobi, Kenya.
        </div>
      </div>
    </footer>
  );
}
