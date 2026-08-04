import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Smartphone, CreditCard, ShoppingBag, Bot, MapPin, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { waLink, SITE_URL } from "@/lib/site";

const title = "Blog — Digital Solutions Growing Fastest in Kenya | Royal Robert Digital Solutions";
const description =
  "What Kenyan businesses are investing in right now: mobile-first websites, M-Pesa checkout, e-commerce, AI tools, eTIMS compliance and Google Business Profile visibility.";
const url = `${SITE_URL}/blog`;

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Digital solutions growing fastest in Kenya",
          description,
          author: { "@type": "Organization", name: "Royal Robert Digital Solutions" },
          publisher: { "@type": "Organization", name: "Royal Robert Digital Solutions" },
          mainEntityOfPage: url,
        }),
      },
    ],
  }),
  component: BlogPage,
});

const posts = [
  {
    icon: Smartphone,
    tag: "Web design",
    title: "Mobile-first websites are no longer optional",
    body: "The large majority of Kenyan browsing sessions happen on a phone, often on 4G in busy areas. Sites built desktop-first load slowly, break on small screens and lose the visitor before the first scroll. Every build I deliver starts at 375px, targets fast load times on mobile data, and keeps the call-to-action visible without scrolling.",
    demand: "Highest demand — every sector",
  },
  {
    icon: CreditCard,
    tag: "Payments",
    title: "M-Pesa checkout and STK push integration",
    body: "Mobile money is how Kenya pays. A website that sends customers to a WhatsApp DM to \"send to till\" loses orders and creates reconciliation chaos. Integrated M-Pesa checkout with automatic confirmation, order records and receipts turns a catalogue into a real store.",
    demand: "Fast growing — retail, services, schools",
  },
  {
    icon: ShoppingBag,
    tag: "E-commerce",
    title: "From Instagram DMs to a real online store",
    body: "Many Kenyan brands still sell entirely through social DMs. Moving to a proper store with stock levels, delivery zones, cash-on-delivery options and order tracking removes wrong sizes, unpaid reservations and lost messages — and it scales past the owner's phone.",
    demand: "Fast growing — fashion, electronics, FMCG",
  },
  {
    icon: MapPin,
    tag: "Local visibility",
    title: "Google Business Profile and local SEO",
    body: "\"Dentist near me\", \"car dealer Nairobi\", \"plumber Mombasa\" — these searches convert immediately. A correctly optimised Google Business Profile with photos, service areas, hours, reviews and a linked website often produces more calls in a month than paid ads.",
    demand: "High demand — clinics, dealerships, trades",
  },
  {
    icon: Bot,
    tag: "AI & automation",
    title: "Practical AI for small Kenyan businesses",
    body: "Kenya's next digital phase is being driven by AI on top of the mobile-money rails. The realistic wins are practical ones: automated enquiry replies, WhatsApp lead capture, quotation drafting, product description generation and internal search over your own documents.",
    demand: "Emerging, growing quickly",
  },
  {
    icon: ReceiptText,
    tag: "Compliance & systems",
    title: "eTIMS-ready invoicing and business software",
    body: "Tax compliance pushed thousands of SMEs into digital record keeping. Custom business software — inventory, hire-purchase tracking, invoicing, staff and client records — is now a survival tool rather than a luxury, especially for dealerships and distributors.",
    demand: "Growing — SMEs, dealerships, distributors",
  },
];

function BlogPage() {
  return (
    <>
      <PageIntro
        eyebrow="Insights"
        title="Digital solutions growing fastest in Kenya"
        body="A practical look at what Kenyan businesses are actually investing in right now — and what I recommend when we sit down for a one-on-one consultation."
      />

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 lift">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                    <p.icon className="size-3.5" /> {p.tag}
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold leading-snug">{p.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  <p className="mt-4 text-xs font-semibold text-foreground/70">{p.demand}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-primary/25 bg-secondary/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="font-display text-xl font-semibold">
                  Not sure which of these your business needs?
                </h2>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  Tell me how you currently sell and serve customers, and I'll advise on the one or
                  two changes that will make the biggest difference first.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-whatsapp font-semibold text-white glow-green hover:bg-whatsapp"
                >
                  <a
                    href={waLink("Hello Royal Robert, I read your blog and I'd like advice for my business.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="size-5" /> Click to Chat
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-primary/40">
                  <Link to="/contact">
                    Book a consultation <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
