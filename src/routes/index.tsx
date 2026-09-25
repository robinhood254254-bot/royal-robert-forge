import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { FutureLab } from "@/components/site/FutureLab";
import { Process } from "@/components/site/Process";
import { CampaignShowcase } from "@/components/site/CampaignShowcase";
import { Contact } from "@/components/site/Contact";

const title = "Websites & Business Software in Kenya | Royal Robert";
const description =
  "Professional websites, e-commerce platforms, custom web apps and digital visibility solutions for ambitious Kenyan businesses.";

const url = `${SITE_URL}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
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
          "@type": "ProfessionalService",
          name: "Royal Robert Digital Solutions",
          description,
          areaServed: "Kenya",
          telephone: "+254710837083",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <About />
      <Services compact />
      <CampaignShowcase />
      <Portfolio />
      <FutureLab />
      <Process />
      <Contact />
    </>
  );
}
