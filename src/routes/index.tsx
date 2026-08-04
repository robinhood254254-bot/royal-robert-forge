import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { FutureLab } from "@/components/site/FutureLab";
import { Process } from "@/components/site/Process";
import { Pricing } from "@/components/site/Pricing";
import { Contact } from "@/components/site/Contact";

const title = "Royal Robert Digital Solutions | Websites, E-commerce & Business Software in Kenya";
const description =
  "Premium websites, e-commerce platforms, custom web apps and Google Business Profile services built one-on-one. Projects from KSh 19,999. Chat on WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
          priceRange: "KSh 19,999+",
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
      <Portfolio />
      <FutureLab />
      <Process />
      <Pricing />
      <Contact />
    </>
  );
}
