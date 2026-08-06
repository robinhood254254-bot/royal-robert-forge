import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { Pricing } from "@/components/site/Pricing";
import { Process } from "@/components/site/Process";
import { PageIntro } from "@/components/site/PageIntro";

const title = "Pricing — Websites from KSh 19,999 | Royal Robert";
const description =
  "Transparent pricing: websites from KSh 19,999 up to KSh 100,000–150,000+, plus Google Business Profile packages at KSh 3,000, 5,000 and 8,000.";

const url = `${SITE_URL}/pricing`;

export const Route = createFileRoute("/pricing")({
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
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Pricing"
        title="Clear starting points, confirmed after we talk"
        body="Every quotation follows a real conversation about your requirements. These ranges help you plan before we speak."
      />
      <Pricing />
      <Process />
    </>
  );
}
