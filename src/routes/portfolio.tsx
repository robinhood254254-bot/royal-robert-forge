import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { Portfolio } from "@/components/site/Portfolio";
import { FutureLab } from "@/components/site/FutureLab";
import { PageIntro } from "@/components/site/PageIntro";

const title = "Portfolio — Websites & Platform Demos | Royal Robert";
const description =
  "Explore completed builds including Lebanon Dental Care, luxury car dealership platforms, responsive product design and vehicle software prototypes.";

const url = `${SITE_URL}/portfolio`;

export const Route = createFileRoute("/portfolio")({
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
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <>
      <PageIntro
        eyebrow="Portfolio"
        title="Completed projects and live demonstrations"
        body="Live client websites, immersive platform walkthroughs and responsive design storytelling — plus clearly labelled prototypes of software still in development."
      />
      <Portfolio />
      <FutureLab />
    </>
  );
}
