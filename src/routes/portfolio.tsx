import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/site/Portfolio";
import { FutureLab } from "@/components/site/FutureLab";
import { PageIntro } from "@/components/site/PageIntro";

const title = "Portfolio — Completed Websites & Platform Demonstrations | Royal Robert Digital Solutions";
const description =
  "Explore completed builds including Lebanon Dental Care, luxury car dealership platforms, responsive product design and vehicle software prototypes.";

export const Route = createFileRoute("/portfolio")({
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
