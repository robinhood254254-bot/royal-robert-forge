import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { FutureLab } from "@/components/site/FutureLab";
import { PageIntro } from "@/components/site/PageIntro";

const title = "Web, E-commerce & Custom Software Services | Royal Robert";
const description =
  "Corporate and portfolio websites, e-commerce, custom web applications, business software, Google Business Profile setup and car dealership platforms.";

const url = `${SITE_URL}/services`;

export const Route = createFileRoute("/services")({
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
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services"
        title="Digital solutions shaped around your business"
        body="From a first professional website to inventory and hire-purchase software — every engagement starts with understanding your requirements, then building only what serves them."
      />
      <Services />
      <Process />
      <FutureLab />
    </>
  );
}
