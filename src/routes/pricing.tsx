import { createFileRoute } from "@tanstack/react-router";
import { Pricing } from "@/components/site/Pricing";
import { Process } from "@/components/site/Process";
import { PageIntro } from "@/components/site/PageIntro";

const title = "Pricing — Website Projects from KSh 19,999 | Royal Robert Digital Solutions";
const description =
  "Transparent pricing: websites from KSh 19,999 up to KSh 100,000–150,000+, plus Google Business Profile packages at KSh 3,000, 5,000 and 8,000.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
